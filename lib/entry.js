const Controller = require('./controller');
// const MatterTest = require('./matter_test');
const Globe = require('./globe');
// const Chart = require('chart.js/dist/Chart')
var Matter = require('matter-js/build/matter.js');
const Controls = require('./controls');
const PayloadChart = require('./payload_chart');
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

  var ctx2 = document.getElementById("myChart").getContext('2d');
  const myChart = new PayloadChart(ctx2, null, null)

  const test = new Controls();
  console.log(test.launchDetails)
  var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies;
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

})