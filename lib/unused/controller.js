const Flight = require('./flight');
const ViewFlight = require('./view_flight');

const Timeline = require('./timeline');
const ViewTimeline = require('./view_timeline');

class Controller {
  constructor(canvasEl, ctx, options) {
    this.canvasEl = canvasEl;
    this.ctx = ctx;
    // this.ctx2 = ctx2;
    this.resetCanvas = () => {
      this.canvasEl.style.width = options.style.width;
      this.canvasEl.style.height = options.style.height;
    }
    this.resetCanvas();
    this.currentFlight = null;
    // this.startFlight();
  }

  messageFlight() {
    if (this.currentFlight) {
      this.currentFlight.message("Hello from the controller")
    }
  }

  stopFlight() {
    if(this.currentFlight) {
      this.currentFlight.requestEndFlight();
      this.resetCanvas();
    }
  }

  startFlight() {
    const stopFlightCallBack = () => {
      // showTimeline();
      console.log('Flight simulation stopped');
    }
    this.canvasEl.style.width = `${Flight.DIM_X}px`;
    this.canvasEl.style.height = `${Flight.DIM_Y}px`;
    this.canvasEl.width = Flight.DIM_X;
    this.canvasEl.height= Flight.DIM_Y;
    const flight = new Flight();
    this.currentFlight = flight;
    new ViewFlight(flight, this.ctx, stopFlightCallBack).start();
  }
  
}

module.exports = Controller;

// showTimeline() {
//   const timelineStopCallBack = () => {
//     console.log('Timeline stopped.')
//   }
//   this.canvasEl.style.width = `${Timeline.DIM_X}px`;
//   this.canvasEl.style.height = `${Timeline.DIM_Y}px`;
//   this.canvasEl.width = Timeline.DIM_X;
//   this.canvasEl.height = Timeline.DIM_Y;
//   const timeline = new Timeline();
//   this.currentTimeline = timeline;
//   new ViewTimeline(timeline, this.ctx, timelineStopCallBack).start();
// }
// const sprite = (options) => {
  //   let spr = {};
  //   spr.context = options.context;
  //   spr.width = options.width;
  //   spr.height = options.height;
  //   spr.image = options.image;
  
  //   return spr;
  // }
  
  // document.addEventListener("DOMContentLoaded", () => {
  //   const canvasEl = document.getElementById("myCanvas");
  //   // canvasEl.addEventListener('click', function() { }, false);
    
  //   const ctx = canvasEl.getContext("2d"); //flight sim
  //   const ctx2 = canvasEl.getContext("2d"); //time line
  //   // ctx.fillStyle = "purple";
  //   // ctx.fillRect(0,0,500,500);
  //   // const timeline = new Timeline();
  //   let currentTimeline = null;
  //   let currentFlight = null;
  //   const stopFlightCallBack = () => {
  //     console.log('Sim stopped');
  //     showTimeline();
  //   }
  //   const timelineStopCallBack = () => {
  //     // startFlight();
  //   }
  
  //   const hideTimeline = () => {
  //     currentTimeline.requestEndTimeline();
  //   }
    
  //   const showTimeline = () => {
  //     canvasEl.style.width = `${Timeline.DIM_X}px`;
  //     canvasEl.style.height = `${Timeline.DIM_Y}px`;
  //     canvasEl.width = Timeline.DIM_X;
  //     canvasEl.height = Timeline.DIM_Y;
  //     const timeline = new Timeline();
  //     currentTimeline = timeline;
  //     new ViewTimeline(timeline, ctx2, timelineStopCallBack).start();
  //   }
  //   const startFlight = () => {
  //     canvasEl.style.width = `${Flight.DIM_X}px`;
  //     canvasEl.style.height = `${Flight.DIM_Y}px`;
  //     canvasEl.width = Flight.DIM_X;
  //     canvasEl.height= Flight.DIM_Y;
  //     const flight = new Flight();
  //     new ViewFlight(flight, ctx, stopFlightCallBack).start();
  //   }
  //   // startFlight();
  //   showTimeline();
  //   // hideTimeline();
    
  // })
  
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