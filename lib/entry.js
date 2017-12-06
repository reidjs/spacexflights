//1. fetch data
//2. create chart and slider
//3. wait for user selection of mission number
//4. create and show globe 
//5. show maps, youtube, mission patch, description.
const Globe = require('./globe');
const Controls = require('./controls');
const PayloadChart = require('./payload_chart');
const Store = require('./store');

document.addEventListener("DOMContentLoaded", () => {
  let store = new Store();
  let chartCanvas = document.getElementById('myChart')
  let chart2;
  let chartContext = chartCanvas.getContext('2d'); //chart
  store.setLaunchPads().then(res => console.log(res))
  //res looks like {launches: [50], dates: [50]}
  store.setLaunches().then(res => {
    console.log(res)
    // new PayloadChart(res)
    chart2 = new PayloadChart(chartContext, res)
  })
  let selectedMission = null
  // const setupChart = (dates, details) => {
  //   let chartData = {
  //     dates: dates,
  //     details: details
  //   }
  //   let myChart = new PayloadChart().plot(chartContext, chartData);
  // }
  chartCanvas.onclick = (e) => {
    let point = chart2.getPoint(e)
    // let point = chart2.getElementsAtEvent(e)
    if (point.length > 0) {
      selectedMission = point[0]._index
      update(selectedMission)
    }

  }
  const setupChart = () => {}
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
    selectedMission = ui.value;
    update(selectedMission)
  })
});