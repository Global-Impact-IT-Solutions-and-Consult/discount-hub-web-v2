"use client";

import React from "react";
import Image from "next/image";
import image1 from "@/assets/imgs/landing/latest-arrivals/1.jpg";
import image1a from "@/assets/imgs/landing/latest-arrivals/1a.jpg";
import image2 from "@/assets/imgs/landing/latest-arrivals/2.jpg";
import image2a from "@/assets/imgs/landing/latest-arrivals/2a.jpg";
import image3 from "@/assets/imgs/landing/latest-arrivals/3.jpg";
import image3a from "@/assets/imgs/landing/latest-arrivals/3a.jpg";
import image4 from "@/assets/imgs/landing/latest-arrivals/4.jpg";
import image4a from "@/assets/imgs/landing/latest-arrivals/4a.jpg";

const LatestArrivals = () => {
  const latestArrivals = [
    {
      image: image1,
      imagea: image1a,
      title: "PXN Gaming Controller X1",
      description:
        "Professional gaming controller with customizable buttons and RGB lighting lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      price: 79.99,
      discountPrice: 59.99,
    },
    {
      image: image2,
      imagea: image2a,
      title: "PXN Racing Wheel Pro",
      description: "900° rotation racing wheel with force feedback and pedals",
      price: 299.99,
    },
    {
      image: image3,
      imagea: image3a,
      title: "PXN Flight Control Stick",
      description:
        "Premium flight stick with precise controls and multiple buttons",
      price: 149.99,
      discountPrice: 129.99,
    },
    {
      image: image4,
      imagea: image4a,
      title: "PXN Controller Charging Dock",
      description: "Dual charging station with LED indicators",
      price: 29.99,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Latest Arrivals</span>
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
        {latestArrivals.map((arrival, index) => (
          <div
            key={index}
            className="relative col-span-6 lg:col-span-3 overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="relative h-[334px]">
              {arrival.discountPrice && (
                <span className="absolute top-4 left-4 bg-brand-main text-white px-2 py-1 z-10 rounded">
                  Sale
                </span>
              )}
              <Image
                src={arrival.imagea}
                alt={arrival.title}
                fill
                className="object-cover group-hover:opacity-0"
              />
              <Image
                src={arrival.image}
                alt={`${arrival.title} alternate view`}
                fill
                className="object-cover opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-medium text-lg inline-block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-[80%]">
                {arrival.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 lg:line-clamp-1">
                {arrival.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-brand-dark font-medium">
                  ${arrival.discountPrice || arrival.price}
                </span>
                {arrival.discountPrice && (
                  <span className="text-brand-main line-through">
                    ${arrival.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
