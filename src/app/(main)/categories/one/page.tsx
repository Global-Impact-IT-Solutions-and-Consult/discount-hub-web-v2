"use client";

import React, { useState, useEffect, Suspense } from "react";
import DealCard from "@/components/dealCard/page";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import {
  // IoChevronDown,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import AtomLoader from "@/components/loader/AtomLoader";
import { formatPrice } from "@/utils/formatNumber";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/api/products.api";
// import bg from "@/assets/imgs/categories/categoryBg.jpg";

interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  category: string;
  storeName: string;
  storeLogo: string;
  description: string;
  badgeColor: string;
  images: string[];
  discountPrice?: number;
}

interface Category {
  category: {
    name: string;
  };
  productCount: number;
  productsInCategory: Product[];
}

const ProductsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  // const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(500);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // const [randomColor, setRandomColor] = useState("teal");

  const { data: products, isLoading } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
  });

  const { data: allCategories = [] } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  // Set initial category from URL
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(decodeURIComponent(categoryFromUrl));
    }
  }, [categoryFromUrl]);

  // Find highest price and set initial products
  useEffect(() => {
    if (products) {
      const highestPrice = Math.max(
        ...products.map(
          (product: Product) => product.discountPrice || product.price
        )
      );
      const roundedMaxPrice = Math.ceil(highestPrice / 1000);
      setMaxPrice(roundedMaxPrice);
      setPriceRange(roundedMaxPrice);
      setFilteredProducts(products);
    }
  }, [products]);

  // Handle filtering when price range or category changes
  useEffect(() => {
    if (products) {
      let filtered = [...products];

      // Apply search filter if query exists
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter if selected
      if (selectedCategory) {
        const selectedCategoryData = allCategories.find(
          (cat: Category) => cat.category.name === selectedCategory
        );
        if (selectedCategoryData) {
          filtered = selectedCategoryData.productsInCategory;
        } else {
          filtered = filtered.filter(
            (product) => product.category === selectedCategory
          );
        }
      }

      // Apply price filter
      filtered = filtered.filter(
        (product) =>
          (product.discountPrice || product.price) <= priceRange * 1000
      );

      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [priceRange, selectedCategory, products, allCategories, searchQuery]);

  const productsPerPage = 32;

  // const handleCategorySelect = (category: Category) => {
  //   setSelectedCategory(category.category.name);
  //   setIsFilterOpen(false);
  // };

  const sortedProducts = [...filteredProducts].sort(
    (a: Product, b: Product) => {
      switch (sortBy) {
        case "price-low":
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case "price-high":
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    }
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Utility function to generate a random color
  // const getRandomColor = () => {
  //   const colors = [
  //     // "#F8FAFC", // slate-300
  //     // "#D1D5DB", // gray-300
  //     // "#D4D4D8", // zinc-300
  //     // "#D6D3C0", // neutral-300
  //     // "#D9D9D9", // stone-300
  //     "#FCA5A1", // red-300
  //     // "#FBBF24", // orange-300
  //     "#FBBF24", // amber-300
  //     // "#FDE047", // yellow-300
  //     "#A6E3A1", // lime-300
  //     "#4ADE80", // green-300
  //     "#34D399", // emerald-300
  //     "#2DD4BF", // teal-300
  //     "#22D3EE", // cyan-300
  //     "#38BDF8", // sky-300
  //     "#3B82F6", // blue-300
  //     "#6366F1", // indigo-300
  //     "#8B5BE5", // violet-300
  //     "#A855F7", // purple-300
  //     "#D946EF", // fuchsia-300
  //     "#F472B6", // pink-300
  //     "#F43F5E", // rose-300
  //   ];

  //   return colors[Math.floor(Math.random() * colors.length)];
  // };

  // useEffect(() => {
  //   setRandomColor(getRandomColor());
  // }, [categoryFromUrl]);

  if (isLoading) {
    return <AtomLoader />;
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-brand-main transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/categories"
          className="hover:text-brand-main transition-colors"
        >
          Categories
        </Link>
        <span>/</span>
        <span className="text-brand-main capitalize">{selectedCategory}</span>
      </nav>

      {/* Add a banner Image here, you can use svg or something to make a design then put the category name in the center of the banner, make it like a jumbotron or some hero image */}
      <div
        className="w-full p-16 rounded-lg flex items-center justify-center bg-emerald-400 lg:py-32"
        // style={{
        //   backgroundImage: `url(${bg})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   opacity: 0.8, // Adjust transparency here
        //   backgroundColor: randomColor,
        // }}
      >
        <h1 className="text-3xl font-bold text-brand-white capitalize sm:text-4xl">
          {selectedCategory}
        </h1>
      </div>

      {/* <h1 className="text-3xl sm:text-4xl font-bold capitalize">
        {selectedCategory}
      </h1> */}

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
            Showing {startIndex + 1}–{Math.min(endIndex, sortedProducts.length)}{" "}
            of {sortedProducts.length} results
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
              className="fixed top-0 left-0 h-full w-[280px] sm:w-80 bg-white z-50"
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
                        max={maxPrice}
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-4">
                        <span>{formatPrice(0)}</span>
                        <span>{formatPrice(priceRange * 1000)}</span>
                      </div>
                    </div>
                  </div>
                </span>
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-12 gap-4">
        {currentProducts.map((product: Product, index: number) => (
          <div
            key={`product-${product.id}-${index}`}
            className="col-span-6 my-8 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <DealCard
              image={product.images?.[0] || ""}
              imagea={product.images?.[1] || product.images?.[0] || ""}
              title={product.name || "Untitled Product"}
              price={product.price || 0}
              discountPrice={product.discountPrice}
              store={product.storeName || "No store available"}
              logo={product.storeLogo}
              badgeColor={product.badgeColor}
              id={product._id}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8 text-sm font-bold">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <IoChevronBack className="w-5 h-5" />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={`page-${page}`}
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
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          <IoChevronForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// export default ProductsPage;

export default function Page() {
  return (
    <Suspense fallback={<AtomLoader />}>
      <ProductsPage />
    </Suspense>
  );
}
