import { keysPressed } from "./movement.js"; // import the keysPressed object
import { showMenu, hideMenu } from "./menu.js"; // import the showMenu function
import { toggleAudio } from "./audioGuide.js"; // Import the new toggle function

let lockPointer = true;
let showMenuOnUnlock = false;

// Variables for the Info Panel Timeout logic
let infoPanelTimeout;
const infoPanel = document.getElementById("info-panel");

// Helper to handle Info Panel visibility
const showInfoPanel = () => {
  if (infoPanel) {
    infoPanel.classList.remove("collapsed"); // Ensure it's visible/expanded
    infoPanel.style.opacity = "1"; // Make sure it's fully visible
    clearTimeout(infoPanelTimeout); // Clear any existing timer to hide it
  }
};

const hideInfoPanelDelayed = () => {
  // Clear any existing timer first to avoid overlaps
  clearTimeout(infoPanelTimeout);

  if (infoPanel) {
    // Set a new timer to hide it after 4 seconds
    infoPanelTimeout = setTimeout(() => {
      infoPanel.style.opacity = "0"; // Fade out or hide
    }, 4000);
  }
};

export const setupEventListeners = (controls, camera, scene) => {
  // 1. Setup Info Panel Behavior
  if (infoPanel) {
    // Hide it initially
    infoPanel.style.opacity = "0";
    infoPanel.style.transition = "opacity 0.5s ease"; // Smooth fade

    // Mouse over -> Show
    infoPanel.addEventListener("mouseenter", showInfoPanel);

    // Mouse leave -> Start 4s timer to hide
    infoPanel.addEventListener("mouseleave", hideInfoPanelDelayed);
  }

  // 2. Document Event Listeners
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
    if (showMenuOnUnlock) {
      showMenu();
    }
    showMenuOnUnlock = false;
  });
};

// toggle the pointer lock
function togglePointerLock(controls) {
  if (lockPointer) {
    controls.lock();
  } else {
    showMenuOnUnlock = false;
    controls.unlock();
  }
  lockPointer = !lockPointer; // toggle the lockPointer variable
}

function onKeyDown(event, controls) {
  // event is the event object that has the key property
  if (event.key in keysPressed) {
    // check if the key pressed by the user is in the keysPressed object
    keysPressed[event.key] = true; // if yes, set the value of the key pressed to true
  }

  if (event.key === "Escape") {
    // if the "ESC" key is pressed
    showMenu(); // show the menu
    showMenuOnUnlock = true;
    controls.unlock(); // unlock the pointer
    lockPointer = false;
  }

  if (event.key === "p") {
    // if the "SPACE" key is pressed
    controls.unlock(); // unlock the pointer
    lockPointer = false;
  }

  // if key prssed is enter or return for mac
  if (event.key === "Enter" || event.key === "Return") {
    // if the "ENTER" key is pressed
    hideMenu(); // hide the menu
    controls.lock(); // lock the pointer
    lockPointer = true;
  }

  if (event.key === " ") {
    // if the "Space" key is pressed
    togglePointerLock(controls); // toggle the pointer lock
  }

  // "a" key toggles audio
  if (event.key === "a" || event.key === "A") {
    toggleAudio();
  }

  // Lógica mejorada para la tecla "M"
  if (event.key === "m" || event.key === "M") {
    const menu = document.getElementById('menu');
    // Verificamos si el menú está visible
    const isMenuVisible = menu.style.display === 'block' || getComputedStyle(menu).display === 'block';

    if (isMenuVisible) {
      // Si está visible, lo ocultamos y reanudamos (como al presionar Enter/Explorar)
      hideMenu();
      controls.lock();
      lockPointer = true;
    } else {
      // Si está oculto, lo mostramos y pausamos (como al presionar Esc)
      showMenu();
      showMenuOnUnlock = true;
      controls.unlock();
      lockPointer = false;
    }
  }

  if (event.key === "r") {
    // if the "r" key is pressed
    location.reload(); // reload the page
  }
}

function onKeyUp(event, controls) {
  // same but for keyup
  if (event.key in keysPressed) {
    keysPressed[event.key] = false; // set to false when the key is released
  }
}

// Keep the internal toggle button just in case user clicks it manually
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
