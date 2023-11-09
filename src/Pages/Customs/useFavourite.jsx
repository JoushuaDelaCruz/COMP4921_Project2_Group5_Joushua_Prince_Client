import { useState } from "react";
import useRequest from "./useRequest";
import { useCookies } from "react-cookie";

const useFavourite = (content) => {
  const [isFavourite, setIsFavourite] = useState(content.is_favourited === 1);
  const [, postRequest] = useRequest();
  const [cookies] = useCookies(["session"]);

  const deleteFavourite = async () => {
    const url = import.meta.env.VITE_API + "favourite/deleteFavourite";
    const data = {
      content_id: content.content_id,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    if (!response) {
      alert("Error removing favourite. Please try again!");
      setIsFavourite(true);
      return;
    }
    setIsFavourite(false);
  };

  const addFavourite = async () => {
    const url = import.meta.env.VITE_API + "favourite/addFavourite";
    const data = {
      content_id: content.content_id,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    if (!response) {
      alert("Error adding favourite. Please try again!");
      setIsFavourite(false);
      return;
    }
    setIsFavourite(true);
  };

  const toggleFavourite = async (prevIsFavourite) => {
    if (prevIsFavourite) {
      deleteFavourite();
    } else {
      addFavourite();
    }
  };

  return [isFavourite, toggleFavourite];
};

export default useFavourite;
