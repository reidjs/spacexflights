

class ViewFlight {
  constructor(flight, ctx) {
    this.ctx = ctx;
    this.flight = flight;
    this.ship = this.flight.addShip();
    this.background = this.flight.addBackgrounds();
  }

  bindKeyHandlers() {
    const flight = this.flight;

    // Object.keys(GameView.MOVES).forEach((k) => {
    //   const move = GameView.MOVES[k];
    //   key(k, () => { ship.power(move); });
    // });
    key("space", () => { 
      flight.nextAction(); });
  }


  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    // this.ship.center(); //center rocket on screen
    this.flight.step(timeDelta);
    this.flight.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = ViewFlight;