class Timeline {
 constructor() {
   console.log('make timeline')
 }

 draw(ctx) {
  //  console.log('here')
   ctx.clearRect(0, 0, Timeline.DIM_X, Timeline.DIM_Y);
   ctx.fillStyle = "blue";
   ctx.fillRect(0, 0, 200, 200);
 }
}

Timeline.DIM_X = 800;
Timeline.DIM_Y = 300;
module.exports = Timeline;