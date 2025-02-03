import React from "react";
import Hero from "./Hero";
import ByCategory from "./ByCategory";
import LatestArrivals from "./LatestArrivals";
import FeaturedItems from "./FeaturedItems";
import {
  fetchProducts,
  fetchCategories,
  fetchTags,
  getFeaturedItems,
  fetchBrands,
} from "@/api/products.api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Jumbotron from "./Jumbotron";
import ByBrand from "./ByBrand";
import Newsletter from "./Newsletter";
// import Services from "./Services";

const Landing = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
  });

  await queryClient.prefetchQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ["fetchTags"],
    queryFn: fetchTags,
  });

  await queryClient.prefetchQuery({
    queryKey: ["getFeaturedItems"],
    queryFn: getFeaturedItems,
  });

  await queryClient.prefetchQuery({
    queryKey: ["fetchBrands"],
    queryFn: fetchBrands,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-16">
        {/* Home */}
        <Hero />
        <ByCategory />
        <FeaturedItems />
        <Jumbotron />
        <LatestArrivals />
        <ByBrand />
        <Newsletter />
        {/* <Services /> */}
      </div>
    </HydrationBoundary>
  );
};

export default Landing;
