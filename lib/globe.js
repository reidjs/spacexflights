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
        let radius = this.radius
        this.orbits = {
                "LEO": {
                    // p0: {x: ,y:},
                    // p1: {x: ,y:},
                    // p2: {x: ,y:},
                    // p3: {x: ,y:}
                },
                "SSO": {
                    // p0: {x: ,y:},
                    // p1: {x: ,y:},
                    // p2: {x: ,y:},
                    // p3: {x: ,y:}
                },
                "ISS": {
                    p0: {x: width/2 - radius*2, y: height/2 + radius/2},
                    p1: {x: width/2, y: height/2},
                    p2: {x:  width/2 + radius + 80 , y: height/2 - radius + 20},
                    p3: {x: width / 2-radius*2, y: height/2+radius/2 }
                },
                "GTO": {
                    // p0: {x: ,y:},
                    // p1: {x: ,y:},
                    // p2: {x: ,y:},
                    // p3: {x: ,y:}
                },
                "Polar": {
                    // p0: {x: ,y:},
                    // p1: {x: ,y:},
                    // p2: {x: ,y:},
                    // p3: {x: ,y:}
                },
                "ES-L1": {
                    // p0: {x: ,y:},
                    // p1: {x: ,y:},
                    // p2: {x: ,y:},
                    // p3: {x: ,y:}
                }
            
            }
    
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
        let thisOrbit = this.orbits["ISS"] //this should be [orbit]
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
        // console.log(launchSite)
        //https://stackoverflow.com/questions/9270214/html5-canvas-animating-an-object-following-a-path
        const calcBezierPoint = function (t, p0, p1, p2, p3) {
            let data = [p0, p1, p2, p3];
            let at = 1 - t;
            let visible = false;
            for (let i = 1; i < data.length; i++) {
                for (let k = 0; k < data.length - i; k++) {
                    
                    if (t > 0.5) {
                        visible = true;
                    } else {
                        visible = false;
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
            context.fillStyle="rgba(119,119,119,.1)";
            context.rect(0, 0, width, height);
            context.fill();

            
            let currentXAngle = 0.1*elapsed % 360;
            let currentYAngle = 0*elapsed % 360;
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
                thisOrbit.p0,
                thisOrbit.p1,
                thisOrbit.p2,
                thisOrbit.p3
            );
            context.beginPath();
            context.arc(width/2+radius, height/2-radius, 5, 0, 2*Math.PI, false);
            context.fill();
            context.stroke();
            if (satellitePosition.visible)
                context.globalAlpha = 0.2;
            else 
                context.globalAlpha = 1;
            context.drawImage(
                image,
                satellitePosition.x+33,
                satellitePosition.y-33,
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