import * as THREE from "three";
import { displayPaintingInfo, hidePaintingInfo } from "./paintingInfo.js";
import { updateMovement } from "./movement.js";
import { updateAutopilot, isAutopilotActive } from "./autopilot.js"; // Importar

export const setupRendering = (
  scene,
  camera,
  renderer,
  paintings,
  controls,
  walls
) => {
  const clock = new THREE.Clock();

  let render = function () {
    const delta = clock.getDelta();

    // LÓGICA DE ACTUALIZACIÓN
    if (isAutopilotActive()) {
      // Si el piloto automático está activo, él controla la cámara
      updateAutopilot(delta, camera);
    } else {
      // Si no, el jugador controla el movimiento
      updateMovement(delta, controls, camera, walls);
    }

    const distanceThreshold = 8;

    let paintingToShow;
    paintings.forEach((painting) => {
      const distanceToPainting = camera.position.distanceTo(painting.position);
      if (distanceToPainting < distanceThreshold) {
        paintingToShow = painting;
      }
    });

    if (paintingToShow) {
      // if there is a painting to show
      displayPaintingInfo(paintingToShow.userData.info);
    } else {
      hidePaintingInfo();
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
