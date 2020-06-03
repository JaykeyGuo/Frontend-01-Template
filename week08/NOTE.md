

# W08-Geek-FE


> **为什么 first-letter 可以设置 display:block 之类的，而 first-line 不行呢？**
>
> 因为在first-line之后修改对应的布局之后，会对当前的行盒作出修改，这个时候无法匹配对应的CSS盒，而first-letter是文本的第一个字符，这个是确定的，可以对这个文字产生的盒子进行设置。
>
> 
>
> **为什么frist-line不能使用float**
>
> float 脱离流出去，和 first-line 的定义矛盾了吧



###### 随堂

```js
div#a.b .c[id=x]
[0, 1, 3, 1]
#a:not(#b)
[0, 1, 0, 1]
*.a
[0, 0, 1, 0]
div.a
[0, 0, 1, 1]
```



###### 作业

```js
function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }

  if (selector.charAt(0) === '#') {
    var attr = element.attributes.filter(attr => attr.name === 'id')[0];
    if (attr && attr.value === selector.replace('#', '')) {
      return true;
    }
  } else if (selector.charAt(0) === '.') {
    var attr = element.attributes.filter(attr => attr.name === 'class')[0];
    if (attr && attr.value === selector.replace('.', '')) {
      return true;
    }
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}

match('div #id.class', document.getElementById('id'));
```

---



### CSS 排版

> margin可以理解为留白
>
> padding理解为边距

#### BOX 盒

- HTML代码中可以书写开始**标签**、结束**标签**和自封闭**标签**；
- 一对起止**标签**，表示一个**元素**。
- DOM树中存储的是元素和其他类型的节点（Node）。
- CSS选择器中选中的是元素
- CSS选择器中选中的是元素，在排版时可能产生多个盒
- 排版和渲染的基本单位是盒

> 为什么border-box不叫margin-box？
>
> 因为不包含margin

#### 正常流 float

![image-20200530193532962](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfapi411znj31a40l00vj.jpg)



1. **inline formatting context**(IFC)

   从左到右的就是IFC

2. **block formatting context**(BFC)

   从上到下的就是BFC

正常流的行盒子，vertical-align在top/bottom/middle的情况下会根据不同inline-box来撑开行盒子的高度。

> \1.  Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline 
>
>   \1.  Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“ 
>
>   \3.  vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线吗？
>
> 在行盒子中的inline-block
>
> 1. `vertical-align: baseline`是用自身的baseline与行盒子的baseline进行对齐;
> 2. `vertical-align`



```js
$0.getClinetRects()
// 可以查看DOM形成的盒子
```



```html
<div style="font-size:50px;line-height:100px;background-color:pink;">
    <div style="vertical-align:text-bottom;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <div style="vertical-align:text-top;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <span>Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello </span>
    <div style="vertical-align:text-bottom;line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:top;line-height:70px;width:100px;height:50px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:base-line;line-height:70px;width:100px;height:550px;background-color:plum;display:inline-block">1</div>


</div>
```

##### Margin折叠

> **Margin折叠只会发生在BFC里，只会发生在BFC设定的方向。**

这里使用留白的概念来理解margin折叠会比较自然。

> `overflow: hidden`和`display: inline-box`等可以对margin折叠产生印象，使折叠无效
>
> 只有`正常流`且`overflow:visible`会产生Margin折叠

margin折叠也会发生在父子盒之前

Block 和 inline-block 以及flex的子元素(flex item)里面，才会产生正常流，就是**block-containers**

> Winter:
>
> 大家请记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。
>
> `block-level` 表示可以放入BFC
>
> `block-container` 表示可以容纳BFC
>
> `block-box` = block-level + block-contaner
>
> `block-box` 如果 `overflow: visible`，那么就跟父BFC合并
>
> ---
>
> block-level display：flex、table、grid、block
> block-containers display: block、inline-block
> block-boxes display：block

