"use client";

import { useEffect } from "react";
import Kursor from "kursor";
import "kursor/dist/kursor.css"; // very important!

export default function CustomCursor() {
  useEffect(() => {
    new Kursor({
      type: 2,
      removeDefaultCursor: true,
      color: "#d25c25", // updated color
    });
  }, []);

  return null;
}
