"use client";

import { useEffect, useRef } from "react";

export function useModelViewer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Dynamically import model-viewer only on client side
    import("@google/model-viewer").catch((error) => {
      console.error("Error loading model-viewer:", error);
    });
  }, []);
}
