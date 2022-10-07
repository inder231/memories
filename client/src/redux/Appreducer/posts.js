import * as api from "./actions";
import * as types from "./actionTypes";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: types.GET_POST_REQUEST });
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: types.GET_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.GET_POST_FAILURE });
  }
};

export const createNewPost = (post) => async (dispatch) => {
  dispatch({ type: types.CREATE_POST_REQUEST });
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: types.CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.CREATE_POST_FAILURE });
  }
};
