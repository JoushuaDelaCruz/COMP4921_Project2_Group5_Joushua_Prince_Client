import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useUser from "./Models/useUser";

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

export default Search;
