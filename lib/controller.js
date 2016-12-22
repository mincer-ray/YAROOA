class Controller {
  constructor () {
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    this.lastKey = "";
  }

  handleKeyEvent(event) {
    if (Controller.KEYS[event.keyCode]) {
      this.lastKey = Controller.KEYS[event.keyCode];
    }
  }

  getLastKey () {
    return this.lastKey;
  }
}

Controller.KEYS = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

module.exports = Controller;
