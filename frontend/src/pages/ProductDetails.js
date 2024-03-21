import React from "react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { currentProduct } = useSelector((state) => state.product);
  return (
    <div className="md:px-[30px] px-5 md:py-[13px] py-2">
      <div className="grid grid-cols-2 gap-1 md:w-[45%] lg:w-[35%]">
        <img src={currentProduct.images[0]} width={250} className="w-full" />
        <img src={currentProduct.images[1]} width={250} className="w-full" />
        <img src={currentProduct.images[2]} width={250} className="w-full" />
        <img src={currentProduct.images[3]} width={250} className="w-full" />
      </div>
    </div>
  );
};

export default ProductDetails;
