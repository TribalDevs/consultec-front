import { petition } from "api";
import { CallComponent } from "components/Call";
import { Form } from "components/Forms";
import Icon from "components/icon";
import { Loader } from "components/Loader";
import { Message } from "components/Message";
import { TextComponent } from "components/Texts";
import { useQuery } from "hooks";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "views/Home/HomeScreen";
import { actions, initialState, reducer } from "./reducer";
import "./styles.sass";
export const Chat = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const query = useQuery();
  const navigate = useNavigate();
  const { socket, socketActions, setShowModalCall, setUserToCall } =
    useContext(ChatContext);
  const getConversation = (id) => {
    const controller = new AbortController();
    dispatch({
      type: actions.SET_ABORT_CONTROLLER,
      payload: controller,
    });
    petition({
      url: `/user/conversation/validate/history/${id}/`,
      method: "GET",
      constants: {
        REQUEST: actions.VALIDATE_CONVERSATION,
        SUCCESS: actions.VALIDATE_CONVERSATION_SUCCESS,
        FAILURE: actions.VALIDATE_CONVERSATION_FAIL,
      },
      dispatch,
      token: true,
      controller,
    });
  };
  const handleScrollToBottom = () => {
    let chat__history = document.getElementById("chat__history");
    if (chat__history) {
      chat__history.scrollTop = chat__history.scrollHeight;
    }
  };

  useEffect(() => {
    if (user.id) {
      getConversation(user.id);
      socket.emit(socketActions.checkUserStatus, user.id);
    }
    dispatch({
      type: actions.UPDATE_MESSAGE,
      payload: "",
    });
    return () => {
      socket.off(socketActions.checkUserStatus);
    };
  }, [user, socket, socketActions]);
  useEffect(() => {
    if (state.validateConversation.loading) {
      state.abortController.abort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleSendMessage = ({ useDocument = false }) => {
    console.log(state.userSelectedStatus);
    let message = state.message;
    if (useDocument) {
      message = document.getElementById("chat__input").value;
    }
    if (message === "") return;

    petition({
      url: `/user/conversation/new/${user.id}/`,
      method: "POST",
      body: {
        message,
      },
      constants: {
        REQUEST: actions.START_CONVERSATION,
        SUCCESS: actions.START_CONVERSATION_SUCCESS,
        FAILURE: actions.START_CONVERSATION_FAIL,
      },
      dispatch,
      token: true,
    });
    socket.emit(socketActions.sendMessage, {
      receiver: {
        socketId: state.userSelectedStatus.socketId,
      },
      message: message,
      sender: {
        id: userInfo.id,
      },
      user: {
        id: userInfo.id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        role: userInfo.role,
      },
    });
  };
  useEffect(() => {
    // * When user send status
    socket.on(socketActions.sendUserStatus, (data) => {
      dispatch({
        type: actions.SET_USER_SELECTED_REAL_TIME_INFO,
        payload: data,
      });
      setUserToCall(data);
    });
    // * When we receive message
    socket.on(socketActions.receiveMessage, (data) => {
      dispatch({
        type: actions.ADD_MESSAGE_RECEIVED,
        payload: data,
      });
      dispatch({
        type: actions.SET_USER_SELECTED_REAL_TIME_INFO,
        payload: {
          ...state.userSelectedStatus,
          socketId: data.senderSocketId,
        },
      });
      setUserToCall({
        ...state.userSelectedStatus,
        socketId: data.senderSocketId,
      });
    });
    // * When user has been disconnected
    socket.on(socketActions.userHasDisconnected, (data) => {
      if (data === user.id) {
        dispatch({
          type: actions.SET_USER_SELECTED_REAL_TIME_INFO,
          payload: {
            ...state.userSelectedStatus,
            status: "offline",
          },
        });
        setUserToCall({
          ...state.userSelectedStatus,
          status: "offline",
        });
      }
    });
    // * When user has been connected
    socket.on(socketActions.userHasConnected, (data) => {
      if (data.id === user.id) {
        dispatch({
          type: actions.SET_USER_SELECTED_REAL_TIME_INFO,
          payload: {
            socketId: data.socketId,
            status: "online",
          },
        });
        setUserToCall({
          socketId: data.socketId,
          status: "online",
        });
      }
    });
    // * Return function to off all events
    return () => {
      socket.off(socketActions.sendUserStatus);
      socket.off(socketActions.receiveMessage);
      socket.off(socketActions.userHasDisconnected);
      socket.off(socketActions.userHasConnected);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // * On enter events
    const onEnter = (e) => {
      if (e.key === "Enter") {
        handleSendMessage({ useDocument: true });
      }
    };
    // * Event listener to send message when user press enter
    document.addEventListener("keydown", onEnter);
    // * Return function to remove event listener
    return () => {
      document.removeEventListener("keydown", onEnter);
    };
  }, [state.userSelectedStatus, state.message]);
  // * Every time we receive a message we scroll to bottom
  useEffect(() => {
    handleScrollToBottom();
  }, [state.chatMessages]);
  return (
    <div className="chat__component">
      <div className="chat__header">
        <div className="chat__header__user">
          <TextComponent
            type="h4"
            text={`${user.first_name} ${user.last_name} - ${user.role}`}
            disableLocales
          />
          {state.userSelectedStatus && (
            <TextComponent
              type="p"
              text={state.userSelectedStatus.status}
              disableLocales
            />
          )}
        </div>
        <div
          className="chat__header__call"
          // hidden={!state.userSelectedStatus?.socketId}
        >
          <Icon
            nameIcon="AiOutlinePhone"
            onClick={() => setShowModalCall(true)}
          />
        </div>
      </div>
      {state.validateConversation.loading ? (
        <div className="chat__loading">
          <Loader />
        </div>
      ) : (
        <div className="chat__history" id="chat__history">
          {state.chatMessages.map((message, index) => (
            <Message
              message={message.message}
              created_at={message.created_at}
              myMessage={message.user.id === userInfo.id}
              key={index}
            />
          ))}
        </div>
      )}

      <div className="chat__input">
        <Form onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Enviar mensaje"
            value={state.message}
            onChange={(e) =>
              dispatch({
                type: actions.UPDATE_MESSAGE,
                payload: e.target.value,
              })
            }
            id="chat__input"
          />
          <div className="chat__input__button">
            <Icon
              nameIcon={"RiSendPlaneFill"}
              onClick={() => {
                if (state.message !== "") {
                  if (
                    !state.validateConversation.loading &&
                    !state.startConversation.loading
                  ) {
                    handleSendMessage({
                      useDocument: false,
                    });
                  }
                }
              }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
