// https://bl.ocks.org/mbostock/ba63c55dd2dbc3ab0127
const height = 300;
const width = 600;

const orbits = {
    "LEO": {
        xvelocity: 0.1,
        yvelocity: 0,
        xmultiplier: 1.3,
        ymultiplier: 1,
        xadd: -100,
        yadd: 0
    },
    "SSO": {
        xvelocity: 0.0,
        yvelocity: 0.1,
        xmultiplier: 1,
        ymultiplier: 1,
        xadd: 0,
        yadd: 0,
        // reversed: true
    },
    "ISS": {
        xvelocity: 0.0,
        yvelocity: 0.1,
        xmultiplier: 1,
        ymultiplier: 1,
        xadd: 0,
        yadd: 0
    },
    "GTO": {
        xvelocity: 0,
        yvelocity: 0,
        xmultiplier: 1,
        ymultiplier: 1,
        xadd: 0,
        yadd: 0
    },
    "Polar": {
        xvelocity: 0.1,
        yvelocity: 0,
        xmultiplier: 1,
        ymultiplier: 1,
        xadd: 0,
        yadd: 0,
        reversed: true
    },
    "ES-L1": {
        xvelocity: 0,
        yvelocity: 0,
        xmultiplier: 1,
        ymultiplier: 1,
        xadd: 0,
        yadd: 0
    }

}


class Globe {
    constructor() {
        // width = 600,
        // height = 300;
        
        this.radius = height / 2 - 5,
        this.scale = this.radius,

        this.projection = d3.geo.orthographic()
        .translate([width / 2, height / 2])
        .scale(this.scale)
        .clipAngle(90);

        // this.canvas = d3.select("div.rightside").append("canvas")
        // .attr("width", width)
        // .attr("height", height);
        this.canvas = document.getElementById("myGlobe");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.context = this.canvas.getContext("2d");
        
        this.path = d3.geo.path()
            .projection(this.projection)
            .context(this.context);
    
    }
    //center is like [0,0]
    render(orbit) {
        console.log("Globe is going to render this orbit: ", orbit)
        let world = this.world;
        let context = this.context;
        let thisOrbit = orbits[orbit]
        if (thisOrbit === undefined) {
            console.log("Couldnt find orbit type, rendering LEO")
            thisOrbit = orbits["LEO"];
        }
        let center = [0,0]
        // let xvelocity = 0.01;
        // let yvelocity = 0.01;
        let projection = this.projection;
        let path = this.path;
        // let width = width;
        // let height = height;
        let radius = this.radius;
        let image = new Image();
        image.src="./spritesheets/dragon.png"
        image.width = 50;
        image.height = 50;
        // if (center === undefined) center = [0, 0];
        // if (xvelocity === undefined) xvelocity = 1;
        // if (xvelocity === undefined) yvelocity = 1;
        // if (xmultiplier === undefined) xmultiplier = 1;
        // if (ymultiplier === undefined) ymultiplier = 1;
        // if (xadd === undefined) xadd = 0;
        // if (yadd === undefined) yadd = 0;
        
        d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json", (error, world) => {
            if (error) throw error;
            
            let land = topojson.feature(world, world.objects.land);
            // debugger
            d3.timer(function(elapsed) {
              context.clearRect(0, 0, width, height);
              let currentXAngle = thisOrbit.xvelocity*elapsed % 360;
              let currentYAngle = thisOrbit.yvelocity*elapsed % 360;
              projection.rotate([currentXAngle, currentYAngle]);
              context.beginPath();
              path(land);
              context.fillStyle="brown";
              context.fill();
              //outline 
              context.beginPath();
              context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
              context.lineWidth = 2.5;
              context.stroke();
              // context.rect(20*elapsed % 100, 20, 150, 100);
              // context.stroke();
              // aa = [-122.490402, 37.786453];
              // bb = [-122.389809, 37.72728];
              // console.log(projection(aa))
            
              //pprojection.rotate
              let xPos = projection(center)[0] * thisOrbit.xmultiplier + thisOrbit.xadd;
              let yPos = projection(center)[1] * thisOrbit.ymultiplier + thisOrbit.yadd;
              if (thisOrbit.reversed) {
                  let t = xPos;
                  xPos = yPos;
                  yPos = t;
              } 
            //   console.log(xPos, yPos)
              // console.log(xPos)
            //   context.beginPath();
              context.drawImage(
                  image,
                  xPos,
                  yPos,
                  image.width,
                  image.height
              )
            //   console.log(world.bbox, [xPos, yPos])
            //   debugger
              
            //   context.rect(xPos, yPos, 20, 20);
              // if (xPos > 500)
              // console.log(xvelocity * elapsed % 360)
          
            //   context.fillStyle = "blue";
            //   context.fill();
            });
          });
          
          d3.select(self.frameElement).style("height", height + "px");
    }
}

module.exports = Globe;