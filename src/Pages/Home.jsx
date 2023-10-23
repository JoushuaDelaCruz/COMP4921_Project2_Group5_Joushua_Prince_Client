import React, { useEffect, useState } from "react";
import PostCard from "./Components/PostCard";
import Navbar from "./Components/Navbar";
import Request from "./models/ServerRequest";
import { useCookies } from "react-cookie";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Outlet, useLoaderData } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [posts] = useLoaderData();
  const [cookies, , removeCookie] = useCookies(["session"]);
  const [profileImg, setProfileImg] = useState("");
  const request = new Request();
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
  }, []);

  const redirectPost = () => {
    window.location.href = "/post";
  };
  return (
    <>
      <Navbar user={user} image={profileImg} />
      <main className="background flex flex-col items-center content-center pt-6 gap-4">
        {user && (
          <section className="w-1/2 bg-white h-16 flex align-middle content-center flex-wrap p-2 gap-2 rounded-md">
            <AdvancedImage
              cldImg={profileImg}
              className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
            />
            <input
              type="text"
              className="flex-1 bg-gray-50 ring-1 ring-gray-100 px-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 hover:ring-1 hover:ring-blue-500 focus:border-transparent"
              placeholder="Create a post"
              onClick={redirectPost}
            />
          </section>
        )}

        <section className="w-1/2 flex flex-col gap-2 items-center">
          {posts.map((post, index) => {
            return (
              <PostCard
                post={post}
                key={index}
                user={user}
                isReplyPage={false}
              />
            );
          })}
        </section>
      </main>
      <Outlet />
    </>
  );
};

const postsLoader = async () => {
  const request = new Request();
  const url = import.meta.env.VITE_API + "post";
  const response = await request.getReq(url);
  return response;
};

export { Home, postsLoader };
