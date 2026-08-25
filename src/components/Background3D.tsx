import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShaderBackground } from '@/components/ui/red-in-black';

export const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 160;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Subtle floating dust/particle system
    const particleCount = 80;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCrimson = new THREE.Color(0xE50914);
    const colorRuby = new THREE.Color(0xD32F2F);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 340;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 280;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 220;

      const mixedColor = Math.random() > 0.4 ? colorCrimson : Math.random() > 0.5 ? colorRuby : colorWhite;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 3D Floating Low-Poly Geometric Meshes
    const polyGroup = new THREE.Group();

    const polyMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a0507,
      emissive: 0x400206,
      specular: 0xE50914,
      shininess: 40,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const icoGeom = new THREE.IcosahedronGeometry(18, 1);
    const icoMesh = new THREE.Mesh(icoGeom, polyMaterial);
    icoMesh.position.set(-80, 40, -40);
    polyGroup.add(icoMesh);

    const dodecGeom = new THREE.DodecahedronGeometry(14, 0);
    const dodecMesh = new THREE.Mesh(dodecGeom, polyMaterial);
    dodecMesh.position.set(90, -50, -30);
    polyGroup.add(dodecMesh);

    const octGeom = new THREE.OctahedronGeometry(12, 0);
    const octMesh = new THREE.Mesh(octGeom, polyMaterial);
    octMesh.position.set(60, 60, -60);
    polyGroup.add(octMesh);

    scene.add(polyGroup);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xE50914, 3.5, 350);
    redLight.position.set(0, 0, 100);
    scene.add(redLight);

    const whiteLight = new THREE.PointLight(0xffffff, 1, 200);
    whiteLight.position.set(-100, 100, 50);
    scene.add(whiteLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.08;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      polyGroup.rotation.y += 0.0012;
      polyGroup.rotation.x += 0.0008;
      icoMesh.rotation.x += 0.002;
      dodecMesh.rotation.y += 0.003;

      redLight.position.x = targetX * 1.5;
      redLight.position.y = -targetY * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      pMaterial.dispose();
      icoGeom.dispose();
      dodecGeom.dispose();
      octGeom.dispose();
      polyMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 21st.dev WebGL Red-in-Black Flow Field Background Shader */}
      <ShaderBackground className="absolute inset-0 w-full h-full opacity-70 pointer-events-auto" />
      {/* Three.js 3D geometric nodes canvas overlay without connecting lines */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
