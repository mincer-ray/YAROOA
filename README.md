## You Are Running Out Of Air (YAROOA) : A Javascript Platformer

### Basic Premise

You Are Running Out Of Air is a platforming game about a spaceship that has just
been hit by an asteroid! The pilot has to get to the escape pod, but his life
support system is running out of air! Your task is to do the following:

1) Jump from platform to platform
2) Collect all the spare air tanks in the level
3) Make it to the exit before the time runs out


### MVP

The Player runs and jumps through a screen of platforms, collecting (X) objects
and reaching the end marker in (Y) time. The timer will be a restrictive as possible
making the game a test of perfection in execution.

At minimum this game will include:
- [ ] Running and jumping on platforms
- [ ] Objects that the player can Collect
- [ ] 4 to 5 levels that must be completed within a short time limit

Ideally the game will also include:
- [ ] Falling debris to dodge
- [ ] Box2D physics for player and falling debris
- [ ] Custom assets (potentially wait until week off when I have my desktop)

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my

![wireframes](https://raw.githubusercontent.com/mincer-ray/jsgame/master/Screen%20Shot%202016-12-19%20at%2010.41.07%20PM.png)

### Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for structure and game logic,
- `Easel.js` with `HTML5 Canvas` for rendering and graphics,
- `Matter.js` for jumping and debris physics

Major components:

- Tile map to render levels. Will use Javascript and Canvas. Read good Mozilla docs already
- Collision and jumping physics. Will use Matter collision and rigid bodies
- Animation of player. Will use Easel sprite sheet animation if time allows.

### Implementation Timeline

**Day 1**: Setup Node modules. Write entry file. Get tile map working to draw levels:

- `webpack` everything and have a page rendering
- Get tile map functional
- Create basic tile sheet
- Make a decent tile map for first level and to write rest of game with

**Day 2**: Focus on learning `Matter.js` for object physics. Implement moveable object
for player and apply physics to player object. Add a timer:

- Make the platform tile in the map solid
- Give the player controls
- Use `Matter.js` to create interesting gravity
- Add timer to the stage

**Day 3**: Add stationary collectible objects. Add Win condition. Add better assets.
Add more levels. Add falling hazard objects if time allows:

- Make collectible objects
- Make level exit
- Make level exit inactive unless all collectibles are picked up
- Make game lose if timer hits 0
- Add next level if won
- Add levels by creating more tile maps
