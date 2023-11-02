import React, { useState } from "react";
import InputComment from "./InputComment";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { useContext } from "react";
import { RepliesContext, UserContext } from "../Models/Contexts";
import useVoteSys from "../Models/useVoteSys";

const ReplyCard = ({ reply }) => {
  const [isReply, setIsReply] = useState(false);
  const [upListener, downListener, votes, isUpVoted, isDownVoted] =
    useVoteSys(reply);
  const setReplies = useContext(RepliesContext);
  const user = useContext(UserContext);
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const profileImg = cld.image(reply.profile_img);
  return (
    <div className="flex">
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
          <div className="text-base align-middle subpixel-antialiased">
            {reply.content}
          </div>
          <footer className="flex gap-2 items-center py-1">
            {user && (
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
                          : "fa-regular text-gray-400") + " fa-circle-up fa-xl"
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
                {reply.user_id === user?.id && (
                  <button className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-red-600">
                    <i class="fa-regular fa-trash-can fa-lg"></i>
                    <span className="text-xs font-bold"> Delete </span>
                  </button>
                )}
              </>
            )}
          </footer>
        </div>
        {isReply && (
          <div className="flex w-full">
            <section className="h-auto mr-3 flex justify-center p-4 w-8">
              {" "}
              <span className="bg-gray-300 h-auto pl-[2px]"> </span>{" "}
            </section>
            <section className="w-full pt-1 pb-4">
              <InputComment
                parent_id={reply.content_id}
                setIsReply={setIsReply}
                setReplies={setReplies}
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
