import * as types from "./actionTypes";
const initState = {
  posts: [],
  isLoading: false,
  isError: false,
};

export const appreducer = (state = initState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
