import React, { useEffect, useRef } from "react";
import rightarrow from "../assets/rightarrow.svg";
import data from "../model/MainSliderData";
import { useNavigate } from "react-router-dom";

export default function MainSlider() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const slideWidth = useRef(0);
  const imagesCount = data.length;
  const scrollSpeed = 3000;
  const navigate = useNavigate();

  useEffect(() => {
    slideWidth.current = sliderRef.current.offsetWidth;
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (sliderRef.current) {
          sliderRef.current.scrollLeft += slideWidth.current;
          if (
            sliderRef.current.scrollLeft >=
            slideWidth.current * (imagesCount - 1)
          ) {
            sliderRef.current.scrollLeft = 0;
          }
        }
      }, scrollSpeed);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [imagesCount]);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
    }
  };

  return (
    <div className="relative bg-black">
      <span
        onClick={handlePrev}
        className="absolute left-2 sm:top-1/2 top-1/3 rotate-180 bg-gray-300 rounded-full p-2 z-[1] cursor-pointer"
      >
        <img src={rightarrow} width={25} alt="Previous" />
      </span>
      <div
        ref={sliderRef}
        className="flex py-3 overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        {data.map((img) => (
          <div
            key={img.id}
            className="w-screen cursor-pointer snap-center flex-shrink-0"
            onClick={
              img.id === 1
                ? () => navigate("/search?category=shirt")
                : () => navigate("/search?category=shoes")
            }
          >
            <img
              src={img.imgSrc}
              alt={img.alt}
              className="w-full h-[20vh] sm:h-[60vh] object-cover"
            />
          </div>
        ))}
      </div>
      <span
        onClick={handleNext}
        className="absolute right-2 sm:top-1/2 top-1/3 bg-gray-300 rounded-full p-2 z-[1] cursor-pointer"
      >
        <img src={rightarrow} width={25} alt="Next" />
      </span>
    </div>
  );
}
