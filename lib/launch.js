const TimelineObject = require('./timeline_object');

class Launch extends TimelineObject {
  constructor(options) {
    super(options);
    this.color = options.color;
    this.radius = options.radius;
  }
}

module.exports = Launch;