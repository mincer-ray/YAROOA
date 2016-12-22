const Render = require('./render');
const Collision = require('./collision');
const Controller = require('./controller');

class Game {
  constructor () {
    this.render = new Render;
    this.map = {};

    this.updater = this.updater.bind(this);
  }

  changeLevel (map) {
    this.map = map;
  }

  initLevel () {
    this.collider = new Collision(this.map.collision);
    this.controller = new Controller(this.collider);
    this.render.drawMap(this.map);
    this.render.update();
    this.collider.populateWorld();
    this.collider.runEngine();
    this.collider.renderCollision();
  }

  updater () {
    this.render.drawPlayer(this.collider.playerPos());
    this.render.drawPickups(this.collider.pickupPos());
  }

  runUpdater () {
    let interval = window.setInterval(this.updater, 1);
  }
}

module.exports = Game;
