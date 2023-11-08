import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import { useCookies } from "react-cookie";
import Reply from "./Pages/Reply";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import useRequest from "./Pages/Models/useRequest";

const App = () => {
  const [cookies, , removeCookie] = useCookies(["session"]);
  const [isCookieValid, setIsCookieValid] = useState(false);
  const [getRequest, postRequest] = useRequest();

  useEffect(() => {
    const checkCookie = async () => {
      if (cookies.session) {
        const url = import.meta.env.VITE_API + "user/checkSession";
        const data = { sessionID: cookies.session };
        const response = await postRequest(url, data);
        setIsCookieValid(response);
        return;
      }
      setIsCookieValid(false);
    };
    checkCookie();
  }, [cookies.session, removeCookie]);

  const replyLoader = async (post_id) => {
    const sessionID = cookies.session;
    if (sessionID && isCookieValid) {
      const url =
        import.meta.env.VITE_API + "post/getPost/" + post_id + "/" + sessionID;
      const response = await getRequest(url);
      return response;
    }
    const url = import.meta.env.VITE_API + "post/getPost/" + post_id;
    const response = await getRequest(url);
    return response;
  };

  const postsLoader = async () => {
    const sessionID = cookies.session;
    if (sessionID && isCookieValid) {
      const url = import.meta.env.VITE_API + "post/" + sessionID;
      const response = await getRequest(url);
      return response;
    }
    const url = import.meta.env.VITE_API + "post";
    const response = await getRequest(url);
    return response;
  };

  const SearchLoader = async (text) => {
    const url = import.meta.env.VITE_API + "search/" + text;
    const response = await getRequest(url);
    return response;
  };

  const ProfileLoader = async (username) => {
    if (cookies.session && isCookieValid) {
      const url =
        import.meta.env.VITE_API +
        "profile/isUserProfile/" +
        username +
        "/" +
        cookies.session;
      const response = await getRequest(url);
      return response;
    }
    return false;
  };

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
        <Route
          path="/profile/:username"
          loader={async ({ params }) => {
            return await ProfileLoader(params.username);
          }}
          exact
          element={<Profile />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routers} />;
};

export default App;
