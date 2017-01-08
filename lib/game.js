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
    this.pickups = [];
  }

  waitForPlayer () {
    this.render.startScreen();
    $(window).on("keydown", this.play.bind(this));
  }

  play (event) {
    if (event.keyCode === 32) {
      event.preventDefault();
      this.updater = this.updater.bind(this);
      this.clockInterval = window.setInterval(this.clock.bind(this), 10);
      this.nextLevel();
    }
  }

  addLevels (maps) {
    maps.forEach(map => {
      this.mapList.push(map);
    });
  }

  nextLevel () {
    this.collider = new Collision();
    this.controller = new Controller(this.collider, this.timer, this.render, this.resetLevel.bind(this));
    this.render.clear();
    this.time = this.mapList[0].time;
    this.timer.reset();
    this.timer.setStart(this.time);
    this.initLevel(this.mapList.shift());
    this.runUpdater();
    this.pickups = this.collider.pickupPos();
  }

  initLevel (map) {
    this.collider.update(map.collision);
    this.render.drawMap(map);
    this.render.update();
    this.collider.populateWorld();
    this.collider.runEngine();
    // this.collider.renderCollision();
    window.setInterval(this.collider.spawnDebris.bind(this, "water"), 10);
    window.setInterval(this.collider.spawnDebris.bind(this, "broken"), 2000);
  }

  updater () {
    this.render.drawPlayer(this.collider.playerPos());
    this.render.drawPickups(this.collider.pickupPos());
    this.render.drawDebris(this.collider.debrisPos());
    this.checkPickups(this.collider.pickupPos());
    this.checkLevelEnd();
    if (this.levelComplete) {
      window.clearInterval(this.interval);
      this.levelComplete = false;
      if ( this.mapList.length > 0) {
        this.nextLevel();
      } else {
        this.endGame();
      }
    }
    requestAnimationFrame(this.updater.bind(this));
  }

  checkPickups (pickups) {
    if (this.pickups.length > pickups.length) {
      this.timer.addTime(3);
      this.pickups = pickups;
    }
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

  resetLevel () {
    this.collider.resetLevel();
    this.timer.reset();
    this.timer.setStart(this.time);
    this.pickups = this.collider.pickupPos();
  }

  endGame () {
    this.render.endGame();
  }

  clock () {
    this.timer.tick();
    this.render.updateTime(this.timer.time());
    if (this.timer.time() === "00:00") {
      this.resetLevel();
    }
  }
}

module.exports = Game;
