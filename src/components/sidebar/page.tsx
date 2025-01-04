import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  IoCloseOutline,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
// import { useCategories } from "@/hooks/useQueries";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/products.api";

interface Category {
  category: {
    name: string;
  };
  productCount: number;
}

const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  // const { data: allCategories = [] } = useCategories(); // Removed isLoading since it's not being used

  const { data: allCategories } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: fetchCategories,
  });

  // Reset states when sidebar or dropdown closes
  useEffect(() => {
    if (!showSidebar || !isOpen) {
      setShowAllCategories(false);
    }
  }, [showSidebar, isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSidebar]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate={showSidebar ? "visible" : "hidden"}
        variants={{
          hidden: {
            x: "-100%",
          },
          visible: {
            x: "0%",
          },
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-50 h-screen flex shadow-lg w-[60%] lg:w-[300px] overflow-hidden"
      >
        <span className="bg-brand-white w-full h-full flex flex-col justify-start items-start p-4 gap-8">
          <motion.span
            onClick={() => setShowSidebar(!showSidebar)}
            whileHover={{
              rotate: 180,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* <IoCloseCircleOutline className="text-brand-dark text-2xl cursor-pointer" /> */}
            <IoCloseOutline className="text-brand-dark text-2xl cursor-pointer h-[40px]" />
          </motion.span>
          <span className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-full">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer sticky top-0 bg-brand-white"
              >
                <span className="transition-fx group-hover:text-brand-grayish/65">
                  Categories
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-sm font-normal"
                >
                  <IoChevronDown />
                </motion.span>
              </div>
              <motion.div
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                variants={{
                  open: { height: "auto", opacity: 1, marginTop: 8 },
                  collapsed: { height: 0, opacity: 0, marginTop: 0 },
                }}
                transition={{ duration: 0.3 }}
                style={{
                  maxHeight: showAllCategories
                    ? "calc(2.5rem * 20)"
                    : "calc(2.5rem * 10)",
                  overflowY: showAllCategories ? "auto" : "hidden",
                }}
              >
                <div
                  className={`flex flex-col gap-4 pl-4 py-2 ${showAllCategories ? "border-b border-gray-200" : ""}`}
                >
                  {allCategories
                    ?.filter((category) => category.productCount > 0)
                    ?.slice(0, 10)
                    .map((category: Category, index: number) => (
                      <Link
                        href={`/products?category=${encodeURIComponent(category.category.name)}`}
                        key={index}
                        onClick={() => setShowSidebar(false)}
                        className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                      >
                        <span className="transition-fx text-xs text-brand-dark font-semibold capitalize group-hover:text-brand-grayish/65">
                          {category.category.name} ({category.productCount})
                        </span>
                        <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    ))}
                  {!showAllCategories &&
                    allCategories?.filter(
                      (category) => category.productCount > 0
                    ).length > 10 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        onClick={() => setShowAllCategories(true)}
                        className="transition-fx text-brand-main text-sm font-semibold text-left hover:text-brand-main/80 cursor-pointer"
                      >
                        Show All Categories
                      </motion.div>
                    )}
                  {showAllCategories && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      {allCategories
                        ?.filter((category) => category.productCount > 0)
                        ?.slice(10)
                        .map((category: Category, index: number) => (
                          <Link
                            href={`/products?category=${encodeURIComponent(category.category.name)}`}
                            key={index + 10}
                            onClick={() => setShowSidebar(false)}
                            className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                          >
                            <span className="transition-fx text-xs text-brand-dark font-semibold capitalize group-hover:text-brand-grayish/65">
                              {category.category.name} ({category.productCount})
                            </span>
                            <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
            <Link
              href="/products"
              onClick={() => setShowSidebar(!showSidebar)}
              className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
            >
              <span className="transition-fx group-hover:text-brand-grayish/65">
                All Products
              </span>
              <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </span>
          <div className="h-[1px] w-full bg-gray-300 my-4"></div>
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="group w-full text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
          >
            <span className="transition-fx group-hover:text-brand-grayish/65">
              About Us
            </span>
            <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="group w-full mt-auto text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
          >
            <span className="transition-fx group-hover:text-brand-grayish/65">
              My Account
            </span>
            <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </span>
      </motion.div>
      <motion.span
        onClick={() => setShowSidebar(!showSidebar)}
        animate={showSidebar ? "visible" : "hidden"}
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className={`fixed top-0 left-0 z-30 w-screen bg-gray-800/40 h-screen lg:w-full ${showSidebar ? "block" : "hidden"}`}
      ></motion.span>
    </>
  );
};

export default Sidebar;
