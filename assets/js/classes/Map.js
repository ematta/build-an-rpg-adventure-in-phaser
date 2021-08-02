class Map {
  constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
    this.scale = 2; // scale of the map
    this.key = key; // Tiled JSON file key name
    this.tileSetName = tileSetName; // Tiled Tileset Image Key
    this.bgLayerName = bgLayerName; // bg layer created in tiled
    this.blockedLayerName = blockedLayerName; // blocked layer created in tiled
    this.scene = scene; // scene this map belongs to
    this.createMap();
  }

  createMap() {
    this.map = this.scene.make.tilemap({ key: this.key });
    this.tiles = this.map.addTilesetImage(
      this.tileSetName,
      this.tileSetName,
      32,
      32,
      1,
      2
    );
    this.backgroundLayer = this.map.createStaticLayer(
      this.bgLayerName,
      this.tiles,
      0,
      0
    );
    this.backgroundLayer.setScale(this.scale);
    this.blockedLayer = this.map.createStaticLayer(
      this.blockedLayerName,
      this.tiles,
      0,
      0
    );
    this.blockedLayer.setScale(this.scale);
    this.blockedLayer.setCollisionByExclusion([-1]);
    this.scene.physics.world.bounds.width = this.map.widthInPixels * this.scale;
    this.scene.physics.world.bounds.height =
      this.map.heightInPixels * this.scale;

    this.scene.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels * this.scale,
      this.map.heightInPixels * this.scale
    );
  }
}
