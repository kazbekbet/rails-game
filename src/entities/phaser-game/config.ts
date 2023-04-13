import { MainScene } from './scenes/main-scene';
import { Scale } from 'phaser';

export const config = {
  backgroundColor: '#fff',
  scale: {
    parent: 'phaser', // this has to match the div id in index.html
    fullscreenTarget: 'body', // this has to be the wrapping element
    width: 800,
    height: 600,
    mode: Scale.FIT, // we scale the phaser-game manually in resize()
    autoCenter: Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
  scene: MainScene,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 },
    },
  },
};
