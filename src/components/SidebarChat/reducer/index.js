import { actions } from "./actions";
import { initialState } from "./constants";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case actions.SEARCH_REQUEST:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
          error: null,
          success: false,
        },
      };
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: null,
          success: true,
          data: action.payload.users || [],
        },
      };
    case actions.SEARCH_FAIL:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: action.payload,
          success: false,
        },
      };
    case actions.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case actions.GET_ACTIVE_CONVERSATIONS_REQUEST:
      return {
        ...state,
        getActiveConversations: {
          ...state.getActiveConversations,
          loading: true,
          error: null,
          success: false,
        },
      };
    case actions.GET_ACTIVE_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        getActiveConversations: {
          ...state.getActiveConversations,
          loading: false,
          error: null,
          success: true,
          data: action.payload.message || [],
        },
        usersIds: action.payload.message.map((item) => item.user[0].id),
      };
    case actions.GET_ACTIVE_CONVERSATIONS_FAIL:
      return {
        ...state,
        getActiveConversations: {
          ...state.getActiveConversations,
          loading: false,
          error: action.payload,
          success: false,
        },
      };
    case actions.SET_USERS_STATUS:
      let updatedUsers = state.getActiveConversations.data;
      console.log("Before: ", updatedUsers);
      updatedUsers.forEach((item, index) => {
        let itemFromPayload = action.payload.filter(
          (payloadItem) => payloadItem.id == item.user[0].id
        );
        if (itemFromPayload.length > 0) {
          updatedUsers[index].user[0].status = itemFromPayload[0].status;
        } else {
          updatedUsers[index].user[0].status = "offline";
        }
      });
      console.log("After: ", updatedUsers);
      return {
        ...state,
        getActiveConversations: {
          ...state.getActiveConversations,
          data: updatedUsers,
        },
      };
    case actions.SET_USER_STATUS:
      let updatedUsers2 = state.getActiveConversations.data;
      updatedUsers2?.forEach((item, index) => {
        if (item.user[0].id === action.payload.user) {
          updatedUsers2[index].user[0].status = action.payload.status;
        }
      });
      return {
        ...state,
        getActiveConversations: {
          ...state.getActiveConversations,
          data: updatedUsers2,
        },
      };
    case actions.CLEAR_SEARCH:
      return {
        ...state,
        search: initialState.search,
      };
    default:
      return state;
  }
};
export { reducer, actions, initialState };
