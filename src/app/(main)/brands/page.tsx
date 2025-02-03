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
  const { data: allBrands, isLoading } = useQuery({
    queryKey: ["fetchBrands"],
    queryFn: fetchBrands,
  });

  // console.log("🚀 ~ Brands ~ allBrands:", allBrands);

  if (isLoading) {
    return <AtomLoader />;
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
                const brandLink = `/brands/one?brandId=${brand._id}`;

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
