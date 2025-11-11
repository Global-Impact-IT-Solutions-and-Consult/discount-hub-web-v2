"use client";

import React from "react";
import Link from "next/link";
import BrandCard from "@/components/brandCard/page";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";

interface Brand {
  _id: string;
  name: string;
}

const Categories = () => {
  const {
    data: allBrands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchBrands"],
    queryFn: fetchBrands,
  });

  console.log("🚀 ~ Brands ~ allBrands:", allBrands);
  console.log("🚀 ~ Brands ~ isLoading:", isLoading);
  console.log("🚀 ~ Brands ~ error:", error);

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
          <span className="text-brand-main">Brands</span>
        </nav>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Brands
          </h2>
          <p className="text-gray-600">
            Failed to load brands. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!allBrands || allBrands.length === 0) {
    return (
      <div className="flex flex-col gap-4 sm:gap-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-main">Brands</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          {"All Brands"}
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-600">No brands available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-main">Brands</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          {"All Brands"}
        </h1>
        <div className="grid grid-cols-12 gap-4">
          {allBrands && (
            <>
              {allBrands.map((brand: Brand, index: number) => {
                const brandLink = `/brands/${brand._id}`;

                return (
                  <BrandCard key={index} link={brandLink} title={brand.name} />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
