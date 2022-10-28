import { TextComponent } from "components/Texts";
import React, { useReducer, useContext, useEffect } from "react";
import { ChatContext } from "views/Home/HomeScreen";
import { reducer, actions, initialState } from "./reducer";
import Icon from "components/icon";
import { Loader } from "components/Loader";
import "./styles.sass";
import { Form } from "components/Forms";
import { Input } from "components/Inputs";
import { petition } from "api";
import { Button } from "components/Buttons";
export const SidebarChat = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setSelectedUser, userDataSocket, userInfo, socket, socketActions } =
    useContext(ChatContext);

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
  useEffect(() => {
    petition({
      url: "/user/conversation/active/",
      method: "GET",
      constants: {
        REQUEST: actions.GET_ACTIVE_CONVERSATIONS_REQUEST,
        SUCCESS: actions.GET_ACTIVE_CONVERSATIONS_SUCCESS,
        FAILURE: actions.GET_ACTIVE_CONVERSATIONS_FAIL,
      },
      dispatch,
      token: true,
    });
    socket.on(socketActions.sendUsersStatus, (data) => {
      console.log(data);
      dispatch({
        type: actions.SET_USERS_STATUS,
        payload: data,
      });
    });
    socket.on(socketActions.userHasDisconnected, (data) => {
      dispatch({
        type: actions.SET_USER_STATUS,
        payload: {
          user: data,
          status: "offline",
        },
      });
    });
    socket.on(socketActions.userHasConnected, (data) => {
      dispatch({
        type: actions.SET_USER_STATUS,
        payload: {
          user: data.id,
          status: "online",
        },
      });
    });
    return () => {
      socket.off(socketActions.sendUsersStatus);
      socket.off(socketActions.userHasDisconnected);
      socket.off(socketActions.userHasConnected);
    };
  }, []);
  useEffect(() => {
    if (state.getActiveConversations.success) {
      socket.emit(socketActions.requestUsersStatus, state.usersIds);
    }
    return () => {
      socket.off(socketActions.requestUsersStatus);
    };
  }, [state.getActiveConversations.success]);
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
            <TextComponent
              text={`Socket id: ${socket.id}` || "Socket id: No hay conexión"}
              type="p"
              disableLocales={true}
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
                      onClick={() => {
                        setSelectedUser(user);
                        // add query user to url
                        window.history.pushState(
                          {},
                          "",
                          `?conversation=${user.id}`
                        );
                      }}
                    >
                      <TextComponent
                        type="h4"
                        text={user.first_name + " " + user.last_name}
                        disableLocales={true}
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
        <div className="sidebar__chats">
          {state.getActiveConversations.loading ? (
            <Loader />
          ) : (
            <>
              {state.getActiveConversations.data?.map((user, index) => (
                <div
                  className="sidebar__chat__item"
                  onClick={() => {
                    setSelectedUser(user.user[0]);
                    // add query user to url
                    window.history.pushState(
                      {},
                      "",
                      `?conversation=${user.id}`
                    );
                  }}
                  key={index}
                >
                  <div className="sidebar__chat__item__image">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="profile"
                    />
                  </div>

                  <div className="sidebar__chat__item__info">
                    <div className="sidebar__chat__item__info__name">
                      {user.user[0].status === "online" ? (
                        <div className="online__status"></div>
                      ) : (
                        <div className="offline__status"></div>
                      )}
                      <TextComponent
                        type="span"
                        text={
                          user.user[0].first_name + " " + user.user[0].last_name
                        }
                        disableLocales={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
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
