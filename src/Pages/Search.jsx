import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useUser from "./Models/useUser";
import SearchCard from "./Components/SearchCard";

const Search = () => {
  const { text } = useParams();
  const textResults = useLoaderData();
  const [user, profileImg] = useUser(null);
//   const [parentID, setParentID] = useState(null);

//  const fetchParentId = async (content_id) => {
//     try {
//       const response = await fetch(`/api/search/${content_id}`);
//       if (response.ok) {
//         const data = await response.json();
//         setParentID(data.parent_id);
//       } else {
//         console.error("API request failed");
//       }
//     } catch (error) {
//       console.error("Error fetching parent ID:", error);
//     }
//   };


  return (
    <>
      <Navbar user={user} image={profileImg} search={text} />
      <main className="flex justify-center background py-6">
        <section className="flex flex-col w-1/2 h-fit">
          {textResults &&
            textResults.map((content) => {
              return (
                <a href={`/reply/${content.parent_id}`} key={content.parent_id}>
                  <SearchCard content={content} />
                </a>
              );
            })}
        </section>
      </main>
    </>
  );
};

export default Search;

