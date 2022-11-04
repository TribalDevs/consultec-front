import { initialState } from "./constants";
import { actions } from "./actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export { actions, initialState, reducer };
