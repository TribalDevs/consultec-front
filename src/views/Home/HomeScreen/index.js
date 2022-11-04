import { petition } from "api";
import { CallComponent } from "components";
import { Chat } from "components/Chat";
import { SidebarChat } from "components/SidebarChat";
import { useQuery } from "hooks";
import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { actions, initialState, reducer } from "./reducer";
import "./styles.sass";
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

export const ChatContext = createContext();
export default function HomeScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const query = useQuery();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      socket.emit(state.socketActions.join, {
        id: userInfo.id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        identifier_number: userInfo.identifier_number,
        gender: userInfo.gender,
        role: userInfo.role,
      });
    }
    return () => {
      socket.off(state.socketActions.join);
    };
  }, []);
  const conversation = query.get("conversation");
  useEffect(() => {
    if (conversation) {
      if (!state.selectedUser) {
        petition({
          url: `/user/data/${conversation}/`,
          method: "GET",
          constants: {
            REQUEST: actions.GET_USER_DATA,
            SUCCESS: actions.GET_USER_DATA_SUCCESS,
            FAILURE: actions.GET_USER_DATA_FAIL,
          },
          dispatch,
          token: true,
        });
      }
    }
  }, [conversation, navigate]);
  useEffect(() => {
    socket.on(state.socketActions.successJoin, (data) => {
      console.log("successJoin", data);
      dispatch({
        type: actions.SET_USER_DATA_SOCKET,
        payload: data,
      });
    });
    socket.on(state.socketActions.rejectedCall, () => {
      dispatch({
        type: actions.SET_REJECTED_CALL,
        payload: true,
      });
    });

    return () => {
      socket.off(state.socketActions.successJoin);
      socket.off(state.socketActions.rejectedCall);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket.on(state.socketActions.callUser, (data) => {
      dispatch({
        type: actions.SET_CALLER_DATA,
        payload: {
          caller: data.from,
          name: data.name,
          signal: data.signal,
        },
      });
      if (!state.receivingCall) {
        dispatch({
          type: actions.SET_RECEIVING_CALL,
          payload: true,
        });
      }
    });
    return () => {
      socket.off(state.socketActions.callUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.receivingCall]);
  return (
    <ChatContext.Provider
      value={{
        state,
        selectedUser: state.selectedUser,
        setUser: (user) => {
          dispatch({
            type: actions.SET_SELECTED_USER,
            payload: user,
          });
        },
        setSelectedUser: (user) =>
          dispatch({ type: actions.SET_SELECTED_USER, payload: user }),
        userDataSocket: state.userDataSocket,
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        socket,
        userToCall: state.useToCallData,
        socketActions: state.socketActions,
        userSelected: state.selectedUser,
        setShowModalCall: (show) =>
          dispatch({ type: actions.SHOW_MODAL_CALL, payload: show }),
        setUserToCall: (user) =>
          dispatch({ type: actions.SET_USER_TO_CALL_DATA, payload: user }),
        dispatch,
        actions,
      }}
    >
      <div className="home__screen">
        <CallComponent />
        <SidebarChat />
        <div className="chat__content">
          {state.selectedUser && <Chat user={state.selectedUser} />}
        </div>
      </div>
    </ChatContext.Provider>
  );
}
