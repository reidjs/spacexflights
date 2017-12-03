
class TimelineObject {
  constructor(options) {
    this.pos = options.pos; 
    this.color = options.color;

    this.timeline = options.timeline;
    // this.image = options.image;
    this.radius = options.radius;
  }

  draw(ctx) {
    // console.log('draw me')
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  remove() {
    this.timeline.remove(this);
  }
}

module.exports = TimelineObject;