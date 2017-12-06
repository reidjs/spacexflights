//https://stackoverflow.com/questions/857075/jquery-ui-slider-fixed-values
const convertUnixTimeToDateTime = (seconds) => {
  let dateTime = new Date(parseInt(seconds)*1000)
  return dateTime;
}
let launchDetails = [];
let launchLocationDetails = {};


class Controls {
  constructor() {
    this.payloadLabels = [];
    this.payloadData = [];
  }

  setSlider(dates, details) {
    $("#slider-range").slider({
        min: 0,
        max: dates.length - 1,
        value: 0,
        slide: function(event, ui) {                        
            $("#date").val(dates[ui.value]);                
        }       
    });
    //$("#amount").val(valMap[ui.value]);
  }

  setLaunchPads(launchpads) {
  }

  update(missionNumber) {
    let thisLaunch = launchDetails[missionNumber];
    $("span.flight_number").text(thisLaunch.flight_number);
    $("span.rocket_name").text(thisLaunch.rocket_name);
    $("span.payload").text(thisLaunch.payload);
    $("span.location").text(thisLaunch.location);
    $("p.information").text(thisLaunch.details);
    $("img#patch").attr("src", thisLaunch.patch_url);
    $("iframe#youtube").attr("src", thisLaunch.youtube_url);

    if (thisLaunch.launch_success) {
      $("div.center h2").addClass("success");
      $("div.center h2 span.fail").addClass("hide");
    } else {
      $("div.center h2").removeClass("success");
      $("div.center h2 span.fail").removeClass("hide");
    }
    let locationDetails = launchLocationDetails[thisLaunch.locationId]
    const lat = locationDetails.location.latitude;
    const lng = locationDetails.location.longitude;
    let mapLocation = {lat: lat, lng: lng}
    let map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'satellite',
      zoom: 14,
      center: mapLocation,
    });
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: mapLocation,
        pov: {
          heading: 315,
          pitch: 10
        }
    });
    map.setStreetView(panorama);
}

  fetchLaunchPads(callback) {
    $.ajax({
      method: 'GET',
      url: 'https://api.spacexdata.com/v2/launchpads'
    }).then(res => {
      res.forEach(location => {
        launchLocationDetails[location.id] = location
        if (Object.keys(launchLocationDetails).length === res.length) {
          callback(launchLocationDetails)
        }
      })
    })
  }

  fetchLaunches(callback, callback2, callback3) {
    let launchDates = [];
    let launchLocationDetails = {};
    $.ajax({
      method: 'GET',
      url: 'https://api.spacexdata.com/v2/launches'
    }).then(res => {
      res.forEach(launch => {
        launchDates.push(convertUnixTimeToDateTime(launch.launch_date_unix));
        const youtubeURL = launch.links.video_link.split('=')[1] //embed link
        const entire_payload = launch.rocket.second_stage.payloads
        const locationId = launch.launch_site.site_id;
        let detail = {
          flight_number: launch.flight_number,
          launch_success: launch.launch_success,
          payload: entire_payload[0].payload_type,
          payload_details: entire_payload,
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
        if (launchDates.length === res.length) {
          callback(launchDates, launchDetails);
          callback2(launchDates, launchDetails);
          callback3(launchDates, launchDetails);
        }
          // setSlider(this.launchDates, this.launchDetails);
      }) 
    })
  }

  setData(launchDates, launchDetails) {
    // $("#slider-range").slider({
    //   min: 0,
    //   max: launchDates.length - 1,
    //   value: 0,
    //   slide: function(event, ui) {                        
    //     $("#date").val(launchDates[ui.value]);                
    //   }       
    // });
  }
  setData() {

  }
}

module.exports = Controls;
