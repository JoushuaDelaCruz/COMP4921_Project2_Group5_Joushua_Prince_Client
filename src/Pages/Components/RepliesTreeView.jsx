import React from "react";
import ReplyCard from "./ReplyCard";

const RepliesTreeView = ({
  replies,
  parent_id,
  is_post_owner,
  level,
  post_id,
}) => {
  return (
    <div
      className={"flex flex-col justify-center " + level === 0 ? "gap-3" : ""}
    >
      {replies
        .filter((reply) => reply.parent_id == parent_id)
        .map((reply) => (
          <div
            key={reply.content_id}
            className="flex flex-col gap-1"
            style={{ marginLeft: level * 1 + "em" }}
          >
            <ReplyCard
              reply={reply}
              is_post_owner={is_post_owner}
              post_id={post_id}
            />
            <RepliesTreeView
              is_post_owner={is_post_owner}
              replies={replies}
              parent_id={reply.content_id}
              level={level + 1}
              post_id={post_id}
            />
          </div>
        ))}
    </div>
  );
};

export default RepliesTreeView;
