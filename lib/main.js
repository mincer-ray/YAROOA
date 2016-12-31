const Game = require('./game');
const Maps = require('./maps');

$(() => {
  const game = new Game;
  game.addLevels(Maps);
  game.play();
});
