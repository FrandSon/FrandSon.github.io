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

setupEventListeners(controls, camera, scene);

// CHANGED: Passed controls to clickHandling so we can unlock pointer
clickHandling(renderer, camera, paintings, controls);

setupRendering(scene, camera, renderer, paintings, controls, walls);

// --- LOAD MODELS ---

const floorY = -3.15;

// -- FRONT ROOM BENCHES --
loadBenchModel(scene, -5, floorY, -22, 0);
loadBenchModel(scene, 5, floorY, -22, 0);
loadBenchModel(scene, -5, floorY, -38, Math.PI);
loadBenchModel(scene, 5, floorY, -38, Math.PI);
loadBenchModel(scene, -12, floorY, -30, -Math.PI / 2);
loadBenchModel(scene, 12, floorY, -30, Math.PI / 2);

// -- BACK ROOM BENCHES --
loadBenchModel(scene, -5, floorY, 22, Math.PI);
loadBenchModel(scene, 5, floorY, 22, Math.PI);
loadBenchModel(scene, -5, floorY, 38, 0);
loadBenchModel(scene, 5, floorY, 38, 0);
loadBenchModel(scene, -12, floorY, 30, -Math.PI / 2);
loadBenchModel(scene, 12, floorY, 30, Math.PI / 2);

loadCeilingLampModel(scene);
