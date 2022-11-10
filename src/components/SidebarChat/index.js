import { petition } from "api";
import { Form } from "components/Forms";
import Icon from "components/icon";
import { Input } from "components/Inputs";
import { Loader } from "components/Loader";
import { TextComponent } from "components/Texts";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "views/Home/HomeScreen";
import { actions, initialState, reducer } from "./reducer";
import "./styles.sass";
export const SidebarChat = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { setSelectedUser, userInfo, socket, socketActions } =
    useContext(ChatContext);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  const handleSearch = ({ useDocument = false }) => {
    let query = state.query;
    if (useDocument) {
      query = document.getElementById("query__search").value;
    }
    petition({
      url: "/user/search/",
      method: "POST",
      body: {
        query: query,
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
      socket.off(socketActions.userHasDisconnected);
      socket.off(socketActions.userHasConnected);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (state.getActiveConversations.success) {
      socket.emit(socketActions.requestUsersStatus, state.usersIds);
    }
    socket.on(socketActions.sendUsersStatus, (data) => {
      dispatch({
        type: actions.SET_USERS_STATUS,
        payload: data,
      });
    });
    return () => {
      socket.off(socketActions.requestUsersStatus);
      socket.off(socketActions.sendUsersStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.getActiveConversations.success, state.usersIds]);

  useEffect(() => {
    // add event listener to send message when user press enter
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query__search = document.getElementById("query__search");
        // if the user is focused on the search input, then do search
        if (query__search === document.activeElement) {
          handleSearch({ useDocument: true });
        }
      }
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const query__search = document.getElementById("query__search");
          // if the user is focused on the search input, then do search
          if (query__search === document.activeElement) {
            handleSearch({ useDocument: true });
          }
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              text={`${userInfo.first_name} ${userInfo.last_name}`}
              disableLocales
              type="p"
            />
            <TextComponent
              text={{
                en: `Status: ${
                  socket?.connected ? "Connected" : "Disconnected"
                }`,
                es: `Estado: ${
                  socket?.connected ? "Connected" : "Disconnected"
                }`,
              }}
              type="p"
            />
            {userInfo.role === "Administrator" && (
              <TextComponent
                text={"Verificación de estudiantes"}
                type="p"
                disableLocales
                onClick={() => {
                  navigate("/student-verification");
                }}
                modifiers={["link"]}
              />
            )}
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
                  id="query__search"
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
                        dispatch({
                          type: actions.CLEAR_SEARCH,
                        });
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
                      `?conversation=${user.user[0].id}`
                    );
                  }}
                  key={index}
                >
                  {user.user[0].status && (
                    <>
                      <div className="sidebar__chat__item__image">
                        <img
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          alt="profile"
                        />
                      </div>
                      <div className="sidebar__chat__item__info">
                        <div className="sidebar__chat__item__info__name">
                          {user.user.length > 0 &&
                          user.user[0].status === "online" ? (
                            <div className="online__status"></div>
                          ) : (
                            <div className="offline__status"></div>
                          )}
                          <TextComponent
                            type="span"
                            text={
                              user.user[0].first_name +
                              " " +
                              user.user[0].last_name +
                              " " +
                              user.user[0].status
                            }
                            disableLocales={true}
                          />
                        </div>
                      </div>
                    </>
                  )}
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
