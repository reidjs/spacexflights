// https://bl.ocks.org/mbostock/ba63c55dd2dbc3ab0127

class Globe {
    constructor(launchDates, launchDetails) {
        this.width = 600,
        this.height = 400;
        
        this.radius = this.height / 2 - 5,
        this.scale = this.radius,

        this.projection = d3.geo.orthographic()
        .translate([this.width / 2, this.height / 2])
        .scale(this.scale)
        .clipAngle(90);

        this.canvas = d3.select("div.rightside").append("canvas")
        .attr("width", this.width)
        .attr("height", this.height);

        this.context = this.canvas.node().getContext("2d");
        
        this.path = d3.geo.path()
            .projection(this.projection)
            .context(this.context);
    
    }
    //center is like [0,0]
    render(center, xvelocity, yvelocity, xmultiplier, ymultiplier, xadd, yadd) {
        let world = this.world;
        let context = this.context;
        // let xvelocity = 0.01;
        // let yvelocity = 0.01;
        let projection = this.projection;
        let path = this.path;
        let width = this.width;
        let height = this.height;
        let radius = this.radius;
        let image = new Image();
        image.src="./spritesheets/dragon.png"
        image.width = 50;
        image.height = 50;
        if (center === undefined) center = [0, 0];
        if (xvelocity === undefined) xvelocity = 1;
        if (xvelocity === undefined) yvelocity = 1;
        if (xmultiplier === undefined) xmultiplier = 1;
        if (ymultiplier === undefined) ymultiplier = 1;
        if (xadd === undefined) xadd = 0;
        if (yadd === undefined) yadd = 0;
        
        d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json", (error, world) => {
            if (error) throw error;
          
            let land = topojson.feature(world, world.objects.land);
            // debugger
            d3.timer(function(elapsed) {
              context.clearRect(0, 0, width, height);
              let currentXAngle = xvelocity*elapsed % 360;
              let currentYAngle = yvelocity*elapsed % 360;
              projection.rotate([currentXAngle, currentYAngle]);
              context.beginPath();
              path(land);
              context.fillStyle="red";
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
              let xPos = projection(center)[0] * xmultiplier + xadd;
              let yPos = projection(center)[1] * ymultiplier + yadd;
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