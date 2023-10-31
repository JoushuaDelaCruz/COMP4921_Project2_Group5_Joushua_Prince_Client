import React from "react";
import { Home, postsLoader } from "./Pages/Home";
import Post from "./Pages/Post";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import { useCookies } from "react-cookie";
import Request from "./Pages/Models/ServerRequest";
import { Reply, replyLoader } from "./Pages/Reply";
import { Search, SearchLoader } from "./Pages/Search";
import Profile from "./Pages/Profile";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";

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
        <Route
          index
          loader={async () => {
            const cookieStatus = await isCookieValid();
            return await postsLoader(cookieStatus, cookies.session);
          }}
          element={<Home />}
        />
        <Route
          path="/reply/:post_id"
          loader={({ params }) => {
            return replyLoader(params.post_id);
          }}
          exact
          element={<Reply />}
        />
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
        <Route
          path="/search/:text"
          loader={async ({ params }) => {
            return SearchLoader(params.text);
          }}
          exact
          element={<Search />}
        />
        <Route path="/profile" exact element={<Profile />} />
      </Route>
    )
  );

  return <RouterProvider router={routers} />;
};

export default App;
