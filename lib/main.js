const Game = require('./game');
const Maps = require('./maps');

$(() => {
  debugger
  const game = new Game;
  game.addLevels(Maps);
  game.play();
});
