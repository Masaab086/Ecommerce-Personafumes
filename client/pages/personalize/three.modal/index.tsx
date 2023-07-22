import React, { FC, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import Model1 from "./modal1";
// import Modal2 from "./modal2";
import Modal2 from "./modal2";

interface ThreeDModalProps {
  text: any;
}

const ThreeDModal: FC<ThreeDModalProps> = ({ text }) => {
  return (
    <div className="w-full h-full md:w-[calc(100%-500px)]">
      <Canvas
        camera={{ position: [2, 0, 12.25], fov: 15 }}
        // style={{
        //   // backgroundColor: "#111a21",
        //   width: "70vw",
        //   height: "80vh",
        // }}
        className="h-full w-full mx-auto"
      >
        <ambientLight intensity={1.25} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />

        <Suspense fallback={null}>
          <Modal2 position={[-0.2, -0.2, 0]} text={text} />
          {/* <Model1 position={[-1, -0.2, 2]} /> */}
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ThreeDModal;
