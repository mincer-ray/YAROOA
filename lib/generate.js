const Bodies = Matter.Bodies;

class Generate {
  constructor (tileSize) {
    this.tileSize = tileSize;
  }

  box (row, col) {
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

  pickup (row, col) {
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

  spawner (row, col, tileSize, type) {
    return (
      Bodies.rectangle(
        (row * this.tileSize) + this.tileSize/2 + 1,
        (col * this.tileSize) + this.tileSize/2 - 10,
        10,
        10,
        { isStatic: true, label: type, isSensor: true }
      )
    );
  }

  remover (row, col) {
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

  exit (row, col) {
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
}

module.exports = Generate;
