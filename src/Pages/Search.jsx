import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import useUser from "./Models/useUser";

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

  // Handle button click to navigate to the "reply" route
  const handleButtonClick = (parent_id) => {
    window.location.href = `/reply/${parent_id}`;
  };

  return (
    <>
      <Navbar user={user} image={profileImg} search={text} />
      <main className="background">
        {textResults.map((text) => (
          <div key={text.parent_id}>
            <div>{text.content}</div>
            <button onClick={() => handleButtonClick(text.parent_id)}>
              Go to main thread
            </button>
          </div>
        ))}
      </main>
    </>
  );
};

export default Search;
