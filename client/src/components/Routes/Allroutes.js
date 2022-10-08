import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localstorage";
import Auth from "../Auth/Auth";
import Home from "../Home/Home";
import PostDetails from "../PostDetails/PostDetails";
const Allroutes = () => {
  const user = getFromLocalStorage("profile");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Home />} />
      <Route path="/posts/search" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/auth" element={!user?<Auth />:<Home/>} />
    </Routes>
  );
};

export default Allroutes;
