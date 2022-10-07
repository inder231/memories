import * as api from "./actions";
import * as types from "./actionTypes";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: types.GET_POST_REQUEST });
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: types.GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_POST_FAILURE });
  }
};
