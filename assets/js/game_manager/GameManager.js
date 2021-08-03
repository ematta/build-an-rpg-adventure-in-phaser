class GameManager {
  constructor(scene, mapData) {
    this.scale = 2;
    this.scene = scene;
    this.mapData = mapData;
    this.spawners = {};
    this.chests = {};
    this.playerLocations = [];
    this.chestLocations = {};
    this.monsterLocations = {};
  }

  setup() {
    this.parseMapData();
    this.setupEventListeners();
    this.setupSpawners();
    this.spawnPlayer();
  }
  parseMapData() {
    this.mapData.forEach((layer) => {
      if (layer.name === "player_locations") {
        layer.objects.forEach((obj) => {
          this.playerLocations.push([obj.x * this.scale, obj.y * this.scale]);
        });
      } else if (layer.name === "chest_locations") {
        layer.objects.forEach((obj) => {
          if (this.chestLocations[obj.properties.spawner]) {
            this.chestLocations[obj.properties.spawner].push([
              obj.x * this.scale,
              obj.y * this.scale,
            ]);
          } else {
            this.chestLocations[obj.properties.spawner] = [
              [obj.x * this.scale, obj.y * this.scale],
            ];
          }
        });
      } else if (layer.name === "monster_locations") {
        layer.objects.forEach((obj) => {
          if (this.monsterLocations[obj.properties.spawner]) {
            this.monsterLocations[obj.properties.spawner].push([
              obj.x * this.scale,
              obj.y * this.scale,
            ]);
          } else {
            this.monsterLocations[obj.properties.spawner] = [
              [obj.x * this.scale, obj.y * this.scale],
            ];
          }
        });
      }
    });
  }
  setupEventListeners() {}
  setupSpawners() {}
  spawnPlayer() {
    const location =
      this.playerLocations[
        Math.floor(Math.random() * this.playerLocations.length)
      ];
    this.scene.events.emit("spawnPlayer", location);
  }
}
