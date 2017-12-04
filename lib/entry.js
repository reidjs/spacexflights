const Controller = require('./controller');
document.addEventListener("DOMContentLoaded", () => {
  canvasEl = document.getElementById("myCanvas");
  ctx = canvasEl.getContext("2d"); //flight sim
  ctx2 = canvasEl.getContext("2d"); //time line
  const controller = new Controller(canvasEl, ctx, ctx2);
  // controller.startFlight();
  controller.showTimeline();
  $( "#launch" ).on("click", function() {
    controller.startFlight();
  });
})