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
import defaultImage from "@/assets/imgs/categories/default.jpg"; // Placeholder for unmatched categories

import Link from "next/link";
import CategoryCard from "@/components/categoryCard/page";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";

interface Category {
  category: {
    name: string;
    title: string;
  };
}

const Categories = () => {
  const { data: allCategories, isLoading } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  console.log("🚀 ~ Categories ~ allCategories:", allCategories);

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
                const categoryImage = imagesMap[imageKey] || defaultImage;
                const categoryLink = `/categories/one?category=${encodeURIComponent(
                  category.category.name
                )}`;

                // Render categories with default image
                if (!imagesMap[imageKey]) {
                  return (
                    <CategoryCard
                      key={index}
                      link={categoryLink}
                      image={categoryImage}
                      title={category.category.name}
                    />
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

// "use client";

// import React from "react";

// import electronics from "@/assets/imgs/landing/by-category/electronics.jpg";
// import home_appliances from "@/assets/imgs/landing/by-category/home_appliances.jpg";
// import furnitures from "@/assets/imgs/landing/by-category/furnitures.jpg";
// import fashion from "@/assets/imgs/landing/by-category/accessories.jpg";
// import health_and_beauty from "@/assets/imgs/landing/by-category/health_and_beauty_2.jpg";
// import phones_and_tablets from "@/assets/imgs/landing/by-category/phones_and_tablets.jpg";
// import books from "@/assets/imgs/categories/books.jpg";
// import groceries from "@/assets/imgs/categories/groceries.jpg";
// import home_and_office from "@/assets/imgs/categories/home_and_office.jpg";
// import personal_care from "@/assets/imgs/categories/personal_care_1.jpg";
// import jewelries from "@/assets/imgs/categories/jewelries.jpg";
// import Link from "next/link";
// import CategoryCard from "@/components/categoryCard/page";
// import { useQuery } from "@tanstack/react-query";
// import { fetchCategories } from "@/api/products.api";
// import AtomLoader from "@/components/loader/AtomLoader";

// interface Category {
//   category: {
//     name: string;
//   };
// }

// const Categories = () => {
//   const { data: allCategories, isLoading } = useQuery({
//     queryKey: ["fetchCategories"],
//     queryFn: fetchCategories,
//   });
//   console.log("🚀 ~ Categories ~ allCategories:", allCategories);

//   if (isLoading) {
//     return <AtomLoader />;
//   }

//   // const categories = [
//   //   {
//   //     image: electronics,
//   //     title: "Electronics",
//   //     link: "/products?category=electronics",
//   //   },
//   //   {
//   //     image: home_appliances,
//   //     title: "Home Appliances",
//   //     link: "/products?category=home appliances",
//   //   },
//   //   {
//   //     image: furnitures,
//   //     title: "Furnitures",
//   //     link: "/products?category=furnitures",
//   //   },
//   //   {
//   //     image: fashion,
//   //     title: "Fashion",
//   //     link: "/products?category=fashion",
//   //   },
//   //   {
//   //     image: health_and_beauty,
//   //     title: "Health and Beauty",
//   //     link: "/products?category=health and beauty",
//   //   },
//   //   {
//   //     image: phones_and_tablets,
//   //     title: "Phones and Tablets",
//   //     link: "/products?category=phones and tablets",
//   //   },
//   //   {
//   //     image: books,
//   //     title: "Books",
//   //     link: "/products?category=books",
//   //   },
//   //   {
//   //     image: groceries,
//   //     title: "Groceries",
//   //     link: "/products?category=groceries",
//   //   },
//   //   {
//   //     image: home_and_office,
//   //     title: "Home and Office",
//   //     link: "/products?category=home and office",
//   //   },
//   //   {
//   //     image: personal_care,
//   //     title: "Personal Care",
//   //     link: "/products?category=personal care",
//   //   },
//   //   {
//   //     image: jewelries,
//   //     title: "Jewelries",
//   //     link: "/products?category=jewelries",
//   //   },
//   //   // {
//   //   //   image: phones_and_tablets,
//   //   //   title: "Phones and Tablets",
//   //   //   link: "/products?category=phones%20and%20tablets",
//   //   // },
//   // ];

//   return (
//     <>
//       <div className="flex flex-col gap-4 sm:gap-8">
//         <nav className="flex items-center gap-2 text-sm text-gray-600">
//           <Link href="/" className="hover:text-brand-main transition-colors">
//             Home
//           </Link>
//           <span>/</span>
//           <span className="text-brand-main">Categories</span>
//         </nav>

//         <h1 className="text-3xl sm:text-4xl font-bold capitalize">
//           {"All Categories"}
//         </h1>
//         <div className="grid grid-cols-12 gap-4">
//           {allCategories && (
//             <>
//               {allCategories?.map((category, index) => (
//                 <CategoryCard
//                   key={index}
//                   link={`/${category.category.name}`}
//                   image={category.category.name}
//                   title={category.category.title}
//                 />
//               ))}
//             </>
//           )}
//           {/* {categories.map((category, index) => (
//             <CategoryCard
//               key={index}
//               link={category.link}
//               image={category.image}
//               title={category.title}
//             />
//           ))} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;
