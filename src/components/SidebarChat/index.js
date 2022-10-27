import { TextComponent } from "components/Texts";
import React, { useReducer, useContext } from "react";
import { ChatContext } from "views/Home/HomeScreen";
import { reducer, actions, initialState } from "./reducer";
import Icon from "components/icon";
import "./styles.sass";
import { Form } from "components/Forms";
import { Input } from "components/Inputs";
import { petition } from "api";
import { Button } from "components/Buttons";
export const SidebarChat = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setSelectedUser, userDataSocket, userInfo } = useContext(ChatContext);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  const handleSearch = () => {
    petition({
      url: "/user/search/",
      method: "POST",
      body: {
        query: state.query,
      },
      constants: {
        REQUEST: actions.SEARCH_REQUEST,
        SUCCESS: actions.SEARCH_SUCCESS,
        FAILURE: actions.SEARCH_FAIL,
      },
      dispatch,
      token: true,
    });
  };
  return (
    <div className="sidebar__chat">
      <div className="sidebar__chat__top">
        <div className="sidebar__my__profile">
          <div className="sidebar__my__profile__image">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile"
            />
          </div>
          <div className="sidebar__my__profile__info">
            <TextComponent
              text={{
                en: `${userInfo.first_name} ${userInfo.last_name}`,
                es: `${userInfo.first_name} ${userInfo.last_name}`,
              }}
            />
            <TextComponent
              text={{
                en: `Status: ${userDataSocket?.status}`,
                es: `Estado: ${userDataSocket?.status}`,
              }}
              type="p"
            />
          </div>
        </div>
        <div className="sidebar__chats__container">
          <div className="search__user">
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="form__search__user">
                <Input
                  placeholder={"Buscar usuario"}
                  name={"query"}
                  value={state.query}
                  onChange={(e) =>
                    dispatch({
                      type: actions.UPDATE_QUERY,
                      payload: e.target.value,
                    })
                  }
                  type={"text"}
                />
                <Icon nameIcon={"FaSearch"} onClick={handleSearch} />
              </div>
            </Form>
          </div>
          {state.search.loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {state.search.success ? (
                <div className="users__container">
                  {state.search.data?.map((user, index) => (
                    <div
                      className="user__list__item"
                      key={index}
                      onClick={() => setSelectedUser(user)}
                    >
                      <TextComponent
                        type="h4"
                        text={{
                          en: user.first_name + " " + user.last_name,
                          es: user.first_name + " " + user.last_name,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : state.search.error ? (
                <div className="search__users__error">
                  <TextComponent
                    type="span"
                    text={{
                      en: "Error while searching users",
                      es: "Error al buscar usuarios",
                    }}
                  />
                </div>
              ) : null}
            </>
          )}
          {/* {users.map((user, index) => (
          <div className="user__item">
            <TextComponent
              type="h4"
              text={{
                en: user.name,
                es: user.name,
              }}
            />
          </div>
        ))} */}
        </div>
      </div>

      <div className="logout__button">
        <Icon onClick={handleLogout} nameIcon="BiLogOut" />
        <TextComponent
          type="p"
          text={{ en: "Logout", es: "Salir" }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};
