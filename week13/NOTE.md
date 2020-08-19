# W13-Geek-FE

### Proxy

使用Proxy实现的双向绑定，在这个编程训练里，对Proxy的理解和应用有所加深，在日常的工作中其实并不会用到这个API来处理问题，也看到了Vue3 中是如何实现的。

响应式的过程，是在数据变动之后，再去执行绑定在对应数据上的方法，所以需要对数据上绑定的方法做存储，通过proxy对数据变动的监测，再执行对应的方法。对于方法的存储，使用的是一个全局的数组来存储`usedReactivities` 。



### Dragable

`Range` API 的使用：

```js
let ranges = [];
  let container = document.getElementById('container');
  for (let i = 0; i < container.childNodes[0].textContent.length; i++) {
    let range = document.createRange();
    range.setStart(container.childNodes[0], i);
    range.setEnd(container.childNodes[0], i);
    // console.log(range.getBoundingClientRect());
    ranges.push(range);
  }
```

切割到文本的任何位置。

---



### 组件化

| Markup set | JS set | JS Change | User Input Change |           |
| ---------- | ------ | --------- | ----------------- | --------- |
| ❌          | ✔️      | ✔️         | ❓                 | Property  |
| ✔️          | ✔️      | ✔️         | ❓                 | Attribute |
| ❌          | ❌      | ❌         | ✔️                 | State     |
| ❌          | ✔️      | ❌         | ❌                 | Config    |



```js
Carousel
  state
    activeIndex
  property
    loop time imglist color forward
  attribute
    startIndex loop time imglist autoplay color forward
  children
    2
  event
    change click hover swipe resize dbclick
  method
    next() prev() goto() play() stop()
  config
    mode: 'useRAF', 'useTimeout'

```

通过上面的组件配置，清楚的展现了组件化开发的一个逻辑和思路，主要是如何设计组件，在设计中如何考虑组件的拓展性和满足的业务场景，都会在这里面体现。这是关键所在。