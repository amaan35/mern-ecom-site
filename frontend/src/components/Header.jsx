import React, { useEffect, useState } from "react";
import searchIcon from "../assets/searchIcon.svg";
import shoppingcart from "../assets/shoppingcart.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { removeAllItems } from "../redux/cart/cartSlice";
import { removeClickedProduct } from "../redux/product/productSlice";

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const itemsCount = items ? items.length : 0;
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setProfileMenu(false);
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.pathname]);
  const handleSearch = () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="w-full sticky top-0 z-[2] sm:px-[3vw] px-[2vw] flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500 h-[9vh] text-black">
      <div className="sm:text-4xl bg-gradient-to-r from-gray-400 from-40% to-gray-500 px-3 py-2 rounded-xl text-xl cursor-pointer w-fit">
        <h1 className="text-white" onClick={() => navigate("/")}>Ecommerce</h1>
      </div>
      <button onClick={()=>navigate('/search')} className="sm:hidden bg-yellow-400 font-semibold hover:bg-yellow-500 px-3 py-1 rounded-md flex items-center text-black gap-1">
        <img src={searchIcon} className="w-[3vw]" />
        search
      </button>
      <div className="justify-end w-[33%] flex">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="search..."
          className="p-2 w-full text-black sm:inline hidden rounded-tl-lg rounded-bl-lg"
        />
        <button
          onClick={handleSearch}
          className="px-3 bg-yellow-400 hover:bg-yellow-500 sm:inline hidden rounded-tr-lg rounded-br-lg text-gray-800"
        >
          search
        </button>
      </div>
      <div className="flex justify-end items-center gap-5">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={shoppingcart} width={25} />
          <span className="absolute -top-4 bg-yellow-400 rounded-full px-2 -left-3">
            {itemsCount}
          </span>
        </div>
        {currentUser ? (
          <div className="flex items-center gap-4">
            <div>
              <img
                className="rounded-full cursor-pointer w-[5vh] h-[5vh]"
                src={currentUser.profilePic}
                onClick={() => setProfileMenu(!showProfileMenu)}
              />
              <div
                className={`absolute flex flex-col cursor-pointer px-2 py-3 border-2 bg-white text-black rounded-md right-3 ${
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
                  className="border-b-2 py-2 px-2 text-lg hover:bg-gray-200 rounded-md"
                >
                  profile
                </div>
                <div
                  onClick={() => navigate("/orders")}
                  className="border-b-2 py-2 px-2 text-lg hover:bg-gray-200 rounded-md"
                >
                  My orders
                </div>
                <div
                  onClick={() => {
                    dispatch(removeClickedProduct());
                    dispatch(removeAllItems());
                    dispatch(signOut());
                    navigate("/signin");
                  }}
                  className="hover:bg-gray-200 py-2 px-2 text-lg rounded-md"
                >
                  sign out
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 px-4 sm:py-2 py-1 cursor-pointer rounded-sm text-nowrap"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
