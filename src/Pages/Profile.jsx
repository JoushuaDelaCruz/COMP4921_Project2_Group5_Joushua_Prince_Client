import React, { useEffect, useState } from "react";
import useUser from "./Customs/useUser";
import Navbar from "./Components/Navbar";
import { useLoaderData, useParams } from "react-router-dom";
import useRequest from "./Customs/useRequest";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import ProfilePostCard from "./Components/ProfilePostCard";
import { useCookies } from "react-cookie";
import ProfileBookmarkCard from "./Components/ProfileBookmarkCard";

const Profile = () => {
  const { username } = useParams();
  const isOwner = useLoaderData();
  const [user, profileImg] = useUser();
  const [userProfileName, setUserProfileName] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userProfileImg, setUserProfileImg] = useState("");
  const [bookmarks, setBookmarks] = useState(null);
  const [getRequest] = useRequest();
  const [cookies] = useCookies(["session"]);
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
      if (cookies.session) {
        const url =
          import.meta.env.VITE_API +
          "profile/posts/" +
          username +
          "/" +
          cookies.session;
        const response = await getRequest(url);
        setUserPosts(response);
        return;
      }
      const url = import.meta.env.VITE_API + "profile/posts/" + username;
      const response = await getRequest(url);
      setUserPosts(response);
      return;
    };
    const getBookmarks = async () => {
      if (!isOwner) {
        return;
      }
      const url =
        import.meta.env.VITE_API + "profile/bookmarks/" + cookies.session;
      const response = await getRequest(url);
      setBookmarks(response);
      return;
    };
    getBookmarks();
    getProfile();
    getPosts();
  }, [cookies.session, username]);

  const countVotes = () => {
    if (!userPosts) {
      return 0;
    }
    let votes = 0;
    userPosts.map((post) => {
      votes += parseInt(post.num_votes);
    });
    return votes;
  };

  return (
    <>
      <Navbar user={user} image={profileImg} search="" />
      <main className="flex items-center background flex-col">
        <section className="flex flex-col w-3/4 p-2 my-10 gap-2">
          <header className="flex flex-col bg-white py-4 px-6 rounded-sm">
            <div className="flex items-center gap-3">
              {userProfileImg && (
                <AdvancedImage
                  cldImg={userProfileImg}
                  className="w-16 h-16 rounded-full ring-1 ring-gray-300 overflow-hidden object-cover"
                />
              )}
              <h1 className="border-b-2 border-cyan-400 w-full text-lg font-light capitalize">
                {userProfileName}
              </h1>
            </div>
          </header>
          <section className="flex gap-3">
            <div className="flex flex-col bg-transparent py-1 rounded-sm h-fit w-3/4">
              {userPosts &&
                userPosts.map((post, index) => {
                  return <ProfilePostCard key={index} post={post} />;
                })}
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <div className="flex flex-col bg-white w-full rounded-sm h-fit">
                <h1 className="pl-4 py-1 font-medium text-green-800 text-center border-b border-gray-300">
                  {" "}
                  User's Overview{" "}
                </h1>
                <div className="flex justify-around py-3">
                  <div className="flex flex-col justify-center items-center gap-2 ring-1 ring-cyan-400 rounded-sm p-2">
                    <span className="font-semibold text-sm">
                      {" "}
                      {userPosts && userPosts.length}{" "}
                    </span>
                    <span className="flex gap-2 justify-center items-center text-gray-600">
                      <i className="fa-regular fa-pen-to-square fa-lg"></i>
                      <span className="text-xs"> Published Posts </span>
                    </span>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 ring-1 ring-cyan-400 rounded-sm p-2">
                    <span className="font-semibold">{countVotes()}</span>
                    <span className="flex gap-2 justify-center items-center text-gray-600">
                      <i className="fa-regular fa-thumbs-up"></i>
                      <span className="text-xs"> Votes Received </span>
                    </span>
                  </div>
                </div>
              </div>
              {bookmarks && (
                <div className="flex flex-col bg-white w-full rounded-sm h-fit">
                  <h1 className="pl-4 py-1 font-medium text-green-800 text-center border-b border-gray-300">
                    Favourites
                  </h1>
                  {bookmarks.map((bookmark, index) => {
                    return (
                      <ProfileBookmarkCard key={index} bookmark={bookmark} />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default Profile;
