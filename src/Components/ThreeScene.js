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

import GridComponent from "./GridComponent";
import { startCubeAnimation } from "./CubeAnimation";

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

const Cube = ({ onAnimationComplete, skipAnimation, animationCompleted }) => {
  const [opacity] = useState(0.8);
  const cubeRef = useRef();
  const cubeSize = 1;
  const { camera } = useThree();
  const animationStarted = useRef(false);

  useEffect(() => {
    if (!cubeRef.current || animationStarted.current) return;
    
    if (skipAnimation) {
      // Position cube at final position immediately
      cubeRef.current.position.set(0, 0, 0);
      cubeRef.current.scale.set(0.01, 0.01, 0.01); // Make it nearly invisible
      console.log('Cube positioned at final state - animation skipped');
      return;
    }
    
    animationStarted.current = true;
    startCubeAnimation(cubeRef, camera, onAnimationComplete);
    
    console.log('Cube animation started');
  }, [camera, cubeRef, onAnimationComplete, skipAnimation]);

  // Hide cube if animation is completed and we're in skip mode
  const cubeOpacity = (skipAnimation && animationCompleted) ? 0 : opacity;

  return (
    <mesh
      ref={cubeRef}
      position={[0, 8, 0]}
      scale={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshStandardMaterial color="#d25c25" transparent opacity={cubeOpacity} />
    </mesh>
  );
};

const CameraController = ({ cameraX, cameraY, cameraZ }) => {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(0, 1.3, 0);
  }, [camera, cameraX, cameraY, cameraZ]);

  return null;
};

const CenterModel = ({ show, skipAnimation }) => {
  const { scene } = useGLTF("/art_studio.glb");
  const [isScaled, setIsScaled] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const modelRef = useRef();
  const targetScale = useRef([1.3, 0.7, 1.3]);
  const currentScale = useRef([1.3, 0.7, 1.3]);
  const opacityRef = useRef(0);
  const materialsInitialized = useRef(false);

  useEffect(() => {
    if (scene && !materialsInitialized.current) {
      console.log('Initializing model materials');
      
      scene.scale.set(1.3, 0.7, 1.3);
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            child.material.transparent = true;
            // If skipping animation, start with full opacity
            child.material.opacity = skipAnimation && show ? 1 : 0;
          }
        }
      });
      
      // If skipping animation and should show, set initial opacity
      if (skipAnimation && show) {
        opacityRef.current = 1;
      }
      
      materialsInitialized.current = true;
      setModelLoaded(true);
    }
  }, [scene, skipAnimation, show]);

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

      // Opacity animation - faster if not skipping, instant if skipping
      const targetOpacity = show ? 1 : 0;
      
      if (skipAnimation) {
        // Instant opacity change when skipping animation
        opacityRef.current = targetOpacity;
      } else {
        // Smooth opacity transition for normal flow
        const opacityLerpFactor = show ? 0.6 : 0.5;
        opacityRef.current += (targetOpacity - opacityRef.current) * opacityLerpFactor;
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
    // Only show tooltip if model is fully visible
    if (opacityRef.current >= 0.95) { // Slightly lower threshold for better UX
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
    return null; // Don't render until model is properly loaded
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[2.2, 2, 1.6]}
      rotation={[0, 0, 0]}
      onDoubleClick={handleDoubleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    />
  );
};

const Scene = () => {
  const [showNavTitles, setShowNavTitles] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Check if animation has been completed before (in session storage)
  useEffect(() => {
    const hasCompletedAnimation = sessionStorage.getItem('cubeAnimationCompleted') === 'true';
    const hasVisitedScene = sessionStorage.getItem('hasVisitedScene') === 'true';
    
    console.log('Session check - Animation completed:', hasCompletedAnimation, 'Scene visited:', hasVisitedScene);
    
    if (hasCompletedAnimation && hasVisitedScene) {
      setSkipAnimation(true);
      setAnimationCompleted(true);
      setShowNavTitles(true);
      console.log('Skipping cube animation - returning from another route');
    }
  }, []);

  // Handle cube animation completion
  const handleAnimationComplete = () => {
    console.log('Cube animation completed, showing nav titles');
    setAnimationCompleted(true);
    setShowNavTitles(true);
    
    // Store in session storage that animation has been completed
    sessionStorage.setItem('cubeAnimationCompleted', 'true');
    sessionStorage.setItem('hasVisitedScene', 'true');
  };

  // Ensure scene is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setSceneReady(true);
    }, 100); // Small delay to ensure everything is mounted

    return () => clearTimeout(timer);
  }, []);

  // Mark that user has visited this scene
  useEffect(() => {
    sessionStorage.setItem('hasVisitedScene', 'true');
    
    // Clean up session storage when user closes tab/browser
    const handleBeforeUnload = () => {
      // Keep the session data - only clear on explicit navigation away
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
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
    console.log('showNavTitles changed:', showNavTitles);
  }, [showNavTitles]);

  if (!sceneReady) {
    return (
      <div style={{ 
        height: "100vh", 
        width: "100vw", 
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif"
      }}>
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
          far: 100000,
        }}
        shadows
        style={{ height: "100vh", width: "100vw", background: "#ffffff" }}
      >
        <CameraController cameraX={8.3} cameraY={7.9} cameraZ={7.4} />
        
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
          
          <GridComponent />
          
          {/* Model will only render when properly loaded */}
          <CenterModel show={showNavTitles} skipAnimation={skipAnimation} castShadow receiveShadow />
          
          {/* Cube with consistent animation */}
          <Cube 
            onAnimationComplete={handleAnimationComplete} 
            skipAnimation={skipAnimation}
            animationCompleted={animationCompleted}
          />
          
          <HollowCube />
          
          {/* NavTitles with opacity controlled by showNavTitles */}
          <group position={[-2.3, 0.0, -10.5]} rotation={[4.71, 0, 1.57]}>
            <NavAboutUs opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[8.5, 0, -1.2]} rotation={[1.57, 0, 0]}>
            <NavMerchandise opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[-7.5, 0, -7.5]} rotation={[1.57, 3.14, 0]}>
            <NavEvents opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[-8.5, 0, 0]} rotation={[1.57, 0, 0]}>
            <NavBIT opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[5.5, 0, 7.2]} rotation={[1.6, 3.1, 3.1]}>
            <NavGallery opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[-6.5, 0, 8.5]} rotation={[4.71, 0, 1.57]}>
            <NavMembers opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[0.5, 0, 9.5]} rotation={[4.71, 0, 1.57]}>
            <NavAlumni opacity={showNavTitles ? 1 : 0} />
          </group>
          
          <group position={[5.5, 0, -8]} rotation={[4.7, 0, 0]}>
            <NavInduction opacity={showNavTitles ? 1 : 0} />
          </group>
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
    </>
  );
};

// Optional: Add a function to reset the animation state (useful for development/testing)
const resetAnimationState = () => {
  sessionStorage.removeItem('cubeAnimationCompleted');
  sessionStorage.removeItem('hasVisitedScene');
  console.log('Animation state reset - refresh page to see animation again');
};

// Expose reset function to window for debugging (optional)
if (typeof window !== 'undefined') {
  window.resetSceneAnimation = resetAnimationState;
}

// Preload the model to ensure consistent loading
useGLTF.preload("/art_studio.glb");

export default Scene;