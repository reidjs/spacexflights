/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Flight = __webpack_require__(1);
const ViewFlight = __webpack_require__(2);


// const sprite = (options) => {
//   let spr = {};
//   spr.context = options.context;
//   spr.width = options.width;
//   spr.height = options.height;
//   spr.image = options.image;

//   return spr;
// }






document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = Flight.DIM_X;
  canvasEl.height= Flight.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0,0,500,500);

  const flight = new Flight();
  new ViewFlight(flight, ctx).start();
  // function loadImage(e) {
  //   animate();
  // }
  // var myImage = new Image();
  // myImage.src = "./spritesheets/explosions/explosion-1.png";
  // myImage.addEventListener("load", loadImage, false);
  
  // function animate() {
    // ctx.clearRect(120, 25, 32, 32);
   
    //draw each frame + place them in the middle
    // ctx.drawImage(myImage, shift, 0, frameWidth, frameHeight,
    //                   120, 25, frameWidth, frameHeight);
   
    // shift += frameWidth + 1;
   
    /*
      Start at the beginning once you've reached the
      end of your sprite!
    */
    // if (currentFrame == totalFrames) {
    //   shift = 0;
    //   currentFrame = 0;
    // }
   
    // currentFrame++;
   
    // requestAnimationFrame(animate);
  // }

  // ctx.drawImage(myImage, shift, 0, frameWidth, frameHeight,
  //   120, 25, frameWidth, frameHeight);

})



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// var shift = 0;
// var frameWidth = 32;
// var frameHeight = 32;
// var totalFrames = 24;
// var currentFrame = 0;

const Ship = __webpack_require__(4);
const Explosion = __webpack_require__(6);
const Background = __webpack_require__(7);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {



class ViewFlight {
  constructor(flight, ctx) {
    this.ctx = ctx;
    this.flight = flight;
    this.ship = this.flight.addShip();
    this.background = this.flight.addBackground();
  }

  start() {
    this.lastTime = 0;
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(5);
const Util = __webpack_require__(3);

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
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    options.image = new Image();
    options.image.width = 20;
    options.image.height = 200;
    
    options.image.src = "./spritesheets/falcon9whole.png"
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

Ship.RADIUS = 15;
module.exports = Ship;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(3);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.flight = options.flight;
    this.image = options.image;
    this.isWrappable = true;
    // debugger
  }

  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    // console.log(this.pos)
    if (this.image) {
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

    if (this.flight.isOutOfBounds(this.pos)) {
      // if (this.isWrappable) {
      //   this.pos = this.flight.wrap(this.pos);
      // } else {
      //   this.remove();
      // }
      this.remove();
    }
  }

  remove() {
    this.flight.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

/***/ }),
/* 6 */
/***/ (function(module, exports) {


class Explosion {

}

module.exports = Explosion

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(5);
const Util = __webpack_require__(3);
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map