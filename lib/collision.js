const Matter = require('../physics/matter');
const Generate = require('./generate');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

class Collision {
  constructor () {
    this.tileSize = 32;
    this.generate = new Generate(this.tileSize);
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
    this.exitActive = true;
    this.levelComplete = false;
    this.boxes = [];
    // this.player = Bodies.rectangle(50, 270, 16, 16, { inertia: Infinity, friction: 0.5, label: "player" });
    this.player = Bodies.circle(50, 270, 8, { inertia: Infinity, friction: 0.5, label: "player" });
    Matter.Body.setMass(this.player, 100);
    this.boxes.push(this.player);
    this.createHitBoxes();
  }

  createHitBoxes () {
    for (let col = 0; col < this.map.length; col++) {
      for (let row = 0; row < this.map[0].length; row++) {
        let currentTile = this.map[col][row];
        if (currentTile === 1) {
          this.boxes.push(this.generate.box(row, col, this.tileSize));
        } else if (currentTile === 2) {
          let pickup = this.generate.pickup(row, col, this.tileSize);
          this.boxes.push(pickup);
        } else if (currentTile === 3) {
          this.boxes.push(this.generate.exit(row, col, this.tileSize));
        } else if (currentTile === 4) {
          this.boxes.push(this.generate.spawner(row, col, this.tileSize, "water"));
        } else if (currentTile === 5) {
          this.boxes.push(this.generate.spawner(row, col, this.tileSize, "broken"));
        } else if (currentTile === 9) {
          this.boxes.push(this.generate.remover(row, col, this.tileSize));
        }
      }
    }
  }

  spawnDebris (type) {
    let debris = [];
    let debrisType = "";
    if (type === "water") {
      debrisType = "drop";
    } else {
      debrisType = "trash";
    }

    Matter.Composite.allBodies(this.engine.world).forEach(body => {
      if (body.label === type) {
        debris.push(Bodies.circle(
          body.position.x,
          body.position.y,
          5,
          { label: debrisType, mass: 50 }
        ));
      }
    });

    World.add(this.engine.world, debris);
  }

  debrisPos () {
    let debris = [];

    Matter.Composite.allBodies(this.engine.world).forEach(body => {
      if (body.label === "drop" || body.label === "trash") {
        debris.push({pos: body.position, label: body.label});
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
        if (pair.bodyB.label === "drop") {
          Matter.Composite.remove(this.engine.world, pair.bodyB);
        } else if (pair.bodyA.label === "drop") {
          Matter.Composite.remove(this.engine.world, pair.bodyA);
        }
      }
      if (pair.bodyB.label === "pickup" || pair.bodyA.label === "pickup") {
        if (pair.bodyB.label === "player") {
          Matter.Composite.remove(this.engine.world, pair.bodyA);
        } else if (pair.bodyA.label === "player") {
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

  resetLevel () {
    Matter.Composite.allBodies(this.engine.world).forEach(body => {
      if (body.label === "drop" || body.label === "trash" || body.label === "pickup") {
        Matter.Composite.remove(this.engine.world, body);
      }
    });
    for (let col = 0; col < this.map.length; col++) {
      for (let row = 0; row < this.map[0].length; row++) {
        let currentTile = this.map[col][row];
        if (currentTile === 2) {
          let pickup = this.generate.pickup(row, col, this.tileSize);
          Matter.Composite.add(this.engine.world, pickup);
        }
      }
    }
    Matter.Body.setPosition(this.player, { x: 50, y: 270 });
    this.movePlayer("down");
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
