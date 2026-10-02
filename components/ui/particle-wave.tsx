"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ParticleWaveProps {
  className?: string;
  theme?: "dark" | "light" | "auto";
  particleColorHex?: number;
}

const ParticleWave: React.FC<ParticleWaveProps> = ({ className = "", theme = "dark", particleColorHex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    particleMaterial: THREE.ShaderMaterial;
    animationId: number | null;
    mouse: THREE.Vector2;
  } | null>(null);

  // Function to detect current theme
  const getCurrentTheme = () => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("dark") ? "dark" : theme;
  };

  // Function to get background color based on theme
  const getBackgroundColor = (currentTheme: string) => {
    return currentTheme === "dark"
      ? new THREE.Color(0x000000) // Pitch black obsidian background
      : new THREE.Color(0xf7f9fc); // Light theme background
  };

  // Function to get particle color based on theme
  const getParticleColor = (currentTheme: string) => {
    if (particleColorHex) {
      const c = new THREE.Color(particleColorHex);
      return new THREE.Vector3(c.r, c.g, c.b);
    }
    return currentTheme === "dark"
      ? new THREE.Vector3(0.88, 0.91, 0.94) // Silver metallic particle shimmer
      : new THREE.Vector3(0.1, 0.2, 0.5);
  };

  const particleVertex = `
    attribute float scale;
    uniform float uTime;
    void main() {
      vec3 p = position;
      float s = scale;
      p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      p.x += (sin(p.y + uTime) * 0.5);
      s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = s * 16.0 * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFragment = `
    uniform vec3 uColor;
    void main() {
      // Soft circular particle rendering with glittering edge decay
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;
      float alpha = (1.0 - dist * 2.0) * 0.75;
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  const initScene = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const aspectRatio = winWidth / winHeight;

    try {
      // Camera
      const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 1000);
      camera.position.set(0, 6, 5);

      // Scene
      const scene = new THREE.Scene();

      // Safe WebGL Renderer Instantiation
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(winWidth, winHeight);

      // Set initial background color based on theme
      const currentTheme = getCurrentTheme();
      renderer.setClearColor(getBackgroundColor(currentTheme), 1);

      // Particles
      const gap = 0.3;
      const amountX = 180;
      const amountY = 180;
      const particleNum = amountX * amountY;
      const particlePositions = new Float32Array(particleNum * 3);
      const particleScales = new Float32Array(particleNum);

      let i = 0;
      let j = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          particlePositions[i] = ix * gap - (amountX * gap) / 2;
          particlePositions[i + 1] = 0;
          particlePositions[i + 2] = iy * gap - (amountX * gap) / 2;
          particleScales[j] = 1;
          i += 3;
          j++;
        }
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute("scale", new THREE.BufferAttribute(particleScales, 1));

      const particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: getParticleColor(currentTheme) },
        },
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const mouse = new THREE.Vector2(-10, -10);

      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        particleMaterial,
        animationId: null,
        mouse,
      };
      setWebglSupported(true);
    } catch (error) {
      console.warn("WebGL is not supported or disabled in browser environment:", error);
      setWebglSupported(false);
    }
  };

  const animate = () => {
    if (!sceneRef.current) return;

    try {
      const { scene, camera, renderer, particleMaterial } = sceneRef.current;

      particleMaterial.uniforms.uTime.value += 0.035;

      // Update particle color and background based on current theme
      const currentTheme = getCurrentTheme();
      particleMaterial.uniforms.uColor.value = getParticleColor(currentTheme);
      renderer.setClearColor(getBackgroundColor(currentTheme));

      camera.lookAt(scene.position);
      renderer.render(scene, camera);

      sceneRef.current.animationId = requestAnimationFrame(animate);
    } catch (err) {
      console.warn("WebGL render frame failed:", err);
    }
  };

  const handleResize = () => {
    if (!sceneRef.current) return;

    try {
      const { camera, renderer } = sceneRef.current;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      camera.aspect = winWidth / winHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(winWidth, winHeight);
    } catch (err) {
      console.warn("WebGL resize update failed:", err);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!sceneRef.current) return;

    sceneRef.current.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    sceneRef.current.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    initScene();
    if (sceneRef.current) {
      animate();
    }

    const handleResizeEvent = () => handleResize();
    const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e);

    window.addEventListener("resize", handleResizeEvent);
    window.addEventListener("mousemove", handleMouseMoveEvent);

    return () => {
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener("resize", handleResizeEvent);
      window.removeEventListener("mousemove", handleMouseMoveEvent);

      // Cleanup Three.js resources
      if (sceneRef.current) {
        try {
          const { scene, renderer, particles } = sceneRef.current;
          scene.remove(particles);
          if (particles.geometry) particles.geometry.dispose();
          if (particles.material) {
            if (Array.isArray(particles.material)) {
              particles.material.forEach((material) => material.dispose());
            } else {
              particles.material.dispose();
            }
          }
          renderer.dispose();
        } catch (e) {
          console.warn("WebGL cleanup warning:", e);
        }
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="block w-full h-full opacity-80 pointer-events-none"
          style={{
            width: "100vw",
            height: "100vh",
            margin: 0,
            overflow: "hidden",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black opacity-90 pointer-events-none" />
      )}
    </div>
  );
};

export { ParticleWave };
export default ParticleWave;
