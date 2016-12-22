class Timer {
  constructor () {
    this.seconds = 0;
  }

  time () {
    let minutes = Math.floor(this.seconds / 100);
    let seconds = this.seconds % 100;
    return(`${this.pad(minutes)}:${this.pad(seconds)}`);
  }

  pad (num) {
    if (num >= 10) {
      return `${num}`;
    } else {
      return `0${num}`;
    }
  }

  tick () {
    this.seconds += 1;
  }

  reset () {
    this.seconds = 0;
  }
}

module.exports = Timer;
