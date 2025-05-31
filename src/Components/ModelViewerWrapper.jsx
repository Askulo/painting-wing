"use client";

import { useModelViewerElement } from "@/hooks/useModelViewerElement";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import model-viewer elements
const ModelViewer = dynamic(
  () =>
    import("@google/model-viewer").then(() => ({ default: "model-viewer" })),
  { ssr: false }
);

const LoadingIndicator = ({ progress }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="text-white text-xl">Loading... {progress}%</div>
  </div>
);

const ModelViewerWrapper = ({ src, alt, ...props }) => {
  const { ref, isLoaded, loadingProgress } = useModelViewerElement();

  return (
    <div className="relative w-full h-full">
      <ModelViewer
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        camera-controls
        auto-rotate
        {...props}
      />
      {!isLoaded && <LoadingIndicator progress={loadingProgress} />}
    </div>
  );
};

export default ModelViewerWrapper;
