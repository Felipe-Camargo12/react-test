"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense as Suspense3D } from "react";
import { Meeseks } from "@/components/animate/3d-animate";

export default function Presentation() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 py-6">
      <h1
        className="text-3xl md:text-4xl font-black text-center md:text-left w-full md:w-1/3 leading-snug"
        style={{
          color: "#97ce4c",
          textShadow: `
            -1px -1px #000,
            1px -1px #000,
            -1px 1px #000,
            1px 1px #000
          `,
        }}
      >
        Bem-vindo ao multiverso! <br />
        Encontre seus personagens favoritos aqui
      </h1>

      <div className="w-full md:w-[30rem] h-[400px] md:h-[500px] overflow-visible">
        <Canvas
          className="flex flex-row items-center justify-start bg-cover bg-center"
          camera={{ position: [2, 1.8, 11] }}
          style={{
            backgroundImage: "url('/portal.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense3D fallback={null}>
            <Meeseks />
          </Suspense3D>
        </Canvas>
      </div>
    </div>
  );
}
