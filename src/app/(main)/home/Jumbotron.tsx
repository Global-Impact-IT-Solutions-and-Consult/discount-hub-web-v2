"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
// import furniture from "@/assets/imgs/categories/furnitures.jpg";
// import phones_and_tablets from "@/assets/imgs/categories/phones_and_tablets.jpg";
import bg from "@/assets/imgs/landing/jumbotron/bg.jpg";
import Link from "next/link";
import MainButton from "@/components/mainButton/page";
import AtomLoader from "@/components/loader/AtomLoader";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "@/api/products.api";
import DealCard from "@/components/dealCard/page";

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

const Jumbotron = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getFeaturedCategories"],
    queryFn: getFeaturedCategories,
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const difference = midnight.getTime() - now.getTime(); // Use getTime() to ensure the result is a number

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <AtomLoader />;
  }

  // Get the latest 4 products in reverse order before slicing
  const latestProducts = data?.items?.slice(0, 4).reverse();

  return (
    <>
      {data && (
        <>
          <div className="relative min-w-full h-[500px] flex items-end bg-gray-400 rounded-xl">
            {/* Slide Image */}
            <Image
              src={bg}
              alt={"jumbotron"}
              fill
              className="object-cover rounded-xl"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 rounded-xl" />
            {/* Slide Content */}
            <div className="absolute bottom-64 left-8 z-10 text-white lg:bottom-16">
              <h3 className="text-2xl font-bold mb-4 capitalize clamp-3-lines w-[70%]">
                {`Get the best deals on ${data?.categoryName}`}
              </h3>
              <Link href={`/categories/one?category=${data?.categoryName}`}>
                <MainButton
                  text="View Category"
                  className="text-white bg-brand-main w-fit border-none py-4 hover:bg-brand-main/80"
                />
              </Link>
            </div>
            <div className="absolute bottom-16 right-4 z-10 text-white flex items-center justify-evenly gap-6 lg:right-8">
              <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                <span className="text-sm font-bold lg:text-2xl">
                  {timeLeft.days}
                </span>
                <span className="text-xs">Days</span>
              </span>
              <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                <span className="text-sm font-bold lg:text-2xl">
                  {timeLeft.hours}
                </span>
                <span className="text-xs">Hours</span>
              </span>
              <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                <span className="text-sm font-bold lg:text-2xl">
                  {timeLeft.minutes}
                </span>
                <span className="text-xs">Minutes</span>
              </span>
              <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                <span className="text-sm font-bold lg:text-2xl">
                  {timeLeft.seconds}
                </span>
                <span className="text-xs">Seconds</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 -mt-16">
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
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Jumbotron;
