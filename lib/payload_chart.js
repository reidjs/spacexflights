const Chart = require('chart.js/dist/Chart')

class PayloadChart {
  constructor(context, payloadData, options) {
    this.context = context;
    // this.data = payloadData;
    this.options = options;
    this.plot(payloadData);
  }
  //pass data like this 
  //data = {
  //    labels: [],
  //    values: []
  //}
  plot(data) {
    new Chart(this.context, {
      type: 'line',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Payload',
            data: [1, 5, 3, 5, 2, 3],
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