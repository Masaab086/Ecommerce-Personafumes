import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Text } from "@react-three/drei";

const Model1 = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/modal.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Bpttle"
          geometry={nodes.Bpttle.geometry}
          material={materials.Glass}
          scale={[0.72, 1, 0.26]}
        >
          <mesh
            name="BezierCurve"
            geometry={nodes.BezierCurve.geometry}
            material={materials["Material.002"]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.38, 3.84, 1]}
          />
          <mesh
            name="Circle"
            geometry={nodes.Circle.geometry}
            material={materials["Fine Gold"]}
            position={[0, 1.03, 0]}
            scale={[1.38, 1, 3.84]}
          />
          <mesh
            name="Perfume"
            geometry={nodes.Perfume.geometry}
            material={materials["Water realistic"]}
            scale={[0.99, 1, 0.97]}
          />
          <mesh position={[0, -0.3, 0.28]}>
            <Text
              color="#FFFFFF"
              fontSize={0.26}
              maxWidth={20}
              lineHeight={1}
              letterSpacing={-0.1}
              textAlign="right"
              text={"Personafumes"}
              // font="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
            >
              Personafumes
            </Text>
          </mesh>
        </mesh>
      </group>
    </group>
  );
};

export default Model1;

useGLTF.preload("/modal.glb");
