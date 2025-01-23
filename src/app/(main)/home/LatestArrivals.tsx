"use client";

import React from "react";
import MainButton from "@/components/mainButton/page";
import DealCard from "@/components/dealCard/page";
// import { useProducts } from "@/hooks/useQueries";
import AtomLoader from "@/components/loader/AtomLoader";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products.api";

interface Product {
  id: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
  storeName: string;
  storeLogo: string;
  badgeColor: string;
  discountPrice: number;
}

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
        {latestProducts?.map((product: Product, index: number) => (
          <div
            key={`product-${product.id}-${index}`}
            className="col-span-6 my-8 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <DealCard
              image={product.images?.[0] || ""}
              imagea={product.images?.[1] || product.images?.[0] || ""}
              title={product.name || "Untitled Product"}
              price={product.price || 0}
              discountPrice={product.discountPrice}
              store={product.storeName || "No store available"}
              logo={product.storeLogo}
              badgeColor={product.badgeColor}
              id={product._id}
            />
          </div>
          // <DealCard
          //   key={index}
          //   image={product.images?.[0] || ""}
          //   imagea={product.images?.[1] || product.images?.[0] || ""}
          //   title={product.name || "Untitled Product"}
          //   price={product.price || 0}
          //   discountPrice={product.discountPrice}
          //   store={product.storeName || "No store available"}
          //   logo={product.storeLogo}
          //   badgeColor={product.badgeColor}
          //   id={product._id}
          // />
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
