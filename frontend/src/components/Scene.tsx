import { Canvas } from "@react-three/fiber";
import HeroModel from "./HeroModel";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <HeroModel />
    </Canvas>
  );
}
