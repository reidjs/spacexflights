// https://bl.ocks.org/mbostock/ba63c55dd2dbc3ab0127
// const height = 300;
// const width = 600;
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
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
        // reversed: true
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
        this.canvas = document.getElementById("myGlobe");
        let width = this.canvas.width;
        let height = this.canvas.height;
        
        this.radius = height / 2 - 5,
        this.scale = this.radius,

        this.projection = d3.geo.orthographic()
        .translate([width / 2, height / 2])
        .scale(this.scale)
        .clipAngle(90);

        this.context = this.canvas.getContext("2d");
        
        this.path = d3.geo.path()
            .projection(this.projection)
            .context(this.context);
    
    }
    
    //center is like [0,0]
    render(orbit, launchSite) {
        console.log("Globe is going to render this orbit: ", orbit)
        this.canvas = document.getElementById("myGlobe");
        let canvas = this.canvas;
        canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            console.log(mousePos.x, mousePos.y)
        }, false)
        let width = this.canvas.width;
        let height = this.canvas.height;
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
        let orbitPath = this.orbitPath;
        let radius = this.radius;
        let image = new Image();
        image.src="./spritesheets/dragon.png"
        image.width = 33;
        image.height = 33;
        console.log(launchSite)
        //https://stackoverflow.com/questions/9270214/html5-canvas-animating-an-object-following-a-path
        const calcBezierPoint = function (t, p0, p1, p2, p3) {
            let data = [p0, p1, p2, p3];
            let at = 1 - t;
            let visible = true;
            for (let i = 1; i < data.length; i++) {
                for (let k = 0; k < data.length - i; k++) {
                    
                    if (t > 0.5) {
                        visible = false;
                    } else {
                        visible = true;
                    }
                    data[k] = {
                        x: data[k].x * at + data[k + 1].x * t,
                        y: data[k].y * at + data[k + 1].y * t,
                        visible: visible,
                    }
                }
            }
            return data[0];
        };
        
        d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json", (error, world) => {
            if (error) throw error;
            
            let land = topojson.feature(world, world.objects.land);
            // console.log(projection(launchSite))
            let coords = projection(launchSite)
            // debugger
            d3.timer(function(elapsed) {
            context.clearRect(0, 0, width, height);
            
            let currentXAngle = thisOrbit.xvelocity*elapsed % 360;
            let currentYAngle = thisOrbit.yvelocity*elapsed % 360;
            projection.rotate([currentXAngle, currentYAngle]);
            context.beginPath();
            path(land);
            context.fillStyle="rgba(119,119,119,.5)";
            context.fill();
            //outline 
            context.beginPath();
            context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
            context.lineWidth = 2.5;
            context.stroke();
            let satellitePosition = calcBezierPoint(
                (elapsed % 2000)/2000, 
                {x: width / 2 - radius, y: height-40},
                {x: width / 2, y: height / 2 - 40},
                {x:  width , y: height/ 2},
                {x: width / 2 - radius, y: height - 40 }
            );
            // context.beginPath();
            // context.arc(width/2, height/2, radius, 0, 2*Math.PI, false);
            // context.fill();
            context.stroke();
            if (satellitePosition.visible)
                context.globalAlpha = 0.5;
            else 
                context.globalAlpha = 1;
            context.drawImage(
                image,
                satellitePosition.x,
                satellitePosition.y,
                image.width,
                image.height
            )
            context.globalAlpha = 1;
            });
          });
          
          d3.select(self.frameElement).style("height", height + "px");
    }
}

module.exports = Globe;