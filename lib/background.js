const MovingObject = require("./moving_object");
const Util = require("./util");
// const Flight = require("./flight") //for the height and width
class Background extends MovingObject {
  constructor(options) {
    options.image = new Image();
    options.image.src = "./spritesheets/sky/day0.png"
    // console.log(options);
    options.image.width = options.dims[0]
    options.image.height = options.dims[1] * 2 //scrolling
    super(options);
  }

  scrollup(impulse) {
    this.vel[1] += impulse[1]
  }
}

module.exports = Background;