const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.flight = options.flight;
    this.image = options.image;
    // this.isWrappable = true;
    this.isBackground = options.isBackground;
    // debugger
    this.centered = options.centered;
    this.scrollVal = this.flight.scrollVal; 
  }

  collideWith(otherObject) {
    // default do nothing
  }

  //subtract the scrollval 
  center() {
    // debugger
    // this.pos = [this.pos[0], this.pos[1]-this.scrollVal];
    // console.log(this.pos)
  }

  draw(ctx) {
    // console.log(this.pos)
    if (this.image) {

      // if (this.centered) this.scrollVal = [0, 0]; //ignore scroll
        // console.log('centered')
        // this.pos[1] = this.scrollVal;
      // ctx.drawImage(
      //   this.image, 
      //   this.pos[0] + this.scrollVal[0], 
      //   this.pos[1] + this.scrollVal[1], 
      //   this.image.width,
      //   this.image.height);
      ctx.drawImage(
        this.image, 
        this.pos[0], 
        this.pos[1], 
        this.image.width,
        this.image.height);
      
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      );
      ctx.fill();
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    // debugger
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    
    if (this.flight.isPastBottomOfScreen(this.pos)) {
      this.remove();
    }
    // if (this.flight.isOutOfBounds(this.pos)) {
      // if (this.isWrappable) {
      //   this.pos = this.flight.wrap(this.pos);
      // } else {
      //   this.remove();
      // }
    //   this.remove();
    // }
  }

  remove() {
    this.flight.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;