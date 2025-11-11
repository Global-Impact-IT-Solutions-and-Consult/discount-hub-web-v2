"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainButton from "@/components/mainButton/page";
import DealCard from "@/components/dealCard/page";
import AtomLoader from "@/components/loader/AtomLoader";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedItems } from "@/api/products.api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import defaultImage from "@/assets/imgs/landing/jumbotron/bg.jpg";

const FeaturedItems = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredItems"],
    queryFn: getFeaturedItems,
  });

  console.log("🚀 ~ FeaturedItems ~ data:", data);
  console.log("🚀 ~ FeaturedItems ~ isLoading:", isLoading);
  console.log("🚀 ~ FeaturedItems ~ error:", error);

  const featuredProducts = data?.items?.slice(0, 4) || [];

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex]);

  if (isLoading) {
    return <AtomLoader />;
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="col-span-12 flex items-center justify-between my-8">
          <span className="text-2xl font-bold capitalize">Featured Items</span>
          <Link href="/featured">
            <MainButton text="View All" />
          </Link>
        </div>
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Error loading featured items
          </h3>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="w-full">
        <div className="col-span-12 flex items-center justify-between my-8">
          <span className="text-2xl font-bold capitalize">Featured Items</span>
          <Link href="/featured">
            <MainButton text="View All" />
          </Link>
        </div>
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600">
            No featured items available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {data && (
        <>
          <div className="w-full">
            <div className="col-span-12 flex items-center justify-between my-8">
              <span className="text-2xl font-bold capitalize">
                Featured Items
              </span>
              <Link href="/featured">
                <MainButton text="View All" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 bg-gray-100 rounded-lg p-6 overflow-hidden md:grid-cols-2 lg:min-h-[652px]">
              {/* Left Side - Product Image */}
              <div className="relative w-full h-auto">
                <motion.div
                  key={currentIndex}
                  initial={{ x: direction * 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -direction * 100, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  <Image
                    src={
                      featuredProducts[currentIndex]?.images[0] || defaultImage
                    }
                    alt={
                      featuredProducts[currentIndex]?.name || "Product Image"
                    }
                    layout="responsive"
                    width={500}
                    height={300}
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              </div>

              {/* Right Side - Product Display */}
              <div className="relative flex justify-center items-center text-center w-full">
                {/* Left Button */}
                <ChevronLeftIcon
                  onClick={prevSlide}
                  className="absolute left-0 z-10 rounded-full w-12 p-2 cursor-pointer text-sm bg-brand-white hover:bg-brand-ash/70 lg:left-8"
                />
                <motion.div
                  key={currentIndex}
                  initial={{ x: direction * 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -direction * 100, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="flex flex-col gap-4 items-center justify-between w-[60%] mx-auto"
                >
                  <DealCard
                    image={featuredProducts[currentIndex]?.images?.[0] || ""}
                    imagea={
                      featuredProducts[currentIndex]?.images?.[1] ||
                      featuredProducts[currentIndex]?.images?.[0] ||
                      ""
                    }
                    title={
                      featuredProducts[currentIndex]?.name || "Untitled Product"
                    }
                    price={featuredProducts[currentIndex]?.price || 0}
                    discountPrice={
                      featuredProducts[currentIndex]?.discountPrice
                    }
                    store={
                      featuredProducts[currentIndex]?.storeName ||
                      "No store available"
                    }
                    logo={featuredProducts[currentIndex]?.storeLogo}
                    badgeColor={featuredProducts[currentIndex]?.badgeColor}
                    id={featuredProducts[currentIndex]?._id}
                    featured
                  />

                  {/* Dots Indicator */}
                  <div className="flex space-x-2 mt-4">
                    {featuredProducts.map((_: unknown, index: number) => (
                      <span
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                        }`}
                      ></span>
                    ))}
                  </div>
                </motion.div>
                {/* Right Button */}
                <ChevronRightIcon
                  onClick={nextSlide}
                  className="absolute right-0 rounded-full w-12 p-2 cursor-pointer text-sm bg-brand-white hover:bg-brand-ash/70 lg:right-8"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeaturedItems;

// "use client";

// import React from "react";
// import MainButton from "@/components/mainButton/page";
// import DealCard from "@/components/dealCard/page";
// import AtomLoader from "@/components/loader/AtomLoader";
// import Link from "next/link";

// import { useQuery } from "@tanstack/react-query";
// import { getFeaturedItems } from "@/api/products.api";
// import Image from "next/image";

// interface Product {
//   id: string;
//   _id: string;
//   name: string;
//   price: number;
//   images: string[];
//   storeName: string;
//   storeLogo: string;
//   badgeColor: string;
//   tag: string;
//   discountPrice: number;
// }

// const FeaturedItems = () => {

//   const { data, isLoading } = useQuery({
//     queryKey: ["featuredItems"],
//     queryFn: getFeaturedItems,
//   });

//   if (isLoading) {
//     return <AtomLoader />;
//   }

//   // Filter products to show only those with the tag 'daily deals'
//   const featuredProducts = data?.items.slice(0, 4);

//   return (
//     <>
//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-12 flex items-center justify-between">
//           <span className="text-2xl font-bold capitalize">{data?.tagName}</span>
//           {/* <Link href={`/products?tagId=${data.tagId}`}> */}
//           <Link href="/featured">
//             <MainButton text="View All" />
//           </Link>
//         </div>
//         {featuredProducts?.map((product: Product, index: number) => (
//           <div
//             key={`product-${product.id}-${index}`}
//             className="col-span-6 my-8 sm:col-span-6 lg:col-span-4 xl:col-span-3"
//           >
//             <DealCard
//               image={product.images?.[0] || ""}
//               imagea={product.images?.[1] || product.images?.[0] || ""}
//               title={product.name || "Untitled Product"}
//               price={product.price || 0}
//               discountPrice={product.discountPrice}
//               store={product.storeName || "No store available"}
//               logo={product.storeLogo}
//               badgeColor={product.badgeColor}
//               id={product._id}
//             />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default FeaturedItems;
