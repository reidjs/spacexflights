class ViewTimeline {
  constructor(timeline, ctx) {
    this.timeline = timeline;
    this.ctx = ctx;
    this.launch = this.timeline.addLaunch();
    console.log('view timeline');
  }

  bindKeyHandlers() {
    const timeline = this.timeline;


  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    // this.timeline.step(timeDelta);
    this.timeline.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = ViewTimeline;