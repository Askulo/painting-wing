// components/MouseRotatingGroup.js
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

const MouseRotatingGroup = ({ children }) => {
  const groupRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y +=
      (mouse.x * Math.PI - groupRef.current.rotation.y) * 0.001;

    groupRef.current.rotation.x +=
      (mouse.y * Math.PI - groupRef.current.rotation.x) * 0.001;
  });

  return <group ref={groupRef}>{children}</group>;
};

export default MouseRotatingGroup;
