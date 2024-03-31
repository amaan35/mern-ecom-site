import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import rightarrow from "../assets/rightarrow.svg";

export default function ShoesSlider() {
  const [shoesList, setShoesList] = useState([]);
  const sliderRef = useRef(null);
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
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };
  return (
    <div className="flex items-center">
      <span
        onClick={handlePrev}
        className="absolute sm:inline hidden left-2 rotate-180 bg-gray-300 rounded-full p-2 z-[1] cursor-pointer"
      >
        <img src={rightarrow} width={25} />
      </span>
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth gap-3 py-3"
      >
        {shoesList &&
          shoesList.map((shoe) => {
            return (
              <div key={shoe._id}>
                <ProductCard productInfo={shoe} />
              </div>
            );
          })}
      </div>
      <span
        onClick={handleNext}
        className="absolute sm:inline hidden right-2 bg-gray-300 rounded-full p-2 z-[1] cursor-pointer"
      >
        <img src={rightarrow} width={25} />
      </span>
    </div>
  );
}
