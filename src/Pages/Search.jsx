import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useUser from "./Customs/useUser";
import SearchCard from "./Components/SearchCard";

const Search = () => {
  const { text } = useParams();
  const textResults = useLoaderData();
  const [user, profileImg] = useUser(null);

  return (
    <>
      <Navbar user={user} image={profileImg} search={text} />
      <main className="flex justify-center background py-6">
        <section className="flex flex-col w-1/2 h-fit">
          {textResults &&
            textResults.map((content) => {
              return <SearchCard key={content.content_id} content={content} />;
            })}
        </section>
      </main>
    </>
  );
};

export default Search;
