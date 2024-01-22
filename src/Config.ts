import Map from './scene/Map';
import Preloader from './scene/Preloader';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true // Enable debug mode
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: screen.width,
    // height: screen.height,
    width: 800,
    height: 600,
    fullscreenTarget: 'phaser-id'
  },
  scene: [Preloader, Map]
};
