function create(Cls, attirbutes, ...children) {
  let o;

  if (typeof Cls === 'string') {
    o = new Wrapper();
  } else  {
    o = new Cls({
      config: "99",
    });
  }

  for (let name in attirbutes) {
    o.setAttribute(name, attirbutes[name]);
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = new Text(child);
    }
    o.appendChild(child);
    // o.children.push(child);
  }

  // console.log(children);
  return o;
}

class Text {
  constructor(text) {
    // console.log(config);
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    // console.log(config);
    this.children = [];
    this.root = document.createElement(type);
  }
  // set id(val) {
  //   console.log("Parent::class", val);
  // }
  setAttribute(name, value) {
    // console.log(name, value);
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    // console.log("Parent::appendChild", child);
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}

class MyComponent {
  constructor(config) {
    // console.log(config);
    this.children = [];
    // this.root = document.createElement('div');
  }
  // set id(val) {
  //   console.log("Parent::class", val);
  // }
  setAttribute(name, value) {
    // console.log(name, value);
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    // console.log("Parent::appendChild", child);
    this.children.push(child);
  }

  render() {
    return <article>
      <header>I'm a header</header>
      {this.slot}
      <footer>I'm a footer</footer>
    </article>
  }

  mountTo(parent) {
    this.slot = <div></div>
    // parent.appendChild(this.root);
    for (let child of this.children) {
      debugger;
      this.slot.appendChild(child);
      // child.mountTo(this.root);
    }
    this.render().mountTo(parent);
  }
}

// class Child {
//   constructor(config) {
//     console.log(config);
//     this.children = [];
//     this.root = document.createElement('div');
//   }
//   set id(val) {
//     console.log("Parent::class", val);
//   }
//   setAttribute(name, value) {
//     console.log(name, value);
//     this.root.setAttribute(name, value);
//   }

//   mountTo(parent) {
//     parent.appendChild(this.root);
//   }

//   appendChild(child) {
//     console.log("Parent::appendChild", child);
//     child.appendChild(child);
//   }

// }

let component = <MyComponent>
  <div>text text text</div>
</MyComponent>;

component.mountTo(document.body);
