// Display painting info in the DOM (Proximity tooltip)
export const displayPaintingInfo = (info) => {
  const infoElement = document.getElementById('painting-info');
  // Don't show tooltip if modal is open to avoid clutter
  if (isModalOpen()) {
    infoElement.classList.remove('show');
    return;
  }

  infoElement.innerHTML = `
    <h3>${info.title}</h3>
    <p>Artist: ${info.artist}</p>
    <p>Description: ${info.description}</p>
    <p>Year: ${info.year}</p>
  `;
  infoElement.classList.add('show');
};

// Hide painting info in the DOM
export const hidePaintingInfo = () => {
  const infoElement = document.getElementById('painting-info');
  infoElement.classList.remove('show');
};

// --- NEW MODAL LOGIC ---

// Helper to check state
export const isModalOpen = () => {
  const modal = document.getElementById('painting-modal');
  return modal && !modal.classList.contains('hide');
};

export const showModal = (info, imgSrc) => {
  const modal = document.getElementById('painting-modal');

  // Update Content
  document.getElementById('modal-title').innerText = info.title;
  document.getElementById('modal-artist').innerText = info.artist || "Unknown Artist";
  document.getElementById('modal-year').innerText = info.year || "N/A";
  document.getElementById('modal-description').innerText = info.description || "No description available.";

  // Set Image
  const imgContainer = document.getElementById('modal-img-container');
  imgContainer.innerHTML = ''; // Clear previous
  // Note: We need the original image source. 
  // Since we don't pass texture directly easily, we might need to pass the URL from userData.
  if (imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc;
    imgContainer.appendChild(img);
  }

  modal.classList.remove('hide');
};

export const closeModal = () => {
  const modal = document.getElementById('painting-modal');
  modal.classList.add('hide');
};
