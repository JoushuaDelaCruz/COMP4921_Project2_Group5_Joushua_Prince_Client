import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import { useCookies } from "react-cookie";
import Request from "./Pages/models/ServerRequest";

const App = () => {
  const request = new Request();
  const [cookies] = useCookies(["session"]);

  const isCookieValid = async () => {
    if (cookies.session) {
      const url = import.meta.env.VITE_API + "user/checkSession";
      const authenticated = await request.postReq(url, cookies.session);
      return authenticated;
    }
    return false;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/post"
          exact
          element={isCookieValid ? <Navigate to="/" replace /> : <Post />}
        />
        <Route
          path="/logIn"
          exact
          element={isCookieValid ? <LogIn /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signUp"
          exact
          element={isCookieValid ? <SignUp /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
