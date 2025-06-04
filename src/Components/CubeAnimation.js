// src/components/CubeAnimation.js
import * as THREE from "three";
import { gsap } from "gsap";

export function startCubeAnimation(cubeRef, camera, onComplete) {
  if (!cubeRef.current) return;

  const cube = cubeRef.current;
  const initialZoom = camera.zoom;

  const timeline = gsap.timeline({
    defaults: { ease: "power2.inOut" },
  });

  // Initial camera setup
  timeline.to(camera.position, {
    x: 8.3,
    y: 7.9,
    z: 7.4,
    duration: 1.5,
    ease: "power1.inOut",
    onUpdate: () => camera.lookAt(0, 1.3, 0),
  });

  // Group all main animations together
  timeline.addLabel("mainAnimations", ">");

  // Synchronized animations
  timeline
    .to(
      camera,
      {
        zoom: initialZoom * 1.1,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      "mainAnimations"
    )
    .to(
      cube.position,
      {
        y: 0.10,
        duration: 3,
        ease: "power1.inOut",
      },
      "mainAnimations"
    )
    .to(
      cube.scale,
      {
        x: 0.59,
        y: 0.47,
        z: 0.59,
        duration: 3,
        ease: "power1.inOut",
      },
      "mainAnimations"
    )
    .to(
      cube.material,
      {
        opacity: 0.7,
        duration: 0.3,
        onComplete,
      },
      ">"
    );

  return timeline;
}
