import React, { useEffect, useState } from "react";
import searchIcon from "../assets/searchIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";

export default function Header() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    setProfileMenu(false);
  },[location.pathname])
  return (
    <div className="w-full sticky top-0 z-[1] sm:px-[3vw] px-[2vw] flex items-center justify-between bg-gray-600 sm:min-h-[10vh] h-[7vh] text-gray-200">
      <div
        className="sm:text-4xl text-xl cursor-pointer w-[33%]"
        onClick={() => navigate("/")}
      >
        Ecommerce
      </div>
      <button className="sm:hidden hover:bg-blue-400 bg-blue-300 px-3 py-1 rounded-md flex items-center text-black gap-1">
        <img src={searchIcon} className="w-[3vw]" />
        search
      </button>
      <div className="w-[33%] flex">
        <input
          placeholder="search..."
          className="p-2 w-full text-black sm:inline hidden rounded-tl-lg rounded-bl-lg"
        />
        <button className="px-3 hover:bg-blue-500 bg-blue-400 sm:inline hidden rounded-tr-lg rounded-br-lg text-black">
          search
        </button>
      </div>
      <div className="sm:w-[33%] flex justify-end">
        {currentUser ? (
          <div>
            <img
              className="rounded-full cursor-pointer w-[5vh] h-[5vh]"
              src={currentUser.profilePic}
              onClick={() => setProfileMenu(!showProfileMenu)}
            />
            <div
              className={`absolute flex flex-col gap-3 cursor-pointer px-2 py-3 border-2 bg-white text-black rounded-md right-0 ${
                showProfileMenu ? "" : "hidden"
              }`}
            >
              <div>
                <div className="font-semibold text-sm">
                  @{currentUser.username}
                </div>
                <div className="text-xs">{currentUser.email}</div>
              </div>
              <div
                onClick={() => navigate("/profile")}
                className="border-b-2 text-lg hover:bg-gray-200 rounded-md"
              >
                profile
              </div>
              <div
                onClick={() => {
                  dispatch(signOut());
                  navigate("/signin");
                }}
                className="hover:bg-gray-200 text-lg rounded-md"
              >
                sign out
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 sm:py-2 py-1 cursor-pointer rounded-sm text-nowrap"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
