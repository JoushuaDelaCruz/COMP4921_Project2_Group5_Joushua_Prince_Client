import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import Request from "./ServerRequest";
import { EditContentHandlerContext } from "./Contexts";

const useEditContent = (content) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [text, setText] = useState(content.content);
  const [cookies] = useCookies(["session"]);
  const editContentHandlerContext = useContext(EditContentHandlerContext);

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
    const request = new Request();
    const response = await request.postReq(url, data);
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
