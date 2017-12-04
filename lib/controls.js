//Honestly all of this should probably be in a doc ready function
//https://stackoverflow.com/questions/857075/jquery-ui-slider-fixed-values
// const Controller = require('./controller');
let launchDetails = [];
let launchDates = [];
$.ajax({
  method: 'GET',
  url: 'https://api.spacexdata.com/v2/launches'
}).then(res => {
  // let launchDates = [];
  // let launchDetails = [];
  res.forEach(launch => {
    launchDates.push(convertUnixTimeToDateTime(launch.launch_date_unix));
    const youtubeURL = launch.links.video_link.split('=')[1] //embed link
    let detail = {
      flight_number: launch.flight_number,
      rocket_name: launch.rocket.rocket_name,
      patch_url: launch.links.mission_patch,
      youtube_url: `https://www.youtube.com/embed/${youtubeURL}`
    }
    launchDetails.push(detail);
    if (launchDates.length === res.length)
      setSlider(launchDates, launchDetails);
    // if (launchDetails.length === res.length)
    //   setDetails(launchDetails);
  }) 
})

// const setDetails = (arr) => {
//   console.log(arr)
//   $()
// }

const setSlider = (dates, details) => {
  $(function() {
    // var valMap = [0, 40, 50, 63, 90, 110, 125, 140, 160, 225, 250];
    // var valMap = dates;
    $("#slider-range").slider({
        min: 0,
        max: dates.length - 1,
        value: 0,
        slide: function(event, ui) {                        
            $("#date").val(dates[ui.value]);                
        }       
    });
    //$("#amount").val(valMap[ui.value]);
  })
}
$(document).ready(function() {
  $("#slider-range").on("slidestop", (event, ui) => {
    let endPos = ui.value;
    let thisLaunch = launchDetails[endPos];
    $("span.flight_number").text(thisLaunch.flight_number);
    $("span.rocket_name").text(thisLaunch.rocket_name);
    $("img#patch").attr("src", thisLaunch.patch_url)
    $("iframe#youtube").attr("src", thisLaunch.youtube_url);
    // console.log('stopped', launchDetails[endPos])
  })
})
// $(document).ready(function() {
//   // const myController = new Controller();
//   // myController.startFlight();
//   $( "p" ).on("click", function() {
//     console.log('clicky');
//   });
// })
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

