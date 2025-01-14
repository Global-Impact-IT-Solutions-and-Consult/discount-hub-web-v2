"use client";

import React from "react";
import electronics from "@/assets/imgs/landing/by-category/electronics.jpg";
import home_appliances from "@/assets/imgs/landing/by-category/home_appliances.jpg";
import furnitures from "@/assets/imgs/landing/by-category/furnitures.jpg";
import fashion from "@/assets/imgs/landing/by-category/accessories.jpg";
import health_and_beauty from "@/assets/imgs/landing/by-category/health_and_beauty_2.jpg";
import phones_and_tablets from "@/assets/imgs/landing/by-category/phones_and_tablets.jpg";
import MainButton from "@/components/mainButton/page";
import Link from "next/link";
import CategoryCard from "@/components/categoryCard/page";

const ByCategory = () => {
  const categories = [
    {
      image: electronics,
      title: "Electronics",
      link: "/products?category=electronics",
    },
    {
      image: home_appliances,
      title: "Home Appliances",
      link: "/products?category=home%20appliances",
    },
    {
      image: furnitures,
      title: "Furnitures",
      link: "/products?category=furnitures",
    },
    {
      image: fashion,
      title: "Fashion",
      link: "/products?category=fashion",
    },
    {
      image: health_and_beauty,
      title: "Health and Beauty",
      // link: "/products?category=health%20and%20beauty",
      link: `/products?category=${"health and beauty"}`,
    },
    {
      image: phones_and_tablets,
      title: "Phones and Tablets",
      link: "/products?category=phones%20and%20tablets",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Shop by category</span>
          <Link href="/categories">
            <MainButton text="View All" />
          </Link>
        </div>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            link={category.link}
            image={category.image}
            title={category.title}
          />
          // <Link
          //   key={index}
          //   className="relative col-span-6 md:col-span-4 lg:col-span-2 h-48 overflow-hidden rounded-lg group cursor-pointer"
          //   // target="_blank"
          //   href={category.link}
          // >
          //   <Image
          //     src={category.image}
          //     alt={category.title}
          //     fill
          //     className="object-cover transition-transform duration-300 group-hover:scale-110"
          //   />
          //   <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
          //     <span className="text-white font-medium">{category.title}</span>
          //   </div>
          // </Link>
        ))}
      </div>
    </>
  );
};

export default ByCategory;
