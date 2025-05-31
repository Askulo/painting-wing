"use client";
import { motion } from "framer-motion";

export default function ScreenLoading({ progress = 0 }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100">
      <div className="text-center">
        {/* Outer rotating container */}
        <motion.div
          initial={{ rotateZ: 0 }}
          animate={{ rotateZ: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-32 h-32 mb-8 mx-auto"
        >
          {/* Inner spinning circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <div className="w-full h-full border-4 border-t-[#d25c25] border-b-[#d25c25] rounded-full animate-spin"></div>
          </motion.div>

          {/* Decorative outer ring */}
          <motion.div
            initial={{ opacity: 0.2, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute inset-0 border-2 border-[#d25c25] rounded-full"
            style={{ borderStyle: "dashed" }}
          ></motion.div>
        </motion.div>

        {/* Loading text with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-800"
          >
            Painting Wing
          </motion.h2>
          <motion.p
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="text-lg font-medium text-gray-600 relative inline-block overflow-hidden whitespace-nowrap"
          >
            Loading 3D Experience...
          </motion.p>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-0.5 bg-gradient-to-r from-transparent via-[#d25c25] to-transparent mx-auto max-w-[200px]"
          ></motion.div>
        </motion.div>
      </div>

      {/* Progress bar section */}
      <div className="mt-4 w-64 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-gray-600">{Math.round(progress)}%</p>
    </div>
  );
}
