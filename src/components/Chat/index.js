import React, { useReducer, useEffect } from "react";
import { reducer, actions, initialState } from "./reducer";
import { Message } from "components/Message";
import "./styles.sass";
import { Button } from "components/Buttons";
import { TextComponent } from "components/Texts";
import { Form } from "components/Forms";
import Icon from "components/icon";
import { petition } from "api";
export const Chat = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    petition({
      url: `/user/conversation/${user.id}/messages/`,
      method: "GET",
      constants: {
        REQUEST: actions.VALIDATE_CONVERSATION,
        SUCCESS: actions.VALIDATE_CONVERSATION_SUCCESS,
        FAILURE: actions.VALIDATE_CONVERSATION_FAIL,
      },
      dispatch,
      token: true,
    });
    dispatch({
      type: actions.UPDATE_MESSAGE,
      payload: "",
    });
  }, [user]);
  const handleStartConversation = () => {
    petition({
      url: `/user/conversation/${user.id}/new/`,
      method: "POST",
      body: {
        message: state.message,
      },
      constants: {
        REQUEST: actions.START_CONVERSATION,
        SUCCESS: actions.START_CONVERSATION_SUCCESS,
        FAILURE: actions.START_CONVERSATION_FAIL,
      },
      dispatch,
      token: true,
    });
  };
  return (
    <div className="chat__component">
      <div className="chat__header">
        <TextComponent
          type="h4"
          text={{
            en: user.first_name + " " + user.last_name,
            es: user.first_name + " " + user.last_name,
          }}
        />
        <TextComponent
          type="p"
          text={{
            en: `user id: ${user.id}`,
            es: `user id: ${user.id}`,
          }}
        />
      </div>
      <div className="chat__history">
        {state.validateConversation.loading ? "Loading..." : <>No messages</>}
        {state.startConversation.loading ? "Starting conversation..." : ""}
      </div>
      <div className="chat__input">
        <Form>
          <input
            placeholder="Enviar mensaje"
            value={state.message}
            onChange={(e) =>
              dispatch({
                type: actions.UPDATE_MESSAGE,
                payload: e.target.value,
              })
            }
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
                    handleStartConversation();
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
