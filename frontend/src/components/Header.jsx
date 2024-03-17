import React from "react";
import defaultprofilepic from "../assets/defaultprofilepic.jpg";
import searchIcon from "../assets/searchIcon.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:px-[3vw] px-[2vw] flex items-center justify-between bg-gray-800 sm:min-h-[10vh] h-[7vh] text-cyan-300">
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
          className="p-2 w-full sm:inline hidden rounded-tl-lg rounded-bl-lg"
        />
        <button className="px-3 hover:bg-blue-500 bg-blue-400 sm:inline hidden rounded-tr-lg rounded-br-lg text-black">
          search
        </button>
      </div>
      <div className="sm:w-[33%] flex justify-end">
        {false ? (
          <img
            className="rounded-full w-[5vh] h-[5vh]"
            src={defaultprofilepic}
          />
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
