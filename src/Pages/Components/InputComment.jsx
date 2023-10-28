import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Request from "../Models/ServerRequest";
import { useCookies } from "react-cookie";
import { redirect } from "react-router-dom";

const InputComment = ({ parent_id, setReplies, setIsReply, user }) => {
  const [cookies, , removeCookie] = useCookies(["session"]);
  const request = new Request();
  const [comment, setComment] = useState("");
  const uploadComment = async () => {
    const url = import.meta.env.VITE_API + "reply/create";
    const data = {
      content: comment,
      parent_id: parent_id,
      sessionID: cookies.session,
    };
    const response = await request.postReq(url, data);
    if (response) {
      setComment("");
      setReplies((prev) => [response, ...prev]);
      if (setIsReply) {
        setIsReply(false);
      }
    } else {
      alert("Session expired. Please log in again");
      removeCookie("session");
      redirect("/");
    }
  };

  const cancelReply = () => {
    setIsReply(false);
  };
  return (
    <div className="flex flex-col justify-center">
      <span className="py-1 text-sm"> Comment as {user.username} </span>
      <div className="flex flex-col w-full ring-1 ring-blue-200">
        <TextareaAutosize
          className="w-full text-base p-3 focus:outline-none focus:ring-none"
          minRows={6}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Write your thoughts..."
        />
        <div className="flex justify-end bg-blue-100 py-3 px-2 gap-2">
          {setIsReply && (
            <button
              className="text-sm font-semibold hover:bg-gray-700 hover:text-white px-4 rounded-xl"
              onClick={cancelReply}
            >
              Cancel
            </button>
          )}
          <button
            disabled={!comment}
            className={
              "text-sm px-6 py-2 rounded-full text-white font-bold " +
              (comment
                ? "bg-green-500 opacity-100 hover:bg-green-600"
                : "bg-green-950 opacity-50")
            }
            onClick={uploadComment}
          >
            {" "}
            Comment{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputComment;
