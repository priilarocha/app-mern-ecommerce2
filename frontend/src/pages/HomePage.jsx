import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const HomePage = () => {
  const [productList, setProductList] = useState([]);


  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      setProductList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <NavBar />
      {/* Render a heading with the text "My HomePage" */}
      <h1>My HomePage</h1>
      {/* Check if productList is not empty */}
      {productList.length !== 0 &&
        // If productList is not empty, map over it and render a ProductCard component for each product
        productList.map((product) => (
          // Render a ProductCard component with a unique key and the product as a prop
          <ProductCard
            key={product._id}
            product={product}
            getProduct={() => getProduct()} />
        ))}
    </>
    // End of the component's return statement
  );
};

export default HomePage;