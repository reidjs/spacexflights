class Slider {
  constructor(selector, dates) {
    this.value = 0;
    this.selector = selector;
    this.dates = dates;
    $(selector).slider({
      min: 0,
      max: dates.length - 1,
      value: this.value,
      slide: function(event, ui) {                        
          $("#date").val(dates[ui.value]);                
      }       
    });
  }
  setValue(value) {
    $(this.selector).slider('value', value)
  }

}

module.exports = Slider;