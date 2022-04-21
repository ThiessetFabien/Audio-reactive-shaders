import {AudioListener, Audio, AudioLoader, AudioAnalyser} from 'three';
// create an AudioListener and add it to the camera
const listener = new AudioListener();
camera.add( listener );

// create an Audio source
const sound = new Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(0.5);
	sound.play();
});

// create an AudioAnalyser, passing in the sound and desired fftSize
const analyser = new AudioAnalyser( sound, 32 );

// get the average frequency of the sound
const data = analyser.getAverageFrequency();