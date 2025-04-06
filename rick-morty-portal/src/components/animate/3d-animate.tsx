"use client";

import { useGLTF } from "@react-three/drei";

export const Meeseks = () => {
  // Referência ao grupo 3D

  const { scene } = useGLTF("/models/mr_meeseks.glb");

  return (
    <group
      scale={0.3}
      position={[0, -4, 5]}
    >
      <primitive object={scene} />
    </group>
  );
};

// Pré-carrega o modelo para evitar delay visual
useGLTF.preload("/models/mr_meeseks.glb");
