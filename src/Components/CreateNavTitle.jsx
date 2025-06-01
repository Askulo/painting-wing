import React, { useMemo, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as THREE from "three";
import { useRouter } from "next/navigation";

// Corner component - reusable for all nav items
function Corner({ size, color, position, rotation, opacity = 1 }) {
  const points = useMemo(
    () => [
      // Horizontal line points
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(size, 0, 0)],
      // Vertical line points
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -size, 0)],
    ],
    [size]
  );

  return (
    <group position={position} rotation={rotation}>
      {points.map((linePoints, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePoints.length}
              array={
                new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z]))
              }
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            linewidth={5}
          />
        </line>
      ))}
    </group>
  );
}

// Text component - reusable for all nav items
function NavText({
  text,
  font,
  position,
  rotation,
  color = "#000000",
  opacity = 1,
}) {
  const textMeshes = useMemo(() => {
    if (!font) return [];

    return text
      .split("")
      .map((char, index) => {
        if (char === " ") return null; // Skip spaces but maintain positioning

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
  }, [text, font]);

  return (
    <group position={position} rotation={rotation}>
      {textMeshes.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          position={mesh.position}
          userData={{ isNavTitleText: true }}
        >
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
}

// About Us Component
export function NavAboutUs({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 3.5;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.01]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/about-us");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/about-us");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="ABOUT US"
          font={font}
          position={[-2.7, -2.1, -1]}
          rotation={[0, 0, 4.71]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Events Component
export function NavEvents({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 3;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.01]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/events");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/events");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="EVENTS"
          font={font}
          position={[-2.7, -1.5, -1]}
          rotation={[0, 0, 4.71]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Members (Bearers) Component
export function NavMembers({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 5;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.01]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/members");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/members");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="POST BEARERS"
          font={font}
          position={[-2.7, -3, -1]}
          rotation={[0, 0, 4.71]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Alumni Component
export function NavAlumni({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 3;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.03]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/alumni");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/alumni");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="ALUMNI"
          font={font}
          position={[-2.7, -1.8, -1]}
          rotation={[0, 0, 4.71]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Merchandise Component
export function NavMerchandise({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 4.2;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.01]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/merchandise");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/merchandise");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="MERCHANDISE"
          font={font}
          position={[2.8, -2.6, 1]}
          rotation={[0, 3.14, 4.7124]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// BIT Sindri Component
export function NavBIT({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 3.9;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.03]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/bit-sindri");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/bit-sindri");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="BIT SINDRI"
          font={font}
          position={[2.8, -2.3, 1]}
          rotation={[3.14, 0, 1.57]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Gallery (formerly Collab) Component
export function NavGallery({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 3.5;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}
      <mesh
        position={[0, 0, 0.03]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/gallery");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/gallery");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="GALLERY"
          font={font}
          position={[2.7, 1.8, -1]}
          rotation={[0, 0, 1.57]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Induction Component
export function NavInduction({
  cornerSize = 0.2,
  lineColor = 0xa44c24,
  opacity = 1,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const font = useLoader(FontLoader, "/fonts/Decorya DEMO_Regular.json");

  const rectangleWidth = 1;
  const rectangleHeight = 3.5;

  const corners = [
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

  return (
    <group>
      {/* Hover detection area */}{" "}
      <mesh
        position={[0, 0, -0.01]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsClicked(true);
          router.push("/modelviewer");
        }}
      >
        <planeGeometry args={[rectangleWidth, rectangleHeight]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={isHovered ? 0.7 : 0}
        />
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
      <group
        onClick={() => {
          setIsClicked(true);
          router.push("/modelviewer");
        }}
        // style={{ cursor: "pointer" }}
      >
        <NavText
          text="INDUCTION"
          font={font}
          position={[2.7, 2.0, -1]}
          rotation={[0, 0, 1.57]}
          opacity={opacity}
        />
      </group>
    </group>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
