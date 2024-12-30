"use client";

import React, { useState } from "react";
import DealCard from "@/components/dealCard/page";
import Link from "next/link";
import image1 from "@/assets/imgs/landing/latest-arrivals/1a.jpg";
import image1a from "@/assets/imgs/landing/latest-arrivals/1.jpg";
import image2 from "@/assets/imgs/landing/latest-arrivals/2a.jpg";
import image2a from "@/assets/imgs/landing/latest-arrivals/2.jpg";
import image3 from "@/assets/imgs/landing/latest-arrivals/3a.jpg";
import image3a from "@/assets/imgs/landing/latest-arrivals/3.jpg";
import image4 from "@/assets/imgs/landing/latest-arrivals/4a.jpg";
import image4a from "@/assets/imgs/landing/latest-arrivals/4.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import {
  IoChevronDown,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";

const ProductsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
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
    // Duplicating the same products to fill the grid
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
    <div className="flex flex-col gap-4 sm:gap-8">
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-brand-main transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-brand-main">Products</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>

      <div className="pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm font-semibold my-4 sm:my-8 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-white border border-gray-300 rounded-[4px] hover:bg-brand-main hover:text-white hover:border-brand-main transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <span>Filters</span>
            <FiFilter className="w-5 h-5" />
          </button>
          <span className="text-gray-600 text-center sm:text-left w-full sm:w-auto">
            Showing 1–{products.length} of {products.length} results
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <span>Sort by: </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-main w-full sm:w-auto"
          >
            <option value="default">Default sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Sort by name</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 h-full w-[280px] sm:w-80 bg-white z-50 overflow-y-auto"
            >
              <span className="bg-brand-white w-full h-full flex flex-col justify-start items-start p-4 gap-12">
                <motion.span
                  onClick={() => setIsFilterOpen(false)}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiX className="text-brand-dark text-2xl cursor-pointer h-[40px]" />
                </motion.span>

                <span className="flex flex-col gap-12 w-full">
                  <div className="flex flex-col gap-6 w-full">
                    <span className="text-brand-dark text-sm font-semibold lg:text-base">
                      Price Range
                    </span>
                    <div className="pl-4">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        className="w-full"
                      />
                      <div className="flex justify-between mt-4">
                        <span>$0</span>
                        <span>$500</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <div
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                    >
                      <span className="transition-fx group-hover:text-brand-grayish/65">
                        Categories
                      </span>
                      <motion.span
                        animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                        className="text-sm font-normal"
                      >
                        <IoChevronDown />
                      </motion.span>
                    </div>
                    <motion.div
                      initial="collapsed"
                      animate={isCategoriesOpen ? "open" : "collapsed"}
                      variants={{
                        open: { height: "auto", opacity: 1, marginTop: 8 },
                        collapsed: { height: 0, opacity: 0, marginTop: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-6 pl-4 py-2">
                        {[
                          "Controllers",
                          "Racing Wheels",
                          "Flight Controls",
                          "Accessories",
                        ].map((category, index) => (
                          <div
                            key={index}
                            className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                          >
                            <span className="transition-fx text-xs text-brand-dark font-semibold group-hover:text-brand-grayish/65">
                              {category}
                            </span>
                            <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </span>
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-12 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <DealCard
              image={product.image}
              imagea={product.imagea}
              title={product.title}
              description={product.description}
              price={product.price}
              discountPrice={product.discountPrice}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8 text-sm font-bold">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <IoChevronBack className="w-5 h-5" />
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? "bg-brand-main text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <IoChevronForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
