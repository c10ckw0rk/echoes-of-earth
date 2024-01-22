import { Mrpas } from 'mrpas';
import Player from '../entities/Player';
import Tiles from '../entities/Tiles';

export default class Map extends Phaser.Scene {
  private player!: Player;
  private light!: Phaser.GameObjects.Light;

  constructor() {
    //scene key
    super('map');
  }

  create() {
    const tiles = new Tiles(this);
    const { buildings, path, ground } = tiles.getTiles();

    this.player = new Player(this, 100, 100, 'survivor-flashlight-idle');
    this.physics.add.collider(this.player, buildings);

    this.lights.enable();

    // Create a light source at the player's position
    this.light = this.lights.addLight(
      this.player.x,
      this.player.y,
      200,
      0xffffff,
      1
    );

    buildings.setPipeline('Light2D');
    path.setPipeline('Light2D');
    ground.setPipeline('Light2D');
  }

  update(time: number, delta: number) {
    this.player.playerMovement();

    // Calculate the angle between the player and the mouse pointer
    const pointer = this.input.activePointer;
    const angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);

    // Calculate the position of the light
    const lightDistance = 50; // The distance of the light from the player
    const lightPosition = new Phaser.Math.Vector2()
      .setToPolar(angle, lightDistance)
      .add(this.player.getCenter());

    // Update the light position
    if (this.light) {
      this.light.x = lightPosition.x;
      this.light.y = lightPosition.y;
    }
  }
}
