import React from "react";
import { Link } from "react-router-dom";
import useDateFormat from "../Customs/useDateFormat";

const ProfilePostCard = ({ post }) => {
  const [relativeTime] = useDateFormat(post.date_created);

  const shortenContent = (content) => {
    const maxLen = 200;
    if (content.length > maxLen) {
      return content.substring(0, maxLen) + "...";
    } else {
      return content;
    }
  };

  return (
    <Link
      to={"/reply/" + post.content_id}
      className="flex gap-2 ring-1 ring-gray-400 rounded-sm bg-white hover:ring-gray-600 hover:rounded-sm hover:bg-gray-100"
    >
      {post.value !== undefined ? (
        <div className="w-10 flex flex-col gap-3 font-medium items-center text-sm bg-blue-100">
          <button className="mt-3 text-green-400">
            <i
              className={
                (post.value === 1 ? "fa-solid" : "fa-regular") +
                " fa-circle-up fa-2xl"
              }
            ></i>
          </button>
          <span
            className={
              "font-semibold text-sm " +
              (post.value !== undefined ? "" : "my-3")
            }
          >
            {post.num_votes}
          </span>
          <button className="text-green-400">
            <i
              className={
                (post.value === -1 ? "fa-solid" : "fa-regular") +
                " fa-circle-down fa-2xl"
              }
            ></i>
          </button>
        </div>
      ) : (
        <div className="w-10 flex justify-center font-medium text-sm pt-2 bg-blue-100">
          {post.num_votes}
        </div>
      )}
      <div className="flex flex-col w-full">
        <header className="flex justify-between py-1 items-center mr-4">
          <h2 className="font-semibold text-lg py-2">{post.title}</h2>
          <h3 className="text-gray-500 text-xs font-light"> {relativeTime} </h3>
        </header>
        <div className="text-sm py-1 leading-snug h-12 pl-2">
          {shortenContent(post.content)}
        </div>
        <footer className="flex py-3 gap-2">
          <div className="flex items-center gap-1 ml-1 mt-1 rounded-sm text-gray-400">
            <i className="fa-regular fa-comment fa-lg"></i>
            <span className="text-xs font-bold">
              {post.num_comments} Comments{" "}
            </span>
          </div>
          {post.is_favourited != undefined && (
            <div
              className={
                "flex items-center gap-2 mt-1 rounded-sm " +
                (post.is_favourited === 1 ? "text-yellow-400" : "text-gray-400")
              }
            >
              <i
                className={
                  (post.is_favourited === 1 ? "fa-solid" : "fa-regular") +
                  " fa-star fa-lg"
                }
              ></i>
              <span className="text-xs font-bold"> Favourite </span>
            </div>
          )}
        </footer>
      </div>
    </Link>
  );
};

export default ProfilePostCard;
