class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene; // The scene this game object will be added to
    this.velocity = 160; // The velocity of the player

    //enable physics
    this.scene.physics.world.enable(this);
    // set imovable if another object colides with our player
    this.setImmovable(false);
    this.setScale(2);
    this.setCollideWorldBounds(true);
    this.scene.add.existing(this);
    this.scene.cameras.main.startFollow(this);
  }
  update(cursors) {
    this.body.setVelocity(0);
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    }

    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }
  }
}
