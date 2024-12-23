"use client";

// import Image from "next/image";
import React, { useRef, useState } from "react";
// import logo from "@/assets/imgs/logo.png";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Sidebar from "../sidebar/page";
import { BiSearch, BiSolidDiscount } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);

      lastYRef.current = y;
    }
  });

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
              onMouseLeave={(e) => {
                // Check if we're not hovering over the dropdown
                const relatedTarget = e.relatedTarget as HTMLElement;
                if (!e.currentTarget.contains(relatedTarget)) {
                  setIsOpen(false);
                }
              }}
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
                <div className="flex flex-col py-2">
                  <div className="transition-fx text-brand-dark px-4 py-2 text-sm cursor-pointer border-b-2 border-gray-200 hover:text-brand-grayish/65">
                    Category 1
                  </div>
                  <div className="px-4 py-2 text-sm hover:text-brand-grayish/65 cursor-pointer border-b-2 border-gray-200">
                    Category 2
                  </div>
                  <div className="px-4 py-2 text-sm hover:text-brand-grayish/65 cursor-pointer">
                    Category 3
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="hidden items-center text-xs font-semibold gap-2 cursor-pointer lg:flex group">
              <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                All Products
              </span>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <BiSolidDiscount className="text-brand-main text-2xl" />
            <span className="text-brand-dark text-base font-bold lg:text-xl">
              Discounts Hub
            </span>
          </Link>
          <div className="flex items-center gap-4 mr-4 lg:mr-0">
            <div
              className="group flex items-center gap-2 cursor-pointer relative"
              onClick={() => setShowSearch(!showSearch)}
              onBlur={(e) => {
                const relatedTarget = e.relatedTarget as HTMLElement;
                if (!e.currentTarget.contains(relatedTarget)) {
                  setShowSearch(false);
                }
              }}
              tabIndex={0}
            >
              <BiSearch className="transition-fx text-brand-dark text-2xl group-hover:text-brand-main lg:text-base" />
              <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                Search
              </span>
              <motion.div
                initial="collapsed"
                animate={showSearch ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, y: 0 },
                  collapsed: { opacity: 0, y: -100 },
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-full mt-2 -right-8 lg:-right-4 w-[calc(100vw-4rem)] lg:w-72 bg-white shadow-xl rounded-lg p-3 flex items-center gap-2 border border-gray-300"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent border-none outline-none text-sm text-brand-dark placeholder:text-gray-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add search logic
                  }}
                  className="transition-fx hover:text-brand-main text-brand-dark"
                >
                  <BiSearch className="text-xl" />
                </button>
              </motion.div>
            </div>
            <div className="hidden h-6 w-[1px] bg-gray-300 lg:block"></div>
            <div className="hidden items-center text-xs font-semibold gap-2 cursor-pointer lg:flex group">
              <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                My Account
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <CgShoppingCart className="text-brand-dark text-2xl group-hover:text-brand-main lg:text-base" />
              <span className="hidden text-brand-dark text-xs font-semibold lg:block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                Cart
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
