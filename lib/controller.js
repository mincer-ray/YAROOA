class Controller {
  constructor (collider) {
    this.collider = collider;
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    if (Controller.KEYS[event.keyCode]) {
      this.collider.movePlayer(Controller.KEYS[event.keyCode]);
    }
  }
}

Controller.KEYS = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

module.exports = Controller;
