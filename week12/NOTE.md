# W12-Geek-FE

### 正则的使用
在正则中的括号，可以直接划分对应的匹配，在对应的解析之后，可以和数组中的值做对应的匹配，在课程中的这段代码其实是一一对应的：

```js
var regexp = /([0-9\.]+)|([ ])+|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g;

var dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/'];

// ... some code
regexp.exec(source);
// ... other code
```

这里exec解析出来的数组中的值是与 dictionary 一一对应的。


### Trie 字典树

