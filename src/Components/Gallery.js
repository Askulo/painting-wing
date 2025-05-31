"use client";
import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

export default function CylindricalGallery() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);
  const galleryGroupRef = useRef(null);
  const blocksRef = useRef([]);
  const scrollRef = useRef(0);

  // Helper function to create curved plane geometry
  const createCurvedPlane = useCallback((width, height, radius, segments) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];

    const segmentsX = segments * 4;
    const segmentsY = Math.floor(height * 12);
    const theta = width / radius;

    // Generate vertices and UVs
    for (let y = 0; y <= segmentsY; y++) {
      const v = y / segmentsY;

      for (let x = 0; x <= segmentsX; x++) {
        const u = x / segmentsX;
        const angle = theta * (u - 0.5);

        // Position on curved plane
        const posX = radius * Math.sin(angle);
        const posY = height * (v - 0.5);
        const posZ = radius * Math.cos(angle);

        vertices.push(posX, posY, posZ);
        uvs.push(u, v);
      }
    }

    // Generate indices
    for (let y = 0; y < segmentsY; y++) {
      for (let x = 0; x < segmentsX; x++) {
        const a = x + (segmentsX + 1) * y;
        const b = x + (segmentsX + 1) * (y + 1);
        const c = x + 1 + (segmentsX + 1) * (y + 1);
        const d = x + 1 + (segmentsX + 1) * y;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Random image selection
  const getRandomImage = useCallback(() => {
    return Math.floor(Math.random() * 30) + 1;
  }, []);

  // Load texture with promise
  const loadImageTexture = useCallback((imageNumber) => {
    const textureLoader = new THREE.TextureLoader();

    return new Promise((resolve) => {
      const texture = textureLoader.load(`/img/${imageNumber}.jpg`, (loadedTexture) => {
        loadedTexture.generateMipmaps = true;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        if (rendererRef.current) {
          loadedTexture.anisotropy =
            rendererRef.current.capabilities.getMaxAnisotropy();
        }
        resolve(loadedTexture);
      });
    });
  }, []);

  // Create a single block
  const createBlock = useCallback(
    async (baseY, yOffset, sectionIndex, blockIndex, radius) => {
      const blockGeometry = createCurvedPlane(5, 3, radius, 10);

      const imageNumber = getRandomImage();
      const texture = await loadImageTexture(imageNumber);

      const blockMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false,
      });

      const block = new THREE.Mesh(blockGeometry, blockMaterial);
      block.position.y = baseY + yOffset;

      const blockContainer = new THREE.Group();
      const blocksPerSection = 4;
      const sectionAngle = (Math.PI * 2) / blocksPerSection;
      const maxRandomAngle = sectionAngle * 0.3;

      const baseAngle = sectionAngle * blockIndex;
      const randomAngleOffset = (Math.random() * 2 - 1) * maxRandomAngle;
      const finalAngle = baseAngle + randomAngleOffset;

      blockContainer.rotation.y = finalAngle;
      blockContainer.add(block);

      return blockContainer;
    },
    [createCurvedPlane, getRandomImage, loadImageTexture]
  );

  // Initialize all blocks
  const initializeBlocks = useCallback(
    async (galleryGroup, radius, height) => {
      const numVerticalSections = 12;
      const blocksPerSection = 4;
      const verticalSpacing = 3.25;
      const blocks = [];
      blocksRef.current = blocks;

      const totalBlockHeight = numVerticalSections * verticalSpacing;
      const heightBuffer = (height - totalBlockHeight) / 2;
      const startY = -height / 2 + heightBuffer + verticalSpacing;

      for (let section = 0; section < numVerticalSections; section++) {
        const baseY = startY + section * verticalSpacing;

        for (let i = 0; i < blocksPerSection; i++) {
          const yOffset = Math.random() * 0.2 - 0.1;
          const blockContainer = await createBlock(
            baseY,
            yOffset,
            section,
            i,
            radius
          );
          blocks.push(blockContainer);
          galleryGroup.add(blockContainer);
        }
      }
    },
    [createBlock]
  );

  useEffect(() => {
    const init = async () => {
      if (!containerRef.current) return;

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;



      // 🔽 ADD GRADIENT BACKGROUND SPHERE HERE
      const gradientCanvas = document.createElement('canvas');
      gradientCanvas.width = 256;
      gradientCanvas.height = 256;
      const ctx = gradientCanvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, gradientCanvas.height);
      gradient.addColorStop(0, "#ff6200");  // Top color
      gradient.addColorStop(1, "#ffffff");  // Bottom color

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

      const gradientTexture = new THREE.CanvasTexture(gradientCanvas);

      const backgroundSphereGeometry = new THREE.SphereGeometry(100, 32, 32);
      const backgroundSphereMaterial = new THREE.MeshBasicMaterial({
        map: gradientTexture,
        side: THREE.BackSide,
      });
      const backgroundSphere = new THREE.Mesh(backgroundSphereGeometry, backgroundSphereMaterial);
      scene.add(backgroundSphere);
      // 🔼 GRADIENT BACKGROUND ADDED

      // Create camera with adjusted FOV and position
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 12;
      camera.position.y = 0;
      cameraRef.current = camera;

      // Create renderer with proper size
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(renderer.domElement);

      // Add stronger ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      // Create gallery group
      const galleryGroup = new THREE.Group();
      scene.add(galleryGroup);
      galleryGroupRef.current = galleryGroup;

      // Detect mobile (or small screen)
      const isMobile = window.innerWidth < 768;

      // Set radius based on device
      const radius = isMobile ? 4 : 7; // Decrease radius for mobile
      const height = 60;
      const segments = 30;

      const cylinderGeometry = new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        segments,
        1,
        true
      );

      const cylinderMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      });

      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      galleryGroup.add(cylinder);

      // Initialize blocks
      await initializeBlocks(galleryGroup, radius, height);

      // Create scroll container with proper dimensions
      const scrollHeight = height * 100;
      const scrollElement = document.createElement("div");
      scrollElement.style.height = `${scrollHeight}px`;
      scrollElement.style.position = "absolute";
      scrollElement.style.top = "0";
      scrollElement.style.width = "100%";
      scrollElement.style.zIndex = "1";
      scrollElement.style.pointerEvents = "none";
      document.body.appendChild(scrollElement);

      // Initialize Lenis with adjusted settings
      if (typeof window !== "undefined") {
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });
      }

      // Track scroll with improved rotation handling
      let rotationSpeed = 0;
      let cylinderRotation = 0;
      const baseRotationSpeed = 0.0025;
      const rotationFactor = 0.005;
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      lenisRef.current.on("scroll", ({ scroll, velocity }) => {
        scrollRef.current = scroll;
        rotationSpeed = velocity * 0.005;
        cylinderRotation = scroll * rotationFactor;
      });

      const animate = (time) => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current)
          return;

        lenisRef.current.raf(time);

        const scrollY = scrollRef.current;
        const scrollFraction = Math.min(scrollY / totalScroll, 1);

        const targetY = -scrollFraction * height * 0.85;
        cameraRef.current.position.y = targetY;

        galleryGroupRef.current.rotation.y = cylinderRotation;
        galleryGroupRef.current.rotation.y += rotationSpeed * baseRotationSpeed;
        rotationSpeed *= 0.95;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;

        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);

        // Fix: Only call update if it exists and is a function
        if (lenisRef.current && typeof lenisRef.current.update === "function") {
          lenisRef.current.update();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (scrollElement && scrollElement.parentNode) {
          scrollElement.parentNode.removeChild(scrollElement);
        }
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }
        if (
          rendererRef.current &&
          rendererRef.current.domElement &&
          containerRef.current
        ) {
          containerRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    };

    init();
  }, [initializeBlocks]);

  return (
    <div
      className="gallery-container"
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
