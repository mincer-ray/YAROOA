const Game = require('./game');

$(() => {
  const map1 = {
    cols: 6,
    rows: 4,
    tiles: [
      [1, 1, 1, 1, 1, 1],
      [1, 9, 9, 0, 9, 1],
      [0, 9, 9, 4, 9, 0],
      [2, 2, 2, 2, 2, 2]
    ],
    collision: [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 1],
      [2, 0, 0, 3, 0, 2],
      [1, 1, 1, 1, 1, 1]
    ]
  };

  const map3 = {
    cols: 6,
    rows: 4,
    tiles: [
      [1, 1, 1, 1, 1, 1],
      [1, 9, 9, 0, 4, 1],
      [1, 9, 9, 9, 9, 1],
      [2, 2, 2, 2, 2, 2]
    ],
    collision: [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 3, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1]
    ]
  };

  const map2 = {
    cols: 6,
    rows: 4,
    tiles: [
      [1, 1, 1, 1, 1, 1],
      [1, 9, 9, 0, 4, 1],
      [1, 0, 9, 9, 9, 1],
      [2, 2, 2, 2, 0, 2]
    ],
    collision: [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 3, 1],
      [1, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 2, 1]
    ]
  };

  const game = new Game;
  game.addLevel(map1);
  game.addLevel(map2);
  game.addLevel(map3);
  game.addLevel(map1);
  game.addLevel(map2);
  game.addLevel(map3);
  game.play();
});
