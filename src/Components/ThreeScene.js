// components/Scene.js
"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Stats,
  RoundedBox,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import GridComponent from "./GridComponent";
import { startCubeAnimation } from "./CubeAnimation";
import { useAudio } from "@/context/AudioContext";

import {
  NavAboutUs,
  NavAlumni,
  NavEvents,
  NavGallery,
  NavBIT,
  NavInduction,
  NavMerchandise,
  NavMembers,
} from "./CreateNavTitle";

import MouseRotatingGroup from "./MouseRotatingGroup";

// Session storage key for tracking navigation state
const NAVIGATION_STATE_KEY = "scene_navigation_state";
const MUSIC_STATE_KEY = "background_music_state";

const HollowCube = () => {
  const hollowCubeSize = 1.2;
  const hollowCubeThickness = 0.27;
  const targetScale = hollowCubeSize - hollowCubeThickness * 1.8;

  return (
    <group>
      {/* Outer cube */}
      <RoundedBox
        args={[hollowCubeSize, hollowCubeSize * 0.3, hollowCubeSize]}
        radius={0.1}
        smoothness={10}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#b0c4de" side={2} /> {/* BackSide is 2 */}
      </RoundedBox>

      {/* Inner cube */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[
            targetScale - 0.015,
            targetScale * 0.5 - 0.015,
            targetScale - 0.015,
          ]}
        />
        <meshBasicMaterial color="#808080" />
      </mesh>
    </group>
  );
};

const Cube = ({ onAnimationComplete, shouldAnimate }) => {
  const [opacity] = useState(shouldAnimate ? 0.8 : 0); // Start invisible if not animating
  const cubeRef = useRef();
  const cubeSize = 1;
  const { camera } = useThree();
  const animationStarted = useRef(false);

  useEffect(() => {
    if (!cubeRef.current || animationStarted.current) return;

    if (shouldAnimate) {
      // Normal animation flow
      animationStarted.current = true;
      startCubeAnimation(cubeRef, camera, onAnimationComplete);
      console.log("Cube animation started");
    } else {
      // Skip animation - hide cube and trigger completion immediately
      cubeRef.current.position.set(0, 1.3, 0);
      cubeRef.current.scale.set(0.7, 0.7, 0.7);
      cubeRef.current.visible = false; // Hide the cube completely

      // Trigger completion after a small delay to ensure scene is ready
      setTimeout(() => {
        onAnimationComplete();
        console.log(
          "Cube animation skipped - cube hidden, nav titles shown immediately"
        );
      }, 100);

      animationStarted.current = true;
    }
  }, [camera, cubeRef, onAnimationComplete, shouldAnimate]);

  // Don't render cube at all if we shouldn't animate
  if (!shouldAnimate) {
    return null;
  }

  return (
    <mesh
      ref={cubeRef}
      position={[0, 8, 0]}
      scale={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshStandardMaterial color="#d25c25" transparent opacity={opacity} />
    </mesh>
  );
};

const CameraController = ({ cameraX, cameraY, cameraZ, shouldAnimate }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(0, 1.3, 0);

    // Ensure zoom is always 45 when returning from another route
    if (!shouldAnimate) {
      camera.zoom = 45;
      camera.updateProjectionMatrix();
      console.log("Camera zoom fixed at 45 for returning user");
    }
  }, [camera, cameraX, cameraY, cameraZ, shouldAnimate]);

  // Continuously maintain zoom at 45 for returning users
  useFrame(() => {
    if (!shouldAnimate && camera.zoom !== 45) {
      camera.zoom = 45;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

const CenterModel = ({ show, shouldAnimate }) => {
  const { scene } = useGLTF("/art_studio.glb");
  const [isScaled, setIsScaled] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const modelRef = useRef();
  const targetScale = useRef([1.3, 0.7, 1.3]);
  const currentScale = useRef([1.3, 0.7, 1.3]);
  const opacityRef = useRef(shouldAnimate ? 0 : 1); // Start visible if not animating
  const materialsInitialized = useRef(false);

  useEffect(() => {
    if (scene && !materialsInitialized.current) {
      console.log("Initializing model materials");

      scene.scale.set(1.3, 0.7, 1.3);
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material) {
            child.material.transparent = true;
            // Set initial opacity based on whether we're animating
            child.material.opacity = shouldAnimate ? 0 : 1;
          }
        }
      });

      materialsInitialized.current = true;
      setModelLoaded(true);
    }
  }, [scene, shouldAnimate]);

  // Smooth animation using useFrame
  useFrame(() => {
    if (modelRef.current && modelLoaded) {
      // Scale animation
      const lerpFactor = 0.5;
      currentScale.current[0] +=
        (targetScale.current[0] - currentScale.current[0]) * lerpFactor;
      currentScale.current[1] +=
        (targetScale.current[1] - currentScale.current[1]) * lerpFactor;
      currentScale.current[2] +=
        (targetScale.current[2] - currentScale.current[2]) * lerpFactor;
      modelRef.current.scale.set(...currentScale.current);

      // Opacity animation - but skip if we shouldn't animate
      if (shouldAnimate) {
        const targetOpacity = show ? 1 : 0;
        const opacityLerpFactor = show ? 0.8 : 0.5;
        opacityRef.current +=
          (targetOpacity - opacityRef.current) * opacityLerpFactor;
      } else {
        // Ensure opacity is always 1 when not animating
        opacityRef.current = 1;
      }

      // Update all materials' opacity
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = opacityRef.current;
        }
      });
    }
  });

  const handleDoubleClick = () => {
    targetScale.current = isScaled ? [1.3, 0.7, 1.3] : [2.2, 1.2, 2.2];
    setIsScaled(!isScaled);
  };

  const handlePointerEnter = (event) => {
    if (opacityRef.current >= 0.95) {
      window.dispatchEvent(
        new CustomEvent("showModelTooltip", {
          detail: { show: true, x: event.clientX, y: event.clientY },
        })
      );
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerLeave = () => {
    window.dispatchEvent(
      new CustomEvent("showModelTooltip", {
        detail: { show: false },
      })
    );
    document.body.style.cursor = "default";
  };

  const handlePointerMove = (event) => {
    if (opacityRef.current >= 0.95) {
      window.dispatchEvent(
        new CustomEvent("updateTooltipPosition", {
          detail: { x: event.clientX, y: event.clientY },
        })
      );
    }
  };

  if (!modelLoaded) {
    return null;
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[2.5, 2, 1.6]}
      rotation={[0, 0, 0]}
      onDoubleClick={handleDoubleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    />
  );
};

// const MusicToggle = () => {
//   const [isMusicPlaying, setIsMusicPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     // Initialize audio element
//     audioRef.current = new Audio("/ambient-music-329699.mp3");
//     audioRef.current.loop = true;

//     // Load saved state
//     const savedMusicState = sessionStorage.getItem(MUSIC_STATE_KEY);
//     if (savedMusicState === "playing") {
//       setIsMusicPlaying(true);
//       audioRef.current
//         .play()
//         .catch((e) => console.log("Auto-play prevented:", e));
//     }

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = "";
//       }
//     };
//   }, []);

//   const toggleMusic = () => {
//     if (isMusicPlaying) {
//       audioRef.current.pause();
//       sessionStorage.setItem(MUSIC_STATE_KEY, "paused");
//     } else {
//       audioRef.current.play();
//       sessionStorage.setItem(MUSIC_STATE_KEY, "playing");
//     }
//     setIsMusicPlaying(!isMusicPlaying);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 1 }}
//       className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-black/20 backdrop-blur-sm p-2 rounded-lg"
//     >
//       <label className="relative inline-flex items-center cursor-pointer">
//         <input
//           type="checkbox"
//           className="sr-only peer"
//           checked={isMusicPlaying}
//           onChange={toggleMusic}
//         />
//         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#d25c25]"></div>
//         <span className="ms-3 text-sm font-medium text-white">
//           Music {isMusicPlaying ? "On" : "Off"}
//         </span>
//       </label>
//     </motion.div>
//   );
// };
const MusicToggle = () => {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      className="fixed bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 z-50 flex items-center space-x-1 sm:space-x-2 bg-black/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-lg"
    >
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"          checked={isPlaying}
          onChange={togglePlay}
        />
        {/* Smaller toggle switch for mobile, normal for desktop */}
        <div className="w-8 h-4 sm:w-9 sm:h-5 md:w-10 md:h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] sm:after:top-[2px] after:start-[1px] sm:after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 sm:after:h-4 sm:after:w-4 md:after:h-4 md:after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#d25c25]"></div>
        
        {/* Responsive text sizing */}
        <span className="ml-1.5 sm:ml-2 md:ml-3 text-xs sm:text-sm font-medium text-white/90 whitespace-nowrap">
          {/* Show icon only on very small screens, text on larger screens */}
          <span className="block sm:hidden">
            {isPlaying ? "🎵" : "🔇"}
          </span>
          <span className="hidden sm:block">
            Music {isPlaying ? "On" : "Off"}
          </span>
        </span>
      </label>
    </motion.div>
  );
};

const Scene = () => {
  const [showNavTitles, setShowNavTitles] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const router = useRouter();

  // Check if this is a return navigation or fresh load
  useEffect(() => {
    try {
      // Check if we're returning from another route
      const navigationState = sessionStorage.getItem(NAVIGATION_STATE_KEY);
      const isReturning = navigationState === "visited";

      console.log(
        "Navigation state:",
        isReturning ? "returning" : "fresh load"
      );

      if (isReturning) {
        // Skip animation and show everything immediately
        setShouldAnimate(false);
        setShowNavTitles(true);
        console.log("Skipping cube animation - returning from another route");
      } else {
        // Fresh load - set visited state and animate normally
        sessionStorage.setItem(NAVIGATION_STATE_KEY, "visited");
        setShouldAnimate(true);
        console.log("Fresh load - will animate cube");
      }
    } catch (error) {
      // Fallback if sessionStorage is not available
      console.log("SessionStorage not available, defaulting to animation");
      setShouldAnimate(true);
    }
  }, []);

  // Handle cube animation completion
  const handleAnimationComplete = () => {
    console.log("Animation completed, showing nav titles");
    setShowNavTitles(true);
  };

  // Ensure scene is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setSceneReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleShowTooltip = (event) => {
      setShowInstruction(event.detail.show);
      if (event.detail.x && event.detail.y) {
        setMousePosition({ x: event.detail.x, y: event.detail.y });
      }
    };

    const handleUpdatePosition = (event) => {
      setMousePosition({ x: event.detail.x, y: event.detail.y });
    };

    window.addEventListener("showModelTooltip", handleShowTooltip);
    window.addEventListener("updateTooltipPosition", handleUpdatePosition);

    return () => {
      window.removeEventListener("showModelTooltip", handleShowTooltip);
      window.removeEventListener("updateTooltipPosition", handleUpdatePosition);
    };
  }, []);

  // Debug effect to track state changes
  useEffect(() => {
    console.log("showNavTitles changed:", showNavTitles);
    console.log("shouldAnimate:", shouldAnimate);
  }, [showNavTitles, shouldAnimate]);

  if (!sceneReady) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        Loading Scene...
      </div>
    );
  }

  return (
    <>
      <Canvas
        orthographic
        camera={{
          zoom: 45,
          near: 0.1,
          far: 10000,
        }}
        shadows
        style={{ height: "100vh", width: "100vw", background: "#ffffff" }}
      >
        <CameraController
          cameraX={8.3}
          cameraY={7.9}
          cameraZ={7.4}
          shouldAnimate={shouldAnimate}
        />

        {/* Lights */}
        <ambientLight intensity={3} color={0xffffff} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight
            position={[2, 8, 0]}
            intensity={2}
            distance={100}
            castShadow
            color={0xffffff}
          />
          <directionalLight
            position={[10, 10, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* Main rotating group - enabled immediately if not animating */}
          <MouseRotatingGroup enabled={showNavTitles}>
            <group>
              {/* Grid */}
              <GridComponent />

              {/* Model with conditional animation */}
              <CenterModel
                show={showNavTitles}
                shouldAnimate={shouldAnimate}
                castShadow
                receiveShadow
              />

              {/* Cube with conditional animation */}
              <Cube
                onAnimationComplete={handleAnimationComplete}
                shouldAnimate={shouldAnimate}
              />

              <HollowCube />

              {/* Nav Titles Group */}
              <group>
                {/* About Us */}
                <group position={[-2.3, 0.0, -10.5]} rotation={[4.71, 0, 1.57]}>
                  <NavAboutUs opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* Merchandise */}
                <group position={[8.5, 0, -1.2]} rotation={[1.57, 0, 0]}>
                  <NavMerchandise opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* Events */}
                <group position={[-7.5, 0, -7.5]} rotation={[1.57, 3.14, 0]}>
                  <NavEvents opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* BIT */}
                <group position={[-8.5, 0, 0]} rotation={[1.57, 0, 0]}>
                  <NavBIT opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* Gallery */}
                <group position={[5.5, 0, 7.2]} rotation={[1.6, 3.1, 3.1]}>
                  <NavGallery opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* Members */}
                <group position={[-6.5, 0, 8.5]} rotation={[4.71, 0, 1.57]}>
                  <NavMembers opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* Alumni */}
                <group position={[0.5, 0, 9.5]} rotation={[4.71, 0, 1.57]}>
                  <NavAlumni opacity={showNavTitles ? 1 : 0} />
                </group>

                {/* Induction */}
                <group position={[5.5, 0, -8]} rotation={[4.7, 0, 0]}>
                  <NavInduction opacity={showNavTitles ? 1 : 0} />
                </group>
              </group>
            </group>
          </MouseRotatingGroup>
        </Suspense>
      </Canvas>

      {/* Tooltip outside Canvas */}
      {showInstruction && (
        <div
          style={{
            position: "fixed",
            left: mousePosition.x,
            top: mousePosition.y,
            padding: "8px 16px",
            background: "rgba(0, 0, 0, 0.75)",
            color: "white",
            borderRadius: "8px",
            fontSize: "14px",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            fontFamily: "sans-serif",
            textAlign: "center",
            transition: "opacity 0.3s",
            opacity: 1,
          }}
        >
          Double-tap to resize Art Room
        </div>
      )}

      {/* Music Toggle Component */}
      <MusicToggle />
    </>
  );
};

// Preload the model to ensure consistent loading
useGLTF.preload("/art_studio.glb");

export default Scene;