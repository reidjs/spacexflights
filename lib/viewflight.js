

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
    key("esc", () => {
      // console.log('esc')
      flight.requestEndFlight();
    })
    key("space", () => { 
      flight.nextPhase(); 
    });
  }


  start() {
    // if (!requestId) {
      this.bindKeyHandlers();
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this))
      // return this;
    // }
  }

  stop() {
    //https://stackoverflow.com/questions/10735922/how-to-stop-a-requestanimationframe-recursion-loop
    // if (requestId) {
    //   cancelAnimationFrame(requestId);
    //   requestId = undefined;
    // }
  }

  animate(time) {
    // this.requestId = undefined;
    const timeDelta = time - this.lastTime;
    // this.ship.center(); //center rocket on screen
    this.flight.step(timeDelta);
    this.flight.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    // if (this.flight.running)
      requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = ViewFlight;