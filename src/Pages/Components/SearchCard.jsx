import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import useRequest from "../Customs/useRequest";
import useRelativeTime from "../Customs/useRelativeTime";

const SearchCard = ({ content }) => {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const myImage = cld.image(content.profile_img);
  const [getRequest] = useRequest();
  const [relativeTime] = useRelativeTime();

  const formatContent = (content) => {
    if (content.length > 250) {
      return content.substring(0, 205) + "...";
    }
    return content;
  };

  const findParent = async () => {
    const url =
      import.meta.env.VITE_API + "search/getParent/" + content.content_id;
    const response = await getRequest(url);
    if (response) {
      window.location.href = "/reply/" + response.content_id;
    }
    return response;
  };

  return (
    <div
      className="flex flex-col rounded-sm bg-white px-4 py-2 ring-1 ring-gray-400 hover:ring-gray-600 hover:bg-gray-100 cursor-pointer"
      onClick={findParent}
    >
      <header className="flex justify-between items-center text-gray-500 text-sm py-2">
        <div className="flex items-center gap-3">
          <AdvancedImage
            cldImg={myImage}
            className="w-12 h-12 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
          />
          <h1>
            {" "}
            Posted by <span className="font-bold">
              {" "}
              {content.username}{" "}
            </span>{" "}
          </h1>
        </div>
        <span className="text-xs">Date Created: {relativeTime}</span>
      </header>
      <p className="text-sm py-3">{formatContent(content.content)}</p>
      <footer className="flex items-center py-2 gap-3"></footer>
    </div>
  );
};

export default SearchCard;
