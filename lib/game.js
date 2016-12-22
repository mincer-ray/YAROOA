const Render = require('./render');
const Timer = require('./timer');
const Collision = require('./collision');
const Controller = require('./controller');

class Game {
  constructor () {
    this.render = new Render;
    this.levelComplete = false;
    this.mapList = [];
    this.timer = new Timer;

    this.clockInterval = window.setInterval(this.clock.bind(this), 10);

    this.updater = this.updater.bind(this);
  }

  play () {
    this.nextLevel();
  }

  addLevel (map) {
    this.mapList.push(map);
  }

  nextLevel () {
    this.collider = new Collision();
    this.controller = new Controller(this.collider);
    this.render.clear();
    this.initLevel(this.mapList.shift());
    this.runUpdater();
  }

  initLevel (map) {
    this.collider.update(map.collision);
    this.render.drawMap(map);
    this.render.update();
    this.collider.populateWorld();
    this.collider.runEngine();
    this.collider.renderCollision();
  }

  updater () {
    this.render.drawPlayer(this.collider.playerPos());
    this.render.drawPickups(this.collider.pickupPos());
    this.checkPickups(this.collider.pickupPos());
    this.checkLevelEnd();
    if (this.levelComplete) {
      window.clearInterval(this.interval);
      this.levelComplete = false;
      this.nextLevel();
    }
    requestAnimationFrame(this.updater.bind(this));
  }

  checkPickups (pickups) {
    if (pickups.length === 0) {
      this.allPickupsCollected = true;
    }
  }

  checkLevelEnd () {
    if (this.allPickupsCollected) {
      this.allPickupsCollected = false;
      this.collider.activateExit();
    }
    if (this.collider.levelComplete) {
      this.levelComplete = true;
    }
  }

  levelComplete () {
    this.levelComplete;
  }

  runUpdater () {
    requestAnimationFrame(this.updater.bind(this));
    // this.interval = window.setInterval(this.updater, 1);
  }

  clock () {
    this.timer.tick();
    this.render.updateTime(this.timer.time());
  }
}

module.exports = Game;
