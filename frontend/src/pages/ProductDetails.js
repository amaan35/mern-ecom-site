import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { currentProduct } = useSelector((state) => state.product);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/product/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json()
      if(res.ok){
        setLoading(false);
        navigate("/");
      }
      else{
        setLoading(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              <button onClick={(e)=>e.preventDefault()} className="bg-gray-900 hover:bg-gray-700 hover:shadow-md text-white px-5 py-3 rounded-full">
                Buy now
              </button>
            </form>
          </div>
          {currentUser && currentUser.isAdmin && (
            <button
              onClick={(e) => {
                setShowModal(true);
              }}
              className="bg-red-500 px-2 py-1 rounded-full hover:bg-red-700 transition-colors text-white"
            >
              Delete this product
            </button>
          )}
        </div>
        {showModal && (
          <div className="fixed -ml-5 w-screen top-[50%]">
            <div className="bg-white border-2 w-fit mx-auto border-gray-300 rounded-lg shadow-[0_0_0_100vw_rgba(0,0,0,0.5)] space-y-5 px-[3%] py-[2%] z-[2]">
              <p className="font-semibold text-xl">
                Are you sure to delete this product?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(currentProduct._id)}
                  className="bg-red-700 rounded-lg px-3 py-2 text-white hover:bg-red-600"
                >
                  {loading ? "Deleting..." : "Yes"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-700 rounded-lg px-3 py-2 text-white hover:bg-gray-600"
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetails;
