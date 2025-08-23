import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

interface ThreeDTextProps {
  text: string;
  size?: number;
  height?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}

// Function to create a simple normal map pattern programmatically
const createNormalMap = () => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (context) {
    // Create a simple gradient pattern
    const gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#7f7fff");
    gradient.addColorStop(0.5, "#7fff7f");
    gradient.addColorStop(1, "#ff7f7f");

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Function to create a simple roughness map programmatically
const createRoughnessMap = () => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (context) {
    // Create a noise pattern for roughness
    const imageData = context.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 100 + 50; // Random gray values
      data[i] = value; // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 255; // A
    }

    context.putImageData(imageData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export default function ThreeDText({
  text,
  size = 1,
  height = 0.3,
  color = "#ffffff",
  metalness = 0.8,
  roughness = 0.2,
}: ThreeDTextProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Create textures programmatically
  const normalMap = useMemo(() => createNormalMap(), []);
  const roughnessMap = useMemo(() => createRoughnessMap(), []);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // More dynamic floating animation
      const time = state.clock.elapsedTime;

      // Gentle floating animation
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.03;

      // Subtle rotation based on time
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;

      // Pulsating scale effect
      const scale = 1 + Math.sin(time * 0.8) * 0.01;
      groupRef.current.scale.set(scale, scale, scale);

      // Update emissive intensity based on time
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material && material.emissive) {
        material.emissiveIntensity = 0.2 + Math.sin(time * 1.5) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          ref={meshRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={size}
          height={height}
          curveSegments={12}
          bevelEnabled={true}
          bevelThickness={0.03}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={8}
        >
          {text}
          <meshStandardMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.3, 0.3)}
            roughnessMap={roughnessMap}
            emissive="#4a86e8"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>

      {/* Add a subtle ambient glow behind the text */}
      <pointLight
        position={[0, 0, -1]}
        color="#4a86e8"
        intensity={0.5}
        distance={5}
      />
    </group>
  );
}
