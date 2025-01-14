"use client";

import React from "react";
import MainButton from "@/components/mainButton/page";
import DealCard from "@/components/dealCard/page";
// import { useProducts } from "@/hooks/useQueries";
import AtomLoader from "@/components/loader/AtomLoader";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products.api";

const LatestArrivals = () => {
  // const { data: products, isLoading } = useProducts();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <AtomLoader />;
  }

  // Get the latest 4 products
  const latestProducts = data?.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Latest Arrivals</span>
          <Link href="/products">
            <MainButton text="View All" />
          </Link>
        </div>
        {latestProducts?.map((product: any, index: number) => (
          <DealCard
            key={index}
            image={product.images?.[0] || ""}
            imagea={product.images?.[1] || product.images?.[0] || ""}
            title={product.name || "Untitled Product"}
            store={product.store || "No store available"}
            price={product.price || 0}
            badgeColor={product.badgeColor}
            discountPrice={product.discountPrice}
          />
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
