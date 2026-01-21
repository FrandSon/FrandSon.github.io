import * as THREE from "three";

export const createCeiling = (scene, textureLoader) => {
  // Load the textures
  const colorTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_Color.jpg"
  );
  const displacementTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_Displacement.jpg"
  );
  const aoTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_AmbientOcclusion.jpg"
  );
  const emissionTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_Emission.jpg"
  );
  const metalnessTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_Metalness.jpg"
  );
  const normalGLTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_NormalGL.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "OfficeCeiling005_2K-JPG/OfficeCeiling005_2K-JPG_Roughness.jpg"
  );

  // Increase repeat for larger surface area
  const repeatFactor = 8;
  [colorTexture, displacementTexture, aoTexture, emissionTexture, metalnessTexture, normalGLTexture, roughnessTexture].forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatFactor, repeatFactor);
  });

  // Expanded geometry to 140x140 to match floor and new room size
  const ceilingGeometry = new THREE.PlaneGeometry(140, 140);
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    aoMap: aoTexture,
    emissiveMap: emissionTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalGLTexture,
    normalMapType: THREE.NormalMap,
    roughnessMap: roughnessTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2;

  // Raised to 30. (Wall height 40, centered at Y=10 => top is 30)
  ceilingPlane.position.y = 30;

  scene.add(ceilingPlane);
};
