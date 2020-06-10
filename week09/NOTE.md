# W09-Geek-FE

> 贡献mdn！视角不一样，转变了视角

###### 作业

整理CSS的所有属性，输出对应的分类

![image-20200604214835754](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfglg3c807j31470u01kx.jpg)

---

```html
<html>
  <style>
    @keyframes myframes {
      0% {
        height: 200px;
      }
      100% {
        height: 600px;
      }
    }
    
    .box {
      width: 200px;
      height: 200px;
      background: pink;
      animation: myframes 3s ease-in-out infinite;
      // equal to below
      animation-name: myframes;
      animation-druation: 3s;
      animation-timing-function: ease-in-out;
      animation-delay: 0;
      animation-iteration-count: infinite;
      animation-direction: normal;
    }
  </style>
  <body>
    <div class="box"> 
    </div>
  </body>
</html>
```







#### Need to Know

| ENTITY |  mark  |   HMTL   |   JS   |
| :----: | :----: | :------: | :----: |
|  quot  | &quot; | `&quot;` | \u0022 |
|  amp   | &amp;  | `&amp;`  | \u0026 |
|   lt   |  &lt;  |  `&lt;`  | \u003c |
|   gt   |  &gt;  |  `&gt;`  | \u003e |
|  apos  | &apos; | `&apos;` | \u0027 |

以上的字符需要记忆，在HTML中使用的时候需要做对应的转译，而不是直接使用对应的字符，在一些情况下是不能被识别的。





### 操作DOM

- appendChild
- insertBefore
- removeChild
- replaceChild

> *tips*

*所有的 DOM 元素默认只有一个父元素，不能两次被插入到 DOM trees 中，同一个节点先插入到 DOM trees 中 A 位置，再插入到 B 位置，会默认从 A 位置 remove 掉。*

**在DOM操作中，二次插入的时候，只有使用了插入的操作，就会在原来的DOM上remove已有的DOM，再插入。**

*childNodes 是一个 living Collection，执行 removeChild 或者其他修改操作后，childNodes 会实时改变。*

> childNodes是动态的！



##### 高级操作

> - compareDocumentPosition 是一个用于比较两个节点中关系的函数。
> - contains 检查一个节点是否包含另一个节点的函数。
> - isEqualNode 检查两个节点是否完全相同。
> - isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用 `===`。
> - cloneNode 复制一个节点，如果传入参数为 `true`，则会连同子元素做深拷贝。





## Events

- addEventListener

  - type 事件名称

  - listener 事件处理函数

    > 事件处理函数不一定是函数，也可以是个 JavaScript 具有 handleEvent 方法的对象。

    ```
    var o = {
      handleEvent: event => console.log(event)
    };
    document.body.addEventListener("keydown", o, false);
    ```

  - useCapture 捕获冒泡（`true`|`false`）/ options

    - once：只执行一次。
    - passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
    - useCapture：是否捕获（否则冒泡）。

    ```html
    <div id="a" style="width: 500px; height: 300px; background-color: pink;">
        <div id="b" style="width: 500px; height: 200px; background-color: aqua;"></div>
    </div>
    <script>
    	let a = document.getElementById("a");
        let b = document.getElementById("b");
        a.addEventListener("click", function() {
            console.log("a >>> 捕获");
        }, true);
        a.addEventListener("click", function() {
            console.log("a >>> 冒泡");
        }, false);
        b.addEventListener("click", function() {
            console.log("b >>> 捕获");
        }, true);
        b.addEventListener("click", function() {
            console.log("b >>> 冒泡");
        }, false);
        /*
         a >>> 捕获
         b >>> 捕获
         b >>> 冒泡
         a >>> 冒泡
        */ 
    </script>
    ```

    当我们点击一个元素时，首先拿到的是坐标，从外到里捕获，直到找到 EventTarget，从里到外冒泡。

  > 触发事件：先捕获，再冒泡。