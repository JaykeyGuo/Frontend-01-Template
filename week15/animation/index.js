import { delay } from "bluebird";

export class TimeLine {
  constructor() {
    this.animations = [];
  }
  
  tick() {
    console.log('tick');
    let t = Date.now() - this.startTime;

    for (let animation of this.animations) {
      let { object, property, template, start, end, delay, timingFunction } = animation;

      if (t > duration + delay)
        continue;

      object[property] = template(timingFunction(start, end)(t - delay));
    }
    requestAnimationFrame(() => this.tick())
  }

  start() {
    this.startTime = Date.now();
    this.tick();
  }

  add(animation) {
    this.animations.push(animation);
  }
}

class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start);
    })
  }
}

/*

let animation = new Animation(object, property, start, end, duration, delay, timingFunction);
let  = new Animation(object2, property2, start, end, duration, delay, timingFunction);

let timeline = new TimeLine;

timeline.add(animation);
timeline.add(animation2);

timeline.start();
timeline.pause();
timeline.resume();
timeline.stop();

setTimeout
setInterval
requestAnimationFrame

 */