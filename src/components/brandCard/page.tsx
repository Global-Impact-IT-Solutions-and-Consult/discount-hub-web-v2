import Link from "next/link";
import React from "react";

const CategoryCard = ({ link, title }: any) => {
  console.log("🚀 ~ BrandCard ~ link:", link);

  // Utility function to generate a random color
  const getRandomColor = () => {
    const colors = [
      "#C0A500",
      "#D03E00",
      "#1A7FBB",
      "#2E8B2D",
      "#D0127A",
      "#8B5A2B",
      "#6A5ACD",
      "#FF8C00",
      "#4682B4",
    ]; // More muted and additional colors
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <Link
        className="group relative col-span-6 h-48 overflow-hidden rounded-lg cursor-pointer flex items-center justify-center md:col-span-4 lg:col-span-2"
        href={link}
        target="_blank"
        style={{
          backgroundColor: getRandomColor(),
        }}
      >
        <span className="text-brand-white capitalize text-xl font-bold group-hover:scale-110">
          {title}
        </span>
        {/* <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/50 to-transparent">
          <span className="text-white font-medium capitalize">{title}</span>
        </div> */}
      </Link>
    </>
  );
};

export default CategoryCard;
