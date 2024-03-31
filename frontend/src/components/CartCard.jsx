import React from "react";
import productdefaultpic from "../assets/productdefaultpic.jpeg";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/cart/cartSlice";

export default function CartCard({ cartItem }) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between border-2 p-3 rounded-lg shadow-lg w-full sm:h-[200px] h-[150px]">
      <div className="flex">
        <img
          src={cartItem.currentProduct.images ? cartItem.currentProduct.images[0] : productdefaultpic}
          width={200}
          className="object-cover"
        />
        <div className="px-3">
          <h3 className="font-semibold text-sm sm:text-xl">{cartItem.currentProduct.title}</h3>
          <p className=" font-mono sm:text-lg text-xs">{cartItem.currentProduct.brand}</p>
          <p className="text-sm">{cartItem.currentProduct.category}</p>
          <p className="text-xs sm:text-lg">{cartItem.currentProduct.price}</p>
          <p className="text-xs sm:text-sm">quantity : {cartItem.quantity}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="bg-red-500 rounded-md px-3 py-2 text-xs sm:text-sm text-white hover:bg-red-600 h-fit"
          onClick={() => dispatch(removeItem(cartItem))}
        >
          remove
        </button>
      </div>
    </div>
  );
}
