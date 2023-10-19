import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const PostCard = ({ post }) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dkvsygg1l" } });
  const myImage = cld.image(post.profile_img);
  return (
    <div className="flex w-full bg-white h-fit rounded">
      <div className="w-12 flex flex-col items-center content-center bg-blue-100 gap-3 rounded-l">
        <button className="mt-3 text-green-400">
          <i className="fa-regular fa-circle-up fa-2xl"></i>
        </button>
        <span className="font-semibold text-sm"> {post.num_votes} </span>
        <button className="text-green-400">
          <i className="fa-regular fa-circle-down fa-2xl"></i>
        </button>
      </div>
      <div className="w-full p-1">
        <a href="/user?=<%= post.user_id %>" className="">
          <header className="flex w-full gap-2 items-center p-2">
            <AdvancedImage
              cldImg={myImage}
              className="w-8 h-8 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
            />
            <span className="text-xs text-gray-400">
              {" "}
              Posted By <span className="font-semibold">
                {" "}
                {post.username}{" "}
              </span>{" "}
            </span>
          </header>
        </a>
        <div className="p-2">
          <h2 className="text-xl font-semibold mb-3"> {post.title} </h2>
          <p className="text-sm"> {post.content} </p>
        </div>
        <footer className="flex">
          <a
            href="/replies?=<%= post.content_id %>"
            className="flex items-center gap-1 p-2 ml-1 mt-1 rounded-sm text-gray-400 hover:bg-gray-100"
          >
            <i className="fa-regular fa-comment fa-lg"></i>
            <span className="text-xs font-bold"> 0 Comments </span>
          </a>
          <button className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100">
            <i className="fa-regular fa-bookmark fa-lg"></i>
            <span className="text-xs font-bold"> Bookmark </span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PostCard;
