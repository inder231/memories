import * as types from "./actionTypes";
import * as api from "./action";

export const signin = (formData,navigate) => async (dispatch) => {
  try {
    // login the user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData,navigate)=> async (dispatch) => {
    try {
        // signup userF
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}
