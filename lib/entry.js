const Controller = require('./controller');
// const MatterTest = require('./matter_test');
const Globe = require('./globe');
const Chart = require('chart.js/dist/Chart')
var Matter = require('matter-js/build/matter.js');
// const Controls = require('./controls');
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
  var myChart = new Chart(ctx2, {
      type: 'line',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: 'Payload',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });

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