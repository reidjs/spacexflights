const Globe = require('./globe');
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
      // console.log(chartSelectedMission)
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
  })
});