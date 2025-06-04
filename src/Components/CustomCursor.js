"use client";

import { useEffect } from "react";
import Kursor from "kursor";
import "kursor/dist/kursor.css"; // very important!

export default function CustomCursor() {
  useEffect(() => {
    // Wait for the DOM to be ready
    if (typeof document !== "undefined") {
      try {
        const kursorInstance = new Kursor({
          type: 2,
          removeDefaultCursor: true,
          color: "#d25c25", // updated color
        });

        // Cleanup on unmount
        return () => {
          if (kursorInstance && typeof kursorInstance.destroy === "function") {
            kursorInstance.destroy();
          }
        };
      } catch (error) {
        console.error("Error initializing Kursor:", error);
      }
    }
  }, []);

  return null;
}
