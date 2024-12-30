"use client";

import React from "react";
import image1 from "@/assets/imgs/landing/latest-arrivals/1a.jpg";
import image1a from "@/assets/imgs/landing/latest-arrivals/1.jpg";
import image2 from "@/assets/imgs/landing/latest-arrivals/2a.jpg";
import image2a from "@/assets/imgs/landing/latest-arrivals/2.jpg";
import image3 from "@/assets/imgs/landing/latest-arrivals/3a.jpg";
import image3a from "@/assets/imgs/landing/latest-arrivals/3.jpg";
import image4 from "@/assets/imgs/landing/latest-arrivals/4a.jpg";
import image4a from "@/assets/imgs/landing/latest-arrivals/4.jpg";
import MainButton from "@/components/mainButton/page";
import DealCard from "@/components/dealCard/page";

const LatestArrivals = () => {
  const latestArrivals = [
    {
      image: image1.src,
      imagea: image1a.src,
      title: "PXN Gaming Controller X1",
      description:
        "Professional gaming controller with customizable buttons and RGB lighting lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      price: 79.99,
      discountPrice: 59.99,
    },
    {
      image: image2.src,
      imagea: image2a.src,
      title: "PXN Racing Wheel Pro",
      description: "900° rotation racing wheel with force feedback and pedals",
      price: 299.99,
    },
    {
      image: image3.src,
      imagea: image3a.src,
      title: "PXN Flight Control Stick",
      description:
        "Premium flight stick with precise controls and multiple buttons",
      price: 149.99,
      discountPrice: 129.99,
    },
    {
      image: image4.src,
      imagea: image4a.src,
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
          <MainButton text="View All" />
        </div>
        {latestArrivals.map((arrival, index) => (
          <DealCard key={index} {...arrival} />
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
