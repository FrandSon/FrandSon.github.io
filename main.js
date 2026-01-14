import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
//import { loadStatueModel } from "./modules/statue.js";
import { setupPlayButton } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { clickHandling } from "./modules/clickHandling.js";
import { loadBenchModel } from "./modules/bench.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";

let { camera, controls, renderer } = setupScene();

setupAudio(camera);

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene);
const ceiling = createCeiling(scene, textureLoader);
const paintings = createPaintings(scene, textureLoader);
const lighting = setupLighting(scene, paintings);

createBoundingBoxes(walls);
createBoundingBoxes(paintings);

addObjectsToScene(scene, paintings);

setupPlayButton(controls);

setupEventListeners(controls);

clickHandling(renderer, camera, paintings);

setupRendering(scene, camera, renderer, paintings, controls, walls);

// --- LOAD MODELS ---

// Floor Y position is approx -Math.PI (-3.14159...)
// We place objects slightly above that to ensure they sit ON the floor.
const floorY = -3.15;

// Statue 1: Center of the Front Room (Z = -30)
//loadStatueModel(scene, 0, floorY, -30, 0.1);

// Statue 2: Center of the Back Room (Z = 30)
//loadStatueModel(scene, 0, floorY, 30, 0.1);

// -- FRONT ROOM BENCHES (Center approx Z = -30) --

// Two looking at the wall in the middle (Z=0) -> Face +Z (Rot 0)
loadBenchModel(scene, -5, floorY, -22, 0);
loadBenchModel(scene, 5, floorY, -22, 0);

// Two looking at the Front wall (Z=-60) -> Face -Z (Rot PI)
loadBenchModel(scene, -5, floorY, -38, Math.PI);
loadBenchModel(scene, 5, floorY, -38, Math.PI);

// One looking at Left Wall (X=-60) -> Face -X (Rot -PI/2)
loadBenchModel(scene, -12, floorY, -30, -Math.PI / 2);

// One looking at Right Wall (X=60) -> Face +X (Rot PI/2)
loadBenchModel(scene, 12, floorY, -30, Math.PI / 2);


// -- BACK ROOM BENCHES (Center approx Z = 30) --

// Two looking at the wall in the middle (Z=0) -> Face -Z (Rot PI)
loadBenchModel(scene, -5, floorY, 22, Math.PI);
loadBenchModel(scene, 5, floorY, 22, Math.PI);

// Two looking at the Back wall (Z=60) -> Face +Z (Rot 0)
loadBenchModel(scene, -5, floorY, 38, 0);
loadBenchModel(scene, 5, floorY, 38, 0);

// One looking at Left Wall (X=-60) -> Face -X (Rot -PI/2)
loadBenchModel(scene, -12, floorY, 30, -Math.PI / 2);

// One looking at Right Wall (X=60) -> Face +X (Rot PI/2)
loadBenchModel(scene, 12, floorY, 30, Math.PI / 2);


loadCeilingLampModel(scene);

