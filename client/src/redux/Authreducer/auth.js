import * as types from "./actionTypes";
import * as api from "./action";

export const signin = (formData, navigate) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNIN_REQUEST });
  try {
    // login the user
    const { data } = await api.signin(formData);
    return dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    return dispatch({ type: types.USER_SIGNIN_FAILURE, payload: error.message });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_REQUEST });
  try {
    // signup user
    const { data } = await api.signup(formData);
    dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.USER_SIGNUP_FAILURE, payload: error.message });
  }
};
