import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Cloudinary } from "@cloudinary/url-gen";
import Request from "./Models/ServerRequest";

const Search = () => {
  const { text } = useParams();
  const textResults = useLoaderData();
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });

  useEffect(() => {
    const getUser = async () => {
      const url = import.meta.env.VITE_API + "user";
      const data = await request.postReq(url, cookies.session);

      if (data && data.profile_img) {
        setUser(data);
        const image = cld.image(data.profile_img);
        setProfileImg(image);
      } else {
        setUser(null);
        removeCookie("session");
      }
    };
    getUser();
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <>
      <Navbar user={user} image={profileImg} search={text} />
      <main className="background">
        {textResults.map((text) => (
          <a key={text.comment_id} href={`/reply/${text.comment_id}`}>
            <div>{text.content}</div>
          </a>
        ))}
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
