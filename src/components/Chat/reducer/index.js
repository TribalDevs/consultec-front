import { actions } from "./actions";
import { initialState } from "./constants";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.VALIDATE_CONVERSATION:
      return {
        ...state,
        validateConversation: {
          ...state.validateConversation,
          loading: true,
          error: null,
          success: false,
          data: null,
        },
      };
    case actions.VALIDATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        validateConversation: {
          ...state.validateConversation,
          loading: false,
          error: null,
          success: true,
          data: action.payload,
        },
      };
    case actions.VALIDATE_CONVERSATION_FAIL:
      return {
        ...state,
        validateConversation: {
          ...state.validateConversation,
          loading: false,
          error: action.payload,
          success: false,
          data: null,
        },
      };
    case actions.START_CONVERSATION:
      return {
        ...state,
        startConversation: {
          ...state.startConversation,
          loading: true,
          error: null,
          success: false,
          data: null,
        },
        message: ""
      };
    case actions.START_CONVERSATION_SUCCESS:
      return {
        ...state,
        startConversation: {
          ...state.startConversation,
          loading: false,
          error: null,
          success: true,
          data: action.payload,
        },
      };
    case actions.START_CONVERSATION_FAIL:
      return {
        ...state,
        startConversation: {
          ...state.startConversation,
          loading: false,
          error: action.payload,
          success: false,
          data: null,
        },
      };
    case actions.UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
export { reducer, actions, initialState };
