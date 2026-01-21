import * as THREE from "three";

export function createWalls(scene, textureLoader) {
  let wallGroup = new THREE.Group();
  scene.add(wallGroup);

  const normalTexture = textureLoader.load(
    "leather_white_2k.gltf/textures/leather_white_nor_gl_2k.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "leather_white_2k.gltf/textures/leather_white_rough_2k.jpg"
  );

  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xadadae,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    side: THREE.DoubleSide,
  });

  // Room Dimensions have been tripled (approx 120x120) and height doubled (40)
  // Wall Geometry width increased to 200 to ensure full coverage
  // Height increased to 40
  const wallGeometry = new THREE.BoxGeometry(200, 40, 0.001);

  // Front Wall
  const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
  frontWall.position.z = -60; // Moved from -20 to -60
  frontWall.position.y = 10;  // Raised so bottom sits near floor (approx -10)

  // Left Wall
  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -60; // Moved from -20 to -60
  leftWall.position.y = 10;

  // Right Wall
  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.x = 60; // Moved from 20 to 60
  rightWall.rotation.y = Math.PI / 2;
  rightWall.position.y = 10;

  // Back Wall
  const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
  backWall.position.z = 60; // Moved from 20 to 60
  backWall.position.y = 10;

  // New Center Wall
  // Aesthetic separator: doesn't touch ceiling or outer walls
  const centerWallGeometry = new THREE.BoxGeometry(60, 25, 2);
  const centerWall = new THREE.Mesh(centerWallGeometry, wallMaterial);

  // Positioned in the center of the room
  // Y = 9 places the bottom roughly at -3.5 (near the floor which is at -Math.PI)
  centerWall.position.set(0, 9, 0);

  wallGroup.add(frontWall, backWall, leftWall, rightWall, centerWall);

  return wallGroup;
}
