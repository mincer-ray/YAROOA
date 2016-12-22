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

    this.engine.world.gravity = { x:0, y:0.5 };

    this.player = Bodies.rectangle(100, 100, 32, 32, { inertia: Infinity, friction: 0.9 });
    Matter.Body.setMass(this.player, 100);

    this.boxes.push(this.player);
    this.createHitBoxes();
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
        return { x:-2, y:this.player.velocity.y };
      case "right":
        return { x:2, y:this.player.velocity.y };
      case "up":
        return { x:this.player.velocity.x, y:-5 };
      case "down":
        return { x:this.player.velocity.x, y:1 };
    }
  }

  movePlayer (dir) {
    Matter.Body.setVelocity(this.player, this.dir(dir));
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