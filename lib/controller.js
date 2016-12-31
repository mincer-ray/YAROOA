class Controller {
  constructor (collider, timer, render, reset) {
    this.reset = reset;
    this.collider = collider;
    this.timer = timer;
    this.render = render;
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    $(window).on("keyup", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (event.type === "keyup") {
      this.render.animatePlayer("idle");
    } else {
      this.render.animatePlayer(Controller.KEYS[event.keyCode]);

      if (Controller.KEYS[event.keyCode]) {
        event.preventDefault();
        this.collider.movePlayer(Controller.KEYS[event.keyCode]);
      } else if (event.keyCode === 32) {
        event.preventDefault();
        this.reset();
      }
    }
  }
}

Controller.KEYS = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

module.exports = Controller;
