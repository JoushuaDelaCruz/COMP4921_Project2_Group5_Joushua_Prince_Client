import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";

const PostCard = ({ post, user, isReplyPage, numReplies = null }) => {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const myImage = cld.image(post.profile_img);
  return (
    <div className="flex w-full bg-white h-fit rounded-sm">
      <div className="w-12 flex flex-col items-center content-center bg-blue-100 gap-3 rounded-l">
        {user && (
          <button className="mt-3 text-green-400">
            <i className="fa-regular fa-circle-up fa-2xl"></i>
          </button>
        )}
        <span className={"font-semibold text-sm " + (user ? "" : "my-3")}>
          {" "}
          {post.num_votes || 0}{" "}
        </span>
        {user && (
          <button className="text-green-400">
            <i className="fa-regular fa-circle-down fa-2xl"></i>
          </button>
        )}
      </div>
      <div className="w-full p-1">
        <header className="flex items-center justify-between p-2 text-xs text-gray-400">
          <Link to="#" className="w-fit flex items-center gap-2">
            <AdvancedImage
              cldImg={myImage}
              className="w-8 h-8 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
            />
            <span>
              {" "}
              Posted By <span className="font-semibold">
                {" "}
                {post.username}{" "}
              </span>{" "}
            </span>
          </Link>
          <span className="flex items-center text-sm gap-2">
            {" "}
            Date Created:{" "}
            <span className="font-bold text-xs">
              {" "}
              {post.date_created}{" "}
            </span>{" "}
          </span>
        </header>
        <div className="p-2">
          <h2 className="text-xl font-semibold mb-3"> {post.title} </h2>
          <p className="text-sm"> {post.content} </p>
        </div>
        <footer className="flex">
          {isReplyPage ? (
            <div className="flex items-center gap-1 p-2 ml-1 mt-1 rounded-sm text-gray-400">
              <i className="fa-regular fa-comment fa-lg"></i>
              <span className="text-xs font-bold">
                {" "}
                {numReplies ? numReplies : post.num_comments} Comments{" "}
              </span>
            </div>
          ) : (
            <Link
              to={"/reply/" + post.content_id}
              className="flex items-center gap-1 p-2 ml-1 mt-1 rounded-sm text-gray-400 hover:bg-gray-100"
            >
              <i className="fa-regular fa-comment fa-lg"></i>
              <span className="text-xs font-bold">
                {" "}
                {post.num_comments} Comments{" "}
              </span>
            </Link>
          )}
          <button className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100">
            <i className="fa-regular fa-bookmark fa-lg"></i>
            <span className="text-xs font-bold"> Bookmark </span>
          </button>
          {post.user_id === user?.id && (
            <button className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-red-600">
              <i class="fa-regular fa-trash-can fa-lg"></i>
              <span className="text-xs font-bold"> Delete </span>
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default PostCard;
