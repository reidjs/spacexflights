const MovingObject = require("./moving_object");
const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Ship extends MovingObject {
  constructor(options) {
    // options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    // options.color = options.color || randomColor();
    options.image = new Image();
    options.image.width = options.ship_dims[0];
    options.image.height = options.ship_dims[1];
    options.image.src = "./spritesheets/falcon9whole.png"
    options.centered = true;
    // console.log(options);
    // debugger

    super(options);
  }

  

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.flight.randomPosition();
    this.vel = [0, 0];
  }
}

// Ship.RADIUS = 15;
module.exports = Ship;