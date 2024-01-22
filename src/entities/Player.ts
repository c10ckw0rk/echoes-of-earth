import { SurvivorFlashLightIdleTextures } from '../assets/player/flashlight/SurvivorFlashLightIdleTextures';
import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!:
    | {
        left?: Phaser.Input.Keyboard.Key;
        right?: Phaser.Input.Keyboard.Key;
        up?: Phaser.Input.Keyboard.Key;
        down?: Phaser.Input.Keyboard.Key;
      }
    | undefined;
  private movementSpeed: number = 100;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    if (!this.body) {
      console.error('Player did not load correctly');
      return;
    }

    this.setScale(0.1);
    this.body.setSize(170, 170);
    this.body.setOffset(50, 40);
    this.setOrigin(0.4, 0.5);

    scene.anims.create({
      key: 'walk',
      frames: Object.keys(SurvivorFlashLightIdleTextures).map((key) => ({
        key
      })),
      frameRate: 19,
      repeat: -1
    });

    this.play('walk');

    if (!scene || !scene.input || !scene.input.keyboard) {
      return;
    }

    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  playerMovement() {
    let velocityX = 0;
    let velocityY = 0;

    if (!this.cursors) {
      return;
    }

    if (this.cursors.left?.isDown) {
      velocityX = -this.movementSpeed;
    } else if (this.cursors.right?.isDown) {
      velocityX = this.movementSpeed;
    }

    if (this.cursors.up?.isDown) {
      velocityY = -this.movementSpeed;
    } else if (this.cursors.down?.isDown) {
      velocityY = this.movementSpeed;
    }

    this.setVelocity(velocityX, velocityY);

    const pointer = this.scene.input.activePointer;
    const angle = Phaser.Math.Angle.BetweenPoints(this, pointer);
    this.setAngle(Phaser.Math.RadToDeg(angle));
  }
}
