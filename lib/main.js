const Render = require('./render');
const Collision = require('./collision');

const map1 = {
  cols: 4,
  rows: 4,
  tiles: [
    [1, 1, 1, 1],
    [1, 99, 99, 1],
    [1, 99, 99, 1],
    [2, 2, 2, 2]
  ],
  collision: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ]
};

$(() => {
  const render = new Render;
  const collisionMap = new Collision(map1.collision);

  render.drawMap(map1);
  render.update();
  collisionMap.populateWorld();
  collisionMap.runEngine();
  collisionMap.renderCollision();
  // collisionMap.movePlayer("right");

  const updater = () => {
    render.drawPlayer(collisionMap.playerPos());
  };


  let interval = window.setInterval(updater, 1);
});
