// var shift = 0;
// var frameWidth = 32;
// var frameHeight = 32;
// var totalFrames = 24;
// var currentFrame = 0;

const Ship = require('./ship');
const Explosion = require('./explosion');

class Flight {
  constructor() {
    this.explosions = [];
    this.ships = [];
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
    } else {
      throw new Error("Unknown object type")
    }
  }

  addShip() {
    const ship = new Ship({
      pos: this.randomPosition(),
      flight: this
    });
    console.log(ship.pos)
    this.add(ship);
    return ship;

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
    // this.moveObjects(delta);
    // console.log(delta)
  }

  allObjects() {
    return [].concat(this.ships); //add more 
  }

  remove(object) {
    if (object instanceof Explosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  moveObjects(delta) {
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
