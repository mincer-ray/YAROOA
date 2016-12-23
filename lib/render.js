class Render {
  constructor () {
    this.stage = new createjs.Stage("gameArea");
    this.tileSize = 32;
    this.tiles = [];
    this.pickups = [];
    this.debris = [];

    this.tiles.push({ x:0, y:0, width:this.tileSize, height:this.tileSize });
    this.tiles.push({ x:32, y:0, width:this.tileSize, height:this.tileSize });
    this.tiles.push({ x:0, y:32, width:this.tileSize, height:this.tileSize });
    this.tiles.push({ x:0, y:0, width:10, height:10 });
    this.tiles.push({ x:32, y:32, width:this.tileSize, height:this.tileSize });

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

  addDebris (x, y) {
    let debris = new createjs.Bitmap("./assets/blue.jpg");
    debris.x = x;
    debris.y = y;
    debris.sourceRect = this.tiles[3];
    this.debris.push(debris);
    this.stage.addChild(debris);
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
    this.player = new createjs.Bitmap("./assets/red.jpg");
    this.player.sourceRect = { x:0, y:0, width:16, height:16 };
    this.stage.addChild(this.player);
    this.text = new createjs.Text('00:00', "16px Arial", "#ffffff");
    this.stage.setChildIndex(this.text, this.stage.getNumChildren()-1);
    this.stage.addChild(this.text);
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
        this.addDebris(piece.x - 6, piece.y - 5);
      });
      this.stage.update();
    }

    for (let i = 0 ; i < newDebris.length ; i++) {
      this.debris[i].x = newDebris[i].x - 6;
      this.debris[i].y = newDebris[i].y - 5;
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
