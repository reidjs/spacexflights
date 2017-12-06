//use this as a data store, e.g., store.launches
//this should be promise like. It fetches the data
//then outside of this you can do stuff with the data.
const convertUnixTimeToDateTime = (seconds) => {
  let dateTime = new Date(parseInt(seconds)*1000)
  return dateTime;
}
class Store {
  constructor() {
    this.launches = [];
    this.launchPads = [];
    this.launchDetails = [];
    this.launchLocationDetails = {};
    // this.fetchLaunches();
    // this.fetchLaunchPads();
  }
  fetchLaunches() {
    return $.ajax({
      method: 'GET',
      url: 'https://api.spacexdata.com/v2/launches'
    })
  }

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

  fetchLaunchPads() { 
    return $.ajax({
        method: 'GET',
        url: 'https://api.spacexdata.com/v2/launchpads'
      })
    }

    setLaunchPads() {
      let tempStore = {}
      let getData = this.fetchLaunchPads;
      return new Promise((resolve, reject) => {
        getData().then(res => {
          res.forEach(location => {
            tempStore[location.id] = location
            if (Object.keys(tempStore.length === res.length)) {
              resolve(tempStore)
            }
          })
        })
      })
    }

    
      
      
      
      //might not duplicate right 
      // setLaunchLocationData(data) {
      //   if (data) {
      //     this.launchLocationDetails = data 
      //   }
      //   // debugger
      //   return this.launchPads
      // }
    }
    
    module.exports = Store
  // }).then(res => {
  //   res.forEach(location => {
  //     tempStore[location.id] = location
  //     if (Object.keys(tempStore).length === res.length) {
  //       setData(tempStore)
  //     }
  //   })
  // })