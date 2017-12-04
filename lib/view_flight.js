
//callback for when simulation has stopped
class ViewFlight {
  constructor(flight, ctx, stopCallBack) {
    this.ctx = ctx;
    this.flight = flight;
    this.stopCallBack = stopCallBack;
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
      this.flight.running = true;
      requestAnimationFrame(this.animate.bind(this))
      // return this;
    // }
  }

  
  animate(time) {
    // this.requestId = undefined;
    if (this.flight.restart) {
      this.lastTime = time 
      this.flight.restart = false;
    }
    // every call to animate requests causes another call to animate
    const timeDelta = time - this.lastTime;
    this.flight.draw(this.ctx);
    this.flight.step(timeDelta);
    this.lastTime = time;
    if (this.flight.running) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.stopCallBack(); 
    }
  }
  
}

module.exports = ViewFlight;
  // stop() {
  
    // https://stackoverflow.com/questions/10735922/how-to-stop-a-requestanimationframe-recursion-loop
    // if (requestId) {
    //   cancelAnimationFrame(requestId);
    //   requestId = undefined;
    // }
  // }