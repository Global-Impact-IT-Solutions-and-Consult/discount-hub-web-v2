import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  IoCloseOutline,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
        className="fixed top-0 left-0 z-50 h-screen flex shadow-lg w-[60%] lg:w-[300px]"
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
                className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
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
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 pl-4 py-2">
                  <div
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                  >
                    <span className="transition-fx text-xs text-brand-dark font-semibold group-hover:text-brand-grayish/65">
                      Category 1
                    </span>
                    <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <div
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                  >
                    <span className="transition-fx text-xs text-brand-dark font-semibold group-hover:text-brand-grayish/65">
                      Category 2
                    </span>
                    <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <div
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
                  >
                    <span className="transition-fx text-xs text-brand-dark font-semibold group-hover:text-brand-grayish/65">
                      Category 3
                    </span>
                    <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.div>
            </div>
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className="group text-brand-dark text-sm font-semibold flex items-center justify-between lg:text-base cursor-pointer"
            >
              <span className="transition-fx group-hover:text-brand-grayish/65">
                All Products
              </span>
              <IoChevronForward className="transition-fx text-sm font-normal -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
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
        className={`fixed top-0 left-0 z-30 w-screen bg-gray-800/40 h-full lg:w-full ${showSidebar ? "block" : "hidden"}`}
      ></motion.span>
    </>
  );
};

export default Sidebar;
