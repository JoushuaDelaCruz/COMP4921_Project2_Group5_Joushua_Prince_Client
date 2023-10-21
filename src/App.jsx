import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/post" exact element={<Post />} />
        <Route path="/logIn" exact element={<LogIn />} />
        <Route path="/signUp" exact element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
