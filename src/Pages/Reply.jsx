import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Request from "./Models/ServerRequest";
import PostCard from "./Components/PostCard";
import InputComment from "./Components/InputComment";
import useUser from "./Models/useUser";

const Reply = () => {
  const [user, profileImg] = useUser();
  const { post_id } = useParams();
  const [post] = useLoaderData();
  const [replies, setReplies] = useState([]);

  return (
    <>
      <Navbar user={user} image={profileImg} />
      <main className="flex justify-center background">
        <div className="w-3/5 my-6 rounded-md p-2">
          <PostCard post={post} isReplyPage={true} user={user} />
          <section className="w-full rounded-sm my-2 px-12 py-5  bg-white">
            {user && (
              <>
                <InputComment
                  parent_id={post_id}
                  setReplies={setReplies}
                  username={user.username}
                />
                <hr className="h-px bg-cyan-400 border-0 dark:bg-cyan-700 my-10" />
              </>
            )}
            {replies.map((reply) => {
              return <div> reply.content </div>;
            })}
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
