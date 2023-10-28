import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Request from "./ServerRequest";
import { Cloudinary } from "@cloudinary/url-gen";

const useUser = () => {
  const request = new Request();
  const [user, setUser] = useState(null);
  const [cookies, , removeCookie] = useCookies(["session"]);
  const [profileImg, setProfileImg] = useState("");

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  useEffect(() => {
    const getUser = async () => {
      const url = import.meta.env.VITE_API + "user";
      const data = await request.postReq(url, cookies.session);
      if (!data) {
        setUser(null);
        removeCookie("session");
        return;
      }
      setUser(data);
      const image = cld.image(data.profile_img);
      setProfileImg(image);
    };
    getUser();
  }, []);

  return [user, profileImg];
};

export default useUser;
