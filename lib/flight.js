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
  }
  randomPosition() {
    console.log(Flight.DIM_X)
    return [
      Flight.DIM_X * Math.random(),
      Flight.DIM_Y * Math.random()
    ];
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
    const ship = new Ship({
      pos: this.randomPosition(),
      flight: this
    });
    // console.log(ship.pos)
    // ship.vel = [1, 1];
    this.add(ship);
    return ship;
  }

  addBackground() {
    const background = new Background({
      pos: [0, Flight.DIM_Y],
      vel: [0, -1],
      dims: [Flight.DIM_X, Flight.DIM_Y],
      flight: this
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

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    })
  }

  step(delta) {
    // debugger
    this.moveObjects(delta);
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
}

Flight.DIM_X = 500;
Flight.DIM_Y = 500;
Flight.FPS = 32;

module.exports = Flight;
