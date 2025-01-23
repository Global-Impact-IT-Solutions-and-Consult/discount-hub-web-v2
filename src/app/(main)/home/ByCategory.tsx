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

import MainButton from "@/components/mainButton/page";
import Link from "next/link";
import CategoryCard from "@/components/categoryCard/page";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/products.api";
import { StaticImageData } from "next/image";
import AtomLoader from "@/components/loader/AtomLoader";

interface Category {
  category: {
    name: string;
    title: string;
  };
}

const ByCategory = () => {
  // const categories = [
  //   {
  //     image: electronics,
  //     title: "Electronics",
  //     link: "/products?category=electronics",
  //   },
  //   {
  //     image: home_appliances,
  //     title: "Home Appliances",
  //     link: "/products?category=home%20appliances",
  //   },
  //   {
  //     image: furnitures,
  //     title: "Furnitures",
  //     link: "/products?category=furnitures",
  //   },
  //   {
  //     image: fashion,
  //     title: "Fashion",
  //     link: "/products?category=fashion",
  //   },
  //   {
  //     image: health_and_beauty,
  //     title: "Health and Beauty",
  //     // link: "/products?category=health%20and%20beauty",
  //     link: `/products?category=${"health and beauty"}`,
  //   },
  //   {
  //     image: phones_and_tablets,
  //     title: "Phones and Tablets",
  //     link: "/products?category=phones%20and%20tablets",
  //   },
  // ];

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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Shop by category</span>
          <Link href="/categories">
            <MainButton text="View All" />
          </Link>
        </div>
        {allCategories && (
          <>
            {allCategories
              .slice(0, 6)
              .map((category: Category, index: number) => {
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
          </>
        )}
        {/* {categories.map((category, index) => (
          <CategoryCard
            key={index}
            link={category.link}
            image={category.image}
            title={category.title}
          />
        ))} */}
      </div>
    </>
  );
};

export default ByCategory;
