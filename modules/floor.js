import * as THREE from "three";
import floortTexture from "/WoodFloor040_4K-JPG/WoodFloor040_4K_Color.jpg";

export const setupFloor = (scene) => {
  const textureLoader = new THREE.TextureLoader();

  // Load the textures
  const colorTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_Color.jpg"
  );
  const displacementTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_Displacement.jpg"
  );
  const normalTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_NormalGL.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_Roughness.jpg"
  );
  const aoTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_AmbientOcclusion.jpg"
  );

  // Set texture parameters (Repeat more times for the larger floor)
  // Adjusted repeat wrapping to maintain texture density on larger plane
  const repeatFactor = 8;

  [colorTexture, displacementTexture, normalTexture, roughnessTexture, aoTexture].forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatFactor, repeatFactor);
  });

  // Expanded geometry to 140x140 to cover the new 120x120 room area
  const planeGeometry = new THREE.PlaneGeometry(140, 140);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI;

  scene.add(floorPlane);
};
