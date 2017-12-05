const Chart = require('chart.js/dist/Chart')

class PayloadChart {
  constructor(context, payloadData, options) {
    this.context = context;
    // this.data = payloadData;
    this.options = options;
    this.plot(payloadData);
  }
  sayHello() {
      console.log('hello')
  }
  sayThing() {
      console.log('thing')
  }
  //pass data like this 
  //data = {
  //    labels: [],
  //    values: []
  //}
  plot(data) {
    console.log(data)
    let results = [] 
    for (let i = 0; i < data.details.length; i++) {
        results.push(data.details[i].flight_number)
    }
    new Chart(this.context, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
            label: 'Payload',
            data: results,
            backgroundColor: [
                'rgba(21, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    })
  }

}

module.exports = PayloadChart;