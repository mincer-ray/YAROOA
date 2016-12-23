const Matter = require('../physics/matter');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

class Collision {
  constructor () {
    this.tileSize = 32;
    this.engine = Engine.create();
    this.render = Render.create({
      element: document.getElementById("gameArea"),
      engine: this.engine
    });
    this.engine.world.gravity = { x:0, y:0.5 };
    Matter.Events.on(this.engine, "collisionStart", this.handleCollision.bind(this));
    this.spawnDebris = this.spawnDebris.bind(this);
  }

  update (map) {
    this.map = map;
    this.exitActive = false;
    this.levelComplete = false;
    this.boxes = [];
    this.player = Bodies.rectangle(50, 50, 16, 16, { inertia: Infinity, friction: 0.5, label: "player" });
    Matter.Body.setMass(this.player, 100);
    this.boxes.push(this.player);
    this.createHitBoxes();
  }

  createHitBoxes () {
    for (let col = 0; col < this.map.length; col++) {
      for (let row = 0; row < this.map[0].length; row++) {
        let currentTile = this.map[col][row];
        if (currentTile === 1) {
          this.boxes.push(this.createBox(row, col));
        } else if (currentTile === 2) {
          let pickup = this.createPickup(row, col);
          this.boxes.push(pickup);
        } else if (currentTile === 3) {
          this.boxes.push(this.createExit(row, col));
        } else if (currentTile === 4) {
          this.boxes.push(this.createSpawner(row, col));
        } else if (currentTile === 9) {
          this.boxes.push(this.createRemover(row, col));
        }
      }
    }
  }

  createBox (row, col) {
    return (
      Bodies.rectangle(
        (row * this.tileSize) + this.tileSize/2 + 1,
        (col * this.tileSize) + this.tileSize/2 + 1,
        this.tileSize,
        this.tileSize,
        { isStatic: true }
      )
    );
  }

  createPickup (row, col) {
    return (
      Bodies.rectangle(
        (row * this.tileSize) + this.tileSize/2 + 1,
        (col * this.tileSize) + this.tileSize/2 + 1,
        10,
        10,
        { isStatic: true, label: "pickup", isSensor: true }
      )
    );
  }

  createSpawner (row, col) {
    return (
      Bodies.rectangle(
        (row * this.tileSize) + this.tileSize/2 + 1,
        (col * this.tileSize) + this.tileSize/2 - 10,
        10,
        10,
        { isStatic: true, label: "spawner", isSensor: true }
      )
    );
  }

  createRemover (row, col) {
    return (
      Bodies.rectangle(
        (row * this.tileSize) + this.tileSize/2 + 1,
        (col * this.tileSize) + this.tileSize/2 + 1,
        this.tileSize,
        this.tileSize,
        { isStatic: true, label: "remover" }
      )
    );
  }

  createExit (row, col) {
    return (
      Bodies.rectangle(
        (row * this.tileSize) + this.tileSize/2 + 1,
        (col * this.tileSize) + this.tileSize/2 + 1,
        this.tileSize,
        this.tileSize,
        { isStatic: true, label: "exit", isSensor: true }
      )
    );
  }

  spawnDebris () {
    let debris = [];

    Matter.Composite.allBodies(this.engine.world).forEach(body => {
      if (body.label === "spawner") {
        debris.push(Bodies.circle(
          body.position.x,
          body.position.y,
          5,
          { label: "debris", mass: 50 }
        ));
      }
    });

    World.add(this.engine.world, debris);
  }

  debrisPos () {
    let debris = [];

    Matter.Composite.allBodies(this.engine.world).forEach(body => {
      if (body.label === "debris") {
        debris.push(body.position);
      }
    });

    return debris;
  }

  activateExit () {
    this.exitActive = true;
  }

  handleCollision (event) {
    event.pairs.forEach(pair => {
      if (pair.bodyB.label === "remover" || pair.bodyA.label === "remover") {
        if (pair.bodyB.label === "debris") {
          Matter.Composite.remove(this.engine.world, pair.bodyB);
        } else if (pair.bodyA.label === "debris") {
          Matter.Composite.remove(this.engine.world, pair.bodyA);
        }
      }
      if (pair.bodyB.label === "pickup" || pair.bodyA.label === "pickup") {
        if (pair.bodyB.label === "player") {
          Matter.Composite.remove(this.engine.world, pair.bodyA);
        } else {
          Matter.Composite.remove(this.engine.world, pair.bodyB);
        }
      }
      if (pair.bodyB.label === "exit" || pair.bodyA.label === "exit") {
        if (pair.bodyB.label === "player" || pair.bodyA.label === "player") {
          if (this.exitActive) {
            Matter.Composite.clear(this.engine.world);
            this.levelComplete = true;
          }
        }
      }
    });
  }

  playerPos () {
    return this.player.position;
  }

  pickupPos () {
    let pickups = [];

    Matter.Composite.allBodies(this.engine.world).forEach(body => {
      if (body.label === "pickup") {
        pickups.push(body.position);
      }
    });

    return pickups;
  }

  dir (dir) {
    switch (dir) {
      case "left":
        return { x:-4, y:this.player.velocity.y };
      case "right":
        return { x:4, y:this.player.velocity.y };
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
