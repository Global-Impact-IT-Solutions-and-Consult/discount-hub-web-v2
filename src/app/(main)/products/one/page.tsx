"use client";

import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchProductById } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";
import Link from "next/link";
import Image from "next/image";
import { IoStar } from "react-icons/io5"; // Importing star icon for rating representation

const OneProduct = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: product, isLoading } = useQuery({
    queryKey: ["fetchProductById", id],
    queryFn: fetchProductById,
    enabled: !!id,
  });

  console.log("Product: ", product);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sections = [
    {
      title: "Description",
      content: product?.description || "N/A",
    },
    {
      title: "Key Features",
      content: product?.keyFeatures || "N/A",
    },
    {
      title: "Specifications",
      content: product?.specifications || "N/A",
    },
  ];

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return <AtomLoader />;
  }

  const rating = Math.round(Number(product?.rating) * 2) / 2; // Round to nearest half

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const storeLogo = isValidUrl(product?.storeLogo) ? product?.storeLogo : "";

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-brand-main transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/products"
          className="hover:text-brand-main transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-brand-main">{product?.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 border-t py-16 md:grid-cols-2">
        {/* Product Image Section */}
        <div className="flex flex-col gap-4">
          <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
            <Image
              src={product?.images?.[0] || ""}
              alt={product?.name || "Product Image"}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product?.images?.map((img: string, idx: number) => (
              <button
                key={idx}
                className={`relative h-20 w-20 border rounded-lg overflow-hidden ${
                  img === product?.images?.[0] ? "ring-1 ring-brand-main" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold lg:text-3xl">{product?.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-brand-main">
              {product?.discountPrice
                ? `₦${product?.discountPrice.toLocaleString()}`
                : `₦${product?.price.toLocaleString()}`}
            </span>
            {product?.discountPrice && (
              <span className="text-gray-500 line-through">
                ₦{product?.price.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={storeLogo}
              alt={product?.name || "Store Logo"}
              width={64}
              height={64}
              className="glass-fx absolute top-4 right-4 object-cover z-10 shadow-md"
            />
            <span className="text-sm text-gray-600">{product?.storeName}</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => {
                if (index < rating) {
                  return (
                    <IoStar key={index} className="h-4 w-4 text-yellow-500" />
                  );
                } else if (index === Math.floor(rating) && rating % 1 !== 0) {
                  return (
                    <IoStar
                      key={index}
                      className="h-4 w-4 text-yellow-500"
                      style={{ clipPath: "inset(0 0 0 50%)" }}
                    />
                  );
                } else {
                  return (
                    <IoStar key={index} className="h-4 w-4 text-gray-300" />
                  );
                }
              })}
              <span className="ml-2 text-sm text-gray-600">
                ({product?.numberOfRatings.toLocaleString()} ratings)
              </span>
            </div>
          </div>
          <Link
            href={product?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-fx group flex items-center gap-2 px-4 py-4 bg-brand-main text-white rounded-md hover:bg-brand-main/80"
          >
            Visit Store
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="transition-fx w-4 h-4 group-hover:rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Link>

          {/* Collapsible Sections */}
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => toggleSection(index)}
                >
                  <span
                    className={`${
                      openIndex === index ? "font-bold" : "font-medium"
                    }`}
                  >
                    {section.title}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center group hover:bg-brand-main hover:text-white transition-colors">
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`px-6 py-4 bg-gray-50 transition-all duration-300 ${
                    openIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-600">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<AtomLoader />}>
      <OneProduct />
    </Suspense>
  );
}
