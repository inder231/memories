import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'})


API.interceptors.request.use((req)=>{
    const profile = JSON.parse(localStorage.getItem("profile"))
    if(profile){
        req.headers.Authorization = `Bearer ${profile.token}`
    }
    return req;
}) 

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search|| 'none'}&tags=${searchQuery.tags}`);