[live]: https://www.peterdegenaro.com/YAROOA
[easel]: http://www.createjs.com/easeljs
[matter]: http://brm.io/matter-js/

![logo](https://raw.githubusercontent.com/mincer-ray/YAROOA/gh-pages/assets/logo.png)
## A Javascript Platformer

[YAROOA Live Version][live]

You Are Running Out Of Air is a platforming game about a spaceship that has just
been hit by an asteroid! The pilot has to get to the escape pod, but his life
support system is running out of air! Your task is to do the following:

### Gameplay

![screenshot](https://raw.githubusercontent.com/mincer-ray/YAROOA/gh-pages/assets/yarooaSS.png)

Controls:
- [ ] Press an Arrow Key once to fire your jetpack
- [ ] Press and hold an Arrow Key to Power Boost your jetpack

Game Goals:
1) Make it to the exit before the time runs out
2) Collect extra air for more time
3) Dodge falling debris and fuel tank leaks, they will slow you down!

### Technologies

YAROOA is a javascript game built with two external libraries. The [EaselJS][easel]
library was used for handling images and canvas rendering. The [Matter.js][matter]
library was used to deal with the physics of the falling debris and fuel leaks
interacting with the player.


### Implementation

The initial challenge was learning how to use the Matter.js physics engine in my own javascript project. Matter has poor support for custom graphics, and I realized that if I wanted to use some animation and EaselJS I would need to create my own rendering engine to go along with Matter.

At the heart of the game if the stage updater loop found in game.js:
```javascript
updater () {
  this.render.drawPlayer(this.collider.playerPos());
  this.render.drawPickups(this.collider.pickupPos());
  this.render.drawDebris(this.collider.debrisPos());
  this.checkPickups(this.collider.pickupPos());
  this.checkLevelEnd();
  ...
  requestAnimationFrame(this.updater.bind(this));
}
```

The collider object handles the physics and hit detection of the game objects, and outputs positions of game objects with Pos functions. The Pos function coordinates are passed into the render object which adds, removes, and moves objects on the canvas accordingly.

### Future Features

**Day 1**: Setup Node modules. Write entry file. Get tile map working to draw levels:

- `webpack` everything and have a page rendering
- Get tile map functional
- Create basic tile sheet
- Make a decent tile map for first level and to write rest of game with
