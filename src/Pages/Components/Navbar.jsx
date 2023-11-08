import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { useCookies } from "react-cookie";
import useRequest from "../Models/useRequest";

const Navbar = ({ user, image, search = "" }) => {
  const [text, setText] = useState(search);
  const [cookies, , removeCookie] = useCookies(["session"]);
  const [, postRequest] = useRequest();
  const searchText = (e) => {
    if (e.key === "Enter") {
      window.location.href = "/search/" + text;
    }
  };

  const logout = async () => {
    const url = import.meta.env.VITE_API + "user/logout";
    const successful = await postRequest(url, cookies.session);
    if (successful) {
      window.location.reload();
    }
  };

  const RightSidebar = () => {
    if (user) {
      return (
        <>
          <Link
            to={"/profile/" + user.username}
            className="flex flex-row gap-2 justify-center items-center border-2 border-slate-100 rounded-sm h-full px-1 hover:bg-slate-100"
          >
            <AdvancedImage
              cldImg={image}
              className="h-11 w-12 rounded-md object-cover"
            />
            <span className="text-sm font-medium text-slate-700 w-fit text-center">
              {user.username}
            </span>
          </Link>
          <button
            type="button"
            className="flex flex-row text-sm gap-2 font-semibold justify-center items-center h-fit px-2 py-3 ml-2 rounded-md hover:bg-gray-100"
            onClick={logout}
          >
            {" "}
            Logout{" "}
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link
            to="/signUp"
            className="flex flex-row gap-2 justify-center items-center h-fit px-4 py-3 rounded-full hover:bg-gray-100"
          >
            <span className="text-sm text-slate-700 font-medium">Sign Up</span>
          </Link>
          <Link
            to="/login"
            className="flex flex-row gap-2 justify-center items-center h-fit px-4 py-3 ring-1 ml-2 ring-cyan-600 rounded-full hover:bg-gray-100"
          >
            <span className="text-sm font-semibold text-slate-700">Login</span>
          </Link>
        </>
      );
    }
  };
  return (
    <nav className="bg-white block w-full">
      <div className="max-w-screen px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 w-full items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-12 w-auto"
                src="/images/logo2.png"
                alt="Your Company"
              />
            </div>
            <div className="flex space-x-4 justify-center content-center">
              <Link
                to="/"
                className="flex justify-center items-center align-middle content-center flex-wrap h-full rounded-md pl-2 hover:bg-slate-100"
              >
                <i className="fa-solid fa-house fs-2xl"></i>
                <span
                  className="text-black rounded-md pr-3 pl-2 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </span>
              </Link>
            </div>
            <div className="flex-1 pl-4 flex items-center bg-gray-50 rounded-3xl">
              <span className="text-gray-500">
                <i className="fa-solid fa-magnifying-glass pr-2"></i>
              </span>
              <input
                type="text"
                className="w-full p-3 bg-gray-50 rounded-r-3xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                placeholder="Search ChatBook"
                onKeyDown={searchText}
                onChange={(e) => setText(e.target.value)}
                defaultValue={search}
              />
            </div>
            {user && (
              <Link
                to="/post"
                className="flex items-center p-3 ml-4 justify-center content-center bg-gray-100 text-gray-400 hover:ring-1 hover:ring-black"
              >
                <i className="fa-solid fa-plus fa-lg"></i>
              </Link>
            )}
          </div>
          <div className="flex items-center sm:inset-auto ml-1 sm:pr-0 h-full">
            <div className="flex ml-1 h-full py-1 gap-31 items-center">
              {RightSidebar()}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
