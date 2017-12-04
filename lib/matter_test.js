var Matter = require('matter-js/build/matter.js');
document.addEventListener("DOMContentLoaded", () => {
  console.log('here')
  var canvas = document.getElementById('matterCanvas');
  var width = 800,
      height = 800;

  canvas.width = width;
  canvas.height = height; 
  // Matter.js - http://brm.io/matter-js/
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites;
  console.log(World);
  // create an engine
  // var engine = Engine.create();
  var engine = Engine.create(canvas, {
    options: {
      width: 1000,
      height: 1000,                 
      showAngleIndicator: true,
      showVelocity: true,
      wireframes: false
  }
});
  // console.log('here')
  // create a renderer
  var render = Render.create({
    element: canvas,
    engine: engine
  });

  // create two boxes and a ground
  var boxA = Bodies.rectangle(100, 100, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground]);

  debugger
  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);
})

// Matter module aliases
// var Engine = Matter.Engine,
//     World = Matter.World,
//     Body = Matter.Body,
//     Composites = Matter.Composites,
//     MouseConstraint = Matter.MouseConstraint;

// // create a Matter.js engine
// var engine = Engine.create(canvas, {
//     options: {
//       width: 1000,
//       height: 1000,                 
//       showAngleIndicator: true,
//       showVelocity: true,
//       wireframes: false
//   }
// });

// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// // add all of the bodies to the world
// World.add(engine.world, [boxA, boxB, ground]);

// // run the engine
// Engine.run(engine);

// // run the renderer
// Render.run(render);


// class MatterTest {
//   constructor(canvas, ctx) {
    // this.canvas = canvas;
    // this.canvas.width = 800;
    // this.canvas.height = 800;
    // this.ctx = ctx;
    // this.Engine = Matter.Engine;
    // this.Render = Matter.Render;
    // this.World = Matter.World;
    // this.Bodies = Matter.Bodies;
    // this.engine = this.Engine.create();
    // this.render = this.Render.create({
    //   element: this.canvas,
    //   engine: this.engine
    // });
    // var boxA = this.Bodies.rectangle(400, 200, 80, 80);
    // var boxB = this.Bodies.rectangle(450, 50, 80, 80);
    // var ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    // this.World.add(this.engine.world, [boxA, boxB, ground]);
    // this.Engine.run(this.engine);
    // this.Render.run(this.render);
    
  // });
  // }

  // render() {
  //   let bodies = Composite.allBodies(engine.world)
  // }
// }
// var canvas = document.getElementById('matterCanvas'),
// context = canvas.getContext('2d');

// canvas.width = 800;
// canvas.height = 600;

// // document.body.appendChild(canvas);

// (function render() {
// var bodies = Composite.allBodies(engine.world);

// window.requestAnimationFrame(render);

// context.fillStyle = '#fff';
// context.fillRect(0, 0, canvas.width, canvas.height);

// context.beginPath();

// for (var i = 0; i < bodies.length; i += 1) {
//     var vertices = bodies[i].vertices;

//     context.moveTo(vertices[0].x, vertices[0].y);

//     for (var j = 1; j < vertices.length; j += 1) {
//         context.lineTo(vertices[j].x, vertices[j].y);
//     }

//     context.lineTo(vertices[0].x, vertices[0].y);
// }

// context.lineWidth = 1;
// context.strokeStyle = '#999';
// context.stroke();
// })();

// module.exports = MatterTest;
