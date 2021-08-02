class UiScene extends Phaser.Scene {
  constructor() {
    super("Ui");
  }
  init() {
    // grab a reference to the gameschene
    this.gameScene = this.scene.get("Game");
  }
  create() {
    this.setupUiElements();
    this.setupEvents();
  }
  setupUiElements() {
    // create the score text game object
    this.scoreText = this.add.text(35, 8, "Coins: 0", {
      fontSize: 16,
      fill: "#ffffff",
    });
    // create coin icon
    this.coinIcon = this.add.sprite(15, 15, "items", 3);
  }
  setupEvents() {
    this.gameScene.events.on("updateScore", (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    });
  }
}
