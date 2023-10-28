import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useUser from "./Models/useUser";
import Request from "./Models/ServerRequest";

const Search = () => {
  const { text } = useParams();
  const textResults = useLoaderData();
  const [user, profileImg] = useUser();
  return (
    <>
      <Navbar user={user} image={profileImg} search={text} />
      <main className="background">
        {textResults.map((text) => {
          return <div> {text.text} </div>;
        })}
      </main>
    </>
  );
};

const SearchLoader = async (text) => {
  const request = new Request();
  const url = import.meta.env.VITE_API + "search/" + text;
  const response = await request.getReq(url);
  return response;
};

export { Search, SearchLoader };
