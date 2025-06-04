// components/MouseRotatingGroup.js
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

const MouseRotatingGroup = ({ children, enabled = true }) => {
  const groupRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current || !enabled) return;
    groupRef.current.rotation.y +=
      (mouse.x * 0.1 - groupRef.current.rotation.y) * 0.015;

    groupRef.current.rotation.x +=
      (mouse.y * 0.1 - groupRef.current.rotation.x) * 0.015;
  });

  return <group ref={groupRef}>{children}</group>;
};

export default MouseRotatingGroup;
