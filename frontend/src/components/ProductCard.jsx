import React from "react";
import productdefaultpic from "../assets/productdefaultpic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clickedProduct } from "../redux/product/productSlice";
const ProductCard = ({ productInfo }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between sm:gap-3 w-[48vw] sm:w-[300px] p-5 border-2 border-gray-300 rounded-lg bg-white hover:shadow-lg md:hover:scale-105 cursor-pointer transition-all">
      <div
        onClick={() => {
          dispatch(clickedProduct(productInfo));
          navigate(`/${productInfo.slug}`);
        }}
      >
        <div className="flex justify-center">
          <img
            src={productInfo.images[0] || productdefaultpic}
            className="w-[250px] h-[300px] object-cover"
          />
        </div>
        <p className="font-semibold truncate">
          {productInfo.title}
        </p>
        <p className="text-gray-700">category: {productInfo.category}</p>
        <p className="font-bold">price: Rs {productInfo.price}</p>
      </div>
      {currentUser && currentUser.isAdmin && (
        <button
          onClick={() => {
            dispatch(clickedProduct(productInfo));
            navigate("/updateproduct");
          }}
          className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600 transition-colors text-white"
        >
          Update
        </button>
      )}
    </div>
  );
};

export default ProductCard;
