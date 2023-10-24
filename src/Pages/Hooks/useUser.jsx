import { useEffect, useState } from "react";

const useUser = () => {
  const request = new Request();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const url = import.meta.env.VITE_API + "user";
      const data = await request.postReq(url, cookies.session);
      if (!data) {
        setUser(null);
        removeCookie("session");
        window.location.href = "/";
        return;
      }
      setUser(data);
      const image = cld.image(data.profile_img);
      setProfileImg(image);
    };
    getUser();
  }, []);

  return user;
};

export { useUser };
