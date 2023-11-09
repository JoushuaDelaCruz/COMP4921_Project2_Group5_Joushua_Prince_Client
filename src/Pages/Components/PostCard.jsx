import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";
import useVoteSys from "../Models/useVoteSys";
import useEditContent from "../Models/useEditContent";
import TextareaAutosize from "react-textarea-autosize";
import useFavourite from "../Models/useFavourite";
import useRequest from "../Models/useRequest";
import { useCookies } from "react-cookie";
import useDateFormat from "../Models/useDateFormat";

const PostCard = ({
  post,
  user,
  isReplyPage,
  numReplies = null,
  deletePostHandler = null,
}) => {
  const [upListener, downListener, votes, isUpVoted, isDownVoted] =
    useVoteSys(post);
  const [toggleEdit, editContent, isEditing, text, changeHandler, hasChanged] =
    useEditContent(post);
  const [isFavourite, toggleFavourite] = useFavourite(post);
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const myImage = cld.image(post.profile_img);
  const [, postRequest] = useRequest();
  const [cookies] = useCookies(["session"]);
  const [relativeTime] = useDateFormat(post.date_created);

  const deletePost = async () => {
    const url = import.meta.env.VITE_API + "user/deleteContent";
    const data = {
      content_id: post.content_id,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    if (response) {
      if (isReplyPage) {
        window.location.href = "/";
      }
      deletePostHandler(post.content_id);
      return;
    } else {
      console.log("Error deleting post");
    }
  };
  return (
    <div className="flex w-full bg-white h-fit rounded-sm">
      <div className="w-12 flex flex-col items-center content-center bg-blue-100 gap-3 rounded-l">
        {user && (
          <button className="mt-3 text-green-400" onClick={upListener}>
            <i
              className={
                (isUpVoted ? "fa-solid" : "fa-regular") + " fa-circle-up fa-2xl"
              }
            ></i>
          </button>
        )}
        <span className={"font-semibold text-sm " + (user ? "" : "my-3")}>
          {votes}
        </span>
        {user && (
          <button className="text-green-400" onClick={downListener}>
            <i
              className={
                (isDownVoted ? "fa-solid" : "fa-regular") +
                " fa-circle-down fa-2xl"
              }
            ></i>
          </button>
        )}
      </div>
      <div className="w-full p-1">
        <header className="flex items-center justify-between p-2 text-xs text-gray-400">
          <Link
            to={"/profile/" + post.username}
            className="w-fit flex items-center gap-2"
          >
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
          <span className="font-bold text-xs mr-2">{relativeTime}</span>
        </header>
        <div className="p-2">
          <h2 className="text-xl font-semibold mb-3"> {post.title} </h2>
          <TextareaAutosize
            type="text"
            className={
              (isEditing ? "ring-gray-400" : "ring-white") +
              " p-1 flex-1 rounded-sm resize-none overflow-hidden text-sm ring-1 align-middle w-full bg-white"
            }
            placeholder={isEditing ? "Write a title" : undefined}
            value={text}
            onChange={changeHandler}
            disabled={!isEditing}
          />
        </div>
        {isEditing && user ? (
          <footer className="flex justify-center gap-2 border-t-2 border-blue-300">
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
          <footer className="flex border-t-2 border-blue-300">
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
            {user && (
              <button
                className={
                  "flex items-center gap-2 p-2 mt-1 rounded-sm " +
                  (isFavourite
                    ? " hover:text-gray-400 text-yellow-400"
                    : " text-gray-400 hover:text-yellow-400")
                }
                onClick={() => {
                  toggleFavourite(isFavourite);
                }}
              >
                <i
                  className={
                    (isFavourite ? "fa-solid" : "fa-regular") + " fa-star fa-lg"
                  }
                ></i>
                <span className="text-xs font-bold"> Favourite </span>
              </button>
            )}
            {post.is_owner == 1 && user && (
              <button
                className="flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-red-600"
                onClick={deletePost}
              >
                <i className="fa-regular fa-trash-can fa-lg"></i>
                <span className="text-xs font-bold"> Delete </span>
              </button>
            )}
            {post.is_owner == 1 && user && (
              <button
                className=" flex items-center gap-2 p-2 mt-1 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-cyan-600"
                onClick={toggleEdit}
              >
                <i className="fa-regular fa-pen-to-square fa-lg"></i>
                <span className="text-xs font-bold"> Edit </span>
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default PostCard;
