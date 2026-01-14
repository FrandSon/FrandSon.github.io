import * as THREE from "three";

let sound;
let bufferLoaded = false; // flag to track if audio buffer is loaded

// setup audio for the scene
export const setupAudio = (camera) => {
  // create an audio listener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add(listener);

  sound = new THREE.Audio(listener); // creating the audio source

  const audioLoader = new THREE.AudioLoader(); // create an audio loader
  audioLoader.load("sounds/tiersen.mp3", function (buffer) {
    // load the audio file
    sound.setBuffer(buffer); // set the audio source buffer
    sound.setLoop(true); // set the audio source to loop
    sound.setVolume(0.5); // set the audio source volume
    bufferLoaded = true; // set bufferLoaded flag to true once the audio buffer is loaded

    // CAMBIO: Intentar reproducir automáticamente apenas cargue
    // (Nota: Puede que el navegador lo bloquee hasta el primer clic, por eso añadimos startAudio en los eventos)
    sound.play();
  });
};

// play audio
export const startAudio = () => {
  if (sound && bufferLoaded && !sound.isPlaying) {
    sound.play();
  }
};

// pause audio
export const stopAudio = () => {
  if (sound) {
    sound.pause();
  }
};

// toggle audio (New function for the 'A' key)
export const toggleAudio = () => {
  if (sound && bufferLoaded) {
    if (sound.isPlaying) {
      sound.pause();
      console.log("Audio Paused");
    } else {
      sound.play();
      console.log("Audio Playing");
    }
  }
};
