import * as THREE from 'three';
import { paintingData } from './paintingData.js'; // Importamos datos para la fase 2

let isActive = false;
let currentWaypointIndex = 0;
let controlsRef = null;
let mode = 'intro'; // 'intro' o 'gallery'

// --- CONFIGURACIÓN ---
const speed = 2.0;           // Velocidad relajada para exploración
const rotSpeed = 1.8;
const pauseDuration = 10000; // 10s por cuadro en modo galería (más rápido que intro)
const introPauseDuration = 18000; // 18s para los destacados de la intro

const flightHeight = 9.0;
const lookAtY = 14.5;

let lastArrivalTime = 0;
let state = 'idle';

// --- RUTA FASE 1: INTRO (Destacados) ---
// Incluye puntos de seguridad para no chocar
const introWaypoints = [
  // 1. Hubble
  { pos: new THREE.Vector3(30, flightHeight, 40), lookAt: new THREE.Vector3(60, lookAtY, 40), isStop: true },
  // 2. Pólvora
  { pos: new THREE.Vector3(40, flightHeight, 30), lookAt: new THREE.Vector3(40, lookAtY, 60), isStop: true },
  // 3. Sistema Decimal
  { pos: new THREE.Vector3(15, flightHeight, 20), lookAt: new THREE.Vector3(15, 11, 1.2), isStop: true },
  // Paso seguro rodeando el muro central
  { pos: new THREE.Vector3(45, flightHeight, 15), lookAt: new THREE.Vector3(45, flightHeight, -10), isStop: false },
  { pos: new THREE.Vector3(45, flightHeight, -10), lookAt: new THREE.Vector3(30, flightHeight, -40), isStop: false },
  // 4. Hermanos Wright
  { pos: new THREE.Vector3(30, flightHeight, -40), lookAt: new THREE.Vector3(60, lookAtY, -40), isStop: true }
];

// --- RUTA FASE 2: GALERÍA COMPLETA (Generada Dinámicamente) ---
// Orden lógico "hacia la izquierda" (Antihorario) para cubrir todo el cuarto:
// Pared Frontal (Der->Izq) -> Pared Izq (Frente->Atrás) -> Pared Trasera -> Pared Derecha -> Centro
// Indices de paintingData:
// Front Wall: 0,1,2 (X: -40, 0, 40) -> Orden: 2, 1, 0
// Left Wall: 6,7,8 (Z: -40, 0, 40) -> Orden: 6, 7, 8
// Back Wall: 3,4,5 (X: -40, 0, 40) -> Orden: 3, 4, 5
// Right Wall: 9,10,11 (Z: -40, 0, 40) -> Orden: 11, 10, 9
// Center Front (12,13) y Center Back (14,15) -> Intercalamos para flujo
const galleryIndices = [
  2, 1, 0,         // Front Wall (Right to Left)
  6, 7, 8,         // Left Wall (Front to Back)
  14, 15,          // Center Wall (Back Side)
  3, 4, 5,         // Back Wall (Left to Right)
  11, 10,          // Right Wall (Back to Middle)
  9,               // Right Wall (Front)
  13, 12           // Center Wall (Front Side)
];

let galleryWaypoints = [];

// Función para generar puntos de vista seguros basados en la posición del cuadro
const generateGalleryWaypoints = () => {
  galleryWaypoints = galleryIndices.map(index => {
    const data = paintingData[index];
    const pPos = data.position;
    const viewDist = 20; // Distancia para ver el cuadro

    // Calcular posición de cámara basada en la rotación del cuadro (Normal)
    // Front Wall (Rot 0) -> Normal +Z -> Cam Pos Z + 20
    // Back Wall (Rot PI) -> Normal -Z -> Cam Pos Z - 20
    // Left Wall (Rot PI/2) -> Normal +X -> Cam Pos X + 20
    // Right Wall (Rot -PI/2) -> Normal -X -> Cam Pos X - 20

    let camX = pPos.x;
    let camZ = pPos.z;

    // Normalización aproximada basada en rotación
    const rot = data.rotationY;
    if (Math.abs(rot) < 0.1) { camZ += viewDist; } // Front Wall / Center Back
    else if (Math.abs(rot - Math.PI) < 0.1) { camZ -= viewDist; } // Back Wall / Center Front
    else if (Math.abs(rot - Math.PI / 2) < 0.1) { camX += viewDist; } // Left Wall
    else if (Math.abs(rot + Math.PI / 2) < 0.1) { camX -= viewDist; } // Right Wall

    return {
      pos: new THREE.Vector3(camX, flightHeight, camZ),
      lookAt: new THREE.Vector3(pPos.x, lookAtY, pPos.z), // Mirar al cuadro
      isStop: true
    };
  });
};

// Generar la ruta al cargar
generateGalleryWaypoints();


export const isAutopilotActive = () => isActive;

export const startAutopilot = (controls) => {
  if (isActive) return;

  isActive = true;
  controlsRef = controls;
  if (!controls.isLocked) controls.lock();

  state = 'starting';
  mode = 'intro'; // Siempre empezar con la Intro VIP
  currentWaypointIndex = 0;

  console.log("Piloto Automático: INICIADO (Modo Intro)");
};

export const stopAutopilot = (controls) => {
  if (!isActive || state === 'exiting') return;
  state = 'exiting';
  console.log("Piloto Automático: ATERRIZANDO...");
};

export const updateAutopilot = (delta, camera) => {
  if (!isActive) return;

  // --- TRANSICIÓN DE ASCENSO ---
  if (state === 'starting') {
    camera.position.y += (flightHeight - camera.position.y) * 2 * delta;
    camera.rotation.order = 'YXZ';
    if (Math.abs(camera.position.y - flightHeight) < 0.5) {
      state = 'moving';
      currentWaypointIndex = 0;
    }
    return;
  }

  // --- TRANSICIÓN DE DESCENSO ---
  if (state === 'exiting') {
    const playerHeight = 2.0;
    if (camera.position.y > playerHeight) camera.position.y -= 4.0 * delta;

    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.setFromQuaternion(camera.quaternion);
    euler.x = THREE.MathUtils.lerp(euler.x, 0, 3 * delta);
    euler.z = 0;
    camera.quaternion.setFromEuler(euler);

    if (camera.position.y <= playerHeight + 0.1) {
      camera.position.y = playerHeight;
      isActive = false;
      state = 'idle';

      const finalEuler = new THREE.Euler(0, 0, 0, 'YXZ');
      finalEuler.setFromQuaternion(camera.quaternion);
      camera.rotation.copy(finalEuler);

      if (controlsRef && !controlsRef.isLocked) controlsRef.lock();
    }
    return;
  }

  // --- SELECCIÓN DE RUTA ---
  const currentPath = mode === 'intro' ? introWaypoints : galleryWaypoints;

  // Si terminamos la intro, cambiar a modo galería
  if (mode === 'intro' && currentWaypointIndex >= introWaypoints.length) {
    console.log("Intro terminada. Iniciando exploración completa...");
    mode = 'gallery';
    currentWaypointIndex = 0; // Iniciar desde el primer cuadro de la galería
    state = 'moving';
    return;
  }

  // --- MOVIMIENTO ---
  const target = currentPath[currentWaypointIndex];
  const dist = camera.position.distanceTo(target.pos);

  if (state === 'moving') {
    const dir = new THREE.Vector3().subVectors(target.pos, camera.position).normalize();
    // Velocidad un poco más rápida en intro para cumplir tiempo, más lenta en galería
    const currentSpeed = mode === 'intro' ? speed * 1.2 : speed;
    const moveDist = currentSpeed * delta;

    if (dist < moveDist) {
      camera.position.copy(target.pos);
      if (target.isStop) {
        state = 'waiting';
        lastArrivalTime = Date.now();
      } else {
        advanceWaypoint(currentPath.length);
      }
    } else {
      camera.position.add(dir.multiplyScalar(moveDist));
    }
    smoothLookAt(camera, target.lookAt, rotSpeed, delta);

  } else if (state === 'waiting') {
    smoothLookAt(camera, target.lookAt, rotSpeed * 0.5, delta);

    // Tiempo de espera dinámico
    const waitTime = mode === 'intro' ? introPauseDuration : pauseDuration;

    if (Date.now() - lastArrivalTime > waitTime) {
      advanceWaypoint(currentPath.length);
      state = 'moving';
    }
  }
};

function advanceWaypoint(pathLength) {
  if (mode === 'intro') {
    currentWaypointIndex++; // En intro simplemente avanzamos
  } else {
    // En galería hacemos loop infinito
    currentWaypointIndex = (currentWaypointIndex + 1) % pathLength;
  }
}

function smoothLookAt(camera, targetLookAt, speed, delta) {
  const targetQuaternion = new THREE.Quaternion();
  const rotationMatrix = new THREE.Matrix4().lookAt(camera.position, targetLookAt, camera.up);
  targetQuaternion.setFromRotationMatrix(rotationMatrix);
  camera.quaternion.slerp(targetQuaternion, speed * delta);
}
