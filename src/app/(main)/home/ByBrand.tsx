"use client";

import React from "react";

import MainButton from "@/components/mainButton/page";
import Link from "next/link";
import BrandCard from "@/components/brandCard/page";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";

interface Brand {
  _id: string;
  name: string;
}

const ByBrand = () => {
  const { data: allBrands, isLoading } = useQuery({
    queryKey: ["fetchBrands"],
    queryFn: fetchBrands,
  });

  // console.log("🚀 ~ ByBrand ~ allBrands:", allBrands);

  if (isLoading) {
    return <AtomLoader />;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex items-center justify-between">
          <span className="text-2xl font-bold">Shop by brands</span>
          <Link href="/brands">
            <MainButton text="View All" />
          </Link>
        </div>
        {allBrands && (
          <>
            {allBrands.slice(0, 6).map((brand: Brand, index: number) => {
              const brandLink = `/brands/one?brandId=${brand._id}`;

              return (
                <BrandCard key={index} link={brandLink} title={brand.name} />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default ByBrand;
