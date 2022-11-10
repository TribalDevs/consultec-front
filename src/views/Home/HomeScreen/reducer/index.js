import { actions } from "./actions";
import { initialState } from "./constants";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case actions.SET_USER_DATA_SOCKET:
      return {
        ...state,
        userDataSocket: action.payload,
      };
    case actions.SHOW_MODAL_CALL:
      return {
        ...state,
        showModalCall: action.payload,
        receivingCall: action.payload === false ? false : state.receivingCall,
      };
    case actions.SET_USER_TO_CALL_DATA:
      return {
        ...state,
        useToCallData: action.payload,
      };
    case actions.SET_CALLER_DATA:
      return {
        ...state,
        caller: action.payload,
      };
    case actions.SET_RECEIVING_CALL:
      return {
        ...state,
        receivingCall: action.payload,
      };
    case actions.SET_CALL_ENDED:
      return {
        ...state,
        callEnded: action.payload,
      };
    case actions.SET_CALL_ACCEPTED:
      return {
        ...state,
        callAccepted: action.payload,
        rejectedCall: false,
        receivingCall: false,
        calling: false,
      };
    case actions.SET_REJECTED_CALL:
      return {
        ...state,
        rejectedCall: action.payload,
        calling: false,
      };
    case actions.SET_CALLING:
      return {
        ...state,
        calling: action.payload,
      };
    case actions.SET_CALL_REJECTED:
      return {
        ...state,
        receivingCall: false,
        showModalCall: false,
      };
    case actions.END_CALL:
      return {
        ...state,
        showModalCall: false,
        callAccepted: false,
        callEnded: true,
        rejectedCall: false,
        calling: false,
        receivingCall: false,
      };
    case actions.GET_USER_DATA:
      return {
        ...state,
        getUserData: {
          ...state.getUserData,
          loading: true,
          error: null,
          success: false,
        },
      };
    case actions.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        getUserData: {
          ...state.getUserData,
          loading: false,
          error: null,
          success: true,
          data: action.payload,
        },
        selectedUser: action.payload.message,
      };
    case actions.GET_USER_DATA_FAIL:
      return {
        ...state,
        getUserData: {
          ...state.getUserData,
          loading: false,
          error: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export { reducer, actions, initialState };
