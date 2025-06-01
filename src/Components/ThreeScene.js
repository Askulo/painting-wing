// components/Scene.js
"use client";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Stats,
  RoundedBox,
} from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { useControls } from "leva";
import { Leva } from "leva";
import GridComponent from "./GridComponent";
import { startCubeAnimation } from "./CubeAnimation";
// import { Environment, Stats } from "@react-three/drei";
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
      >
        <meshBasicMaterial color="#b0c4de" side={2} /> {/* BackSide is 2 */}
      </RoundedBox>

      {/* Inner cube */}
      <mesh position={[0, 0.05, 0]}>
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
    <mesh ref={cubeRef} position={[0, 8, 0]} scale={[1, 1, 1]}>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshBasicMaterial color="#d25c25" transparent opacity={opacity} />
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

const Scene = () => {
  const [showNavTitles, setShowNavTitles] = useState(false);

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
        <ambientLight intensity={0.3} />
        <Suspense>
          <GridComponent />
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
    </>
  );
};

export default Scene;