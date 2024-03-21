import React from "react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { currentProduct } = useSelector((state) => state.product);
  return (
    <div className="md:px-[30px] px-5 md:py-[13px] py-2">
      <section className="justify-center md:flex">
        <div className="grid grid-cols-2 gap-1 md:w-[45%] lg:w-[30%]">
          <img
            src={
              currentProduct.images &&
              currentProduct.images.length !== 0 &&
              currentProduct.images[0]
            }
            width={250}
            alt="image not available"
            className="w-full object-cover"
          />
          <img
            src={
              currentProduct.images &&
              currentProduct.images.length !== 0 &&
              currentProduct.images[1]
            }
            width={250}
            alt="image not available"
            className="w-full object-cover"
          />
          <img
            src={
              currentProduct.images &&
              currentProduct.images.length !== 0 &&
              currentProduct.images[2]
            }
            width={250}
            alt="image not available"
            className="w-full object-cover"
          />
          <img
            src={
              currentProduct.images &&
              currentProduct.images.length !== 0 &&
              currentProduct.images[3]
            }
            width={250}
            alt="image not available"
            className="w-full object-cover"
          />
        </div>
        <div className="md:px-5 py-5 md:py-0 flex flex-col md:w-[40%] gap-3">
          <h2 className="font-semibold text-3xl">{currentProduct.title}</h2>
          <p className="text-xl font-serif">Brand : {currentProduct.brand}</p>
          <p className="text-lg">Category : {currentProduct.category}</p>
          <p className="text-lg font-mono">Rs {currentProduct.price}</p>
          <p className="text-md font-bold">Stock : {currentProduct.stock}</p>
          <div>
            <p>Get delivered at :</p>
            <form className="flex flex-col gap-5 mt-3">
              <label>Enter you address : </label>
              <input
                placeholder="deliver at..."
                id="address"
                className="px-4 py-2 border rounded-lg"
              />
              <button className="bg-black hover:bg-gray-800 hover:shadow-md text-white px-5 py-3 rounded-full">
                Buy now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
