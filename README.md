# SpaceX Flights 

An interactive history of SpaceX flights using the github [SpaceX API](https://github.com/r-spacex/SpaceX-API) as a data source. The intention for this project is to be used as an educational resource for people interested in spaceflight. 

There are two interactive parts to this project, the timeline and the mission show page.

# I. Main Display Components

### Payload Information and Flight Selector

Using the ChartJS library, payload data is displayed beautifully and responsively at the top of the index page.

![Mission Selector and Payload Information](https://media.giphy.com/media/l3mZ2SpotsDRsBOLu/giphy.gif)

### Orbit animation

Earth's topography is displayed using the d3 JS library to convert Earth's spherical coordinates to cartesian (canvas) coordates. Every orbit type (SSO, ISS, LEO, SSO, ES-L1, GTO) is accounted for. The satellite's path is exaggerated for display purposes.

![Satellite orbit animation](https://media.giphy.com/media/l3mZ5NFq6TJm13W4E/giphy.gif)

### Launch site
Flight data is connected to the Google maps API to provide both an overhead and panoramic view of the launch site. 

![Launch site viewer](https://media.giphy.com/media/l3mZmSRQIp54tu6Iw/giphy.gif)







