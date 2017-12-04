const Controller = require('./controller');
document.addEventListener("DOMContentLoaded", () => {
  canvasEl = document.getElementById("myCanvas");
  ctx = canvasEl.getContext("2d"); //flight sim
  canvasEl.style.width = "800px";
  canvasEl.style.height = "20px";
  const controller = new Controller(canvasEl, ctx);
  // controller.startFlight();
  // controller.showTimeline();
  $( "#launch" ).on("click", function() {
    controller.startFlight();
  });
})