class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    // launch allows run in parallel with other scenes
    this.scene.launch("Ui");
    this.score = 0;
    this.scale = 2;
  }
  create() {
    this.createMap();
    this.createAudio();
    this.createGroups();
    this.createInput();
    this.createGameManager();
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add("goldSound", {
      loop: false,
      volume: 0.5,
    });
  }
  createPlayer(location) {
    this.player = new Player(this, location[0], location[2], "characters", 0);
  }
  createGroups() {
    this.chests = this.physics.add.group();
  }

  spawnChest(chestObject) {
    let chest = this.chests.getFirstDead();
    if (!chest) {
      // add to chest group
      this.chests.add(
        new Chest(
          this,
          chestObject.x * 2,
          chestObject.y * 2,
          "items",
          0,
          chestObject.gold,
          chestObject.id
        )
      );
    } else {
      chest.coins = chestObject.gold;
      chest.id = chestObject.id;
      chest.setPosition(chestObject.x * 2, chestObject.y * 2);
      chest.makeActive();
    }
  }
  spawnMonster(monster) {
    console.log(monster);
  }
  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  addCollisions() {
    this.physics.add.collider(this.player, this.map.blockedLayer);
    this.physics.add.overlap(
      this.player,
      this.chests,
      this.collectChest,
      null,
      this
    );
  }

  update() {
    if (this.player) this.player.update(this.cursors);
  }

  collectChest(player, chest) {
    // play gold pickup sound
    this.goldPickupAudio.play();
    // update score in ui
    this.events.emit("updateScore", (this.score += chest.coins));
    // make chest inactive
    chest.makeInactive();
    // spawn new chest
    this.events.emit("pickUpChest", chest.id);
  }
  createMap() {
    this.map = new Map(this, "map", "background", "background", "blocked");
  }
  createGameManager() {
    this.events.on("spawnPlayer", (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });
    this.events.on("chestSpawned", (chest) => {
      this.spawnChest(chest);
    });
    this.events.on("monsterSpawned", (monster) => {
      this.spawnMonster(monster);
    });
    this.gameManager = new GameManager(this, this.map.map.objects);
    this.gameManager.setup();
  }
}
