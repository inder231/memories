import * as api from "./actions";
import * as types from "./actionTypes";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: types.GET_POST_REQUEST });
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: types.GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_POST_FAILURE, payload: error.message });
  }
};

export const createNewPost = (post) => async (dispatch) => {
  dispatch({ type: types.CREATE_POST_REQUEST });
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: types.CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error.message });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  dispatch({ type: types.UPDATE_POST_REQUEST });
  try {
    const res = await api.updatePost(id, post);
    dispatch({ type: types.UPDATE_POST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_POST_FAILURE, payload: error.message });
  }
};
