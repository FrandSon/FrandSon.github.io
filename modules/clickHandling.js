import * as THREE from 'three';
import { showModal, closeModal, isModalOpen } from './paintingInfo.js';

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function clickHandling(renderer, camera, paintings, controls) {
  renderer.domElement.addEventListener(
    'click',
    (event) => {
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

      // Find the image URL. In paintings.js we see: map: textureLoader.load(data.imgSrc)
      // userData has { info, url }. But 'url' in userData seems to be data.info.link.
      // We might not have the raw image Src in userData easily unless we added it in paintings.js.
      // However, we can reconstruct it or retrieve it if we added it to userData.
      // For now, let's look at how createPaintings works. 
      // NOTE: In paintings.js, the 'imgSrc' property wasn't explicitly saved to userData.
      // We should assume the user might want to see the image. 
      // As a fallback, we can try to guess it or just show text. 
      // Ideally, paintings.js should be updated to save imgSrc to userData.
      // BUT, since I cannot edit paintings.js in this step without re-outputting it (which I can do),
      // let's just re-output paintings.js to be safe and store imgSrc.

      showModal(painting.userData.info, painting.userData.imgSrc);
      controls.unlock(); // Unlock cursor so user can view modal freely
    }
  }
}

export { clickHandling };
