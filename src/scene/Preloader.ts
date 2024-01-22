import MapSprite from '@assets/map/tdrpg-tileset.png';
import TileMapJson from '@assets/map/echoes-of-earth.json';
import { SurvivorFlashLightIdleTextures } from '../assets/player/flashlight/SurvivorFlashLightIdleTextures';

export default class Map extends Phaser.Scene {
  constructor() {
    //scene key
    super('preloader');
  }
  preload() {
    Object.entries(SurvivorFlashLightIdleTextures).forEach(([key, value]) => {
      this.load.spritesheet(key, value, { frameWidth: 303, frameHeight: 223 });
    });
    this.load.tilemapTiledJSON('map-json', TileMapJson);
    this.load.image('map-sprite', MapSprite);
  }
  create() {
    this.scene.start('map');
  }
}
