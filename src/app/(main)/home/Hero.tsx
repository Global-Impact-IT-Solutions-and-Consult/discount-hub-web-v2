"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import MainButton from "@/components/mainButton/page";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";
import Link from "next/link";

// images
import image1 from "@/assets/imgs/landing/hero/1.webp";
import image2 from "@/assets/imgs/landing/hero/2.webp";
import image3 from "@/assets/imgs/landing/hero/PXN_hero_bg.png";
import footwear from "@/assets/imgs/categories/footwear.jpg";
import audio_and_headphones from "@/assets/imgs/categories/audio_and_headphones.jpg";
import home_decor from "@/assets/imgs/categories/home_decor.jpg";
import clothing from "@/assets/imgs/categories/clothing.jpg";

// Banner
import beauty_and_cosmetics from "@/assets/imgs/categories/beauty_and_cosmetics_baner.png";
import personal_care from "@/assets/imgs/categories/personal_care_banner.jpg";
import electronics from "@/assets/imgs/categories/electronics.jpg";
import accessories from "@/assets/imgs/categories/accessories.jpg";
import home_appliances from "@/assets/imgs/categories/home_appliances.jpg";
import furniture from "@/assets/imgs/categories/furnitures.jpg";
import health_and_beauty from "@/assets/imgs/categories/health_and_beauty_2.jpg";
import phones_and_tablets from "@/assets/imgs/categories/phones_and_tablets.jpg";
import fashion from "@/assets/imgs/categories/fashion.jpg";
import gaming from "@/assets/imgs/categories/gaming.jpg";
import photography from "@/assets/imgs/categories/photography.jpg";
import jewelries from "@/assets/imgs/categories/jewelries.jpg";
import books from "@/assets/imgs/categories/books_banner.jpg";
import groceries from "@/assets/imgs/categories/groceries_banner.jpg";
import home_and_office from "@/assets/imgs/categories/home_and_office_banner.jpg";
import kitchenware from "@/assets/imgs/categories/kitchenware_banner_1.jpg";
import beverages from "@/assets/imgs/categories/beverages_banner.png";

interface Category {
  category: {
    name: string;
    title: string;
  };
}

const Hero = () => {
  const { data: allCategories, isLoading } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      name: "PXN Gaming Controller X1",
      category: "Gaming Controllers",
      image: image1,
    },
    {
      name: "PXN Pro Wireless",
      category: "Gaming Controllers",
      image: image2,
    },
    {
      name: "PXN Elite Series",
      category: "Gaming Controllers",
      image: image3,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: any) => {
    setCurrentSlide(index);
  };

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
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {allCategories.map((category: Category, index: number) => {
          const imageKey = category.category.name
            .toLowerCase()
            .replace(/\s+/g, "_");
          const categoryImage = imagesMap[imageKey] || null;
          const categoryLink = `/categories/one?category=${encodeURIComponent(
            category.category.name
          )}`;

          return (
            <div
              key={index}
              className="relative min-w-full h-[500px] flex items-end bg-gray-400"
            >
              {/* Slide Image */}
              <Image
                src={categoryImage}
                alt={category.category.name}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Slide Content */}
              <div className="absolute bottom-16 left-8 z-10 text-white">
                {/* <span className="text-xs">{product.category}</span> */}
                <h3 className="text-2xl font-bold mb-4 capitalize">
                  {category.category.name}
                </h3>
                <Link href={categoryLink}>
                  <MainButton
                    text="View Category"
                    className="text-white bg-brand-main w-fit border-none hover:bg-brand-main/80"
                  />
                </Link>
              </div>
            </div>
          );
        })}

        {/* {products.map((product, index) => (
          <div
            key={index}
            className="relative min-w-full h-[500px] flex items-end bg-gray-400"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-16 left-8 z-10 text-white">
              <span className="text-xs">{product.category}</span>
              <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
              <MainButton
                text="Shop Product"
                className="text-white bg-brand-main w-fit border-none hover:bg-brand-main/80"
              />
            </div>
          </div>
        ))} */}
      </div>
      {/* Navigation Buttons */}
      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
        onClick={handlePrevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
        onClick={handleNextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import MainButton from "@/components/mainButton/page";

// // images
// import image1 from "@/assets/imgs/landing/hero/1.webp";
// import image2 from "@/assets/imgs/landing/hero/2.webp";
// // import image2 from "@/assets/imgs/landing/hero/PXN_hero_bg_mobile.png";
// import image3 from "@/assets/imgs/landing/hero/PXN_hero_bg.png";

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const products = [
//     {
//       name: "PXN Gaming Controller X1",
//       category: "Gaming Controllers",
//       image: image1,
//     },
//     {
//       name: "PXN Pro Wireless",
//       category: "Gaming Controllers",
//       image: image2,
//     },
//     {
//       name: "PXN Elite Series",
//       category: "Gaming Controllers",
//       image: image3,
//     },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
//     }, 10000); // 10 seconds

//     return () => clearInterval(timer);
//   }, []);

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
//   };

//   const handleDotClick = (index: number) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <>
//       <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
//         <span className="absolute top-8 left-8 text-xs text-white z-10">
//           {products[currentSlide].category}
//         </span>
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {products.map((product, index) => (
//             <div key={index} className="min-w-full h-[500px] bg-gray-400">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-black/30" />{" "}
//               {/* Dark overlay */}
//             </div>
//           ))}
//         </div>
//         <div className="absolute bottom-16 left-8 z-10 flex justify-between items-end w-[calc(100%-2rem)] md:w-[94%] md:mx-auto">
//           <div>
//             <h3 className="text-white text-2xl font-bold mb-4">
//               {products[currentSlide].name}
//             </h3>
//             <MainButton
//               text="Shop Product"
//               className="text-white bg-brand-main w-fit border-none hover:bg-brand-main/80"
//             />
//           </div>
//           <div className="hidden md:flex items-center gap-8">
//             <div className="flex gap-2">
//               {products.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDotClick(index)}
//                   className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}
//                 />
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="bg-white/50 hover:bg-white/75 p-2 rounded-full"
//                 onClick={() => handlePrevSlide()}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M15.75 19.5L8.25 12l7.5-7.5"
//                   />
//                 </svg>
//               </button>
//               <button
//                 className="bg-white/50 hover:bg-white/75 p-2 rounded-full"
//                 onClick={() => handleNextSlide()}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//         <button
//           className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
//           onClick={() => handlePrevSlide()}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 19.5L8.25 12l7.5-7.5"
//             />
//           </svg>
//         </button>
//         <button
//           className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
//           onClick={() => handleNextSlide()}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M8.25 4.5l7.5 7.5-7.5 7.5"
//             />
//           </svg>
//         </button>
//         <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//           {products.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleDotClick(index)}
//               className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;
