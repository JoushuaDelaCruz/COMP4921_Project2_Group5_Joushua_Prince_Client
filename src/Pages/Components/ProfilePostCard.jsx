import React from "react";
import { Link } from "react-router-dom";

const ProfilePostCard = ({ post }) => {
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };

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
      className="flex gap-2 ring-1 ring-gray-400 rounded-sm bg-white hover:ring-gray-600 hover:bg-gray-100"
    >
      <div className="w-8 flex justify-center font-medium text-sm pt-2 bg-blue-100">
        {post.num_votes}
      </div>
      <div className="flex flex-col border-b border-green-300 w-full">
        <header className="flex justify-between py-1 items-center mr-4">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <h3 className="text-gray-500 text-xs font-light">
            {" "}
            {formatDate(post.date_created)}{" "}
          </h3>
        </header>
        <div className="text-sm py-1 leading-snug h-12 pl-2">
          {shortenContent(post.content)}
        </div>
        <footer className="flex py-2">
          <div className="flex items-center gap-1 ml-1 mt-1 rounded-sm text-gray-400">
            <i className="fa-regular fa-comment fa-lg"></i>
            <span className="text-xs font-bold">
              {post.num_comments} Comments{" "}
            </span>
          </div>
          {post.is_favourited && (
            <div className="flex items-center gap-2 mt-1 rounded-sm text-gray-400">
              <i className={"fa-solid fa-star fa-lg"}></i>
              <span className="text-xs font-bold"> Favourite </span>
            </div>
          )}
        </footer>
      </div>
    </Link>
  );
};

export default ProfilePostCard;
