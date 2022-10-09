import * as api from "./actions";
import * as types from "./actionTypes";
// GET POSTS REQUEST ========================
export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: types.GET_POST_REQUEST });
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: types.GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_POST_FAILURE, payload: error.message });
  }
};

// GET SINGLE POST =================================
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_POST_REQUEST });
  try {
    const { data } = await api.getPost(id);
    dispatch({ type: types.GET_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_POST_FAILURE, payload: error.message });
  }
};

// CREATE NEW POSTS REQUEST ========================
export const createNewPost = (post, navigate) => async (dispatch) => {
  dispatch({ type: types.CREATE_POST_REQUEST });
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: types.CREATE_POST_SUCCESS, payload: data });
    navigate(`/posts/${data._id}`);
  } catch (error) {
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error.message });
  }
};

// UPDATE POSTS REQUEST ========================
export const updatePost = (id, post) => async (dispatch) => {
  dispatch({ type: types.UPDATE_POST_REQUEST });
  try {
    const res = await api.updatePost(id, post);
    dispatch({ type: types.UPDATE_POST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_POST_FAILURE, payload: error.message });
  }
};

// DELETE POSTS REQUEST ========================
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_POST_REQUEST });
  try {
    await api.deletePost(id);
    dispatch({ type: types.DELETE_POST_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: types.DELETE_POST_FAILURE, payload: error.message });
  }
};

// LIKE POST REQUREST ===========================
export const likePost = (id) => async (dispatch) => {
  dispatch({ type: types.LIKE_POST_REQUEST });
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: types.LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.LIKE_POST_FAILURE, payload: error.message });
  }
};
// COMMENT THE POST ===============================
export const commentPost = (value, id) => async (dispatch) => {
  dispatch({ type: types.LOADING });
  try {
    const { data } = await api.comment(value, id);
    console.log(value,id);
    console.log(data);
    dispatch({ type: types.COMMENT_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.ERROR, message: error.message });
  }
};

// SEARCH POSTS ================================
export const getSearchedPosts = (searchQuery) => async (dispatch) => {
  dispatch({ type: types.SEARCH_POST_REQUEST });

  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: types.SEARCH_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.SEARCH_POST_FAILURE, message: error.message });
  }
};
