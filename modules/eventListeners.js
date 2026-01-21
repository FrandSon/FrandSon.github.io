import { keysPressed } from "./movement.js";
import { showMenu, hideMenu } from "./menu.js";
import { toggleAudio } from "./audioGuide.js"; // CAMBIO: Ya no importamos startAudio porque no lo usaremos automáticamente
import { closeModal, isModalOpen } from "./paintingInfo.js";
import { startAutopilot, stopAutopilot, isAutopilotActive } from "./autopilot.js";

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

const handleCursorVisibility = (controls) => {
  const dot = document.getElementById("cursor-dot");
  if (!dot) return;

  if (isAutopilotActive()) {
    dot.style.opacity = "0";
    return;
  }

  if (controls.isLocked) {
    dot.style.opacity = "1";
    clearTimeout(cursorHideTimeout);
    cursorHideTimeout = setTimeout(() => {
      if (controls.isLocked && !isAutopilotActive()) {
        dot.style.opacity = "0";
      }
    }, 4000);
  } else {
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

  // CAMBIO: Eliminada la llamada a startAudio() aquí.
  // El botón explorar solo inicia el control, no la música.
  const playButton = document.getElementById("play_button");
  if (playButton) {
    playButton.addEventListener("click", () => {
      // Solo desbloqueo/bloqueo de controles implícito al hacer click en canvas después
    });
  }

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
    const dot = document.getElementById("cursor-dot");
    if (dot) dot.style.opacity = "0";

    if (isAutopilotActive()) {
      showMenuOnUnlock = false;
      return;
    }

    if (isModalOpen()) {
      showMenuOnUnlock = false;
      return;
    }

    if (showMenuOnUnlock) {
      showMenu();
    }
    showMenuOnUnlock = false;
  });

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
    if (isAutopilotActive()) {
      stopAutopilot(controls);
    }

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

  if (event.key === "p" || event.key === "P") {
    if (isAutopilotActive()) {
      stopAutopilot(controls);
      lockPointer = true;
    } else {
      showMenuOnUnlock = false;
      startAutopilot(controls);
      lockPointer = false;
    }
  }

  if (event.key === "Enter" || event.key === "Return") {
    if (isAutopilotActive()) {
      stopAutopilot(controls);
    }
    hideMenu();
    controls.lock();
    lockPointer = true;
    // CAMBIO: Eliminada la llamada startAudio()
  }

  if (event.key === " ") {
    togglePointerLock(controls);
  }

  if (event.key === "a" || event.key === "A") {
    toggleAudio();
  }

  if (event.key === "m" || event.key === "M") {
    if (isAutopilotActive()) {
      stopAutopilot(controls);
    }

    const menu = document.getElementById('menu');
    const isMenuVisible = menu.style.display === 'block' || getComputedStyle(menu).display === 'block';

    if (isMenuVisible) {
      hideMenu();
      controls.lock();
      lockPointer = true;
      // CAMBIO: Eliminada la llamada startAudio()
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
