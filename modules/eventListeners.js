import { keysPressed } from "./movement.js";
import { showMenu, hideMenu } from "./menu.js";
import { toggleAudio } from "./audioGuide.js";
import { closeModal, isModalOpen } from "./paintingInfo.js";

let lockPointer = true;
let showMenuOnUnlock = false;

// Variables for the Info Panel Timeout logic
let infoPanelTimeout;
const infoPanel = document.getElementById("info-panel");

// VARIABLE PARA EL CURSOR (PUNTO)
let cursorHideTimeout;

const showInfoPanel = () => {
  if (infoPanel) {
    infoPanel.classList.remove("collapsed");
    infoPanel.style.opacity = "1";
    clearTimeout(infoPanelTimeout);
  }
};

const hideInfoPanelDelayed = () => {
  clearTimeout(infoPanelTimeout);
  if (infoPanel) {
    infoPanelTimeout = setTimeout(() => {
      infoPanel.style.opacity = "0";
    }, 4000);
  }
};

// Función para manejar la visibilidad del punto cursor
const handleCursorVisibility = (controls) => {
  const dot = document.getElementById("cursor-dot");
  if (!dot) return;

  // Si el control está bloqueado (jugando) y no hay modales abiertos
  if (controls.isLocked) {
    dot.style.opacity = "1"; // Mostrar punto

    // Reiniciar temporizador de inactividad
    clearTimeout(cursorHideTimeout);
    cursorHideTimeout = setTimeout(() => {
      // Si pasan 4 segundos sin mover el mouse, ocultar punto
      if (controls.isLocked) { // Doble chequeo
        dot.style.opacity = "0";
      }
    }, 4000);
  } else {
    // Si estamos en menú o modal, ocultar punto inmediatamente
    dot.style.opacity = "0";
  }
};


export const setupEventListeners = (controls, camera, scene) => {
  if (infoPanel) {
    infoPanel.style.opacity = "0";
    infoPanel.style.transition = "opacity 0.5s ease";
    infoPanel.addEventListener("mouseenter", showInfoPanel);
    infoPanel.addEventListener("mouseleave", hideInfoPanelDelayed);
  }

  // --- LOGICA DEL CURSOR ---
  // Escuchar movimiento del mouse globalmente
  document.addEventListener("mousemove", () => {
    handleCursorVisibility(controls);
  });

  document.addEventListener(
    "keydown",
    (event) => onKeyDown(event, controls),
    false
  );
  document.addEventListener(
    "keyup",
    (event) => onKeyUp(event, controls),
    false
  );

  controls.addEventListener("unlock", () => {
    // Cuando se desbloquea (Menú o Modal), ocultar el punto
    const dot = document.getElementById("cursor-dot");
    if (dot) dot.style.opacity = "0";

    if (isModalOpen()) {
      showMenuOnUnlock = false;
      return;
    }

    if (showMenuOnUnlock) {
      showMenu();
    }
    showMenuOnUnlock = false;
  });

  // Cuando se bloquea (Volver al juego), mostrar el punto
  controls.addEventListener("lock", () => {
    handleCursorVisibility(controls);
  });
};

function togglePointerLock(controls) {
  if (lockPointer) {
    controls.lock();
  } else {
    showMenuOnUnlock = false;
    controls.unlock();
  }
  lockPointer = !lockPointer;
}

function onKeyDown(event, controls) {
  if (event.key in keysPressed) {
    keysPressed[event.key] = true;
  }

  if (event.key === "Escape") {
    if (isModalOpen()) {
      closeModal();
      controls.lock();
      return;
    }

    showMenu();
    showMenuOnUnlock = true;
    controls.unlock();
    lockPointer = false;
  }

  if (event.key === "p") {
    controls.unlock();
    lockPointer = false;
  }

  if (event.key === "Enter" || event.key === "Return") {
    hideMenu();
    controls.lock();
    lockPointer = true;
  }

  if (event.key === " ") {
    togglePointerLock(controls);
  }

  if (event.key === "a" || event.key === "A") {
    toggleAudio();
  }

  if (event.key === "m" || event.key === "M") {
    const menu = document.getElementById('menu');
    const isMenuVisible = menu.style.display === 'block' || getComputedStyle(menu).display === 'block';

    if (isMenuVisible) {
      hideMenu();
      controls.lock();
      lockPointer = true;
    } else {
      showMenu();
      showMenuOnUnlock = true;
      controls.unlock();
      lockPointer = false;
    }
  }

  if (event.key === "r") {
    location.reload();
  }
}

function onKeyUp(event, controls) {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false;
  }
}

const toggleInfoBtn = document.getElementById("toggle-info");
if (toggleInfoBtn) {
  toggleInfoBtn.addEventListener("click", () => {
    const panel = document.getElementById("info-panel");
    panel.classList.toggle("collapsed");
    toggleInfoBtn.innerText = panel.classList.contains("collapsed") ? "Show" : "Hide";
  });
}

const aboutBtn = document.getElementById("about_button");
if (aboutBtn) {
  aboutBtn.addEventListener("click", function () {
    document.getElementById("about-overlay").classList.add("show");
  });
}

const closeAboutBtn = document.getElementById("close-about");
if (closeAboutBtn) {
  closeAboutBtn.addEventListener("click", function () {
    document.getElementById("about-overlay").classList.remove("show");
  });
}
