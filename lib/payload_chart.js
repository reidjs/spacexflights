const Chart = require('chart.js/dist/Chart')

class PayloadChart {
    constructor(context, launchData) {
        this.chart = this.plot(context, launchData)
    }
    getPoint(e) {
        return this.chart.getElementsAtEvent(e) 
    }
    plot(context, data) {
        let flightNumbers = [];
        let payloadMasses = [];
        let backgroundColors = [];
        let payloadDetails = [];
        let hoverData = [];
        for (let i = 0; i < data.launches.length; i++) {
            const thisLaunch = data.launches[i];
            const payload = thisLaunch.rocket.second_stage.payloads
            flightNumbers.push(thisLaunch.flight_number);
            payloadMasses.push(payload[0].payload_mass_lbs);
            payloadDetails.push(payload[0])
            let orbitType = payload[0].orbit
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
                            // debugger
                            // let payloadDetails = data.launches[idx].payload_details[0];
                            return [
                                `Orbit: ${payloadDetails[idx].orbit}`, 
                                `Mass(lbs): ${payloadDetails[idx].payload_mass_lbs}`,
                                `Type: ${payloadDetails[idx].payload_type}`    
                            ]
                        }
                    }
                }
            }
        })
        
    }

}

module.exports = PayloadChart;