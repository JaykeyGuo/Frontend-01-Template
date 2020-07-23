export class TimeLine {
  constructor() {
    this.animations = [];
    this.pauseTime = null;
    this.rafId = null;
    this.state = 'inited'
    // TODO: Tthis.acitveAnimation
  }

  tick() {
    console.log('tick');
    let animations = this.animations.filter(animation => !animation.finished);
    let t = Date.now() - this.startTime;

    for (let animation of this.animations) {
      let { object, property, template, start, end, duration, delay, timingFunction, initTime } = animation;

      let progression = timingFunction((t - delay - initTime) / duration);

      if (t > duration + delay) {
        progression = 1;
        animation.finished = true;
      }


      let value = start + progression * (end - start);

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

  add(animation, initTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === 'playing') {
      animation.initTime = initTime || Date.now();
    } else {
      animation.initTime = initTime || 0;
    }
  }
}

export class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction) {
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