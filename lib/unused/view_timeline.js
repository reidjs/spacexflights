class ViewTimeline {
  constructor(timeline, ctx, stopCallBack) {
    this.timeline = timeline;
    this.ctx = ctx;
    this.launch = this.timeline.addLaunch();
    this.stopCallBack = stopCallBack; //hide timeline
    console.log('view timeline');
  }

  bindKeyHandlers() {
    const timeline = this.timeline;

    key("enter", () => {
      timeline.requestHideTimeline;
    })
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
    if (this.timeline.running)
      requestAnimationFrame(this.animate.bind(this));
    else 
      this.stopCallBack();
  }
}

module.exports = ViewTimeline;