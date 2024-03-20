import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="flex flex-wrap py-5 gap-y-5 justify-evenly">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((curElement) => {
        return <ProductCard />;
      })}
    </div>
  );
};

export default Home;
