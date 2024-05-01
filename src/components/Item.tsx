// components/RotatingFBXItem.tsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { Mesh, Object3DEventMap, Sphere, Group, Box3, Object3D, Vector3 } from "three";

const RotatingFBXItem: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);
  const { camera, scene } = useThree();
  const fbx = useLoader(FBXLoader, "/Mouse_Mesh.fbx");

  useEffect(() => {
    if (fbx) {
      const sphere = computeBoundingSphere(fbx);
      if (sphere) {
        const fov = camera.fov * (Math.PI / 180);
        // const offset = sphere.radius / Math.tan(fov / 2) * 1.1;  // 1.1 to ensure the model is fully visible

        const cameraPosition = sphere.center.clone();
        cameraPosition.z -= -350;
        camera.position.copy(cameraPosition);
        camera.lookAt(sphere.center);

        camera.updateProjectionMatrix();
      }
    }
  }, [fbx, camera]);

  useFrame(() => {
    if (meshRef.current) {
      // Rotate around Y axis
      meshRef.current.rotation.y += 0.035;
    }
  });

  function computeBoundingSphere(object: Object3D): Sphere | null {
    const box = new Box3();

    object.traverse((child) => {
        if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            mesh.geometry.computeBoundingSphere();
            box.expandByPoint((child as Mesh).isMesh ? mesh.geometry.boundingSphere.center : new Vector3(0, 0, 0));
        }
    });

    if (box.isEmpty()) return null;

    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    return sphere;
}
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
