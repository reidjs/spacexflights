const Flight = require('./flight');
const ViewFlight = require('./viewflight');


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
  const ctx2 = canvasEl.getContext("2d");
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0,0,500,500);

  const flight = new Flight();
  new ViewFlight(flight, ctx).start();
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

})

