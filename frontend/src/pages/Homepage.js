import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Homepage() {
  const [productList, setProductList] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/read");
      setProductList(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {productList.length!==0 && productList.map((product)=>{
        return <ProductCard product={product}/>
      })}
    </div>
  );
}
