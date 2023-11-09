import React from "react";
import { Link } from "react-router-dom";
import useDateFormat from "../Models/useDateFormat";

const ProfileBookmarkCard = ({ bookmark }) => {
  const [relativeTime] = useDateFormat(bookmark.date_created);

  return (
    <Link
      to={"/reply/" + bookmark.content_id}
      className="flex flex-col px-2 py-2 ring-1 ring-gray-300 rounded-sm bg-white hover:ring-gray-400 hover:rounded-sm hover:bg-gray-100"
    >
      <h2 className="text-sm font-semibold">{bookmark.title}</h2>
      <h3 className="text-end text-xs font-medium text-gray-400">
        {relativeTime}
      </h3>
    </Link>
  );
};

export default ProfileBookmarkCard;
