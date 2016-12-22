class Render {
  constructor () {
    this.stage = new createjs.Stage("gameArea");
    this.tileSize = 64;
    this.tiles = [];
    this.pickups = [];

    this.tiles.push({ x:0, y:0, width:this.tileSize, height:this.tileSize });
    this.tiles.push({ x:64, y:0, width:this.tileSize, height:this.tileSize });
    this.tiles.push({ x:0, y:64, width:this.tileSize, height:this.tileSize });
    this.tiles.push({ x:0, y:0, width:10, height:10 });
    this.tiles.push({ x:64, y:64, width:this.tileSize, height:this.tileSize });

    this.coin = new createjs.SpriteSheet({
      images: ["./assets/items.png"],
      frames: [
        // [0, 0, 20, 20, 0, 0]
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

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", this.stage);
  }

  clear () {
    this.stage.clear();
    this.stage.removeAllChildren();
  }

  getTile(map, x, y) {
    return map[x][y];
  }

  drawTile (num, x, y) {
    let currentTile = new createjs.Bitmap("./assets/tileatlas.png");
    currentTile.x = x * this.tileSize;
    currentTile.y = y * this.tileSize;
    currentTile.sourceRect = this.tiles[num];
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

  drawMap (map, pickups) {
    for (let col = 0; col < map.cols; col++) {
      for (let row = 0; row < map.rows; row++) {
        let currentTile = this.getTile(map.tiles, row, col);
        if (currentTile === 9 || currentTile === 0) {
        } else {
          this.drawTile(currentTile, col, row);
        }
      }
    }
    this.player = new createjs.Bitmap("./assets/tileatlas.png");
    this.player.sourceRect = { x:0, y:0, width:32, height:32 };
    this.stage.addChild(this.player);
    this.text = new createjs.Text('00:00', "16px Arial", "#ffffff");
    this.stage.setChildIndex(this.text, this.stage.getNumChildren()-1);
    this.stage.addChild(this.text);
  }

  drawPlayer (pos) {
    this.player.x = pos.x - 17;
    this.player.y = pos.y - 17;
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

  update () {
    this.stage.update();
  }

  updateTime (time) {
    this.text.text = time;
  }
}

module.exports = Render;
