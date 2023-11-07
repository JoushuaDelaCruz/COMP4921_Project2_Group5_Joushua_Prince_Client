import React, { useEffect, useState } from "react";
import useUser from "./Models/useUser";
import Navbar from "./Components/Navbar";
import { useParams } from "react-router-dom";
import useRequest from "./Models/useRequest";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import ProfilePostCard from "./Components/ProfilePostCard";

const Profile = () => {
  const { username } = useParams();
  const [user, profileImg] = useUser();
  const [userProfileName, setUserProfileName] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userProfileImg, setUserProfileImg] = useState("");
  const [getRequest] = useRequest();
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });

  useEffect(() => {
    const getProfile = async () => {
      const url = import.meta.env.VITE_API + "profile/" + username;
      const response = await getRequest(url);
      setUserProfileName(response.username);
      const image = cld.image(response.profile_img);
      setUserProfileImg(image);
    };
    const getPosts = async () => {
      const url = import.meta.env.VITE_API + "profile/posts/" + username;
      const response = await getRequest(url);
      setUserPosts(response);
    };
    getProfile();
    getPosts();
  }, []);

  return (
    <>
      <Navbar user={user} image={profileImg} search="" />
      <main className="flex items-center background flex-col">
        <section className="flex flex-col w-3/4 p-2 my-10 gap-2">
          <header className="flex flex-col bg-white w-3/4 py-4 px-6 rounded-sm">
            <div className="flex items-center gap-3">
              <AdvancedImage
                cldImg={userProfileImg}
                className="w-16 h-16 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
              />
              <h1 className="border-b-2 border-cyan-400 w-full text-lg font-light">
                {userProfileName}
              </h1>
            </div>
          </header>
          <footer className="flex flex-col bg-white w-3/4 rounded-sm">
            {userPosts &&
              userPosts.map((post) => {
                return <ProfilePostCard post={post} />;
              })}
          </footer>
        </section>
      </main>
    </>
  );
};

export default Profile;
