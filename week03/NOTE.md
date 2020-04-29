# W03-Geek-FE

## 200423-第五次课程-JS语法、表达式

##### 优先级最高的运算符

Reference 

只有在delete和assign的时候才体现对应对象的“引用”能力



##### Expression

###### Left Handside(等号左边hoist)

**Member（访问成员的表达式）**

- new Foo()
- new.target
- super.b
- super['b']
- a.b
- a[b]
- foo\`test` 

**New**

- new Foo

**Call**

- foo()
- super	
- foo()['b']
- foo().b
- foo()\`abc\`

###### Right Handside

**Update**

**Unary**

- delete a.b

- void foo()

- typeof a 

- +a
- -a
- ~a
- ! a
- Await a

`**`是唯一一个右结合的运算符

涉及到两侧的计算，就会出现类型转换的问题，



###### 类和类型是两回事

`typeof 'sdf' // string`

`typeof new String('sdfsdf') // object`



##### 作业

- 补充写完函数 convertStringToNumber
- 补充写完函数 convertNumberToString

```js
function convertStringToNumber(string, x = 10) {
  var chars = string.split('');
  var number = 0;
  var i = 0;
  while(i < chars.length && chars[i] !== '.') {
    number = number * x;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0)
    i++
  }
  if (chars[i] === '.') {
    i++;
  }
  var fraction = 1;
  while(i < chars.length) {
    fraction = fraction / x;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction
    i++
  }
  return number + fraction;
}
convertStringToNumber('10.02')

// convertNumberToString
function convertNumberToString(number, x = 10) {
  var interget = Math.floor(number);
  var fraction = number - interget;
  var string = '';
  while(interget > 0) {
    string += String(interget % x) + string;
    interget = Math.floor(interget / x);
  }
  return string;
}

convertNumberToString(100)
```



## 200425-第六次课程-JS语句

###### for的作用域

```js
for (let i = 0; i < 10; i++) {
  let i = 0;
  console.log(i)
}

// for 循环会产生两个作用域
// 第一个是for的第一个声明语句，会生产一个独立的作用域
// 第二个才是for循环中的作用域，
```

- `for of `循环对应的是`Symbol.iterator`，可以在Array和Generator使用，对于for of的理解，其实比较深刻

###### try 语句

在try语句中，产生运行时错误的都能实现throw的效果。

catch中的条件中声明的变量，其实是在catch的作用域中生成的。

###### JS中的作用域

作用域就是变量活动的地方，不同的模块会有自己的作用域，课上老师提到for的作用域，让我第一次知道其实在这些语句中也是存在自己的作用域的，这就会带来不同的作用域查找的问题，在作用域链中就需要多考虑这些语句产生的作用域的查找。



##### 面对对象编程？什么是对象

认知中对象的三要素

1. 唯一性
2. 状态
3. 行为

> 对象的行为是改变自身状态的行为

对`Object`的理解，对象这个翻译在一定程度上阻碍了这个概念的实际意思，对象就是世间万物，对于这个概念的抽象，通过一个原型来定义对应的对象是什么。这个很关键的。

再来就是对象的三个要素，通过这个定义，可以看出对象的属性和本质，就是对象自己的行为最终是改变对象自身状态的。**改变自身状态**，这个才是一个对象的关键，这也就限定一个对象的作业范围和作业的目标，做了一个很巧妙的限制，从思辨的角度来看，这个限制即能满足对象对外的一个需求，能够发出一个行为，能够展示一个状态，同时也满足了对内的需求，改变自己的状态。

###### 作业

- 找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？写一篇文章，放在学习总结里。

> 1. Bound Function
>    - [[Call]]
>    - [[Construct]]
>    - BoundFunctionCreate
> 2. Array Object
>    - [[DefinOwnProperty]]
>    - ArrayCreate
>    - ArraySpeciesCreate
>    - ArraySetLength
> 3. String
>    - [[GetOwnProperty]]
>    - [[DefineOwnProperty]]
>    - [[OwnPropertyKeys]]
>    - StringCreate
>    - StringGetOwnProperty
> 4. Arguments
>    - [[GetOwnProperty]]
>    - [[DefineOwnProperty]]
>    - [[Get]]
>    - [[Set]]
>    - [[Delete]]
>    - CreateUnmappedArgumentsObject(argumentsList)
>    - CreateMapeedArguementsObject
>    - MakeArgGetter
>    - MakeArgSetter
> 5. Integer-Indexed
>    - [[GetOwnProperty]]
>    - [[HasProperty]]
>    - [[DefineOwnProperty]]
>    - [[Get]]
>    - [[Set]]
>    - [[OwnPropertyKeys]]
>    - IntegerIndexedObjectCreate
>    - IntegerIndexedElementGet
>    - IntegerIndexedElementSet
> 6. Module Namespace
>    - [[SetPrototypeOf]]
>    - [[IsExtensible]]
>    - [[PreventExtensions]]
>    - [[GetOwnProperty]]
>    - [[DefineOwnProperty]]
>    - [[HasProperty]]
>    - [[Get]]
>    - [[Set]]
>    - [[Delete]]
>    - [[OwnPropertyKeys]]
>    - ModuleNamespaceCreate
> 7. Immutable
>    - [[SetPrototypeOf]]
>    - SetImmutablePrototype

这七个特殊的JS对象，有一些公用的方法，取决于提供的功能，像是Module和Arguments都具有访问和修改的方法。Module还可以进行拓展，Bound Function基本上是只有一个调用的功能。除了Immutable，其他对象都有Create的方法存在。

---

#### 本周小结：

本周的学习，忘记在视频课的过程中需要跟着老师写代码，很多时候就是光听，没有太多的理解和吸收在这一点上给自己带来很大的亏。再来就是这两节课的知识也开始深入JS，从标准中其实能看到一些注意点，就是这句话都是读得懂的，但是总感觉知识串联不起来，这是目前最大的问题。再来就是这一周本职工作比较忙，也没能做好时间上的分配，学习上还是存在一些方法的欠缺。

**下周计划**

1. 认真听课，跟着老师写代码
2. 阅读其他同学的作业，从中学习，看看有哪些不一样的想法和思路。
3. 找助教沟通和交流，给自己一个意识，自己是有人可以寻求帮助的。