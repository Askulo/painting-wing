"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import LoadingScreen from "@/app/Components/LoadingScreen";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/Components/BitSindri/Navbar";
import { useModelViewer } from "@/hooks/useModelViewer";

// Dynamically import ModelViewer component
const ModelViewer = dynamic(() => import("@/Components/ModelViewer"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function ModelViewers() {
  const [isLoading, setIsLoading] = useState(true);
  useModelViewer();

  useEffect(() => {
    const handleModelsLoaded = () => {
      let loadedModels = 0;
      const totalModels = 4; // Total number of model-viewer elements

      const onLoad = () => {
        loadedModels++;
        if (loadedModels === totalModels) {
          setIsLoading(false);
        }
      };

      // Get all model-viewer elements
      if (typeof document !== "undefined") {
        const modelViewers = document.querySelectorAll("model-viewer");
        modelViewers.forEach((viewer) => {
          viewer.addEventListener("load", onLoad);
        });

        return () => {
          const modelViewers = document.querySelectorAll("model-viewer");
          modelViewers.forEach((viewer) => {
            viewer.removeEventListener("load", onLoad);
          });
        };
      }
    };

    const cleanup = handleModelsLoaded();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      {/* {isLoading && <LoadingScreen />} */}
      <Navbar />
      <ModelViewer />
    </>
  );
}
