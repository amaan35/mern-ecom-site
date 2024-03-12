import React, { useEffect, useState } from "react";
import axios from "axios";

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
      Homepage
      <h2>{productList.length > 0 && productList[0].title}</h2>
    </div>
  );
}
