# W11-Geek-FE

在红绿灯的项目中主要是熟悉异步编程；

在没有异步编程的情况下，其实很多的场景是不能很好的实现的，通过setTimeout这个api能做到很多的事情，但是在原有JS的基础上，新标准（ES5之后）带来的generate和promise都更好的解决了异步编程的问题，同时也提供了then这样的方法，使得回掉地狱也变成了过去式。

在寻路的部分，更多的是看到如何使用不同的数据结构来解决问题，在map构建的时候使用的一维数组，在寻路的时候使用的二叉堆（Binary heap）,虽然自己对二叉堆目前没有基础的了解，但是从直观的角度看，不同的数据结构是有对应擅长处理的部分。真正使用到数据结构的时候也并不是算法题中那样，一个对象，而是用更高效的方式封装一个类来实现的。这个想法更重要。如果用JS的原生数组来封装一个二叉堆。

---

课程作业的部分更多的是跟着winter的思路来写代码。

```js
// 二叉堆
class BinaryHeap {
    constructor(data, compare) {
      this.data = data;
      this.compare = compare;
    }
    take() {
      if (!this.data.length) {
        return;
      }
      let min = this.data[0];
      let i = 0;

      while(i < this.data.length) {
        if (i * 2 + 1 >= this.data.length) {
          break;
        }
        if (i * 2 + 2 >= this.data.length) {
          this.data[i] = this.data[i * 2 + 1];
          i = i * 2 + 1;
          break;
        }
        if (this.compare(this.data[i * 2 + 1], this.data[i * 2 + 2]) < 0) {
          this.data[i] = this.data[i * 2 + 1];
          i = i *2 + 1;
        } else {
          this.data[i] = this.data[i * 2 + 2];
          i = i * 2 + 2;
        }
      }
      if (i < this.data.length - 1) {
        this.insertAt(i, this.data.pop());
      } else {
        this.data.pop();
      }
      return min;
    }
    insertAt(i, v) {
      this.data[i] = v;
      while(i > 0 && this.compare(v, this.data[Math.floor((i - 1) / 2)]) < 0) {
        this.data[i] = this.data[Math.floor((i - 1) / 2)];
        this.data[Math.floor((i - 1) / 2)] = v;
        i = Math.floor((i - 1) / 2);
      }
    }
    insert(v) {
      console.log(v);
      this.insertAt(this.data.length, v);
    }
    get length() {
      return this.data.length;
    }
  }
```

二叉堆的封装，核心还是对这个数据结构的基本信息的了解，再通过对应的方式来应用。