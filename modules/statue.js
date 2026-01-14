import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadStatueModel = (scene, x, y, z, scale) => {
  const loader = new GLTFLoader();

  // Load GLB file with embedded textures
  loader.load(
    "models/statue/51227_ncg_trajan_cuirass.glb",
    (gltf) => {
      const statue = gltf.scene;

      // Position using arguments
      statue.position.set(x, y, z);
      statue.scale.set(scale, scale, scale);

      let meshCount = 0;
      let texturedMeshCount = 0;

      // Configure all meshes in the statue
      statue.traverse((child) => {
        if (child.isMesh) {
          meshCount++;
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material) {
            const material = child.material;

            // Check if this mesh has a texture
            if (material.map && material.map.isTexture) {
              texturedMeshCount++;

              // Set texture color space to SRGB for proper color reproduction
              material.map.colorSpace = THREE.SRGBColorSpace;
              material.map.needsUpdate = true;
            }

            // Handle different material types appropriately
            if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
              // Set material properties for better appearance
              material.roughness = 0.6;
              material.metalness = 0.0;

              // Ensure emissive is black
              if (material.emissive) {
                material.emissive.setHex(0x000000);
              }
            } else if (material.isMeshLambertMaterial) {
              // MeshLambertMaterial - older material type
              if (!material.color) {
                material.color = new THREE.Color(0xffffff);
              }
            } else if (material.isMeshPhongMaterial) {
              material.shininess = 25;
              material.specular = new THREE.Color(0x222222);
            }

            // Trigger material update
            material.needsUpdate = true;
          }
        }
      });

      scene.add(statue);
      console.log("Statue loaded successfully");
      console.log(`Total meshes: ${meshCount}`);
      console.log(`Meshes with textures: ${texturedMeshCount}`);

      // Verify textures loaded
      if (texturedMeshCount === 0 && meshCount > 0) {
        console.warn("WARNING: No textures found on meshes. The GLB file may not have embedded textures.");
      } else if (texturedMeshCount > 0) {
        console.log("SUCCESS: Textures loaded from embedded GLB file!");
      }
    },
    (progress) => {
      // Optional: Log loading progress
      console.log(`Loading statue: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
    },
    (error) => {
      console.error("An error occurred while loading the statue model:", error);
    }
  );
};
