import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import rightarrow from "../assets/rightarrow.svg";

export default function ShoesSlider() {
  const [shoesList, setShoesList] = useState([]);
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const res = await fetch("/product/read?category=shoes", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setShoesList(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchShoes();
  }, []);
  return (
    <div className="flex gap-3 py-3">
      <span className="absolute top-[40%] left-2 rotate-180 bg-gray-400 rounded-full p-2 z-[1] cursor-pointer">
        <img src={rightarrow} width={25} />
      </span>
      {shoesList &&
        shoesList.map((shoe) => {
          return (
            <div key={shoe._id}>
              <ProductCard productInfo={shoe} />
            </div>
          );
        })}
      <span className="absolute top-[40%] right-2 bg-gray-400 rounded-full p-2 z-[1] cursor-pointer">
        <img src={rightarrow} width={25} />
      </span>
    </div>
  );
}
