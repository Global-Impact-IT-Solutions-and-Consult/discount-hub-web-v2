import React from "react";
import Hero from "./Hero";
import ByCategory from "./ByCategory";
import LatestArrivals from "./LatestArrivals";
import { fetchProducts } from "@/api/products.api";
// import Services from "./Services";

const Landing = () => {
  const products = fetchProducts()
  return (
    <div className="flex flex-col gap-16">
      {/* Home */}
      <Hero />
      <ByCategory />
      <LatestArrivals products ={products } />
      {/* <Services /> */}
    </div>
  );
};

export default Landing;
