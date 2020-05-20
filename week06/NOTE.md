# Week06

### 有限状态机

1. 每一个状态都是一个机器
   - 在每一个机器里，我们可以做计算、存储、输入……
   - 所有的这些机器接受的输入是一致的
   - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数(无副作用)
2. 每一个机器知道下一个状态
   - 每一个机器都有确定的下一个状态(Moore)
   - 每一个机器根据输入决定下一个状态(Mealy)

### JS中的有限状态机（Mealy）

```js
// 每一个函数是一个状态
function state(input) // 函数参数就是输入
{
  // 在函数中，可以自由地编写代码，处理每个状态的逻辑
  return next; // 返回值作为下一个状态
}

// 以下是调用
while(input) {
  // 获取输入
  state = state(input); // 把状态机的返回值作为下一个状态
}
```





```js
function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
};

function start(c) {
  if (c === 'a') {
    return foundA;
  } else {
    return start;
  }
}

function end() {
  return end;
}

function foundA(c) {
  if (c === 'b') {
    return foundB;
  } else {
    return start;
  }
}

function foundB(c) {
  if (c === 'c') {
    return foundC;
  } else {
    return start;
  }
}

function foundC(c) {
  if (c === 'd') {
    return foundD;
  } else {
    return start;
  }
}

function foundD(c) {
  if (c === 'f') {
    return end;
  } else {
    return start;
  }
}
```



###### 作业

1. 使用状态机匹配 `abababx`
2. 使用函数的方式来修改上接口的状态机
3. 对pattern的匹配，KMP算法，时间复杂度是O(m + n)

---

##### 使用状态机匹配`abababx`

```js
function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
};

function start(char) {
  if (char === 'a') {
    return foundA1;
  } else {
    return start;
  }
}

function end() {
  return end;
}

function foundA1(char) {
  if (char === 'b') {
    return foundB1;
  } else {
    return start;
  }
}

function foundB1(char) {
  if (char === 'a') {
    return foundA2;
  } else {
    return start;
  }
}

function foundA2(char) {
  if (char === 'b') {
    return foundB2;
  } else {
    return start;
  }
}

function foundB2(char) {
  if (char === 'a') {
    return foundA3;
  } else {
    return start;
  }
}


function foundA3(char) {
  if (char === 'b') {
    return foundB3;
  } else {
    return start;
  }
}

function foundB3(char) {
  if (char === 'x') {
    return end;
  } else {
    return start;
  }
}

match('abababx');
```





### 构建DOM树和CSS计算

```js
// parse.js

const css = require('css');

let currentToken = null;
let currentAttribute = null;

let stack = [{type: 'document', children: []}];
let currentTextNode = null;

let rules = [];
function addCSSRules(text) {
  var ast = css.parse(text);
  // console.log(JSON.stringify(ast, null, '  '));
  rules.push(...ast.stylesheet.rules);
}

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

function specificity(selector) {
  var p = [0, 0, 0, 0];
  var selectorParts = selector.split(' ');
  for (var part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1;
    } else if (part.charAt(0) === '.') {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

function computeCSS(element) {
  var elements = stack.slice().reverse(); // 命中对应的CSS节点
  if (!element.computedStyle) {
    element.computedStyle = {};
  }

  for (let rule of rules) {
    var selectorParts = rule.selectors[0].split(' ').reverse();
    if(!match(element, selectorParts[0])) {
      continue;
    }

    let matched = false;

    var j = 1;
    for (var i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
    }
    if (j >= selectorParts.length) {
      matched = true;
    }

    if (matched) {
      var sp = specificity(rule.selectors[0]);
      var computedStyle = element.computedStyle;
      for (var declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {};
        }

        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
      // console.log(`Element ${element} matched rule ${rule}`); // 匹配成功
      console.log(JSON.stringify(element, null, '  ')); // 匹配成功
    }
  }
}

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    computeCSS(element); // TODO: 计算CSS的位置很重要，这里会触发重排，然后触发重绘

    top.children.push(element);
    element.parent = top;

    if (!token.isSelfClosing) {
      stack.push(element);
    }

    currentTextNode = null;

  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error('Tag start end doesn\'t match!');
    } else {
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content);
      }
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

const EOF = Symbol('EOF'); // EOF: End Of File

function data(c) {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: 'EOF'
    })
    return ;
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c);
  } else {
    emit({
      type: 'text',
      content: c
    })
    return;
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; //.toLowerCase()
    return tagName;
  } else if (c === '>') {
    emit(currentToken);
    return data;
  } else {
    currentToken.tagName += c;
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    // return beforeAttributeName;
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === '\"' || c === '\'' || c === '<') {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c == '=') {
    return beforeAttributeValue;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    }
  }
  return attributeName(c);
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '//' || c === '>' || c === EOF) {
    return beforeAttributeValue;
  } else if (c === '\"') {
    return doubleQuotedAttributeValue;
  } else if (c === '\'') {
    return singleQuotedAttributeValue;
  } else if (c === '>') {
    // return data;
  } else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === '\"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {

  } else if (c === '\"' || c === '\'' || c === '<' || c === '=' || c === '`') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {

  } else {

  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c);
  } else if (c === '>') {

  } else if (c === EOF) {

  } else {

  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  console.log(stack[0]);
  return stack[0];
}

```

跟着视频写代码的问题是，很容易在一些细节上出错，就是不等或者全等的时候。在CSS计算的部分，其实关键的是将CSS和DOM合二为一，这样便于之后的渲染，所以计算CSS的位置尤为重要，这样才不会影响页面的渲染。