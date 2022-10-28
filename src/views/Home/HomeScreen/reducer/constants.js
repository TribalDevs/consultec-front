export const initialState = {
  selectedUser: null,
  socketActions: {
    join: "join",
    successJoin: "successJoin",
    checkUserStatus: "checkUserStatus",
    sendUserStatus: "sendUserStatus",
    sendMessage: "sendMessage",
    receiveMessage: "receiveMessage",
    requestUsersStatus: "requestUsersStatus",
    sendUsersStatus: "sendUsersStatus",
    userHasDisconnected: "userHasDisconnected",
    userHasConnected: "userHasConnected",
  },
  userDataSocket: null,
};
