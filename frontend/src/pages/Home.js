import React from "react";
import ShoesSlider from "../components/ShoesSlider";
import ShirtSlider from "../components/ShirtSlider";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <ShoesSlider/>
      <ShirtSlider/>
    </div>
  );
};

export default Home;
