class Chest extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, coins, id) {
    super(scene, x, y, key, frame);
    this.scene = scene; // The scene this game object will be added to
    this.coins = coins; // amount of coins this chest contains
    this.id = id; // id of the chest

    //enable physics
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    // scale the sprite
    this.setScale(2);
  }
  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }
  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
  }
}
