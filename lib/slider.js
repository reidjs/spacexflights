class Slider {
  constructor(selector, dates) {
    $(selector).slider({
      min: 0,
      max: dates.length - 1,
      value: 0,
      slide: function(event, ui) {                        
          $("#date").val(dates[ui.value]);                
      }       
    });
  }

}

module.exports = Slider;