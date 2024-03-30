import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../components/CartCard";
import { removeAllItems } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const handleCartOrder = async (e) => {
    if(!currentUser){
      return navigate('/signin');
    }
    e.preventDefault();
    if (!address || address === "") {
      return console.log("Please fill the address");
    }
    try {
      const res = await fetch("/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          address,
          items: items.map((item) => ({
            item: item.currentProduct._id, 
            quantity: item.quantity
          }))
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        dispatch(removeAllItems());
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (items.length === 0) {
    return (
      <div className="text-3xl font-semibold text-gray-800 py-3 text-center">
        No items in the cart
      </div>
    );
  }
  return (
    <div className="flex gap-4 px-3 py-4 justify-evenly">
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          return <CartCard key={item.currentProduct._id} cartItem={item} />;
        })}
      </div>
      <div className="border-2 h-fit space-y-4 rounded-lg shadow-md p-4">
        <p className="font-semibold text-xl">Place Order : </p>
        <form className="flex flex-col gap-3" onSubmit={handleCartOrder}>
          <div>
            <label className="text-lg">Deliver at : </label>
            <input
              placeholder="address..."
              type="text"
              className="border px-2 py-1 rounded-lg"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className="bg-black hover:bg-gray-800 text-white rounded-full px-3 py-2">
            Place order
          </button>
        </form>
      </div>
    </div>
  );
}
