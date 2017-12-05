//Honestly all of this should probably be in a doc ready function
//https://stackoverflow.com/questions/857075/jquery-ui-slider-fixed-values
// const Controller = require('./controller');
let launchDetails = [];
let launchDates = [];
let launchLocations = [];
let launchLocationDetails = {};
$.ajax({
  method: 'GET',
  url: 'https://api.spacexdata.com/v2/launchpads'
}).then(res => {
  res.forEach(location => {
    launchLocationDetails[location.id] = location
    if (Object.keys(launchLocationDetails).length === res.length) {
      // console.log(launchLocationDetails);
    }
  })
})

$.ajax({
  method: 'GET',
  url: 'https://api.spacexdata.com/v2/launches'
}).then(res => {
  // let launchDates = [];
  // let launchDetails = [];
  res.forEach(launch => {
    launchDates.push(convertUnixTimeToDateTime(launch.launch_date_unix));
    const youtubeURL = launch.links.video_link.split('=')[1] //embed link
    const entire_payload = launch.rocket.second_stage.payloads
    const locationId = launch.launch_site.site_id;
    // console.log(entire_payloads)
    //doesn't work b/c async
    // let payloads = [];
    // for(let i = 0; i < entire_payloads; i++) {
    //   console.log(entire_payloads[i].payload_type)
    //   payloads.push(entire_payloads[i].payload_type);
    // }
    // console.log(payloads)
    let detail = {
      flight_number: launch.flight_number,
      launch_success: launch.launch_success,
      payload: entire_payload[0].payload_type,
      locationId: locationId,
      location: launch.launch_site.site_name_long,
      //warning: possible race condition
      location_details: launchLocationDetails[locationId],
      rocket_name: launch.rocket.rocket_name,
      details: launch.details,
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
    $("span.payload").text(thisLaunch.payload);
    $("span.location").text(thisLaunch.location);
    $("p.information").text(thisLaunch.details);
    $("img#patch").attr("src", thisLaunch.patch_url);
    $("iframe#youtube").attr("src", thisLaunch.youtube_url);
    // console.log(thisLaunch.location_details);
    
    if (thisLaunch.launch_success) {
      $("div.center h2").addClass("success");
      $("div.center h2 span.fail").addClass("hide");
    } else {
      $("div.center h2").removeClass("success");
      $("div.center h2 span.fail").removeClass("hide");
    }
    
    const lat = thisLaunch.location_details.location.latitude;
    const lng = thisLaunch.location_details.location.longitude;
    let mapLocation = {lat: lat, lng: lng}
    // console.log(mapLocation)
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: mapLocation
    });
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: mapLocation,
        pov: {
          heading: 34,
          pitch: 10
        }
    });
    map.setStreetView(panorama);
    // let marker = new google.maps.Marker({
    //   position: mapLocation,
    //   map: map
    // });
    
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

