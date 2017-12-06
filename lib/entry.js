const Controller = require('./controller');
const Globe = require('./globe');
var Matter = require('matter-js/build/matter.js');
const Controls = require('./controls');
const PayloadChart = require('./payload_chart');

document.addEventListener("DOMContentLoaded", () => {
  
  let chartCanvas = document.getElementById('myChart')
  let chartContext = chartCanvas.getContext('2d'); //chart
  let chartSelectedMission = null
  const setupChart = (dates, details) => {
    let chartData = {
      dates: dates,
      details: details
    }
    let myChart = new PayloadChart().plot(chartContext, chartData);
    chartCanvas.onclick = (e) => {
      let point = myChart.getElementsAtEvent(e)
      if (point.length > 0) {
        chartSelectedMission = point[0]._index
        update(chartSelectedMission)
      }
      console.log(chartSelectedMission)
    }
  }
  let myGlobe;
  const setupGlobe = (dates, details) => {
    myGlobe = new Globe(dates, details);
  }
  const setup = new Controls();
  setup.fetchLaunches(setup.setData, setupChart, setupGlobe);
  setup.fetchLaunchPads(setup.setLaunchPads);
  const update = (missionNumber) => {
    setup.update(missionNumber)
    myGlobe.render([0, 0], 0.01, -0.03, 1.2, 1, -140, 0);
  }
  $("#slider-range").on("slidestop", (event, ui) => {
    update(ui.value)
    // setup.update(ui.value);
    // myGlobe.render([0, 0], 0.01, -0.03, 1.2, 1, -140, 0);
  })


  //UNUSED FLIGHT SIM STUFF
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
  // })
  // test.doStuff();
  // console.log(test.launchDetails)
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