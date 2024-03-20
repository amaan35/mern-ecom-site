import React from "react";
import productdefaultpic from "../assets/productdefaultpic.jpeg";
import { useSelector } from "react-redux";
const ProductCard = ({ productInfo }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      key={productInfo._id}
      className="flex flex-col gap-3 lg:w-[23%] md:w-[30%] w-[40%] p-5 border-2 rounded-lg hover:shadow-xl md:hover:scale-105 cursor-pointer transition-all"
    >
      <img src={productInfo.images[0] || productdefaultpic} />
      <p className="font-semibold overflow-hidden overflow-ellipsis">
        {productInfo.title}
      </p>
      <p className="text-gray-700">category: {productInfo.category}</p>
      <p className="font-bold">price: Rs {productInfo.price}</p>
      {currentUser && currentUser.isAdmin && (
        <div className="flex justify-between">
          <button className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600 transition-colors text-white">
            Update
          </button>
          <button className="bg-red-500 px-2 py-1 rounded-md hover:bg-red-600 transition-colors text-white">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
