import {
  saveToLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localstorage";
import * as types from "./actionTypes";
const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  profile: null,
};

export const authreducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GOOGLE_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GOOGLE_SIGNIN_SUCCESS:
      saveToLocalStorage("profile", payload);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        profile: payload,
      };
    case types.GOOGLE_SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GOOGLE_LOGOUT_SUCCESS:
      removeFromLocalStorage("profile");
      return {
        ...state,
        isAuth: false,
        profile: null,
      };
    default:
      return state;
  }
};
