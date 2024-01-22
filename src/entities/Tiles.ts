export default class Tiles {
  private scene: Phaser.Scene;
  readonly buildings!: Phaser.Tilemaps.TilemapLayer;
  readonly ground!: Phaser.Tilemaps.TilemapLayer;
  readonly path!: Phaser.Tilemaps.TilemapLayer;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    const map = this.scene.make.tilemap({
      key: 'map-json',
      tileHeight: 16,
      tileWidth: 16
    });

    const tileSet = map.addTilesetImage('tdrpg-tileset', 'map-sprite');

    if (!tileSet) {
      console.error('TileSet did not load correctly');
      return;
    }

    const ground = map.createLayer('Ground', tileSet);
    const path = map.createLayer('Path', tileSet);
    const buildings = map.createLayer('Buildings', tileSet);

    if (!buildings || !ground || !path) {
      console.error('Buildings did not load correctly');
      return;
    }

    buildings.setCollisionByProperty({ collides: true });
    // this.renderDebug(buildings);
    this.buildings = buildings;
    this.ground = ground;
    this.path = path;
  }

  getTiles() {
    return {
      buildings: this.buildings,
      ground: this.ground,
      path: this.path
    };
  }

  renderDebug(tiles: Phaser.Tilemaps.TilemapLayer | undefined) {
    const debugGraphics = this.scene.add.graphics().setAlpha(0.75);
    tiles?.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }
}
