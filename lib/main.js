const Game = require('./game');

$(() => {
  const map1 = {
    cols: 4,
    rows: 4,
    tiles: [
      [1, 1, 1, 1],
      [1, 99, 99, 1],
      [1, 99, 99, 99],
      [2, 2, 2, 2]
    ],
    collision: [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 1]
    ]
  };

  const game = new Game;

  game.changeLevel(map1);
  game.initLevel();

  game.runUpdater();
});
