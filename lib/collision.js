const Matter = require('../physics/matter');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

class Collision {
  constructor (collisionMap) {
    this.map = collisionMap;
    this.tileSize = 64;
    this.boxes = [];
    this.engine = Engine.create();
    this.render = Render.create({
      element: document.getElementById("collision"),
      engine: this.engine
    });

    this.player = Bodies.rectangle(100, 100, 32, 32);

    this.boxes.push(this.player);
    this.createHitBoxes();
  }

  drawSolidBox (num, x, y) {
    let currentTile = new createjs.Bitmap("./assets/tileatlas.png");
    currentTile.x = x * this.tileSize;
    currentTile.y = y * this.tileSize;
    currentTile.sourceRect = this.tiles[num];
    this.stage.addChild(currentTile);
  }

  createHitBoxes () {
    for (let col = 0; col < this.map.length; col++) {
      for (let row = 0; row < this.map[0].length; row++) {
        let currentTile = this.map[col][row];
        if (currentTile === 1) {
          this.boxes.push(
            Bodies.rectangle(
              (row * this.tileSize) + this.tileSize/2 + 1,
              (col * this.tileSize) + this.tileSize/2 + 1,
              this.tileSize,
              this.tileSize,
              { isStatic: true }
            )
          );
        }
      }
    }
  }

  playerPos () {
    return this.player.position;
  }

  dir (dir) {
    switch (dir) {
      case "left":
        return 180;
      case "right":
        return 0;
      default:
        return state;
    }
  }

  movePlayer (dir) {
    Matter.Body.setAngle(this.player, this.dir(dir));
    Matter.Body.setAngularVelocity(this.player, 0.5);
  }

  populateWorld () {
    World.add(this.engine.world, this.boxes);
  }

  runEngine () {
    Engine.run(this.engine);
  }

  renderCollision () {
    Render.run(this.render);
  }
}

module.exports = Collision;
