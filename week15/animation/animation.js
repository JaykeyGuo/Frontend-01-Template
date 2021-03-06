export class TimeLine {
  constructor() {
    this.animations = [];
    this.pauseTime = null;
    this.rafId = null;
    this.state = 'inited'
    // TODO: Tthis.acitveAnimation
    this.startTime = null;
  }

  tick() {
    let animations = this.animations.filter(animation => !animation.finished);
    let t = Date.now() - this.startTime;

    for (let animation of this.animations) {
      let { object, property, template, start, end, duration, delay, timingFunction, startTime } = animation;

      let progression = timingFunction((t - delay - startTime) / duration);

      if (t > duration + delay + startTime) {
        progression = 1;
        animation.finished = true;
      }


      let value = animation.valueFromPreogression(progression);

      object[property] = template(value);

      // object[property] = template(timingFunction(start, end)(t - delay));
    }
    if (animations.length) {
      this.rafId = requestAnimationFrame(() => this.tick())
    }
  }

  start() {
    if (this.state !== 'inited') {
      return;
    }
    this.state = 'playing'
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    if (this.state !== 'playing') {
      return;
    }
    this.state = 'paused'
    this.pauseTime = Date.now();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  resume() {
    if (this.state !== 'paused') {
      return;
    }
    this.state = 'playing'
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  restart() {
    if (this.state === 'playing') {
      this.pause();
    }
    this.rafId = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, startTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === 'playing') {
      animation.startTime = startTime !== void 0 ? startTime : Date.now() - this.startTime;
    } else {
      animation.startTime = startTime !== void 0 ? startTime : 0;
    }
  }
}

export class Animation {
  constructor(object, property, start, end, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    // this.timingFunction = timingFunction || ((start, end) => {
    //   return (t) => start + (t / duration) * (end - start);
    // })
    this.timingFunction = timingFunction;
  }

  valueFromPreogression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(object, property, start, end, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    // this.timingFunction = timingFunction || ((start, end) => {
    //   return (t) => start + (t / duration) * (end - start);
    // })
    this.timingFunction = timingFunction;
  }

  valueFromPreogression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    }
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