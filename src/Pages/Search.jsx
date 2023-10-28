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
      if (!data) {
        setUser(null);
        removeCookie("session");
        return;
      }
      setUser(data);
      const image = cld.image(data.profile_img);
      setProfileImg(image);
    };
    getUser();
  });
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
