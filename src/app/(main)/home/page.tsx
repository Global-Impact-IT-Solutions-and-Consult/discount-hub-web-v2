import React from "react";
import Hero from "./Hero";
import ByCategory from "./ByCategory";
import LatestArrivals from "./LatestArrivals";
import { fetchProducts, fetchCategories } from "@/api/products.api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import Services from "./Services";

const Landing = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-16">
        {/* Home */}
        <Hero />
        <ByCategory />
        <LatestArrivals />
        {/* <Services /> */}
      </div>
    </HydrationBoundary>
  );
};

export default Landing;
