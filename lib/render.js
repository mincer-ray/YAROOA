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

    this.player = new createjs.Bitmap("./assets/tileatlas.png");
    this.player.sourceRect = { x:0, y:0, width:32, height:32 };
    this.stage.addChild(this.player);

    createjs.Ticker.on("tick", this.stage);
  }

  getTile(map, x, y) {
    return map[x][y];
  }

  drawTile (num, x, y) {
    let currentTile = new createjs.Bitmap("./assets/tileatlas.png");
    currentTile.x = x * this.tileSize;
    currentTile.y = y * this.tileSize;
    currentTile.sourceRect = this.tiles[num];
    if (num === 0) this.pickups.push(currentTile);
    this.stage.addChild(currentTile);
  }

  updateTile (num, x, y) {
    let currentTile = new createjs.Bitmap("./assets/tileatlas.png");
    currentTile.x = x;
    currentTile.y = y;
    currentTile.sourceRect = this.tiles[num];
    if (num === 0) this.pickups.push(currentTile);
    this.stage.addChild(currentTile);
  }

  drawMap (map, pickups) {
    for (let col = 0; col < map.cols; col++) {
      for (let row = 0; row < map.rows; row++) {
        let currentTile = this.getTile(map.tiles, row, col);
        if (currentTile === 99) {
        } else {
          this.drawTile(currentTile, col, row);
        }
      }
    }
  }

  drawPlayer (pos) {
    this.player.x = pos.x - 16;
    this.player.y = pos.y - 16;
  }

  drawPickups (newPickups) {
    if (this.pickups.length != newPickups.length) {
      this.pickups.forEach(pickup => {
        this.stage.removeChild(pickup);
      });
      this.pickups = [];
      newPickups.forEach(pickup => {
        this.updateTile(0, pickup.x - 33, pickup.y - 33);
      });
      this.stage.update();
    }
  }

  update () {
    this.stage.update();
  }
}

module.exports = Render;
