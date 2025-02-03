import React from "react";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({
  text = "View All",
  className,
  type = "button",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "transition-fx group flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer border-[0.3px] border-gray-800/80 text-brand-dark rounded-md hover:bg-brand-main hover:border-brand-main hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {text}
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
    </button>
  );
};

export default MainButton;

// import React from "react";
// import { twMerge } from "tailwind-merge";

// interface MainButtonProps {
//   text?: string;
//   className?: string;
// }

// const MainButton = ({ text = "View All", className }: MainButtonProps) => {
//   return (
//     <>
//       <span
//         className={twMerge(
//           "transition-fx group flex items-center gap-2 px-4 py-2 bg-transparent cursor-pointer border-[0.3px] border-gray-800/80 text-brand-dark rounded-md hover:bg-brand-main hover:border-brand-main hover:text-white",
//           className
//         )}
//       >
//         {text}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="transition-fx w-4 h-4 group-hover:rotate-45"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//           />
//         </svg>
//       </span>
//     </>
//   );
// };

// export default MainButton;
