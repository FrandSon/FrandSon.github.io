import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadCeilingLampModel = (scene) => {
  const loader = new GLTFLoader();

  loader.load("/models/ceiling-lamp/scene.gltf", (gltf) => {
    const lamp = gltf.scene;

    console.log("Ceiling Lamp", gltf);

    // Position the lamp
    // Moved up to 25 to hang correctly from the new ceiling height of 30
    lamp.position.set(0, 25, 0);
    lamp.scale.set(0.1, 0.1, 0.1);

    // Add the lamp to the scene
    scene.add(lamp);
  });
};
