import * as types from "./actionTypes";
const initState = {
  posts: [],
  post: {},
  noOfPages: 1,
  currentPage: 1,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const appreducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.LOADING:{
      return {...state,isLoading: true}
    }
    case types.ERROR:{
      return {...state,isError: true,isLoading: false}
    }
  
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload.data,
        noOfPages: payload.numberOfPages,
        currentPage: payload.currentPage,
      };
 
  
    case types.GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: payload,
      };

 
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, payload],
      };


    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
 
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };


    case types.LIKE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };

    case types.COMMENT_POST_SUCCESS: return {
      ...state,isLoading:false,posts:state.posts.map((post)=>{
        if(post._id===payload._id){
          return payload;
        }else{
          return post;
        }
      })
    }

    case types.SEARCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload.posts,
      };


    default:
      return state;
  }
};
