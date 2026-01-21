import * as THREE from 'three';
import { showModal, closeModal, isModalOpen } from './paintingInfo.js';
import { isAutopilotActive } from './autopilot.js'; // CAMBIO: Importar estado de piloto automático

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function clickHandling(renderer, camera, paintings, controls) {
  renderer.domElement.addEventListener(
    'click',
    (event) => {
      // CAMBIO: Si el piloto automático está activo, ignorar TODOS los clics
      if (isAutopilotActive()) {
        console.log("Click ignorado: Piloto automático activo");
        return;
      }

      // Logic: 
      // 1. If Modal is open, clicking anywhere closes it.
      // 2. If Modal is closed, we calculate raycast to see if we hit a painting.

      if (isModalOpen()) {
        closeModal();
        controls.lock(); // Re-lock the player to the game
        return;
      }

      // If locked, the click is intended for the game world
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      onClick(camera, paintings, controls);
    },
    false
  );

  // Also handle the specific Close Button click separately to ensure it works
  const closeBtn = document.getElementById('close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (isModalOpen()) {
        closeModal();
        controls.lock();
      }
    });
  }
}

function onClick(camera, paintings, controls) {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;

    // Check userData to ensure it's a painting
    if (painting.userData && painting.userData.info) {
      console.log('Clicked painting:', painting.userData.info.title);

      showModal(painting.userData.info, painting.userData.imgSrc);
      controls.unlock(); // Unlock cursor so user can view modal freely
    }
  }
}

export { clickHandling };
