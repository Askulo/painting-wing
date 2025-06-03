"use client";

import dynamic from "next/dynamic";
import { useModelViewerElement } from "@/hooks/useModelViewerElement";
import Navbar from "./BitSindri/Navbar";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import AboutUs from "./AboutUs";

// Dynamically import model-viewer elements
const ModelViewer = dynamic(
  () =>
    import("@google/model-viewer").then(() => ({ default: "model-viewer" })),
  { ssr: false }
);

const ArtStudioModelViewer = () => {
  const { ref, loadingProgress } = useModelViewerElement();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleProgress = (event) => {
      const { totalProgress } = event.detail;
      setProgress(Math.round(totalProgress * 100));
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    modelViewer.addEventListener("progress", handleProgress);
    modelViewer.addEventListener("load", handleLoad);

    return () => {
      modelViewer.removeEventListener("progress", handleProgress);
      modelViewer.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          background:
            "linear-gradient(135deg, #e0dcd5, #cfcfcf, #9f8c7c, #f3f3f3)",
        }}
        className="w-full pt-24 h-screen flex flex-col items-center justify-center gap-4 px-4"
      >
        {/* Heading and Description */}
        <div className="text-center mb-2 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-2"   >
            Step into the <span  style={{ fontFamily: 'Gyst' }}
  className="mix-blend-multiply">3d</span> realm of <span  style={{ fontFamily: 'Gyst' }}>art</span> and <span style={{ fontFamily: 'Gyst' }}>creativity</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover a world where colors leap off the canvas and creativity
            knows no bounds.
          </p>
        </div>

        <Button
          className="bg-[#f47458] text-white px-6 py-3 mt-1/5 rounded-lg hover:bg-[#e06348] transition-colors"
          onClick={() => {
            const aboutUs = document.getElementById("aboutUs");
            if (aboutUs) {
              aboutUs.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Explore More
        </Button>

        {/* Model Viewer Container */}
        <div className="w-full h-full max-w-7xl max-h-[65vh] relative">
          {/* Custom Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center z-10">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#f47458] mb-4"></div>
              <p className="text-gray-600 font-medium">Loading 3D Model...</p>
              <div className="mt-2 text-sm text-gray-500">{progress}%</div>
            </div>
          )}
          
          <model-viewer
            ref={modelViewerRef}
            className="w-full h-full rounded-lg"
            disable-pan
            min-camera-orbit="auto 80deg auto"
            max-camera-orbit="auto 80deg auto"
            src="/art_studio.glb"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            tone-mapping="neutral"
            poster="poster.webp"
            shadow-intensity="1"
            exposure="0.91"
            // Hide default loading bar
            style={{
              '--progress-bar-color': 'transparent',
              '--progress-mask': 'transparent'
            }}
          >
            <button
              className="Hotspot"
              slot="hotspot-1"
              data-position="2.901297807693485m 1.0811034902871883m -1.2608848242712192m"
              data-normal="-1m 0m 0m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">Art Arena</div>
            </button>
          </model-viewer>
        </div>
      </div>

      <div id="aboutUs">
        <AboutUs />
      </div>
      
      {/* Custom CSS to hide model-viewer's default progress bar */}
      <style jsx>{`
        model-viewer::part(default-progress-bar) {
          display: none !important;
        }
        
        model-viewer::part(default-progress-mask) {
          display: none !important;
        }
        
        model-viewer {
          --progress-bar-color: transparent !important;
        }
      `}</style>
    </>
  );
};

export default ArtStudioModelViewer;