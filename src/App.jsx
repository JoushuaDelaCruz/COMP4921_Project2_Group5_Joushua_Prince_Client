import React, { useEffect, useState } from "react";
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
  const [isCookieValid, setIsCookieValid] = useState(false);

  useEffect(() => {
    const checkCookie = async () => {
      if (cookies.session) {
        const url = import.meta.env.VITE_API + "user/checkSession";
        const data = { sessionID: cookies.session };
        const response = await request.postReq(url, data);
        if (!response) {
          removeCookie("session");
          setIsCookieValid(false);
        } else {
          setIsCookieValid(true);
        }
      }
    };
    checkCookie();
  }, [cookies.session, removeCookie]);

  const routers = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index
          loader={async () => {
            return await postsLoader(cookies.session);
          }}
          element={<Home />}
        />
        <Route
          path="/reply/:post_id"
          loader={async ({ params }) => {
            return await replyLoader(params.post_id, cookies.session);
          }}
          exact
          element={<Reply />}
        />
        <Route
          path="/post"
          loader={async () => {
            if (!isCookieValid) {
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
            if (isCookieValid) {
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
            if (isCookieValid) {
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
