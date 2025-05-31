import React, { useMemo } from 'react';
import * as THREE from 'three';

const GridComponent = () => {
  const gridSize = 100;
  const gridDivisions = 100;
  const step = gridSize / gridDivisions;

  // Create grid lines geometry
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    // Create horizontal lines
    for (let i = 0; i <= gridDivisions; i++) {
      const y = (i * step) - (gridSize / 2);
      
      // Line from left to right
      vertices.push(-gridSize / 2, 0, y);
      vertices.push(gridSize / 2, 0, y);
    }

    // Create vertical lines
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i * step) - (gridSize / 2);
      
      // Line from front to back
      vertices.push(x, 0, -gridSize / 2);
      vertices.push(x, 0, gridSize / 2);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [gridSize, gridDivisions, step]);

  // Alternative: Using React Three Fiber's built-in Grid helper
  const GridHelper = () => (
    <gridHelper 
      args={[gridSize, gridDivisions]} 
      material-color={0x000000}
      material-opacity={0.1}
      material-transparent={true}
    />
  );

  // Custom grid with more control
  const CustomGrid = () => (
    <lineSegments geometry={gridGeometry}>
      <lineBasicMaterial 
        color={0x000000}
        opacity={0.1}
        transparent={true}
      />
    </lineSegments>
  );

  return (
    <group>
      {/* Option 1: Built-in GridHelper (simpler) */}
      <GridHelper />
      
      {/* Option 2: Custom Grid (more control) - uncomment to use instead */}
      {/* <CustomGrid /> */}
      
      {/* Optional: Add plus signs at grid intersections */}
      <PlusSigns gridSize={gridSize} gridDivisions={gridDivisions} step={step} />
    </group>
  );
};

// Component for plus signs at grid intersections
const PlusSigns = ({ gridSize, gridDivisions, step }) => {
  const plusSigns = useMemo(() => {
    const signs = [];
    
    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = (i * step) - (gridSize / 2);
        const z = (j * step) - (gridSize / 2);
        
        signs.push({
          key: `plus-${i}-${j}`,
          position: [x, 0.01, z] // Slightly above grid
        });
      }
    }
    
    return signs;
  }, [gridSize, gridDivisions, step]);

  return (
    <group>
      {plusSigns.map(({ key, position }) => (
        <PlusSign key={key} position={position} />
      ))}
    </group>
  );
};

// Individual plus sign component
const PlusSign = ({ position }) => {
  const plusGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const size = 0.1;
    
    const vertices = [
      // Horizontal line
      -size, 0, 0,
      size, 0, 0,
      // Vertical line
      0, 0, -size,
      0, 0, size,
    ];
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  return (
    <group position={position}>
      <lineSegments geometry={plusGeometry}>
        <lineBasicMaterial 
          color={0x000000}
          opacity={0.2}
          transparent={true}
        />
      </lineSegments>
    </group>
  );
};

// Example usage in a scene
const GridScene = () => {
  return (
    <group>
      {/* Camera setup */}
      <perspectiveCamera position={[10, 10, 10]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Grid component */}
      <GridComponent />
      
      {/* Optional: Add a reference object to see the grid scale */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
};

export default GridComponent;