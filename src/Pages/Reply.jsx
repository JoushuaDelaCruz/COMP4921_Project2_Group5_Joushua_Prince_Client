import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Request from "./Models/ServerRequest";
import PostCard from "./Components/PostCard";
import InputComment from "./Components/InputComment";
import { Cloudinary } from "@cloudinary/url-gen";
import { useCookies } from "react-cookie";
import RepliesTreeView from "./Components/RepliesTreeView";
import { UserContext, RepliesContext } from "./Models/Contexts";

const Reply = () => {
  const request = new Request();
  const { post_id } = useParams();
  const [cookies, , removeCookie] = useCookies(["session"]);
  const [post] = useLoaderData();
  const [replies, setReplies] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState(null);
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  useEffect(() => {
    const getReplies = async () => {
      const url = import.meta.env.VITE_API + "reply/" + post_id;
      const data = await request.getReq(url);
      console.log("Replies", data);
      setReplies(data);
    };
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
    getReplies();
  }, []);

  return (
    <>
      <Navbar user={user} image={profileImg} />
      <main className="flex justify-center background">
        <div className="w-3/5 my-6 rounded-md p-2">
          <PostCard post={post} isReplyPage={true} user={user} />
          <section className="w-full rounded-sm my-2 px-12 pt-5 pb-1  bg-white">
            {user && (
              <>
                <InputComment
                  parent_id={post_id}
                  setReplies={setReplies}
                  user={user}
                />
                <hr className="h-px bg-cyan-400 border-0 dark:bg-cyan-700 my-10" />
              </>
            )}
            <RepliesContext.Provider value={setReplies}>
              <UserContext.Provider value={user}>
                <RepliesTreeView
                  replies={replies}
                  parent_id={post_id}
                  level={0}
                />
              </UserContext.Provider>
            </RepliesContext.Provider>
          </section>
        </div>{" "}
      </main>
    </>
  );
};

const replyLoader = async (post_id) => {
  const request = new Request();
  const url = import.meta.env.VITE_API + "post/" + post_id;
  const response = await request.getReq(url);
  return response;
};

export { Reply, replyLoader };
