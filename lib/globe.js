// https://bl.ocks.org/mbostock/ba63c55dd2dbc3ab0127

var width = 600,
height = 400;

var radius = height / 2 - 5,
scale = radius,
xvelocity = 0.05,
yvelocity = 0.01;

var projection = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .scale(scale)
    .clipAngle(90);

var canvas = d3.select("div.rightside").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);




d3.json("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json", function(error, world) {
  if (error) throw error;

  var land = topojson.feature(world, world.objects.land);

  d3.timer(function(elapsed) {
    context.clearRect(0, 0, width, height);
    let currentXAngle = xvelocity*elapsed % 360;
    let currentYAngle = yvelocity*elapsed % 360;
    projection.rotate([currentXAngle, currentYAngle]);
    context.beginPath();
    path(land);
    context.fillStyle="red";
    context.fill();

    context.beginPath();
    context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, true);
    context.lineWidth = 2.5;
    context.stroke();
    // context.rect(20*elapsed % 100, 20, 150, 100);
    // context.stroke();
    aa = [0, 0];
    // aa = [-122.490402, 37.786453];
    // bb = [-122.389809, 37.72728];
    // console.log(projection(aa))
    let xPos = projection(aa)[0];
    let yPos = projection(aa)[1];
    // console.log(xPos)
    context.beginPath();
    context.rect(xPos, yPos, 20, 20);
    // if (xPos > 500)
    console.log(xvelocity * elapsed % 360)

    context.fillStyle = "blue";
    context.fill();
  });
});

d3.select(self.frameElement).style("height", height + "px");