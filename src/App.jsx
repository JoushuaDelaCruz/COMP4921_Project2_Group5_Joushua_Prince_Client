import React from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import { useCookies } from "react-cookie";
import Request from "./Pages/models/ServerRequest";

const App = () => {
  const request = new Request();
  const [cookies, , removeCookie] = useCookies(["session"]);

  const isCookieValid = async () => {
    if (cookies.session) {
      const url = import.meta.env.VITE_API + "user/checkSession";
      const authenticated = await request.postReq(url, cookies.session);
      return authenticated;
    }
    removeCookie("session");
    return false;
  };

  const routers = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route
          path="/post"
          loader={async () => {
            const cookieStatus = await isCookieValid();
            if (!cookieStatus) {
              return redirect("/");
            }
            return null;
          }}
          exact
          element={<Post />}
        />
        <Route
          path="/logIn"
          loader={async () => {
            const cookieStatus = await isCookieValid();
            if (cookieStatus) {
              return redirect("/");
            }
            return null;
          }}
          exact
          element={<LogIn />}
        />
        <Route
          path="/signUp"
          loader={async () => {
            const cookieStatus = await isCookieValid();
            if (cookieStatus) {
              return redirect("/");
            }
            return null;
          }}
          exact
          element={<SignUp />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routers} />;
};

export default App;
