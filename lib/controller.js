class Controller {
  constructor (collider, timer, reset) {
    this.reset = reset;
    this.collider = collider;
    this.timer = timer;
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (Controller.KEYS[event.keyCode]) {
      event.preventDefault();
      this.collider.movePlayer(Controller.KEYS[event.keyCode]);
    } else if (event.keyCode === 32) {
      event.preventDefault();
      this.reset();
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
