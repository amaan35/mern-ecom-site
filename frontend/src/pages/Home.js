import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [productList, setProductList] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/product/read", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProductList(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-wrap py-5 gap-y-5 justify-evenly">
      {productList && productList.map((curElement) => {
        return <ProductCard key={curElement._id} productInfo={curElement}/>;
      })}
    </div>
  );
};

export default Home;
