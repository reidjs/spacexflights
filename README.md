# SpaceX Flights 

An interactive history of SpaceX flights using the github repository [SpaceX API](https://github.com/r-spacex/SpaceX-API) as the primary data source. The intention for this project is to be used as an educational resource for people fascinated with the aerospace industry. 

# I. Display Components

### Payload Information and Flight Selector

Using the ChartJS library, payload data is displayed beautifully and responsively at the top of the index page.

![Mission Selector and Payload Information](https://media.giphy.com/media/l3mZ2SpotsDRsBOLu/giphy.gif)

### Orbit animation

Earth's topography is displayed using the d3 JS library to convert Earth's spherical coordinates to cartesian (canvas) coordates. Every orbit type (SSO, ISS, LEO, SSO, ES-L1, GTO) is accounted for. The satellite's path is exaggerated for display purposes.

![Satellite orbit animation](https://media.giphy.com/media/l3mZ5NFq6TJm13W4E/giphy.gif)

### Launch site

Flight data is connected to the Google maps API to provide both an overhead and panoramic view of the launch site. 

![Launch site google maps](https://github.com/reidjs/spacexflights/blob/master/launchsite.gif)

### Sidebar

The sidebar displays information about the selected flight such as the rocket type, payload, launch location, youtube press video, and description.

![Sidebar](https://github.com/reidjs/spacexflights/blob/master/spaceX_sidebar_screenshot.png)

# II. Technical Details

### Handling Asynchronous Data 

Early in this project there was an issue where the different components were reaching an inconsistent state. This occurred due to the various data streams being received in odd orders, for example, the flight data was occasionally received after the chart was rendered. To resolve this, I refactored my project architecture to use Flux's global data store to ensure flight data stays consistent across all components. 


```
// lib/store.js
setLaunches() {
    let tempStore = {
      launches: [],
      dates: []
    }
    let getData = this.fetchLaunches;
    return new Promise((resolve, reject) => {
      getData().then(res => {
        res.forEach(launch => {
          tempStore.dates.push(convertUnixTimeToDateTime(launch.launch_date_unix))
          tempStore.launches.push(launch)
          if (tempStore.dates.length === res.length) {
            resolve(tempStore);
          }
        })
      })
    })
  }
```
The moment the data is received by the store, the entry file updates the rest of the components (App.js) with the correct information.






