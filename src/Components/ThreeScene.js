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
      <mesh position={[0, 0.05, 0]}    castShadow
  receiveShadow >
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

const Cube = ({ onAnimationComplete }) => {
  const [opacity, setOpacity] = useState(0.8);
  const cubeRef = useRef();
  const cubeSize = 1;
  const { camera } = useThree();

  useEffect(() => {
    if (!cubeRef.current) return;
    startCubeAnimation(cubeRef, camera, onAnimationComplete);

    const hasNavigatedFrom3DScene =
      localStorage.getItem("from3DScene") === "true";
    setOpacity(hasNavigatedFrom3DScene ? 0 : 0.8);
  }, [camera, cubeRef]);

  return (
    <mesh ref={cubeRef} position={[0, 8, 0]} scale={[1, 1, 1]} castShadow receiveShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshStandardMaterial color="#d25c25" transparent opacity={opacity} />
    </mesh>
  );
};

const CameraController = ({ cameraX, cameraY, cameraZ }) => {
  const { camera } = useThree();

  useEffect(() => {

  //  if (Scene) {
  //   // Scene.scale.set(1.3, 0.7, 1.3);
  //   Scene.traverse((child) => {
  //     if (child.isMesh) {
  //       child.castShadow = true;
  //       child.receiveShadow = true;
  //     }
  //   });
  // }


    // Initial camera position

    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(0, 1.3, 0);
  }, [camera, cameraX, cameraY, cameraZ, ]);

  

  return null;
};

const CenterModel = () => {
  const { scene } = useGLTF("/art_studio.glb");
  const [isScaled, setIsScaled] = useState(false);
  const modelRef = useRef();
  const targetScale = useRef([1.3, 0.7, 1.3]);
  const currentScale = useRef([1.3, 0.7, 1.3]);

  useEffect(() => {
    if (scene) {
      // Initial scale
      scene.scale.set(1.3, 0.7, 1.3);
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Smooth animation using useFrame
  useFrame(() => {
    if (modelRef.current) {
      // Lerp (linear interpolation) for smooth scaling
      const lerpFactor = 0.5; // Adjust for animation speed (0.01 = slow, 0.1 = fast)
      
      currentScale.current[0] += (targetScale.current[0] - currentScale.current[0]) * lerpFactor;
      currentScale.current[1] += (targetScale.current[1] - currentScale.current[1]) * lerpFactor;
      currentScale.current[2] += (targetScale.current[2] - currentScale.current[2]) * lerpFactor;
      
      modelRef.current.scale.set(...currentScale.current);
    }
  });

  const handleDoubleClick = () => {
    targetScale.current = isScaled ? [1.3, 0.7, 1.3] : [2.2, 1.2, 2.2];
    setIsScaled(!isScaled);
  };

  const handlePointerEnter = (event) => {
    // Dispatch custom event to parent component
    window.dispatchEvent(new CustomEvent('showModelTooltip', {
      detail: { show: true, x: event.clientX, y: event.clientY }
    }));
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    // Dispatch custom event to parent component
    window.dispatchEvent(new CustomEvent('showModelTooltip', {
      detail: { show: false }
    }));
    document.body.style.cursor = 'default';
  };

  const handlePointerMove = (event) => {
    // Update tooltip position
    window.dispatchEvent(new CustomEvent('updateTooltipPosition', {
      detail: { x: event.clientX, y: event.clientY }
    }));
  };

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[1.2, 1, 0.6]}
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

    window.addEventListener('showModelTooltip', handleShowTooltip);
    window.addEventListener('updateTooltipPosition', handleUpdatePosition);

    return () => {
      window.removeEventListener('showModelTooltip', handleShowTooltip);
      window.removeEventListener('updateTooltipPosition', handleUpdatePosition);
    };
  }, []);

  return (
    <>
      {/* <Leva hidden /> */}
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
        {/* <Stats /> */}
        {/* <MouseRotatingGroup> */}
        <CameraController cameraX={8.3} cameraY={7.9} cameraZ={7.4} />
        {/* Lights */}
        <ambientLight intensity={1.2} color={0xffffff} />
   
        <Suspense>
          <ambientLight intensity={0.8} />
          {/* Bright point light above the model - exactly like your code */}
      <pointLight
        position={[2, 8, 0]}
        intensity={2}
        distance={100}
        castShadow
        color={0xffffff}
      />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.7}
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
          <CenterModel  castShadow receiveShadow />
          <Cube onAnimationComplete={() => setShowNavTitles(true)} />
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
        {/* </MouseRotatingGroup> */}
      </Canvas>
      
      {/* Tooltip outside Canvas */}
      {showInstruction && (
        <div
          style={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            padding: '8px 16px',
            background: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            borderRadius: '8px',
            fontSize: '14px',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            transition: 'opacity 0.3s',
            opacity: 1
          }}
        >
          Double-tap to  resize Art Room
        </div>
      )}
    </>
  );
};

export default Scene;