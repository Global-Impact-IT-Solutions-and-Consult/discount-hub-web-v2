import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface DealCardProps {
  image: string;
  imagea: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  className?: string;
}

const DealCard = ({
  image,
  imagea,
  title,
  description,
  price,
  discountPrice,
  className,
}: DealCardProps) => {
  return (
    <div
      className={twMerge(
        "relative col-span-6 lg:col-span-3 overflow-hidden rounded-lg group cursor-pointer",
        className
      )}
    >
      <div className="relative h-[334px]">
        {discountPrice && (
          <span className="absolute top-4 left-4 bg-brand-main text-white px-2 py-1 z-10 rounded">
            Sale
          </span>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={imagea}
          alt={title}
          fill
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-medium text-lg inline-block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-[80%]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 lg:line-clamp-1">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-brand-dark font-medium">
            ${discountPrice || price}
          </span>
          {discountPrice && (
            <span className="text-brand-main line-through">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealCard;
