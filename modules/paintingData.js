export const paintingData = [];

const wallHeight = 40;
const centerWallHeight = 25;
const centerWallWidth = 60; // Ancho definido en walls.js

// Configs
const mainPaintingHeight = wallHeight * 0.7; // 28
const mainPaintingWidth = mainPaintingHeight * 1.2; // ~33.6
const centerPaintingHeight = centerWallHeight * 0.8; // 20

// CAMBIO: Ahora es exactamente el 40% del ancho del muro (60 * 0.4 = 24)
const centerPaintingWidth = centerWallWidth * 0.4;

// Position Adjustments
// Floor is at -3.14. Wall top is at 30.
// Center of visible wall is approx 13.5.
// We set Y=13. With height 28, bottom is 13 - 14 = -1, which clears the floor (-3.14).
const mainY = 13;

// --- FRONT WALL (Z = -60) ---
for (let i = 0; i < 3; i++) {
  paintingData.push({
    imgSrc: `artworks/${(i % 4) + 1}.jpg`,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: -40 + i * 40, y: mainY, z: -59.5 },
    rotationY: 0,
    info: {
      title: `Masterpiece ${i + 1}`,
      artist: 'Artist Name',
      description: `A stunning large-scale piece located on the North Wall.`,
      year: `188${i}`,
    },
  });
}

// --- BACK WALL (Z = 60) ---
for (let i = 0; i < 3; i++) {
  paintingData.push({
    imgSrc: `artworks/${(i % 4) + 5}.jpg`,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: -40 + i * 40, y: mainY, z: 59.5 },
    rotationY: Math.PI,
    info: {
      title: `Masterpiece ${i + 4}`,
      artist: 'Artist Name',
      description: `A stunning large-scale piece located on the South Wall.`,
      year: `189${i}`,
    },
  });
}

// --- LEFT WALL (X = -60) ---
for (let i = 0; i < 3; i++) {
  paintingData.push({
    imgSrc: `artworks/${(i % 4) + 9}.jpg`,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: -59.5, y: mainY, z: -40 + i * 40 },
    rotationY: Math.PI / 2,
    info: {
      title: `Masterpiece ${i + 7}`,
      artist: 'Artist Name',
      description: `A stunning large-scale piece located on the West Wall.`,
      year: `190${i}`,
    },
  });
}

// --- RIGHT WALL (X = 60) ---
for (let i = 0; i < 3; i++) {
  paintingData.push({
    imgSrc: `artworks/${(i % 4) + 13}.jpg`,
    width: mainPaintingWidth,
    height: mainPaintingHeight,
    position: { x: 59.5, y: mainY, z: -40 + i * 40 },
    rotationY: -Math.PI / 2,
    info: {
      title: `Masterpiece ${i + 10}`,
      artist: 'Artist Name',
      description: `A stunning large-scale piece located on the East Wall.`,
      year: `191${i}`,
    },
  });
}

// --- CENTER WALL (Z = 0) ---
// Y=9 works well for these as confirmed.
// Las posiciones X en -15 y 15 funcionan perfectamente con ancho 24:
// - Izquierda: centro en -15, ocupa de -27 a -3.
// - Derecha: centro en 15, ocupa de 3 a 27.
// Margen central de 6 unidades y márgenes laterales de 3 unidades.
paintingData.push({
  imgSrc: `artworks/2.jpg`,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: -15, y: 9, z: -1.2 },
  rotationY: Math.PI,
  info: { title: 'Center Piece 1', artist: 'Unknown', description: 'Central Display', year: '2023' }
});
paintingData.push({
  imgSrc: `artworks/3.jpg`,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: 15, y: 9, z: -1.2 },
  rotationY: Math.PI,
  info: { title: 'Center Piece 2', artist: 'Unknown', description: 'Central Display', year: '2023' }
});

paintingData.push({
  imgSrc: `artworks/4.jpg`,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: -15, y: 9, z: 1.2 },
  rotationY: 0,
  info: { title: 'Center Piece 3', artist: 'Unknown', description: 'Central Display', year: '2023' }
});
paintingData.push({
  imgSrc: `artworks/5.jpg`,
  width: centerPaintingWidth,
  height: centerPaintingHeight,
  position: { x: 15, y: 9, z: 1.2 },
  rotationY: 0,
  info: { title: 'Center Piece 4', artist: 'Unknown', description: 'Central Display', year: '2023' }
});
