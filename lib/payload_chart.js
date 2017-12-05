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
    let flightNumbers = [];
    let payloadMasses = [];
    let hoverData = [];
    for (let i = 0; i < data.details.length; i++) {
        flightNumbers.push(data.details[i].flight_number);
        payloadMasses.push(data.details[i].payload_details[0].payload_mass_lbs);
        // console.log(data.details[i].details.length)
    }
    new Chart(this.context, {
      type: 'line',
      data: {
        labels: flightNumbers,
        datasets: [{
            label: 'Payload Mass (lb)',
            data: payloadMasses,
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
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    let idx = tooltipItem.index;
                    // console.log(tooltipItem)
                    // console.log(data.details[idx])
                    let payloadDetails = data.details[idx].payload_details[0];
                    return [
                        `Orbit: ${payloadDetails.orbit}`, 
                        `Mass(lbs): ${payloadDetails.payload_mass_lbs}`,
                        `Type: ${payloadDetails.payload_type}`    
                    ]
                }
            }
        }
    }
    })
  }

}

module.exports = PayloadChart;