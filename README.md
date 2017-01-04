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
1. Make it to the exit before the time runs out
2. Collect extra air for more time
3. Dodge falling debris and fuel tank leaks, they will slow you down!

### Technologies

YAROOA is a javascript game built with two external libraries. The [EaselJS][easel]
library was used for handling images and canvas rendering. The [Matter.js][matter]
library was used to deal with the physics of the falling debris and fuel leaks
interacting with the player.


### Implementation

#### Physics and Rendering

The initial challenge was learning how to use the Matter.js physics engine in my own javascript project. Matter has poor support for custom graphics, and I realized that if I wanted to use some animation and EaselJS I would need to create my own rendering engine to go along with Matter.

At the heart of the game if the stage updater loop found in `game.js`:
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

The `collider` object handles the physics and hit detection of the game objects, and outputs positions of game objects with `Pos` functions. The `Pos` function coordinates are passed into the `render` object which adds, removes, and moves objects on the canvas accordingly.

If the player picks up an air tank the `collider` will return a `pickupPos()` with a shorter length than the previously saved number in `game.js`. `checkPickups()` will add time to the timer and re-render the pickups that are left.

#### Level system

Every level in the game is stored in a unique file located in the `lib/maps` folder.

Example map file:
```javascript
const map = {
  cols: 16,
  rows: 10,
  title: "Bad Times",
  time: 5,
  tiles: [
    [1.0,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.3,2.0]
  ,[0.2,1.2,5.2,-1,6.2,6.2,9.1,-1,-1,-1,-1,-1,6.0,7.3,7.1,0.2]
  ,[0.2,-1,5.2,1.3,3.3,0.4,1.3,2.3,2.0,-1,-1,-1,5.2,-1,5.7,0.2]
  ,[3.1,2.0,5.2,-1,6.2,7.3,6.2,-1,1.1,2.3,2.3,2.3,2.3,2.3,2.3,4.1]
  ,[3.1,3.2,2.3,2.3,3.3,-1,0.1,-1,-1,-1,5.2,-1,-1,-1,-1,0.2]
  ,[0.2,-1,-1,-1,-1,-1,0.2,7.0,-1,-1,5.2,-1,-1,-1,-1,0.2]
  ,[0.2,6.3,1.0,2.3,2.3,2.3,3.2,2.3,2.3,2.3,2.3,2.3,3.3,-1,-1,0.2]
  ,[0.2,-1,0.3,-1,5.2,-1,5.2,-1,5.2,-1,5.2,-1,-1,-1,-1,0.2]
  ,[0.2,-1,-1,-1,0.1,-1,0.1,-1,0.1,-1,0.1,-1,-1,-1,-1,0.2]
  ,[1.1,2.3,2.3,2.3,3.2,2.3,3.2,2.3,3.2,2.3,3.2,2.3,2.3,2.3,2.3,2.1]
  ],
  collision: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ,[1,1,0,0,0,0,2,0,0,5,0,0,0,0,0,1]
    ,[1,0,0,1,9,4,9,1,1,0,0,0,0,0,3,1]
    ,[1,1,0,0,0,0,0,5,1,1,1,1,1,1,1,1]
    ,[1,1,1,1,9,0,9,0,0,0,0,0,0,0,0,1]
    ,[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1]
    ,[1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1]
    ,[1,0,1,0,5,0,0,0,5,0,0,0,0,0,0,1]
    ,[1,0,0,0,1,2,1,0,1,2,1,0,0,0,0,1]
    ,[1,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
};

module.exports = map;
```
External map files allow for easy creation of as many levels as the game designer wants. The file includes a tilemap for the rendering engine, a collision map for the physics engine, a title, a starting time, and the dimension of the map in tiles. The rending engine uses the `x.y` coordinates in the `tiles` array to selects a part of `yarooafinal.png` to create the EaselJS bitmap image for a specific tile. An online tile mapping tool was used to assist in designing the levels.

The collision map uses the following key:
- [] 1 for solid
- [] 0 for empty
- [] 4 for fuel leak spawner
- [] 5 for debris spawner
- [] 2 for air pickups
- [] 9 is a special tile. In order to keep the screen from being flooded with pink
fuel squares, the 9 tile removes any pink fuel piece it comes into contact with from
the stage. This prevents the game from slowing down and breaking while maintaining
the appearance of flowing liquid.

The default tile size for the game is 32x32px with a map size of 16/10 but the game can be scaled to any tile or map size.

### Future Features

- High scores calculated by shortest time to complete game
- More levels
- Music and sound effects
