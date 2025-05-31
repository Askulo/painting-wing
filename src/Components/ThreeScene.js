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

const Cube = () => {
  const [opacity, setOpacity] = useState(0.8);
  const cubeRef = useRef();
  const cubeSize = 1;
  const { camera } = useThree();

  useEffect(() => {
    if (!cubeRef.current) return;
    startCubeAnimation(cubeRef, camera);

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
  // const { cameraX, cameraY, cameraZ } = useControls("Camera Position", {
  //   cameraX: {
  //     value: 8.3,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },
  //   cameraY: {
  //     value: 7.9,
  //     min: -10,
  //     max: 20,
  //     step: 0.1,
  //   },
  //   cameraZ: {
  //     value: 7.4,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },

  // });

  // Leva controls for NavAboutUs position and rotation
  // const { navX, navY, navZ, navRotX, navRotY, navRotZ } = useControls("NavAboutUs", {
  //   navX: { value: -3.14, min: -10, max: 10, step: 0.01 },
  //   navY: { value: 2, min: -10, max: 10, step: 0.01 },
  //   navZ: { value: 1.57, min: -10, max: 10, step: 0.01 },
  //   navRotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  //   navRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  //   navRotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  // });

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
        <CameraController cameraX={8.3} cameraY={7.9} cameraZ={7.4} />
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <Suspense>
          <GridComponent />
          <Cube />
          <HollowCube />
          {/* Leva controls for NavAboutUs position and rotation */}
          <group position={[-2.3, 0.0, -10.5]} rotation={[4.71, 0, 1.57]}>
            <NavAboutUs />
          </group>
          {/* Position your nav components as needed */}

          <group position={[8.5, 0, -1.2]} rotation={[1.6, 0, 0]}>
            <NavMerchandise />
          </group>
          <group position={[-7.5, 0, -7.5]} rotation={[1.57, 3.14, 0]}>
            <NavEvents />
          </group>

          <group position={[-8.5, 0, 0]} rotation={[1.57, 0, 0]}>
            <NavBIT />
          </group>

          <group position={[5.5, 0, 7.2]} rotation={[1.6, 3.1, 3.1]}>
            <NavGallery />
          </group>
          <group position={[-6.5, 0, 8.5]} rotation={[4.71, 0, 1.57]}>
            <NavMembers />
          </group>
          <group position={[0.5, 0, 9.5]} rotation={[4.71, 0, 1.57]}>
            <NavAlumni />
          </group>

          <group position={[5.5, 0, -8]} rotation={[4.7, 0, 0]}>
            <NavInduction />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
};

export default Scene;
