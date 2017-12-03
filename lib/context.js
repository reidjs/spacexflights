const Flight = require('./flight');
const ViewFlight = require('./view_flight');

const Timeline = require('./timeline');
const ViewTimeline = require('./view_timeline');


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = Flight.DIM_X;
  canvasEl.height= Flight.DIM_Y;
  
  const ctx = canvasEl.getContext("2d"); //flight sim
  const ctx2 = canvasEl.getContext("2d"); //time line
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0,0,500,500);
  const timeline = new Timeline();
  
  const stopCallBack = () => {
    console.log('Sim stopped');
    // showTimeline
    // ctx2.fillStyle = "purple";
    // ctx2.fillRect(0, 0, 500, 500);
    showTimeline();
  }
  const showTimeline = () => {
    new ViewTimeline(timeline, ctx2).start();
  }
  const startFlight = () => {
    const flight = new Flight();
    new ViewFlight(flight, ctx, stopCallBack).start();
  }
  startFlight();
  
  
  
})

// const sprite = (options) => {
//   let spr = {};
//   spr.context = options.context;
//   spr.width = options.width;
//   spr.height = options.height;
//   spr.image = options.image;

//   return spr;
// }

// if (!flight.isRunning()) {
  // console.log('Simulation stopped');
// }
// mission.stop();
// ctx2.fillStyle = "purple";
// ctx2.fillRect(0,0,500,500);
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