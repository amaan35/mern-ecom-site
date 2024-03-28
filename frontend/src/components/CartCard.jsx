import React from "react";
import productdefaultpic from "../assets/productdefaultpic.jpeg";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/cart/cartSlice";

export default function CartCard({ cartItem }) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between border-2 p-3 rounded-lg shadow-lg w-[60%] h-[200px]">
      <div className="flex">
        <img
          src={cartItem.currentProduct.images ? cartItem.currentProduct.images[0] : productdefaultpic}
          width={200}
          className="object-cover"
        />
        <div className="px-3">
          <h3 className="font-semibold text-xl">{cartItem.currentProduct.title}</h3>
          <p className=" font-mono text-md">{cartItem.currentProduct.brand}</p>
          <p className="text-md">{cartItem.currentProduct.category}</p>
          <p>{cartItem.currentProduct.price}</p>
          <p>quantity : {cartItem.quantity}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="bg-red-500 rounded-md px-3 py-2 text-white hover:bg-red-600 h-fit"
          onClick={() => dispatch(removeItem(cartItem))}
        >
          remove item from cart
        </button>
      </div>
    </div>
  );
}
