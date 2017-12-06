const Chart = require('chart.js/dist/Chart')

class PayloadChart {
  constructor() {
    // this.context = context;
    // this.data = payloadData;
    // this.options = options;
    // this.plot(payloadData);
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
  plot(context, data) {
    // console.log(data)
    let flightNumbers = [];
    let payloadMasses = [];
    let backgroundColors = [];
    let hoverData = [];
    for (let i = 0; i < data.details.length; i++) {
        flightNumbers.push(data.details[i].flight_number);
        payloadMasses.push(data.details[i].payload_details[0].payload_mass_lbs);
        let orbitType = data.details[i].payload_details[0].orbit
        if (orbitType === "LEO") {
            backgroundColors.push('rgba(0, 0, 244, 1)')
        } else if (orbitType === "GTO")  {
            backgroundColors.push('rgba(244, 0, 0, 1)')
        } else if (orbitType === "ES-L1") {
            backgroundColors.push('rgba(244, 244, 0, 1)')
        } else if (orbitType === "ISS") {
            backgroundColors.push('rgba(244, 0, 244, 1)')
        } else if (orbitType === "Polar") {
            backgroundColors.push('rgba(0, 244, 244, 1)')
        } else {
            backgroundColors.push('rgba(244, 244, 244, 1)')
        }
        // console.log(data.details[i].details.length)
    }
    return new Chart(context, {
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
            pointBackgroundColor: backgroundColors,
            borderWidth: 1
        }],
        // click: function(e) {
        //     console.log('ehllo')
        // }
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