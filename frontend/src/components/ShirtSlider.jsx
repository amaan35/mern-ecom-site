import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import rightarrow from "../assets/rightarrow.svg";

export default function ShirtSlider() {
  const [shirtList, setShirtList] = useState([]);
  const sliderRef = useRef(null)
  useEffect(() => {
    const fetchShirt = async () => {
      try {
        const res = await fetch("/product/read?category=shirt", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setShirtList(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchShirt();
  }, []);
  const handlePrev = () => {
    if(sliderRef.current){
      sliderRef.current.scrollLeft -= 300
    }
  }
  const handleNext = () => {
    if(sliderRef.current){
      sliderRef.current.scrollLeft += 300
    }
  }
  return (
    <div className="flex  bg-gray-200 items-center">
      <span onClick={handlePrev} className="rotate-180 left-2 absolute bg-gray-300 sm:inline hidden rounded-full p-2 z-[1] cursor-pointer">
        <img src={rightarrow} width={25} />
      </span>
      <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth gap-3 py-5">
        {shirtList &&
          shirtList.map((shirt) => {
            return (
              <div key={shirt._id}>
                <ProductCard productInfo={shirt} />
              </div>
            );
          })}
      </div>
      <span onClick={handleNext} className="bg-gray-300 sm:inline hidden absolute right-2 rounded-full p-2 z-[1] cursor-pointer">
        <img src={rightarrow} width={25} />
      </span>
    </div>
  );
}
