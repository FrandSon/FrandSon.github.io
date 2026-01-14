import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadBenchModel = (scene, x, y, z, rotationY) => {
  const loader = new GLTFLoader();

  loader.load(
    "/models/bench_2/scene.gltf",
    (gltf) => {
      const bench = gltf.scene;

      bench.position.set(x, y, z);
      bench.rotation.y = rotationY;
      bench.scale.set(3, 3, 3); // Kept your original scale

      bench.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(bench);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the bench model.", error);
    }
  );
};
