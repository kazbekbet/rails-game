import { Scene, Tilemaps } from 'phaser';
import map from '@assets/map.svg';

export class MainScene extends Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  private map: Tilemaps.Tilemap | null = null;
  private cursors = null;
  private debugGraphics = null;
  private helpText = null;
  private player = null;
  private showDebug = false;
  private currentTileset = 1;

  preload() {
    this.load.image('map', map);
  }

  create() {
    const background = this.add.image(400, 300, 'map').setOrigin(0.5, 0.5);
    background.displayWidth = this.sys.canvas.width;
    background.displayHeight = this.sys.canvas.height;
  }
}
