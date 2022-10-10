import * as types from "./actionTypes";
import axios from "axios";
const API = axios.create({baseURL:'https://snap-memories.herokuapp.com'})

API.interceptors.request.use((req)=>{
    const profile = JSON.parse(localStorage.getItem("profile"))
    if(profile){
        req.headers.Authorization = `Bearer ${profile.token}`
    }
    return req;
})  

export const signin = (formData)=> API.post('/user/signin',formData);
export const signup = (formData)=> API.post('/user/signup',formData);


