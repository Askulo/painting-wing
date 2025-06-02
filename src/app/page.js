"use client";
import { useEffect, useState } from "react";
import ThreeScene from "@/Components/ThreeScene";
import LoadingScreen from "@/Components/LoadingScreen";
import { useAssetLoading } from "@/hooks/useAssetLoading";
import ArtStudioModelViewer from "@/Components/LandingPage";
import Header from "@/Components/Header";
// import AlumniDirectory from "@/components/AlumniDirectory";

export default function HomePage() {
  const { assetsLoaded, progress } = useAssetLoading();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let lastIsMobile = window.innerWidth < 768;

    const checkMobile = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);

      // Reload if switching from mobile to desktop
      if (lastIsMobile && !currentIsMobile) {
        window.location.reload();
      }
      lastIsMobile = currentIsMobile;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {!assetsLoaded && <LoadingScreen progress={progress} />}

      {/* Smooth transition between mobile and desktop */}
      <div
        style={{
          transition: "opacity 0.5s",
          opacity: isMobile ? 1 : 0,
          pointerEvents: isMobile ? "auto" : "none",
          position: isMobile ? "static" : "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {isMobile && <ArtStudioModelViewer />}
      </div>

      <div
        style={{
          transition: "opacity 0.5s",
          opacity: isMobile ? 0 : 1,
          pointerEvents: isMobile ? "none" : "auto",
        }}
      >
        {!isMobile && (
          <>
            <Header />
            <ThreeScene  isMobile={isMobile} />
          </>
        )}
      </div>
      {/* <AlumniDirectory/> */}
    </>
  );
}