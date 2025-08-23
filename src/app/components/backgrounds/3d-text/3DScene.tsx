import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import ThreeDText from "./3DText";

interface ThreeDSceneProps {
  text: string;
  size?: number;
  height?: number;
}

export default function ThreeDScene({
  text,
  size = 1,
  height = 0.2,
}: ThreeDSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.8} />

        {/* Main directional light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#ffffff"
        />

        {/* Fill light from opposite side */}
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.8}
          color="#ffffff"
        />

        {/* Top light for better definition */}
        <directionalLight
          position={[0, 10, 0]}
          intensity={0.6}
          color="#ffffff"
        />

        {/* Stars background for depth */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* 3D Text */}
        <ThreeDText text={text} size={size} height={height} />

        {/* Environment for realistic lighting */}
        <Environment preset="city" />

        {/* Subtle camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
