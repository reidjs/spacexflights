const Launch = require('./launch');

//https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }

class Timeline {
 constructor() {
   console.log('make timeline');
   this.fetchData();
   this.launches = [];
 }

 remove(object) {
   if (object instanceof Launch) {
     this.launches.splice(this.launches.indexOf(object), 1);
   } else {
     throw new Error("Unknown object to remove");
   }
 }

 add(object) {
   if (object instanceof Launch) {
     this.launches.push(object)
   } else {
     throw new Error("Unknown object type (timeline file)");
   }
 }

 addLaunch() {
   const launch = new Launch({
     pos: [50, 50],
     color: "green",
     radius: 15,
     timeline: this
   });
   this.add(launch);
   return launch;
 }

 allObjects() {
   return [].concat(this.launches) //add more?
 }

 draw(ctx) {
  //  console.lo  g('here')
   ctx.clearRect(0, 0, Timeline.DIM_X, Timeline.DIM_Y);
   ctx.fillStyle = "blue";
   ctx.fillRect(0, 0, 800, 200);
   this.allObjects().forEach((object) => {
     object.draw(ctx);
   })
 }


 fetchData() {
  $.ajax({
    method: 'GET',
    url: 'https://api.spacexdata.com/v2/launches'
  })
  .then(res => {
    console.log('received data')
  })
  .fail(res => console.log('Data not received'))
 }
}

Timeline.DIM_X = 800;
Timeline.DIM_Y = 300;
module.exports = Timeline;