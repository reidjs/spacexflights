//Honestly all of this should probably be in a doc ready function
//https://stackoverflow.com/questions/857075/jquery-ui-slider-fixed-values
// const Controller = require('./controller');
$.ajax({
  method: 'GET',
  url: 'https://api.spacexdata.com/v2/launches'
}).then(res => {
  let result = []
  res.forEach(launch => {
    result.push(convertUnixTimeToDateTime(launch.launch_date_unix))
    if (result.length === res.length)
      setSlider(result)
  }) 
})

const setSlider = (arr) => {
  $(function() {
    // var valMap = [0, 40, 50, 63, 90, 110, 125, 140, 160, 225, 250];
    var valMap = arr;
    $("#slider-range").slider({
        min: 0,
        max: valMap.length - 1,
        value: 0,
        slide: function(event, ui) {                        
            $("#amount").val(valMap[ui.value]);                
        }       
    });
    //$("#amount").val(valMap[ui.value]);
  })
}
$(document).ready(function() {
  // const myController = new Controller();
  // myController.startFlight();
  $( "p" ).on("click", function() {
    console.log('clicky');
  });
})
// $("input").on("click", (e) => {
//   let value = e.target.value
//   console.log(convertUnixTimeToDateTime(value))
// });

const convertUnixTimeToDateTime = (seconds) => {
  let dateTime = new Date(parseInt(seconds)*1000)
  return dateTime;
  // console.log(seconds)
  // return dateTime.setUTCSeconds(seconds)
  // return dateTime.toISOString(); // Returns "2013-05-31T11:54:44.000Z"
}

