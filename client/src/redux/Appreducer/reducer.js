import * as types from "./actionTypes";
const initState = {
  posts: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const appreducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload,
      };
    case types.GET_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, payload],
      };
    case types.CREATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case types.UPDATE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case types.UPDATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case types.DELETE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case types.DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case types.LIKE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LIKE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case types.LIKE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
