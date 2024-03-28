import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../components/CartCard";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  console.log(items)
  if (items.length === 0) {
    return (
      <div className="text-3xl font-semibold text-gray-800 py-3 text-center">
        No items in the cart
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-4 gap-4">
      {items.map((item) => {
        return <CartCard key={item.currentProduct._id} cartItem={item} />;
      })}
    </div>
  );
}
