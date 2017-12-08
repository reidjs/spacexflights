const Globe = require('./globe');
const Slider = require('./slider');
class App {
  constructor(launchData, launchPadData) {
    this.launchData = launchData;
    this.launchPadData = launchPadData;
    this.globe = new Globe();
    this.slider = new Slider("#slider-range", this.launchData.dates);
  }
  update(missionNumber) {
    let thisLaunch = this.launchData.launches[missionNumber];
    // console.log(thisLaunch)
    const uri = thisLaunch.links.video_link.split('=')[1] //embed link
    const youtubeURL = `https://www.youtube.com/embed/${uri}`
    $("span.flight_number").text(thisLaunch.flight_number);
    $("span.rocket_name").text(thisLaunch.rocket.rocket_name);
    $("span.payload").text(thisLaunch.rocket.second_stage.payloads[0].payload_type);
    $("span.location").text(thisLaunch.launch_site.site_name_long);
    $("p.information").text(thisLaunch.details);
    $("img#patch").attr("src", thisLaunch.links.mission_patch);
    $("iframe#youtube").attr("src", youtubeURL);
    console.log(thisLaunch.launch_success)
    // #sidebar > h2 > span.fail
    $("span.orbit").text(thisLaunch.rocket.second_stage.payloads[0].orbit);
    if (thisLaunch.launch_success) {
      console.log('here')
      // $("div#sidebar h2").addClass("success");
      $("div#sidebar > h2 > span.fail").addClass("hide");
    } else {
      // $("div#sidebar h2").removeClass("success");
      $("div#sidebar > h2 > span.fail").removeClass("hide");
    }
    let locationDetails = this.launchPadData[thisLaunch.launch_site.site_id]
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
    // console.log(lat, lng)
    let orbitType = thisLaunch.rocket.second_stage.payloads[0].orbit
    map.setStreetView(panorama);
    this.globe.render(orbitType, [lat, lng]);
    this.slider.setValue(missionNumber)
    $("input#date").val(this.launchData.dates[missionNumber])
  }
}

module.exports = App;