"use client";

import React, { useState, useEffect, Suspense } from "react";
import DealCard from "@/components/dealCard/page";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import AtomLoader from "@/components/loader/AtomLoader";
import { formatPrice } from "@/utils/formatNumber";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedItems } from "@/api/products.api";

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
  tag: string;
  images: string[];
  discountPrice?: number;
}

const ProductsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(500);
  const [priceRange, setPriceRange] = useState(500);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredItems"],
    queryFn: getFeaturedItems,
  });

  console.log("🚀 ~ FeaturedPage ~ products:", products);
  console.log("🚀 ~ FeaturedPage ~ isLoading:", isLoading);
  console.log("🚀 ~ FeaturedPage ~ error:", error);

  // Find highest price and set initial products
  useEffect(() => {
    if (products && products.items) {
      const highestPrice = Math.max(
        ...products.items.map(
          (product: Product) => product.discountPrice || product.price
        )
      );
      const roundedMaxPrice = Math.ceil(highestPrice / 1000);
      setMaxPrice(roundedMaxPrice);
      setPriceRange(roundedMaxPrice);
      setFilteredProducts(products.items);
    }
  }, [products]);

  // Handle filtering when price range, category, or tag changes
  useEffect(() => {
    if (products && products.items) {
      let filtered = [...products.items];

      // Apply price filter
      filtered = filtered.filter(
        (product) =>
          (product.discountPrice || product.price) <= priceRange * 1000
      );

      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [priceRange, products]);

  const productsPerPage = 32;

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

  if (isLoading) {
    return <AtomLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 sm:gap-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-main">Featured Products</span>
        </nav>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Featured Products
          </h2>
          <p className="text-gray-600">
            Failed to load featured products. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!products || !products.items || products.items.length === 0) {
    return (
      <div className="flex flex-col gap-4 sm:gap-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-main">Featured Products</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          Featured Products
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-600">
            No featured products available at the moment.
          </p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col gap-4 sm:gap-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-main">Featured Products</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          {products.tagName || "Featured Products"}
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setPriceRange(maxPrice);
            }}
            className="mt-4 px-6 py-2 bg-brand-main text-white rounded-md hover:bg-brand-main/80 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-brand-main transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-brand-main">Featured Products</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold capitalize">
        {products.tagName || "Featured Products"}
      </h1>

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
