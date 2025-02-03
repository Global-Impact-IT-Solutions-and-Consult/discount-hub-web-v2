"use client";

import React, { useState } from "react";
import Image from "next/image";
import newsletterImage from "@/assets/imgs/landing/newsletter/speaker_man.png";
import MainButton from "@/components/mainButton/page";
import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "@/api/products.api";
import AtomLoader from "@/components/loader/AtomLoader";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const { mutate, status } = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      setMessage({
        text: "Subscription successful! Thank you for subscribing.",
        type: "success",
      });
      setEmail("");
    },
    onError: () => {
      setMessage({
        text: "Failed to subscribe. Please try again.",
        type: "error",
      });
    },
  });

  const isLoading = status === "pending";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      mutate({ email });
    } else {
      setMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-green-50 to-green-100 shadow-2xl rounded-xl p-8 md:p-12 border border-green-200">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={newsletterImage}
          alt="Newsletter Speaker"
          className="rounded-lg object-cover border-4 border-green-300 shadow-xl"
          width={400}
          height={300}
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-800 leading-snug">
          Stay Updated!
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Subscribe to receive exclusive deals, latest news, and special offers!
        </p>

        {/* Subscription Form */}
        <form className="mt-6 flex flex-col gap-2" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200 hover:shadow-md"
            required
          />
          {message.text && (
            <span
              className={
                message.type === "error"
                  ? "text-red-600 text-sm"
                  : "text-green-600 text-sm"
              }
            >
              {message.text}
            </span>
          )}

          {isLoading ? (
            <AtomLoader />
          ) : (
            <MainButton
              text="Subscribe!"
              type="submit"
              className="text-white text-center flex items-center justify-center bg-brand-main w-full border-none py-4 hover:bg-brand-main/80"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import newsletterImage from "@/assets/imgs/landing/newsletter/speaker_man.png";
// import MainButton from "@/components/mainButton/page";
// import { useQuery } from "@tanstack/react-query";
// import { subscribeToNewsletter } from "@/api/products.api";
// import AtomLoader from "@/components/loader/AtomLoader";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");
//   const [tempEmail, setTempEmail] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const { isLoading } = useQuery({
//     queryKey: ["subscribeToNewsletter", email],
//     queryFn: subscribeToNewsletter,
//     enabled: !!email,
//     onError: (err) => {
//       setError("Failed to subscribe. Please try again.");
//     },
//     onSuccess: () => {
//       setSuccess(true);
//       setTempEmail(""); // Clear the input field on success
//     },
//   });

//   const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTempEmail(e.target.value);
//   };

//   const handleSubscribe = () => {
//     // Simple email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (emailPattern.test(tempEmail)) {
//       setEmail(tempEmail);
//     } else {
//       alert("Please enter a valid email address.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-green-50 to-green-100 shadow-2xl rounded-xl p-8 md:p-12 border border-green-200">
//       {/* Image Section */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         <div className="relative">
//           <Image
//             src={newsletterImage}
//             alt="Newsletter Speaker"
//             className="rounded-lg object-cover border-4 border-green-300 shadow-xl"
//             width={400}
//             height={300}
//           />
//           {/* Decorative Element */}
//           <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-400 rounded-full opacity-30 animate-ping"></div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left">
//         <h2 className="text-4xl font-extrabold text-gray-800 leading-snug">
//           Stay Updated!
//         </h2>
//         <p className="text-gray-600 mt-3 text-lg">
//           Subscribe to receive exclusive deals, latest news, and special offers!
//         </p>

//         {/* Subscription Form */}
//         <form className="mt-6 flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-200 hover:shadow-md"
//             required
//             onChange={onchangeHandler}
//           />

//           {isLoading ? (
//             <AtomLoader />
//           ) : (
//             <span onClick={handleSubscribe} className="w-full">
//               <MainButton
//                 text="Subscribe!"
//                 className="text-white text-center flex items-center justify-center bg-brand-main w-full border-none py-4 hover:bg-brand-main/80"
//               />
//             </span>
//           )}
//         </form>

//         {/* Error and Success Modals */}
//         {error && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
//             Subscription successful! Thank you for subscribing.
//           </div>
//         )}

//         {/* Decorative Text Effect */}
//         <p className="mt-4 text-sm text-gray-500 italic">
//           No spam, only valuable updates! 🎉
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Newsletter;
