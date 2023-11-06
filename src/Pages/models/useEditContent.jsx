import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { EditContentHandlerContext } from "./Contexts";
import useRequest from "./useRequest";

const useEditContent = (content) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [text, setText] = useState(content.content);
  const [cookies] = useCookies(["session"]);
  const editContentHandlerContext = useContext(EditContentHandlerContext);
  const [, postRequest] = useRequest();

  const toggleEdit = () => {
    if (isEditing) {
      setText(content.content);
    }
    setIsEditing(!isEditing);
  };

  const editContent = async () => {
    const url = import.meta.env.VITE_API + "user/editContent";
    const data = {
      content_id: content.content_id,
      content: text,
      sessionID: cookies.session,
    };
    const response = await postRequest(url, data);
    if (response) {
      editContentHandlerContext(content.content_id, text);
      toggleEdit();
    } else {
      console.log("Error editing content");
    }
  };

  const changeHandler = async (e) => {
    if (e.type === "change") {
      if (e.target.value !== content.content) {
        setHasChanged(true);
        setText(e.target.value);
      } else {
        setHasChanged(false);
      }
    }
    if (e.type === "removed") {
      setText("[removed]");
      editContentHandlerContext(content.content_id, "[removed]", 2);
    }
  };

  return [toggleEdit, editContent, isEditing, text, changeHandler, hasChanged];
};

export default useEditContent;
