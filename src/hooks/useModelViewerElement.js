"use client";

import { useEffect, useRef, useState } from "react";
import { useModelViewer } from "./useModelViewer";

export function useModelViewerElement() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const elementRef = useRef(null);

  // Initialize model-viewer
  useModelViewer();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleProgress = (event) => {
      const { totalProgress } = event.detail;
      setLoadingProgress(Math.round(totalProgress * 100));
    };

    element.addEventListener("load", handleLoad);
    element.addEventListener("progress", handleProgress);

    return () => {
      element.removeEventListener("load", handleLoad);
      element.removeEventListener("progress", handleProgress);
    };
  }, []);

  return {
    ref: elementRef,
    isLoaded,
    loadingProgress,
  };
}
