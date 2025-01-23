"use client";

import React from "react";

import electronics from "@/assets/imgs/categories/electronics.jpg";
import home_appliances from "@/assets/imgs/categories/home_appliances.jpg";
import furniture from "@/assets/imgs/categories/furnitures.jpg";
import accessories from "@/assets/imgs/categories/accessories.jpg";
import health_and_beauty from "@/assets/imgs/categories/health_and_beauty_2.jpg";
import phones_and_tablets from "@/assets/imgs/categories/phones_and_tablets.jpg";
import books from "@/assets/imgs/categories/books.jpg";
import groceries from "@/assets/imgs/categories/groceries.jpg";
import home_and_office from "@/assets/imgs/categories/home_and_office.jpg";
import personal_care from "@/assets/imgs/categories/personal_care_1.jpg";
import jewelries from "@/assets/imgs/categories/jewelries.jpg";
import beauty_and_cosmetics from "@/assets/imgs/categories/beauty_and_cosmetics.jpg";
import kitchenware from "@/assets/imgs/categories/kitchenware.jpg";
import beverages from "@/assets/imgs/categories/beverages.jpg";
import footwear from "@/assets/imgs/categories/footwear.jpg";
import fashion from "@/assets/imgs/categories/fashion.jpg";
import audio_and_headphones from "@/assets/imgs/categories/audio_and_headphones.jpg";
import home_decor from "@/assets/imgs/categories/home_decor.jpg";
import clothing from "@/assets/imgs/categories/clothing.jpg";
import gaming from "@/assets/imgs/categories/gaming.jpg";
import photography from "@/assets/imgs/categories/photography.jpg";

import Link from "next/link";
import CategoryCard from "@/components/categoryCard/page";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";
import { StaticImageData } from "next/image";

interface Category {
  category: {
    name: string;
    title: string;
  };
}

// Utility function to get initials from a category name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

// Utility function to generate a random color
const getRandomColor = () => {
  const colors = [
    "#C0A500",
    "#D03E00",
    "#1A7FBB",
    "#2E8B2D",
    "#D0127A",
    "#8B5A2B",
    "#6A5ACD",
    "#FF8C00",
    "#4682B4",
  ]; // More muted and additional colors
  return colors[Math.floor(Math.random() * colors.length)];
};

const Categories = () => {
  const { data: allCategories, isLoading } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  // console.log("🚀 ~ Categories ~ allCategories:", allCategories);

  const imagesMap: Record<string, StaticImageData> = {
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

  if (isLoading) {
    return <AtomLoader />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-main">Categories</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          {"All Categories"}
        </h1>
        <div className="grid grid-cols-12 gap-4">
          {allCategories && (
            <>
              {allCategories.map((category: Category, index: number) => {
                const imageKey = category.category.name
                  .toLowerCase()
                  .replace(/\s+/g, "_");
                const categoryImage = imagesMap[imageKey];
                const categoryLink = `/categories/one?category=${encodeURIComponent(
                  category.category.name
                )}`;

                // Render categories with images first
                if (categoryImage) {
                  return (
                    <CategoryCard
                      key={index}
                      link={categoryLink}
                      image={categoryImage}
                      title={category.category.name}
                    />
                  );
                }
                return null; // Skip rendering for categories without images
              })}
              {allCategories.map((category: Category, index: number) => {
                const imageKey = category.category.name
                  .toLowerCase()
                  .replace(/\s+/g, "_");
                const categoryImage = imagesMap[imageKey];

                // Only render initials for categories without images
                if (!categoryImage) {
                  const initials = getInitials(category.category.name);
                  const bgColor = getRandomColor();

                  const categoryLink = `/categories/one?category=${encodeURIComponent(
                    category.category.name
                  )}`;

                  return (
                    <Link
                      key={index}
                      className="relative col-span-6 md:col-span-4 lg:col-span-2 h-48 overflow-hidden rounded-lg group cursor-pointer"
                      href={categoryLink}
                      target="_blank"
                    >
                      <div
                        // className="relative col-span-6 h-48 overflow-hidden rounded-lg group cursor-pointer flex items-center justify-center md:col-span-4 lg:col-span-2 "
                        className="object-cover transition-transform duration-300 relative col-span-6 h-48 overflow-hidden rounded-lg group cursor-pointer flex items-center justify-center md:col-span-4 lg:col-span-2 group-hover:scale-110"
                        style={{
                          backgroundColor: bgColor,
                        }}
                      >
                        <Link
                          href={categoryLink}
                          className="text-white text-4xl text-center font-bold"
                        >
                          {initials}
                        </Link>
                      </div>
                      <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
                        <span className="text-white font-medium capitalize">
                          {category.category.name}
                        </span>
                      </div>
                    </Link>
                  );
                }
                return null; // Skip rendering for categories with images
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
