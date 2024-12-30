import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="bg-brand-white py-8 pt-12 border-t-2 border-brand-dark">
        <div className="w-[90%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Main Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg mb-2">Main</h3>
            <Link
              href="/"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Homepage
            </Link>
            <Link
              href="/products"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              All Products
            </Link>
            <Link
              href="/blog"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Blog
            </Link>
            <Link
              href="/account"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              My Account
            </Link>
            <Link
              href="/cart"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Cart
            </Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg mb-2">Categories</h3>
            <Link
              href="/gaming-controllers"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Gaming Controllers
            </Link>
            <Link
              href="/racing-wheels"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Racing Wheels
            </Link>
            <Link
              href="/flight-controls"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Flight Controls
            </Link>
            <Link
              href="/accessories"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Accessories
            </Link>
            <Link
              href="/parts"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Parts
            </Link>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg mb-2">Information</h3>
            <Link
              href="/about"
              className="hover:text-brand-main w-fit relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              About Us
            </Link>
          </div>

          {/* Our Values */}
          <div className="flex flex-col gap-3 col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg mb-2">Our Values</h3>
            <p className="text-gray-600 leading-relaxed">
              At Discounts Hub, we believe that every gaming experience should
              be extraordinary. With our diverse catalog of high-quality gaming
              peripherals, we help gamers of all levels achieve precision,
              comfort, and performance in their gaming journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
