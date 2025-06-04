import { useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// List all image filenames in the Pwing folder
const imageFilenames = Array.from({ length: 64 }, (_, i) => `${i + 1}.jpg`);

export function useAssetLoading() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const modelUrls = ["/art_studio.glb"]; // Add more models if needed
    const totalAssets = imageFilenames.length + modelUrls.length;

    // Helper to update progress
    const updateProgress = () => {
      loadedCount++;
      setProgress((loadedCount / totalAssets) * 100);
      if (loadedCount === totalAssets) {
        setAssetsLoaded(true);
      }
    };

    // Load images
    imageFilenames.forEach((filename) => {
      const img = new window.Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // Still count errored images
      img.src = `/Pwing/${filename}`;
    });

    // Load models
    const gltfLoader = new GLTFLoader();
    modelUrls.forEach((url) => {
      gltfLoader.load(
        url,
        updateProgress,
        undefined,
        (error) => {
          console.error(`Error loading model ${url}:`, error);
          updateProgress();
        }
      );
    });

    // Fallback in case loading takes too long
    const fallbackTimer = setTimeout(() => {
      if (!assetsLoaded) setAssetsLoaded(true);
    }, 6000); // 10 seconds

    return () => clearTimeout(fallbackTimer);
    // eslint-disable-next-line
  }, []);

  return { assetsLoaded, progress };
}
