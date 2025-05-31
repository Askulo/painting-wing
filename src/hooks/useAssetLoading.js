import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function useAssetLoading() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let modelCount = 0;
    const totalModels = 2; // Update this number based on how many models you're loading
    const modelUrls = ["/art_studio.glb"];
    const gltfLoader = new GLTFLoader();

    // Track loading progress for each model
    const onProgress = () => {
      modelCount++;
      setProgress((modelCount / totalModels) * 100);
      if (modelCount === totalModels) {
        setAssetsLoaded(true);
      }
    };

    // Load each model
    modelUrls.forEach((url) => {
      gltfLoader.load(
        url,
        () => onProgress(),
        undefined,
        (error) => console.error(`Error loading model ${url}:`, error)
      );
    });

    // Add a fallback in case loading takes too long
    const fallbackTimer = setTimeout(() => {
      if (!assetsLoaded) {
        setAssetsLoaded(true);
      }
    }, 5000); // 5 second fallback

    return () => clearTimeout(fallbackTimer);
  }, []);

  return { assetsLoaded, progress };
}
