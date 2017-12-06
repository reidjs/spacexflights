//1. fetch data
//2. create chart and slider
//3. wait for user selection of mission number
//4. create and show globe 
//5. show maps, youtube, mission patch, description.
const Controls = require('./controls');
const PayloadChart = require('./payload_chart');
const Store = require('./store');
// const Slider = require('./slider');
const App = require('./app');
document.addEventListener("DOMContentLoaded", () => {
  let store = new Store();
  let chartCanvas = document.getElementById('myChart')
  let myChart;
  let chartContext = chartCanvas.getContext('2d'); //chart
  let selectedMission = null
  // let mySlider = null;
  let myApp = null;
  //res looks like {launches: [50], dates: [50]}
  store.setLaunches().then(launchData => {
    myChart = new PayloadChart(chartContext, launchData);
    // mySlider = new Slider("#slider-range", launchData.dates);
    store.setLaunchPads().then(launchPadData => {
      myApp = new App(launchData, launchPadData);
      myApp.update(0)
    })
  })
  chartCanvas.onclick = (e) => {
    let point = myChart.getPoint(e)
    if (point.length > 0) {
      selectedMission = point[0]._index
      myApp.update(selectedMission)
    }
  }
  $("#slider-range").on("slidestop", (event, ui) => {
    selectedMission = ui.value;
    myApp.update(selectedMission)
  })
});