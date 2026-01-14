import * as THREE from "three";

export const setupLighting = (scene, paintings) => {
  // 1. Ambient Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  // Helper to create spotlights
  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);

    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);

    spotlight.castShadow = true;
    spotlight.angle = 0.6;
    spotlight.penumbra = 0.5;
    spotlight.decay = 2;
    spotlight.distance = 200;

    spotlight.shadow.mapSize.width = 2048;
    spotlight.shadow.mapSize.height = 2048;
    spotlight.shadow.bias = -0.0001;

    scene.add(spotlight);
    scene.add(spotlight.target);

    return spotlight;
  }

  // 2. Wall Spotlights
  // Increased intensity to cover the larger distance
  // Moved positions to match the new room size (walls at 60)
  // Raised Y height to 25 (since walls are now height 40)
  const wallIntensity = 3000;
  const lightHeight = 40;
  const lightOffset = 50; // Distance from center
  const targetOffset = 60; // Target the wall itself

  createSpotlight(
    0,
    lightHeight,
    -lightOffset,
    wallIntensity,
    new THREE.Vector3(0, 5, -targetOffset) // Front Wall
  );

  createSpotlight(
    0,
    lightHeight,
    lightOffset,
    wallIntensity,
    new THREE.Vector3(0, 5, targetOffset) // Back Wall
  );

  createSpotlight(
    -lightOffset,
    lightHeight,
    0,
    wallIntensity,
    new THREE.Vector3(-targetOffset, 5, 0) // Left Wall
  );

  createSpotlight(
    lightOffset,
    lightHeight,
    0,
    wallIntensity,
    new THREE.Vector3(targetOffset, 5, 0) // Right Wall
  );

  // 3. Statue Spotlight
  // Raised height to match the new ceiling scale
  const statueSpotlight = createSpotlight(
    0,
    25,
    0,
    1000,
    new THREE.Vector3(0, -4.2, 0)
  );
  statueSpotlight.angle = 0.5;
  statueSpotlight.penumbra = 0.3;
};
