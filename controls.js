$(document).ready(() => {
  //pull out the UNIX timestamps from the api call and put into array
  //set min and max of range slider to those values
  var sliderAmountMap = [10000, 20000,30000, 40000, 45000,50000,65000];
  
  $(function() {
    $( "#slider" ).slider({
        value: 4, //array index of onload selected default value on slider, for example, 45000 in same array will be selected as default on load
        min: 0, //the values will be from 0 to array length-1
        max: sliderAmountMap.length-1, //the max length, slider will snap until this point in equal width increments
        slide: function( event, ui ) {
        $( "#amount" ).val( "$" + sliderAmountMap[ui.value] ); //map selected "value" with lookup array
        }
    });
    $( "#amount" ).val( "$" + sliderAmountMap[$( "#slider" ).slider( "value")] );//map selected "value" with lookup array
  });
})

$("input").on("click", (e) => {
  let value = e.target.value
  console.log(convertUnixTimeToDateTime(value))
});

const convertUnixTimeToDateTime = (seconds) => {
  let dateTime = new Date(parseInt(seconds)*1000)
  return dateTime;
  // console.log(seconds)
  // return dateTime.setUTCSeconds(seconds)
  // return dateTime.toISOString(); // Returns "2013-05-31T11:54:44.000Z"
}

