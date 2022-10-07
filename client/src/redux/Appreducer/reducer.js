import * as types from "./actionTypes";
const initState = {
  posts: [],
  isLoading: false,
  isError: false,
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
      };
    default:
      return state;
  }
};
