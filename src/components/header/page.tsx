"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Sidebar from "../sidebar/page";
import { BiSearch, BiSolidDiscount } from "react-icons/bi";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import AtomLoader from "@/components/loader/AtomLoader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import defaultImage from "@/assets/imgs/landing/latest-arrivals/1a.jpg";
import { formatPrice } from "@/utils/formatNumber";
import { AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  searchProducts,
} from "@/api/products.api";
import { AiFillApple } from "react-icons/ai";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface Category {
  category: {
    name: string;
  };
}

interface SearchProduct {
  id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string[];
}

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const router = useRouter();
  const searchInputRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: fetchProducts,
  });

  const { data: allCategories } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  // Reset showAllCategories when dropdown closes
  const handleDropdownClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsOpen(false);
      setShowAllCategories(false);
    }
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  // Replace empty categories with loader while loading
  const categoriesContent = isLoading ? (
    <AtomLoader />
  ) : (
    <>
      {allCategories?.slice(0, 5).map((category: Category, index: number) => (
        <Link
          key={index}
          href={`/categories/one?category=${encodeURIComponent(
            category.category.name
          )}`}
          className="transition-fx text-brand-dark px-4 py-2 text-sm cursor-pointer border-b-2 border-gray-200 hover:text-brand-grayish/65"
        >
          {category.category.name}
        </Link>
      ))}
      {!showAllCategories && allCategories?.length > 5 && (
        <Link
          href={"/categories"}
          className="transition-fx text-brand-main px-4 py-2 text-sm font-semibold text-left hover:text-brand-main/80"
        >
          All Categories
        </Link>
        // <button
        //   onClick={() => setShowAllCategories(true)}
        //   className="transition-fx text-brand-main px-4 py-2 text-sm font-semibold text-left hover:text-brand-main/80"
        // >
        //   All Categories
        // </button>
      )}
      {showAllCategories && (
        <div className="max-h-[400px] overflow-y-auto">
          {allCategories?.slice(5).map((category: Category, index: number) => (
            <div
              key={index + 5}
              className="transition-fx text-brand-dark px-4 py-2 text-sm cursor-pointer border-b-2 border-gray-200 hover:text-brand-grayish/65"
            >
              {category.category.name}
            </div>
          ))}
        </div>
      )}
    </>
  );

  // Handle search input
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await searchProducts(query);
      setSearchResults(results.slice(0, 5));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  // Handle "See all products" click
  const handleSeeAll = () => {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowSearch(false);
    setSearchQuery("");
    setSearchInput("");
    setSearchResults([]);
  };

  // Add click outside handler for search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
        setSearchQuery("");
        setSearchInput("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.div
        animate={isHidden ? "hidden" : "animate"}
        variants={{
          hidden: {
            y: "-100%",
          },
          visible: {
            y: "0%",
          },
        }}
        transition={{ duration: 0.2 }}
        className="z-50 bg-brand-white w-full h-[78px] flex items-center justify-center fixed top-0 left-0"
      >
        <div className="relative px-2 flex items-end justify-between  mx-auto w-[97%] max-w-[1280px] lg:px-0 lg:w-[95%]">
          <div className="flex items-center gap-6">
            <span
              className="cursor-pointer transition-fx hover:text-brand-main"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-left"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M6 16h10"
                />
              </svg>
            </span>
            <Sidebar
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            />
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={handleDropdownClose}
            >
              <motion.div className="hidden items-center text-xs font-semibold gap-2 cursor-pointer lg:flex group">
                <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                  Categories
                </span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                  <IoChevronDown />
                </motion.span>
              </motion.div>
              <motion.div
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto", display: "block" },
                  collapsed: { opacity: 0, height: 0, display: "none" },
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-md overflow-hidden border-2 border-gray-200"
              >
                <div className="flex flex-col py-2">{categoriesContent}</div>
              </motion.div>
            </div>
            <Link
              href="/products"
              className="hidden items-center text-xs font-semibold gap-2 cursor-pointer lg:flex group"
            >
              <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                All Products
              </span>
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <BiSolidDiscount className="text-brand-main text-2xl" />
            <span className="text-brand-dark text-base font-bold lg:text-xl">
              Discounts Hub
            </span>
          </Link>
          <div className="flex items-center gap-4 mr-4 lg:mr-0">
            <div className="relative" ref={searchInputRef}>
              <BiSearch
                className="text-brand-dark text-2xl cursor-pointer hover:text-brand-main lg:text-base"
                onClick={() => setShowSearch(!showSearch)}
              />

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-[-10px] right-0 z-50"
                  >
                    <div className="flex items-center gap-2 bg-white shadow-lg rounded-md p-2">
                      <input
                        type="text"
                        // value={searchQuery}
                        value={searchInput}
                        // onChange={(e) => handleSearch(e.target.value)}
                        // onChange={(e) => onchangeHandler(e.target.value)}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search products..."
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-main w-60 text-sm"
                        autoFocus
                      />
                      <BiSearch
                        className="text-brand-dark text-2xl cursor-pointer hover:text-brand-main lg:text-base"
                        // onClick={() => setShowSearch(!showSearch)}
                        onClick={() => handleSearch(searchInput)}
                      />
                    </div>

                    {searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden border-2 border-gray-200"
                      >
                        <div className="max-h-[400px] overflow-y-auto">
                          {searchResults.map(
                            (product: SearchProduct, index: number) => (
                              <Link
                                key={`search-result-${index}-${product.name}`}
                                href={`/products?search=${encodeURIComponent(product.name)}`}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                  setShowSearch(false);
                                  setSearchQuery("");
                                  setSearchResults([]);
                                }}
                              >
                                <div className="w-12 h-12 relative rounded overflow-hidden">
                                  <Image
                                    src={
                                      product.images?.[0] || defaultImage.src
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium line-clamp-1">
                                    {product.name}
                                  </h4>
                                  <p className="text-sm text-brand-main">
                                    {formatPrice(
                                      product.discountPrice || product.price
                                    )}
                                  </p>
                                </div>
                              </Link>
                            )
                          )}

                          <button
                            onClick={handleSeeAll}
                            className="w-full p-3 text-center text-brand-main hover:bg-gray-50 transition-colors font-medium border-t"
                          >
                            See all results
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden h-6 w-[1px] bg-gray-300 lg:block"></div>
            <div className="hidden items-center text-xs font-semibold gap-2 cursor-pointer lg:flex group">
              <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                My Account
              </span>
            </div>
            <div className="hidden h-6 w-[1px] bg-gray-300 lg:block"></div>
            <Link
              href={"/chat"}
              className="group flex items-center gap-2 cursor-pointer group bg-brand-dark rounded-full px-4 py-2 border-[1px] hover:bg-brand-white hover:border-brand-dark"
            >
              <SparklesIcon className="text-brand-white w-5 h-5 group-hover:text-brand-main lg:text-base" />
              <span className="hidden text-brand-white text-xs font-semibold group-hover:text-brand-dark lg:block ">
                Chat With AI
              </span>
            </Link>
            {/* <button className="flex items-center px-4 py-2 rounded-full bg-green-100">
              <SparklesIcon className="w-5 h-5 text-green-500" />
              <span className="ml-2 text-green-700 font-medium">AI</span>
            </button> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
