import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { formatPrice } from "@/utils/formatNumber";
import defaultImage from "@/assets/imgs/landing/latest-arrivals/1a.jpg";

interface DealCardProps {
  image: string;
  imagea: string;
  title: string;
  price: number;
  discountPrice?: number;
  store?: string;
  badgeColor?: string;
  className?: string;
}

const DealCard = ({
  image,
  imagea,
  title,
  price,
  discountPrice,
  store,
  badgeColor,
  className,
}: DealCardProps) => {
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const primaryImage = isValidUrl(image) ? image : defaultImage.src;
  const secondaryImage = isValidUrl(imagea) ? imagea : defaultImage.src;

  return (
    <div
      className={twMerge(
        "relative col-span-6 lg:col-span-3 overflow-hidden rounded-lg group cursor-pointer",
        className
      )}
    >
      <div className="relative h-[334px]">
        {store && (
          <span
            className={`absolute top-4 right-0 px-3 py-1.5 z-10 rounded-full ${
              badgeColor ? `bg-${badgeColor}-500` : "bg-brand-main"
            } text-white text-xs font-semibold`}
          >
            {store}
          </span>
        )}
        <Image
          src={primaryImage}
          alt={title || "Product Image"}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={secondaryImage}
          alt={title || "Product Image"}
          fill
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-medium text-lg line-clamp-2 min-h-[3.5rem]">
          {title.split(" ").map((word, index) => (
            <React.Fragment key={`${title}-${word}-${index}`}>
              <span className="inline-block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                {word}
              </span>
              {index < title.split(" ").length - 1 ? " " : ""}
            </React.Fragment>
          ))}
        </h3>
        <div className="flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-brand-main font-bold">
                {formatPrice(discountPrice)}
              </span>
              <span className="text-gray-400 line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-brand-main font-bold">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealCard;
