"use client";

import { useEffect, useState } from "react";
import { handleScrollToTop } from "@/utils/handleScrollDown";
import { IoArrowUpOutline } from "react-icons/io5";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 2;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-5 right-0 z-50 flex items-center justify-center gap-4 p-3 font-geistsans text-base font-normal text-brand-white lg:right-5">
        <button
          onClick={handleScrollToTop}
          className="p-2 rounded-full w-fit flex items-center justify-center gap-2 animate-bounce bg-brand-main"
        >
          <IoArrowUpOutline size={32} />
        </button>
      </div>
    </>
  );
};

export default ScrollToTopButton;
