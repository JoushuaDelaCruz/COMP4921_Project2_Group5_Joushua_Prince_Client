import React, { useState } from "react";
import InputComment from "./InputComment";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { RepliesContext, UserContext } from "../Models/Contexts";
import useVoteSys from "../Models/useVoteSys";
import useEditContent from "../Models/useEditContent";
import TextareaAutosize from "react-textarea-autosize";
import Request from "../Models/ServerRequest";
import { useCookies } from "react-cookie";

const ReplyCard = ({ reply, is_post_owner, post_id }) => {
  const request = new Request();
  const setRepliesHandler = useContext(RepliesContext);
  const [isReply, setIsReply] = useState(false);
  const [upListener, downListener, votes, isUpVoted, isDownVoted] =
    useVoteSys(reply);
  const [toggleEdit, editContent, isEditing, text, changeHandler, hasChanged] =
    useEditContent(reply);
  const user = useContext(UserContext);
  const [cookies] = useCookies(["session"]);
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const profileImg = cld.image(reply.profile_img);

  const removeReply = async () => {
    const url = import.meta.env.VITE_API + "post/removeReply";
    const data = {
      post_id: post_id,
      reply_id: reply.content_id,
      sessionID: cookies.session,
    };
    const response = await request.postReq(url, data);
    if (response) {
      changeHandler({ type: "removed" });
      return;
    } else {
      console.log("Error removing reply");
    }
  };

  return (
    <div className="flex border-b-2 border-l-2 border-gray-100 p-1 m-1 rounded">
      <AdvancedImage
        cldImg={profileImg}
        className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
      />
      <section className="flex w-full flex-col ml-2">
        <div className="flex flex-col w-full gap-1">
          <header className="flex items-center h-12 justify-between">
            <span className="font-medium text-sm">{reply.username}</span>
            <span className="font-semibold text-xs text-gray-500">
              {reply.date_created}
            </span>
          </header>
          <div className="text-base align-middle subpixel-antialiased py-1">
            <TextareaAutosize
              type="text"
              className={
                (isEditing ? "ring-gray-400" : "ring-white") +
                " p-1 flex-1 rounded-sm resize-none overflow-hidden text-sm ring-1 align-middle w-full bg-white"
              }
              placeholder={isEditing ? "Write a title" : undefined}
              minRows={isEditing ? 3 : undefined}
              value={text}
              onChange={changeHandler}
              disabled={!isEditing}
            />
          </div>
          {isEditing && user ? (
            <footer className="flex justify-center gap-2">
              <button
                className={
                  "flex items-center gap-2 p-2 mt-1 rounded-md text-white bg-cyan-400 hover:bg-cyan-800 " +
                  (hasChanged ? "opacity-100" : "opacity-50")
                }
                onClick={editContent}
                disabled={!hasChanged}
              >
                <i className="fa-solid fa-pen-to-square fa-lg"></i>
                <span className="text-xs font-bold"> Submit Edit </span>
              </button>
              <button
                className="flex items-center gap-2 p-2 mt-1 rounded-md text-red-600 hover:bg-gray-100"
                onClick={toggleEdit}
              >
                <i className="fa-solid fa-x fa-sm"></i>
                <span className="text-xs font-bold"> Cancel Edit </span>
              </button>
            </footer>
          ) : (
            <footer className="flex gap-2 items-center py-1 border-t-2 border-blue-300">
              {user && reply.is_removed === 0 && (
                <>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1 hover:bg-slate-100 rounded-sm"
                      onClick={upListener}
                    >
                      <i
                        className={
                          (isUpVoted
                            ? "fa-solid text-green-400"
                            : "fa-regular text-gray-400") +
                          " fa-circle-up fa-xl"
                        }
                      ></i>
                    </button>
                    <span className="text-sm">{votes}</span>
                    <button
                      className="p-1 hover:bg-slate-100 rounded-sm"
                      onClick={downListener}
                    >
                      <i
                        className={
                          (isDownVoted
                            ? "fa-solid text-green-400"
                            : "fa-regular text-gray-400") +
                          " fa-circle-down fa-xl"
                        }
                      ></i>
                    </button>
                  </div>
                  <button
                    className="flex items-center gap-1 p-2 rounded-sm text-gray-400 hover:bg-gray-100"
                    onClick={() => setIsReply(!isReply)}
                  >
                    <i className="fa-regular fa-comment fa-lg"></i>
                    <span className="text-xs font-bold"> Reply </span>
                  </button>
                  <button className="flex items-center gap-2 p-2 rounded-sm text-gray-400 hover:bg-gray-100">
                    <i className="fa-regular fa-bookmark fa-lg"></i>
                    <span className="text-xs font-bold"> Bookmark </span>
                  </button>
                  {reply.is_owner == 1 && (
                    <button className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-red-600">
                      <i className="fa-regular fa-trash-can fa-lg"></i>
                      <span className="text-xs font-bold"> Delete </span>
                    </button>
                  )}
                  {reply.is_owner == 1 && (
                    <button
                      className=" flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-cyan-600"
                      onClick={toggleEdit}
                    >
                      <i className="fa-regular fa-pen-to-square fa-lg"></i>
                      <span className="text-xs font-bold"> Edit </span>
                    </button>
                  )}
                  {is_post_owner && (
                    <button
                      className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-red-600"
                      onClick={removeReply}
                    >
                      <i className="fa-solid fa-text-slash fa-lg"></i>
                      <span className="text-xs font-bold"> Remove Reply </span>
                    </button>
                  )}
                </>
              )}
            </footer>
          )}
        </div>
        {isReply && (
          <div className="flex w-full">
            <section className="w-full pt-1 pb-4">
              <InputComment
                parent_id={reply.content_id}
                setIsReply={setIsReply}
                setReplies={setRepliesHandler}
                user={user}
              />
            </section>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReplyCard;
