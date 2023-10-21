import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { useCookies } from "react-cookie";
import { Cloudinary } from "@cloudinary/url-gen";
import Request from "./models/ServerRequest";
import TextareaAutosize from "react-textarea-autosize";

const Post = () => {
  const request = new Request();
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const [profileImg, setProfileImg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleCounter, setTitleCounter] = useState(0);
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
        window.location.href = "/";
        return;
      }
      setUser(data);
      const image = cld.image(data.profile_img);
      setProfileImg(image);
    };
    getUser();
  }, []);

  const userWritesTitle = async (e) => {
    setTitle(e.target.value);
    setTitleCounter(e.target.value.length);
  };

  const submitPost = async () => {
    const url = import.meta.env.VITE_API + "post/create";
    const data = {
      title: title,
      content: content,
      sessionID: cookies.session,
    };
    const response = await request.postReq(url, data);
    console.log(response);
    if (response) {
      window.location.href = "/";
    } else {
      alert("Something went wrong. Please try again");
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar user={user} image={profileImg} />
      <main className="background pt-16 flex justify-center gap-3 min-h-screen">
        <section className="w-1/2">
          <h1 className="text-xl text-white font-medium px-4">Create a post</h1>
          <hr className="h-px bg-cyan-200 border-0 dark:bg-cyan-700 my-8" />
          <div className="bg-white flex flex-col p-5 gap-3">
            <div
              className="flex flex-row ring-gray-200 ring-1 rounded-sm min-h-9 focus:outline-none focus:ring-black focus:border-transparent"
              id="title-container"
            >
              <TextareaAutosize
                type="text"
                className="h-8 px-2 py-2 flex-1 rounded-sm resize-none overflow-hidden text-sm align-middle"
                id="title"
                placeholder="Write a title"
                maxLength="300"
                onChange={userWritesTitle}
              />
              <div
                className=" px-3 flex justify-center content-center flex-wrap text-xs font-medium text-blue-800"
                id="title-counter"
              >
                {titleCounter}/300
              </div>
            </div>
            <TextareaAutosize
              className={
                "ring-gray-200 ring-1 rounded-sm py-1 px-2 resize-none overflow-hidden focus:ring-black"
              }
              minRows="12"
              id="content"
              placeholder="What's on your mind?"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <hr className="h-px bg-gray-100 border-0 mt-8 mb-4" />
            <div className="flex justify-end">
              <button
                type="submit"
                className={
                  "bg-green-500 text-white font-medium py-1 px-5 rounded opacity-50" +
                  (title ? " opacity-100" : " opacity-50")
                }
                onClick={submitPost}
                id="post-btn"
                disabled={!title}
              >
                {" "}
                Post{" "}
              </button>
            </div>
          </div>
        </section>
        <section className="w-1/4"></section>
      </main>
    </>
  );
};

export default Post;
