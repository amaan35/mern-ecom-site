import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col justify-center gap-5 items-center min-h-[90vh]">
      <h2 className="text-3xl font-bold">Profile</h2>
      <div className="flex flex-col bg-gradient-to-r from-cyan-400 to-blue-400 items-center border-2 shadow-md rounded-lg gap-4 py-16 px-28">
        <img
          src={
            currentUser.profilePic
          }
          className="rounded-full w-[200px]"
        />
        <div>
          <span className="font-bold">Username : </span>
          <span className="font-semibold">@{currentUser.username}</span>
        </div>
        <div>
          <span className="font-bold">Email : </span>
          <span>{currentUser.email}</span>
        </div>
        {currentUser && currentUser.isAdmin && (
          <button
            onClick={() => navigate("/addproduct")}
            className="bg-blue-600 hover:bg-blue-700 px-10 py-3 rounded-md text-white"
          >
            Add a product
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
