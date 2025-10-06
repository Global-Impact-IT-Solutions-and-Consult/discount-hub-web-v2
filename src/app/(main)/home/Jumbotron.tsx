"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainButton from "@/components/mainButton/page";
import AtomLoader from "@/components/loader/AtomLoader";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "@/api/products.api";
import DealCard from "@/components/dealCard/page";
import defaultImage from "@/assets/imgs/landing/jumbotron/bg.jpg";

// Import category images
import electronics from "@/assets/imgs/categories/electronics.jpg";
import home_appliances from "@/assets/imgs/categories/home_appliances.jpg";
import furniture from "@/assets/imgs/categories/furnitures.jpg";
import accessories from "@/assets/imgs/categories/accessories.jpg";
import health_and_beauty from "@/assets/imgs/categories/health_and_beauty_2.jpg";
import phones_and_tablets from "@/assets/imgs/categories/phones_and_tablets.jpg";
import books from "@/assets/imgs/categories/books_banner.jpg";
import groceries from "@/assets/imgs/categories/groceries_banner.jpg";
import home_and_office from "@/assets/imgs/categories/home_and_office_banner.jpg";
import personal_care from "@/assets/imgs/categories/personal_care_banner.jpg";
import jewelries from "@/assets/imgs/categories/jewelries.jpg";
import beauty_and_cosmetics from "@/assets/imgs/categories/beauty_and_cosmetics_baner.png";
import kitchenware from "@/assets/imgs/categories/kitchenware_banner_1.jpg";
import beverages from "@/assets/imgs/categories/beverages_banner.png";
import footwear from "@/assets/imgs/categories/footwear.jpg";
import fashion from "@/assets/imgs/categories/fashion.jpg";
import audio_and_headphones from "@/assets/imgs/categories/audio_and_headphones.jpg";
import home_decor from "@/assets/imgs/categories/home_decor.jpg";
import clothing from "@/assets/imgs/categories/clothing.jpg";
import gaming from "@/assets/imgs/categories/gaming.jpg";
import photography from "@/assets/imgs/categories/photography.jpg";

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
  brand: {
    name: string;
  };
}

const Jumbotron = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getFeaturedCategories"],
    queryFn: getFeaturedCategories,
  });

  const categories = data || [];

  // Log only in development
  if (process.env.NODE_ENV === "development") {
    console.log("Featured Categories:", categories);
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const imagesMap = {
    electronics,
    home_appliances,
    furniture,
    accessories,
    health_and_beauty,
    phones_and_tablets,
    books,
    groceries,
    home_and_office,
    personal_care,
    jewelries,
    beauty_and_cosmetics,
    kitchenware,
    beverages,
    footwear,
    fashion,
    audio_and_headphones,
    home_decor,
    clothing,
    gaming,
    photography,
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const difference = midnight.getTime() - now.getTime();

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    let slideTimer: NodeJS.Timeout;
    if (categories.length > 0) {
      slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
      }, 10000);
    }

    return () => {
      clearInterval(timer);
      if (slideTimer) clearInterval(slideTimer);
    };
  }, [categories.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      // prev === 0 ? data?.categoryData?.length - 1 || 0 : prev - 1
      prev === 0 ? data?.length - 1 || 0 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      // prev === (data?.categoryData?.length - 1 || 0) ? 0 : prev + 1
      prev === (data?.length - 1 || 0) ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <AtomLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">Error loading featured categories</h3>
          <p className="mt-2 text-red-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800">No featured categories available</h3>
          <p className="mt-2 text-yellow-600">Check back later for updates</p>
        </div>
      </div>
    );
  }

  // const latestProducts = data?.items?.slice(0, 4).reverse() || [];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {categories.map((category: any, index: number) => {
            const imageKey = category.name.toLowerCase().replace(/\s+/g, "_");
            const categoryImage = imagesMap[imageKey as keyof typeof imagesMap] || electronics;

            return (
              <div key={index} className="relative min-w-full h-[500px] flex items-end bg-gray-400">
                <Image
                  src={categoryImage || defaultImage}
                  // src={category.image || defaultImage}
                  alt={category.name || "alt"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-16 left-8 z-10 text-white">
                  <h3 className="text-2xl font-bold mb-4 capitalize">{`Get the best deals on ${category.name}`}</h3>
                  <Link href={`/categories/one?category=${encodeURIComponent(category.name)}`}>
                    <MainButton text="View Category" className="text-white bg-brand-main w-fit border-none py-4 hover:bg-brand-main/80" />
                  </Link>
                </div>
                <div className="absolute bottom-16 right-4 z-10 text-white flex items-center justify-evenly gap-6 lg:right-8">
                  <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                    <span className="text-sm font-bold lg:text-2xl">{timeLeft.days}</span>
                    <span className="text-xs">Days</span>
                  </span>
                  <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                    <span className="text-sm font-bold lg:text-2xl">{timeLeft.hours}</span>
                    <span className="text-xs">Hours</span>
                  </span>
                  <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                    <span className="text-sm font-bold lg:text-2xl">{timeLeft.minutes}</span>
                    <span className="text-xs">Minutes</span>
                  </span>
                  <span className="glass-fx rounded-md flex flex-col items-center justify-center gap-2 text-brand-white p-8 w-16 lg:w-32">
                    <span className="text-sm font-bold lg:text-2xl">{timeLeft.seconds}</span>
                    <span className="text-xs">Seconds</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full z-20" onClick={handlePrevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full z-20" onClick={handleNextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Dots Navigation */}
        {categories.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {categories.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Products Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 capitalize">Featured {categories[currentSlide]?.name} Deals</h2>
        <div className="grid grid-cols-12 gap-6">
          {categories[currentSlide]?.products?.length > 0 ? (
            categories[currentSlide].products.map((product: Product) => (
              <div key={`product-${product.id}`} className="col-span-6 sm:col-span-6 lg:col-span-4 xl:col-span-4">
                <DealCard
                  image={product.images?.[0] || ""}
                  imagea={product.images?.[1] || product.images?.[0] || ""}
                  title={product.name || "Untitled Product"}
                  price={product.price || 0}
                  discountPrice={product.discountPrice}
                  // store={product.storeName || "No store available"}
                  store={product.brand.name || "No store available"}
                  logo={product.storeLogo}
                  badgeColor={product.badgeColor}
                  id={product._id}
                />
              </div>
            ))
          ) : (
            <div className="col-span-12 text-center py-8">
              <p className="text-gray-500">No products available in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
