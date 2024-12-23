"use client";

import React from "react";
import image1 from "@/assets/imgs/landing/by-category/1.jpg";
import image2 from "@/assets/imgs/landing/by-category/2.jpg";
import image3 from "@/assets/imgs/landing/by-category/3.jpg";
import Image from "next/image";

const ByCategory = () => {
  const categories = [
    {
      image: image1,
      title: "Gaming Controllers",
    },
    {
      image: image2,
      title: "Racing Wheels",
    },
    {
      image: image3,
      title: "Flight Controls",
    },
    {
      image: image1,
      title: "Accessories",
    },
    {
      image: image2,
      title: "Parts",
    },
    {
      image: image3,
      title: "New Arrivals",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Shop by category</span>
          <span className="transition-fx group flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer border-[0.3px] border-gray-800/80 text-brand-dark rounded-md hover:bg-brand-main hover:border-brand-main hover:text-white">
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="transition-fx w-4 h-4 group-hover:rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>
        </div>
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative col-span-6 md:col-span-4 lg:col-span-2 h-48 overflow-hidden rounded-lg group cursor-pointer"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
              <span className="text-white font-medium">{category.title}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ByCategory;
