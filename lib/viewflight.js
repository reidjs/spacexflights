

class ViewFlight {
  constructor(flight, ctx) {
    this.ctx = ctx;
    this.flight = flight;
    this.ship = this.flight.addShip();
  }

  start() {
    requestAnimationFrame(this.animate.bind(this))
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.flight.step(timeDelta);
    this.flight.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = ViewFlight;