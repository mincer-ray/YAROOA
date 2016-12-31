class Render {
  constructor () {
    this.stage = new createjs.Stage("gameArea");
    this.tileSize = 32;
    this.tiles = [];
    this.pickups = [];
    this.debris = [];

    this.cutTiles();

    this.coin = new createjs.SpriteSheet({
      images: ["./assets/coin.png"],
      frames: [
        [96, 80, 16, 16, 0, 8],
        [115, 80, 10, 16, 0, 5],
        [134, 80, 4, 16, 0, 2],
        [147, 80, 10, 16, 0, 5]
      ],
      animations: {
        spin: {
          frames: [0, 1, 2, 3],
          speed: 0.1
        }
      }
    });

    this.playerModel = new createjs.SpriteSheet({
      images: ["./assets/spaceman2.png"],
      frames: [
        [0, 0, 32, 32, 0, 0],
        [34, 0, 32, 38, 0, 0],
        [68, 0, 32, 46, 0, 0],
        [102, 0, 32, 48, 0, 0],
        [0, 50, 44, 32, 0, 12],
        [46, 50, 52, 32, 0, 20],
        [100, 50, 54, 32, 0, 22],
      ],
      animations: {
        idle: {
          frames: [0]
        },
        up: {
          frames: [1, 2, 3],
          speed: 0.1,
          next: false
        },
        side: {
          frames: [4, 5, 6],
          speed: 0.1,
          next: false
        },
        uBoost: {
          frames: [3]
        },
        sBoost: {
          frames: [6]
        },
      }
    });

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", this.stage);
  }

  cutTiles () {
    this.tileConverter = {};
    let i = 0;
    for (let y = 0; y < 8; y += 1 ) {
      for (let x = 0; x < 10; x += 1) {
        this.tiles.push({ x:x*32, y:y*32, width:this.tileSize, height:this.tileSize });
        this.tileConverter[parseFloat(`${x}.${y}`)] = i;
        i += 1;
      }
    }
  }

  clear () {
    this.stage.clear();
    this.stage.removeAllChildren();
  }

  getTile(map, x, y) {
    return map[x][y];
  }

  drawTile (num, x, y) {
    let currentTile = new createjs.Bitmap("./assets/yarooafinal.png");
    currentTile.x = x * this.tileSize;
    currentTile.y = y * this.tileSize;
    currentTile.sourceRect = this.tiles[this.tileConverter[num]];
    // if (num === 0) this.pickups.push(currentTile);
    this.stage.addChild(currentTile);
  }

  addPickup (x, y) {
    let pickup = new createjs.Sprite(this.coin);
    pickup.x = x;
    pickup.y = y;
    this.pickups.push(pickup);
    pickup.gotoAndPlay("spin");
    this.stage.addChild(pickup);
  }

  addWater (x, y) {
    let debris = new createjs.Bitmap("./assets/yarooatest2.png");
    debris.x = x;
    debris.y = y;
    debris.sourceRect = { x:0, y:128, width:10, height:10 };
    this.debris.push(debris);
    this.stage.addChild(debris);
  }

  addTrash (x, y) {
    let debris = new createjs.Bitmap("./assets/yarooatest2.png");
    debris.x = x;
    debris.y = y;
    debris.sourceRect = { x:128, y:96, width:10, height:10 };
    this.debris.push(debris);
    this.stage.addChild(debris);
  }

  drawMap (map, pickups) {
    for (let col = 0; col < map.cols; col++) {
      for (let row = 0; row < map.rows; row++) {
        let currentTile = this.getTile(map.tiles, row, col);
        if (currentTile === -1 || currentTile === 0) {
        } else {
          this.drawTile(currentTile, col, row);
        }
      }
    }
    this.player = new createjs.Sprite(this.playerModel);
    this.player.scaleX = 0.5;
    this.player.scaleY = 0.5;
    this.stage.addChild(this.player);
    this.time = new createjs.Text('00:00', "Bold 30px VT323", "#ffffff");
    this.title = new createjs.Text(`${map.title}`, "Bold 30px VT323", "#ffffff");
    this.title.x = 200;
    this.stage.setChildIndex(this.time, this.stage.getNumChildren()-1);
    this.stage.setChildIndex(this.title, this.stage.getNumChildren()-1);
    this.stage.addChild(this.time);
    this.stage.addChild(this.title);
  }

  drawPlayer (pos) {
    this.player.x = pos.x - 9;
    this.player.y = pos.y - 9;
  }

  drawPickups (newPickups) {
    if (this.pickups.length != newPickups.length) {
      this.pickups.forEach(pickup => {
        this.stage.removeChild(pickup);
      });
      this.pickups = [];
      newPickups.forEach(pickup => {
        this.addPickup(pickup.x, pickup.y-10);
      });
      this.stage.update();
    }
  }

  drawDebris (newDebris) {
    if (this.debris.length != newDebris.length) {
      this.debris.forEach(debris => {
        this.stage.removeChild(debris);
      });
      this.debris = [];
      newDebris.forEach(piece => {
        if (piece.label === "drop") {
          this.addWater(piece.pos.x - 6, piece.pos.y - 5);
        } else {
          this.addTrash(piece.pos.x - 6, piece.pos.y - 5);
        }
      });
      this.stage.update();
    }

    for (let i = 0 ; i < newDebris.length ; i++) {
      this.debris[i].x = newDebris[i].pos.x - 6;
      this.debris[i].y = newDebris[i].pos.y - 5;
    }
  }

  animatePlayer(direction) {
    if ( direction === "up" ) {
      if (this.player.currentAnimation != "up") {
        this.player.gotoAndPlay("up");
      }
    } else if ( direction === "left" ) {
      this.player.scaleX = -0.5;
      this.player.regX = 32;
      if ( this.player.currentAnimation != "side" ) {
        this.player.gotoAndPlay("side");
      }
    } else if ( direction === "right" ) {
      this.player.scaleX = 0.5;
      this.player.regX = 0;
      if ( this.player.currentAnimation != "side" ) {
        this.player.gotoAndPlay("side");
      }
    } else if ( direction === "idle" ) {
      this.player.gotoAndPlay("idle");
    } else {
      this.player.gotoAndPlay("idle");
    }
  }

  update () {
    this.stage.update();
  }

  updateTime (time) {
    this.time.text = time;
  }
}

module.exports = Render;
