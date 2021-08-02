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
    this.createPlayer();
    this.createChest();
    this.addCollisions();
    this.createInput();
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add("goldSound", {
      loop: false,
      volume: 0.5,
    });
  }
  createPlayer() {
    this.player = new Player(this, 224, 224, "characters", 0);
  }
  createChest() {
    // creage chest group
    this.chests = this.physics.add.group();
    // specifyy max number of chests we can have
    // array of possible locations for chest to spawn at
    this.chestPositions = [
      [100, 100],
      [200, 200],
      [300, 300],
      [400, 400],
      [500, 500],
    ];
    this.maxNumberOfChests = 3;
    // spawn a chest
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest();
    }
  }

  spawnChest() {
    const location =
      this.chestPositions[
        Math.floor(Math.random() * this.chestPositions.length)
      ];
    let chest = this.chests.getFirstDead();
    if (!chest) {
      // add to chest group
      this.chests.add(new Chest(this, location[0], location[1], "items", 0));
    } else {
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }
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
    this.player.update(this.cursors);
  }

  collectChest(player, chest) {
    // play gold pickup sound
    this.goldPickupAudio.play();
    // update score in ui
    this.events.emit("updateScore", (this.score += chest.coins));
    // make chest inactive
    chest.makeInactive();
    // spawn new chest
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }
  createMap() {
    this.map = new Map(this, "map", "background", "background", "blocked");
  }
}
