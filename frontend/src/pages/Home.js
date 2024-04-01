import React from "react";
import ShoesSlider from "../components/ShoesSlider";
import ShirtSlider from "../components/ShirtSlider";
import TrouserSlider from "../components/TrouserSlider";
import MainSlider from "../components/MainSlider";

const Home = () => {
  return (
    <div className="space-y-5">
      <MainSlider />
      <h2 className="text-3xl font-semibold px-4">
        Explore Our Collection of Stylish Shoes
      </h2>
      <ShoesSlider />
      <h2 className="text-3xl font-semibold px-4">
        Discover Your Perfect Shirt
      </h2>

      <ShirtSlider />
      <h2 className="text-3xl font-semibold px-4">
        Discover Your Perfect Pair of Trousers
      </h2>

      <TrouserSlider />
    </div>
  );
};

export default Home;
