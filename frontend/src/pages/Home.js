import React from "react";
import ShoesSlider from "../components/ShoesSlider";
import ShirtSlider from "../components/ShirtSlider";
import TrouserSlider from "../components/TrouserSlider";
import MainSlider from "../components/MainSlider";

const Home = () => {
  return (
    <div className="space-y-5">
      <MainSlider/>
      <ShoesSlider/>
      <ShirtSlider/>
      <TrouserSlider/>
    </div>
  );
};

export default Home;
