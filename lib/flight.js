// var shift = 0;
// var frameWidth = 32;
// var frameHeight = 32;
// var totalFrames = 24;
// var currentFrame = 0;

const Ship = require('./ship');
const Explosion = require('./explosion');
const Background = require('./background');

class Flight {
  constructor() {
    this.explosions = [];
    this.ships = [];
    this.backgrounds = [];
    this.scrollVal = [0, 0];
    this.pause = false;
    this.running = false;
    this.restart = true;
    this.phases = ["Launch", "MECO", "Burn", "Restart"]
  }
  randomPosition() {
    // console.log(Flight.DIM_X)
    return [
      Flight.DIM_X * Math.random(),
      Flight.DIM_Y * Math.random()
    ];
  }

  message(msg) {
    console.log(msg)
  }

  add(object) {
    if (object instanceof Explosion) {
      this.explosions.push(object)
    } else if (object instanceof Ship) {
      this.ships.push(object)
      // console.log('here')
    } else if (object instanceof Background) {
      this.backgrounds.push(object);
    } else {
      throw new Error("Unknown object type")
    }
  }

  addShip() {
    let ship_width = 20;
    let ship_height = 200;
    const ship = new Ship({
      ship_dims: [ship_width, ship_height],
      pos: [Flight.DIM_X/2, Flight.DIM_Y-ship_height],
      flight: this
    });
    // console.log(ship.pos)
    // ship.vel = [1, 1];
    this.add(ship);
    return ship;
  }

  nextPhase() { 
    this.togglePause();
    // console.log('here')
  }

  togglePause() {
    console.log("Paused: ", this.pause)
    if (this.pause)
      this.pause = false;
    else 
      this.pause = true;
  }

  requestEndFlight() {
    console.log('Flight will end')
    // this.endFlight();
    if (this.isRunning())
      this.running = false;
  }

  isRunning() {
    return this.running;
  }

  // endFlight() {
    
  // }

  addBackgrounds() {
    this.addBackground("Ground", [0, -Flight.DIM_Y])
    this.addBackground(null, [0, -Flight.DIM_Y*2])

  }

  addBackground(id, pos) {
    let imageSRC;
    switch(id) {
      case "Ground":
        imageSRC = "./spritesheets/sky/day0.png";
        break;
      default: 
        imageSRC = "./spritesheets/sky/twi4.png"
        break;
    }
    const background = new Background({
      pos,
      vel: [0, 3],
      dims: [Flight.DIM_X, Flight.DIM_Y],
      flight: this,
      imageSRC
    });
    this.add(background);
    return background;
  }

  draw(ctx) {
    // ctx.clearRect(120, 25, 32, 32)
    // ctx.beginPath();
    // let colors =["red", "blue", "green"]
    // ctx.strokeStyle = colors[Math.floor(Math.random()*3)]
    // ctx.rect(120, 25, 32, 32)
    // ctx.stroke();
    ctx.clearRect(0, 0, Flight.DIM_X, Flight.DIM_Y);
    if (this.running) {
      this.allObjects().forEach((object) => {
        object.draw(ctx);
      })
    }
  }

  step(delta) {
    // debugger
    if (!this.pause && this.running) {
      this.moveObjects(delta);
      // this.scrollVal[1] -= 3;
    }
    // console.log(delta)
  }

  allObjects() {
    return [].concat(this.backgrounds, this.ships ); //order matters for z-index
  }

  remove(object) {
    if (object instanceof Explosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof Background) {
      console.log('remove bg')
      this.backgrounds.splice(this.backgrounds.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  moveObjects(delta) {
    // console.log(delta);
    // debugger
    this.allObjects().forEach((object) => {
      object.move(delta);
    })
  }
  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Flight.DIM_X) || (pos[1] > Flight.DIM_Y);
  }
  isPastBottomOfScreen(pos) {
    return pos[1] > Flight.DIM_Y
  }
}

Flight.DIM_X = 500;
Flight.DIM_Y = 500;
Flight.FPS = 32;

module.exports = Flight;
