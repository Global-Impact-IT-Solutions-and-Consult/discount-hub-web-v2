import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ link, image, title }: any) => {
  console.log("🚀 ~ CategoryCard ~ link:", link);
  return (
    <>
      <Link
        className="relative col-span-6 md:col-span-4 lg:col-span-2 h-48 overflow-hidden rounded-lg group cursor-pointer"
        href={link}
        target="_blank"
      >
        <Image
          src={image}
          alt={title || "Category Image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
          <span className="text-white font-medium capitalize">{title}</span>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
