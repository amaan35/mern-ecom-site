import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    category: "",
  });
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || categoryFromUrl) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchProducts = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/product/read?${searchQuery}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [location.search]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (e.target.id === "category") {
      setSearchData({ ...searchData, category: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("category", searchData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex">
      <div className="border-r-2 fixed hidden md:block border-black p-[3%] min-h-[90vh] min-w-[25vw]">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-lg">Search term : </label>
            <input
              placeholder="search..."
              id="searchTerm"
              type="text"
              className="px-3 py-1 border rounded-lg border-gray-500"
              value={searchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-semibold text-lg">Category : </label>
            <select
              value={searchData.category}
              id="category"
              onChange={handleChange}
              className="text-lg border border-gray-500 rounded-lg"
            >
              <option value="">search a category : </option>
              <option value="shirt">shirt</option>
              <option value="shoes">shoes</option>
              <option value="trouser">trousers</option>
            </select>
          </div>
          <button className="bg-black text-white hover:bg-gray-800 rounded-full px-4 py-2">
            Apply filters
          </button>
        </form>
      </div>
      <div className="md:pl-[3vw] md:ml-[25vw] mb-[24vh] sm:mb-[2vh] overflow-hidden py-[1%]">
        <h1 className="text-2xl font-bold pb-[2%]">Products : </h1>
        <div className="flex flex-wrap gap-3">
          {products.length!==0?products.map((product) => {
            return <ProductCard key={product._id} productInfo={product} />;
          }):<p className="font-semibold text-xl text-gray-800">No products with this filter</p>}
        </div>
      </div>
      <div className="border-t-2 border-black bg-white fixed bottom-0 block md:hidden p-[3%] min-h-[20vh] w-screen">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-lg">Search term : </label>
            <input
              placeholder="search..."
              id="searchTerm"
              type="text"
              className="px-3 py-1 border rounded-lg border-gray-500"
              value={searchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-semibold text-lg">Category : </label>
            <select
              value={searchData.category}
              id="category"
              onChange={handleChange}
              className="text-lg border border-gray-500 rounded-lg"
            >
              <option value="">search a category : </option>
              <option value="shirt">shirt</option>
              <option value="shoes">shoes</option>
              <option value="trouser">trousers</option>
            </select>
          </div>
          <button className="bg-black text-white hover:bg-gray-800 rounded-full px-4 py-2">
            Apply filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
