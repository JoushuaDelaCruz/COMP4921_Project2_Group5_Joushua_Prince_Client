import { useState } from "react";
import { useCookies } from "react-cookie";
import Request from "./ServerRequest";

const useVoteSys = (post) => {
  const UP_VOTE = 1;
  const DOWN_VOTE = -1;
  const [isUpVoted, setIsUpVoted] = useState(post.vote_value === UP_VOTE);
  const [isDownVoted, setIsDownVoted] = useState(post.vote_value === DOWN_VOTE);
  const [votes, setVotes] = useState(parseInt(post.num_votes));
  const [cookies] = useCookies(["session"]);

  const voteRequest = async () => {
    const request = new Request();
    const userHasVoted = isUpVoted || isDownVoted;
    const userHasVotedRecord = post.vote_id && userHasVoted;
    if (userHasVotedRecord) {
      const url = import.meta.env.VITE_API + "votes/toggle";
      const toggleValue = post.vote_value === UP_VOTE ? DOWN_VOTE : UP_VOTE;
      const data = {
        vote_id: post.vote_id,
        vote_value: toggleValue,
        sessionID: cookies.session,
      };
      const response = await request.postReq(url, data);
      return response;
    }
  };

  const upVoteListener = async () => {
    const vote_count = isDownVoted ? UP_VOTE * 2 : UP_VOTE;
    setVotes((votes) => votes + vote_count);
    setIsUpVoted(!isUpVoted);
    setIsDownVoted(false);
  };

  const downVoteListener = async () => {
    const vote_count = isUpVoted ? DOWN_VOTE * 2 : DOWN_VOTE;
    setVotes((votes) => votes + vote_count);
    setIsDownVoted(!isDownVoted);
    setIsUpVoted(false);
  };

  return [upVoteListener, downVoteListener, votes, isUpVoted, isDownVoted];
};

export default useVoteSys;
