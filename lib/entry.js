const Controller = require('./controller');
// const MatterTest = require('./matter_test');
var Matter = require('matter-js/build/matter.js');

// const p2Test = require('./p2Test');
document.addEventListener("DOMContentLoaded", () => {
  // canvasEl = document.getElementById("myCanvas", width="800px", height="20px");
  canvasEl = document.getElementById("myCanvas");
  ctx = canvasEl.getContext("2d"); //flight sim
  // canvasEl.style.width = "800px";
  // canvasEl.style.height = "20px";
  let options = {
    style: {width: "800px", height: "20px"}
  }
  const controller = new Controller(canvasEl, ctx, options);
  // controller.startFlight();
  // controller.showTimeline();
  $( "#launch" ).on("click", function() {
    controller.startFlight();
  });
  $( "#stop-flight" ).on("click", function() {
    controller.stopFlight();
  });
  $( "#button2" ).on("click", function() {
    controller.messageFlight();
  })

  var canvas = document.getElementById('matterCanvas');
  var width = 800,
  height = 800;

  canvas.width = width;
  canvas.height = height; 

  var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies;
  console.log(World);
// create an engine
// var engine = Engine.create();
  // var engine = Engine.create(canvas, {
  //   options: {
  //     width: 1000,
  //     height: 1000,                 
  //     showAngleIndicator: true,
  //     showVelocity: true,
  //     wireframes: false
  //   }
  // });
  var engine = Engine.create();
  

  var render = Render.create({
    element: document.body,
    engine: engine
  });
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground]);

  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);
  (function render() {
    var context = canvas.getContext("2d");
    var bodies = Composite.allBodies(engine.world);

    window.requestAnimationFrame(render);

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;

        context.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y);
        }

        context.lineTo(vertices[0].x, vertices[0].y);
    }

    context.lineWidth = 1;
    context.strokeStyle = '#999';
    context.stroke();
})();
})