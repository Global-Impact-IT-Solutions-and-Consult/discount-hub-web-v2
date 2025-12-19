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
  store: {
    name: string;
    logo: string;
    badgeColor: string;
  };
  // storeName: string;
  // storeLogo: string;
  // badgeColor: string;
  discountPrice: number;
}

const LatestArrivals = () => {
  // const { data: products, isLoading } = useProducts();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
  });

  console.log("🚀 ~ LatestArrivals ~ data:", data);
  console.log("🚀 ~ LatestArrivals ~ isLoading:", isLoading);
  console.log("🚀 ~ LatestArrivals ~ error:", error);

  if (isLoading) {
    return <AtomLoader />;
  }

  if (error) {
    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Latest Arrivals</span>
          <Link href="/products">
            <MainButton text="View All" />
          </Link>
        </div>
        <div className="col-span-12 text-center py-8">
          <p className="text-red-600">Failed to load latest arrivals</p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  // Get the latest 4 products in reverse order before slicing
  const latestProducts = data?.slice(0, 4).reverse();
  console.log("latestProducts: ", latestProducts);

  if (!latestProducts || latestProducts.length === 0) {
    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Latest Arrivals</span>
          <Link href="/products">
            <MainButton text="View All" />
          </Link>
        </div>
        <div className="col-span-12 text-center py-8">
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      </div>
    );
  }

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
            key={`product-${product._id}-${index}`}
            className="col-span-6 my-8 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <DealCard
              image={product.images?.[0] || ""}
              imagea={product.images?.[1] || product.images?.[0] || ""}
              title={product.name || "Untitled Product"}
              price={product.price || 0}
              discountPrice={product.discountPrice}
              store={product?.store?.name || "No store available"}
              logo={product?.store?.logo}
              badgeColor={product?.store?.badgeColor}
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
