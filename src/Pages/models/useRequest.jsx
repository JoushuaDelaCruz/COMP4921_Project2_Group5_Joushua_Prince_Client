import { useCookies } from "react-cookie";
import axios from "axios";

const useRequest = () => {
  const [, setCookie, removeCookie] = useCookies(["session"]);

  const getConfig = (data) => {
    if (!data) {
      return {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    return {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
  };

  const getRequest = async (url, data = null) => {
    try {
      const response = await axios.get(url, getConfig(data));
      if (response.status === 200) {
        return response.data;
      }
      if (response.status === 401) {
        removeCookie("session");
        alert("Invalid session");
        return;
      }
    } catch (e) {
      if (e.response.status === 401) {
        removeCookie("session");
      }
      if (e.response.status === 500) {
        alert("Internal server error. Please try again!");
        window.location.reload();
      }
    }
  };

  const postRequest = async (url, data = null) => {
    try {
      const response = await axios.post(url, getConfig(data));
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      if (e.response.status === 401) {
        removeCookie("session");
      }
    }
  };

  const logInRequest = async (credentials) => {
    const url = import.meta.env.VITE_API + "user/login";
    const sessionID = await postRequest(url, credentials);
    if (sessionID) {
      const expireTime = 60 * 60 * 1000;
      setCookie("session", sessionID, {
        path: "/",
        maxAge: expireTime,
        sameSite: "strict",
      });
    }
  };

  return [getRequest, postRequest, logInRequest];
};

export default useRequest;
