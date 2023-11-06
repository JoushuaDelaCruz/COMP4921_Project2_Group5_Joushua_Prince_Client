import { useState } from "react";
import { useCookies } from "react-cookie";
import useRequest from "./useRequest";

const useVoteSys = (content) => {
  const UP_VOTE = 1;
  const DOWN_VOTE = -1;
  const [, postRequest] = useRequest();
  const [isUpVoted, setIsUpVoted] = useState(content.value === UP_VOTE);
  const [isDownVoted, setIsDownVoted] = useState(content.value === DOWN_VOTE);
  const [votes, setVotes] = useState(parseInt(content.num_votes));
  const [cookies] = useCookies(["session"]);

  const toggleRecordedVote = async () => {
    const url = import.meta.env.VITE_API + "votes/toggle";
    const data = {
      vote_id: content.vote_id,
      vote_orig: content.value,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    return response;
  };

  const recordUnVote = async () => {
    const url = import.meta.env.VITE_API + "votes/unVote";
    const data = {
      vote_id: content.vote_id,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    return response;
  };

  const recordNewVote = async (is_up_vote) => {
    const url = import.meta.env.VITE_API + "votes/record";
    const data = {
      content_id: content.content_id,
      is_up_vote: is_up_vote,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    if (response) {
      content.vote_id = response.vote_id;
      content.value = is_up_vote ? UP_VOTE : DOWN_VOTE;
      return true;
    }
    return false;
  };

  const voteRequest = async (is_up_vote) => {
    const userHasVoted = isUpVoted || isDownVoted;
    const userHasVotedRecord = content.vote_id && userHasVoted;
    if (userHasVotedRecord) {
      await toggleRecordedVote();
      return;
    }
    const userHasNoVoteRecord = !content.vote_id;
    if (userHasNoVoteRecord) {
      await recordNewVote(is_up_vote);
      return;
    }
  };

  const upVoteListener = async () => {
    if (isUpVoted) {
      setIsUpVoted(false);
      setVotes((votes) => votes - UP_VOTE);
      recordUnVote();
      return;
    }
    const vote_count = isDownVoted ? UP_VOTE * 2 : UP_VOTE;
    setVotes((votes) => votes + vote_count);
    setIsUpVoted(!isUpVoted);
    setIsDownVoted(false);
    await voteRequest(true);
    return;
  };

  const downVoteListener = async () => {
    if (isDownVoted) {
      setIsDownVoted(false);
      setVotes((votes) => votes - DOWN_VOTE);
      await recordUnVote();
      return;
    }
    const vote_count = isUpVoted ? DOWN_VOTE * 2 : DOWN_VOTE;
    setVotes((votes) => votes + vote_count);
    setIsDownVoted(!isDownVoted);
    setIsUpVoted(false);
    voteRequest(false);
    return;
  };

  return [upVoteListener, downVoteListener, votes, isUpVoted, isDownVoted];
};

export default useVoteSys;
