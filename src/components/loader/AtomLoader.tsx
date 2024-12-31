"use client";

import { motion } from "framer-motion";

const AtomLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-brand-main border-t-transparent"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default AtomLoader;
