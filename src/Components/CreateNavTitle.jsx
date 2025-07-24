import React, { useMemo, useState, useCallback, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

// Geometry caches for performance
const cornerGeometryCache = new Map();
const textGeometryCache = new Map();

// Shared materials for better performance
const createLineMaterial = (color, opacity) => 
  new THREE.LineBasicMaterial({ 
    color, 
    transparent: true, 
    opacity, 
    linewidth: 5 
  });

const createMeshMaterial = (color, opacity) =>
  new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity
  });

// Corner component - optimized with geometry caching and instancing
function Corner({ size, color, position, rotation, opacity = 1 }) {
  const materialRef = useRef();
  
  const { geometries, material } = useMemo(() => {
    const cacheKey = `corner-${size}`;
    
    let geometries;
    if (cornerGeometryCache.has(cacheKey)) {
      geometries = cornerGeometryCache.get(cacheKey);
    } else {
      const horizontalPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(size, 0, 0)
      ];
      const verticalPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -size, 0)
      ];
      
      const horizontalGeometry = new THREE.BufferGeometry().setFromPoints(horizontalPoints);
      const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
      
      geometries = [horizontalGeometry, verticalGeometry];
      cornerGeometryCache.set(cacheKey, geometries);
    }
    
    return {
      geometries,
      material: createLineMaterial(color, opacity)
    };
  }, [size, color, opacity]);

  return (
    <group position={position} rotation={rotation}>
      {geometries.map((geometry, index) => (
        <line key={index} geometry={geometry} material={material} />
      ))}
    </group>
  );
}

// Text component - optimized with geometry caching
function NavText({
  text,
  font,
  position,
  rotation,
  color = "#000000",
  opacity = 1,
}) {
  const { textMeshes, material } = useMemo(() => {
    if (!font) return { textMeshes: [], material: null };

    const cacheKey = `text-${text}-${font.uuid || 'default'}`;
    
    let meshes;
    if (textGeometryCache.has(cacheKey)) {
      meshes = textGeometryCache.get(cacheKey);
    } else {
      meshes = text
        .split("")
        .map((char, index) => {
          if (char === " ") return null;

          const geometry = new TextGeometry(char, {
            font: font,
            size: 0.5,
            depth: 0.06,
          });
          geometry.center();

          return {
            geometry,
            position: [-0.4 * text.length + index * 0.35, 2.7, 1.1],
            char,
          };
        })
        .filter(Boolean);
      
      textGeometryCache.set(cacheKey, meshes);
    }

    return {
      textMeshes: meshes,
      material: createMeshMaterial(color, opacity)
    };
  }, [text, font, color, opacity]);

  return (
    <group position={position} rotation={rotation}>
      {textMeshes.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          position={mesh.position}
          material={material}
          userData={{ isNavTitleText: true }}
        />
      ))}
    </group>
  );
}

// Generic navigation component to reduce code duplication
function NavItem({
  text,
  route,
  rectangleHeight,
  textPosition,
  textRotation,
  hoverAreaPosition = [0, 0, 0.01],
  hoverAreaRotation = [0, 0, 0],
  hoverAreaArgs,
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;

  const { corners, hoverMaterial } = useMemo(() => {
    const cornerData = [
      {
        position: [-rectangleWidth / 2, rectangleHeight / 2, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [rectangleWidth / 2, rectangleHeight / 2, 0],
        rotation: [0, 0, -Math.PI / 2],
      },
      {
        position: [rectangleWidth / 2, -rectangleHeight / 2, 0],
        rotation: [0, 0, Math.PI],
      },
      {
        position: [-rectangleWidth / 2, -rectangleHeight / 2, 0],
        rotation: [0, 0, Math.PI / 2],
      },
    ];

    return {
      corners: cornerData,
      hoverMaterial: new THREE.MeshBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: 0
      })
    };
  }, [rectangleWidth, rectangleHeight, lineColor]);

  const handleClick = useCallback(() => {
    router.push(route);
  }, [router, route]);

  const handlePointerEnter = useCallback(() => setIsHovered(true), []);
  const handlePointerLeave = useCallback(() => setIsHovered(false), []);

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={hoverAreaPosition}
        rotation={hoverAreaRotation}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        material={hoverMaterial}
      >
        <planeGeometry args={hoverAreaArgs || [rectangleWidth, rectangleHeight]} />
      </mesh>

      {/* Corners */}
      {corners.map((corner, index) => (
        <Corner
          key={index}
          size={cornerSize}
          color={lineColor}
          position={corner.position}
          rotation={corner.rotation}
          opacity={opacity}
        />
      ))}

      {/* Text */}
      <group onClick={handleClick}>
        <NavText
          text={text}
          font={font}
          position={textPosition}
          rotation={textRotation}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// About Us Component
export function NavAboutUs({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="ABOUT US"
      route="/about-us"
      rectangleHeight={3.5}
      textPosition={[-2.7, -2.1, -1]}
      textRotation={[0, 0, 4.71]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Events Component
export function NavEvents({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="EVENTS"
      route="/events"
      rectangleHeight={3}
      textPosition={[-2.7, -1.5, -1]}
      textRotation={[0, 0, 4.71]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Members (Bearers) Component
export function NavMembers({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="POST BEARERS"
      route="/members"
      rectangleHeight={5}
      textPosition={[-2.7, -3, -1]}
      textRotation={[0, 0, 4.71]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Alumni Component
export function NavAlumni({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="ALUMNI"
      route="/alumni"
      rectangleHeight={3}
      textPosition={[-2.7, -1.8, -1]}
      textRotation={[0, 0, 4.71]}
      hoverAreaPosition={[0, 0, 0.03]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Merchandise Component
export function NavMerchandise({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="MERCHANDISE"
      route="/merchandise"
      rectangleHeight={4.2}
      textPosition={[2.8, -2.6, 1]}
      textRotation={[0, 3.14, 4.7124]}
      hoverAreaPosition={[-1.6, -1.42, 1.5]}
      hoverAreaRotation={[3.14, 0, 0]}
      hoverAreaArgs={[1.2, 4.5]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// BIT Sindri Component
export function NavBIT({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="BIT SINDRI"
      route="/bit-sindri"
      rectangleHeight={3.9}
      textPosition={[2.8, -2.3, 1]}
      textRotation={[3.14, 0, 1.57]}
      hoverAreaPosition={[-1.6, -1.42, 1.5]}
      hoverAreaRotation={[3.14, 0, 0]}
      hoverAreaArgs={[1.2, 4]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Gallery Component
export function NavGallery({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="GALLERY"
      route="/gallery"
      rectangleHeight={3.5}
      textPosition={[2.7, 1.8, -1]}
      textRotation={[0, 0, 1.57]}
      hoverAreaPosition={[0, 0, 0.03]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Induction Component
export function NavInduction({ cornerSize = 0.2, lineColor = 0xa44c24, opacity = 1 }) {
  return (
    <NavItem
      text="INDUCTION"
      route="/modelviewer"
      rectangleHeight={3.5}
      textPosition={[2.7, 2.0, -1]}
      textRotation={[0, 0, 1.57]}
      hoverAreaPosition={[0, 0, -0.01]}
      cornerSize={cornerSize}
      lineColor={lineColor}
      opacity={opacity}
    />
  );
}

// Loading component
function LoadingSpinner() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}