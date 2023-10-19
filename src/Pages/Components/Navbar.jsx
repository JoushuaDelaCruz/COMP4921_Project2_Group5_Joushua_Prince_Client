import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white block w-full">
      <div className="max-w-screen px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 w-full items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-12 w-auto"
                src="./images/logo2.png"
                alt="Your Company"
              />
            </div>
            <div className="flex space-x-4 justify-center content-center">
              <Link
                to="/"
                className="flex justify-center items-center align-middle content-center flex-wrap h-full pl-2"
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
              />
            </div>
            <Link
              to="/post"
              className="flex items-center p-3 ml-4 justify-center content-center bg-gray-100 text-gray-400 hover:ring-1 hover:ring-black"
            >
              <i className="fa-solid fa-plus fa-lg"></i>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto ml-1 sm:pr-0 h-full">
            <div className="relative ml-1 h-full py-1">
              <a
                href="#"
                className="flex flex-row gap-2 justify-center items-center border-2 border-slate-100 rounded-sm h-full px-2"
              >
                <img
                  className="h-10 w-10 rounded-md object-cover"
                  src="./images/profile.jpg"
                  alt=""
                />
                <span className="text-sm font-semibold text-slate-700">
                  Joushua Dela Cruz
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default NavBar;
