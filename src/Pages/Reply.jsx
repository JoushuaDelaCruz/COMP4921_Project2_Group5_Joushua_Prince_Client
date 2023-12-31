import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PostCard from "./Components/PostCard";
import InputComment from "./Components/InputComment";
import useUser from "./Customs/useUser";
import RepliesTreeView from "./Components/RepliesTreeView";
import {
  UserContext,
  RepliesContext,
  EditContentHandlerContext,
} from "./Customs/Contexts";
import { useCookies } from "react-cookie";
import useRequest from "./Customs/useRequest";

const Reply = () => {
  const { post_id } = useParams();
  const [user, profileImg] = useUser();
  // Although posts is only one, I don't know why but when editing it does not update automatically.
  // This is because mutability. So I have to use a list of posts...
  const [posts, setPosts] = useState(useLoaderData());
  const [numReplies, setNumReplies] = useState(0);
  const [replies, setReplies] = useState([]);
  const [cookies] = useCookies(["session"]);
  const [getRequest] = useRequest();

  const editRepliesHandler = (content_id, newContent, type) => {
    const newReplies = replies.map((reply) => {
      if (reply.content_id === content_id) {
        reply.content = newContent;
        // type 1 = edit, type 2 = remove, type 3 = delete
        if (type === 2) {
          reply.is_removed = 1;
        }
      }
      return reply;
    });
    setReplies(newReplies);
  };

  const postEditHandler = (content_id, newContent, type) => {
    const newPosts = posts.map((post) => {
      if (post.content_id === content_id) {
        post.content = newContent;
        // type 1 = edit, type 2 = remove, type 3 = delete
        if (type === 2) {
          post.is_removed = 1;
        }
      }
      return post;
    });
    setPosts(newPosts);
    return;
  };

  useEffect(() => {
    const getReplies = async () => {
      if (cookies.session) {
        const url =
          import.meta.env.VITE_API + "reply/" + post_id + "/" + cookies.session;
        const data = await getRequest(url);
        setReplies(data);
        return;
      }
      const url = import.meta.env.VITE_API + "reply/" + post_id;
      const data = await getRequest(url);
      setReplies(data);
    };
    getReplies();
  }, []);

  useEffect(() => {
    if (replies) {
      setNumReplies(replies.length);
    }
  }, [replies]);

  return (
    <>
      <Navbar user={user} image={profileImg} />
      <main className="flex justify-center background">
        <div className="w-3/5 my-6 rounded-md p-2">
          <EditContentHandlerContext.Provider value={postEditHandler}>
            {posts &&
              posts.map((post) => {
                return (
                  <PostCard
                    key={post.content_id}
                    post={post}
                    isReplyPage={true}
                    user={user}
                    numReplies={numReplies}
                  />
                );
              })}
          </EditContentHandlerContext.Provider>
          <section
            className={
              "w-full rounded-sm my-2 px-12 pt-5 pb-1 " +
              (!user && replies === undefined ? "bg-transparent" : "bg-white")
            }
          >
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
            {replies && (
              <EditContentHandlerContext.Provider value={editRepliesHandler}>
                <RepliesContext.Provider value={setReplies}>
                  <UserContext.Provider value={user}>
                    <RepliesTreeView
                      is_post_owner={posts[0].is_owner === 1 ? true : false}
                      replies={replies}
                      parent_id={post_id}
                      level={0}
                      post_id={post_id}
                    />
                  </UserContext.Provider>
                </RepliesContext.Provider>
              </EditContentHandlerContext.Provider>
            )}
          </section>
        </div>{" "}
      </main>
    </>
  );
};

export default Reply;
