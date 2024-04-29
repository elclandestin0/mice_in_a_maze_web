// components/RotatingFBXItem.tsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { Mesh, Sphere } from "three";

const RotatingFBXItem: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const { camera, scene } = useThree();
  const fbx = useLoader(FBXLoader, "/Mouse_Mesh.fbx");

  useEffect(() => {
    if (fbx && meshRef.current) {
      // Assuming fbx is a Mesh object, otherwise cast it accordingly
      //   fbx.geometry.computeBoundingSphere();
      const boundingSphere: Sphere = fbx.geometry.getBoundingSphere;
      const radius = boundingSphere.radius;
      const fov = camera.fov;

      // Transform the bounding sphere's center to world coordinates
      const cog = fbx.localToWorld(boundingSphere.center.clone());

      // Position the camera to frame the entire object based on the bounding sphere
      camera.position.set(
        cog.x,
        cog.y,
        cog.z + (1.1 * radius) / Math.tan((fov * Math.PI) / 360)
      );

      // Ensure the camera looks at the center of the bounding sphere
      camera.lookAt(cog);

      // Update the camera's projection matrix
      camera.updateProjectionMatrix();

      // Set meshRef's position to the inverse of the CoG to rotate around its center
      meshRef.current.position.copy(cog.multiplyScalar(-1));

      // Update the scene's matrix world
      scene.updateMatrixWorld(true);
    }
  }, [fbx, camera, scene]);

  useFrame(() => {
    if (meshRef.current) {
      // Rotate around Y axis
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={fbx} />
    </group>
  );
};

const Item: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingFBXItem />
    </Canvas>
  );
};

export default Item;
