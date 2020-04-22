# W02-Geek-FE

## 200416-第三次课

##### 语言的分类

> - 非形式语言：中文、英文
> - 形式语言（乔姆斯基谱系） 

###### 产生式 BNF

````
"a"

"b"

<Number> ::= '0' | '1' | ... | '9'

<DecimalNumber> ::= '0'| (('1' | '2' | ... | '9') <Number>)
<DecimalNumber> ::= /0|[1-9][1-9]*/

<PrimaryExpression> ::= <DecimalNumber> |
	'(' <LogicalExpression> ')'

<MultiplicativeExpression> ::= <DecimalNumber> | 
	<MultiplicativeExpression> '*' <DecimalNumber>
	<MultiplicativeExpression> '/' <DecimalNumber>

<AdditiveExpression> ::= <MultiplicativeExpression> |
	<AdditiveExpression> '+' <DecimalNumber>
	<AdditiveExpression> '-' <DecimalNumber>

<LogicalExpression> ::= <AdditiveExpression> |
	<LogicalExpression> '||' <AdditiveExpression> |
	<AdditiveExpression> '&&' <AdditiveExpression>
````

使用正则表达式对语言的扫描叫正则分析（词法分析）

> Object.prototype是唯一没有原型的

###### 图灵完备性

* 命令式 -- 图灵机
  * goto
  * if while
* 声明式 -- lambda
  * 递归
  * 分治



## 200418-第四次课-JS词法、类型

从JS支持的字符集开始讲起：Unicode

> JS本身就是支持Unicode字符集的。

[**Unicode**](https://zh.wikipedia.org/wiki/Unicode)（中文：万国码、国际码、统一码、单一码）是[计算机科学](https://zh.wikipedia.org/wiki/電腦科學)领域里的一项业界标准。它对世界上大部分的[文字系统](https://zh.wikipedia.org/wiki/文字系統)进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。

`&nbsp;`HTML中这个一直不知到是什么含义，也没有主动去查，才找到是 no-break space的意思。

第四次课主要是从最小的元素Atom来讲起，就是构成JS代码的最小元素，从Unicode讲到ECMA262中对应的定义标准，有了上节课的BNF的知识，不会对这节课的内容感到陌生，再来就是对应的一些类型，最基本的InputElement

> InputElement
>
> - WhiteSpace
> - LineTerminator
> - Comment
> - Token

课上也讲到浮点数计算的问题，但是遇到一个遗留问题是：

> `1.3 + 1.1 - 2.4`这计算通过和`Number.EPSILON`做比较的时候并不能很好的处理这个精度问题

JS浮点数的计算还是需要采用转换成整数的方式来进行，这样不会出现精度的问题。



---

#### 作业

> 1. 写一个正则表达式 匹配所有 Number 直接量
> 2. 写一个 UTF-8 Encoding 的函数
> 3. 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

###### 1、写一个正则表达式 匹配所有 Number 直接量

```js
// 没错，我第一个想到的就是这个
const reg = /\d/
```

```js
NumericLiteral ::
	DecimalLiteral
	BinaryIntegerLiteral
	OctalIntegerLiteral
	HexIntegerLiteral
  
DecimalLiteral ::
	DecimalIntegerLiteral . DecimalDigitsopt ExponentPartopt
	. DecimalDigits ExponentPartopt
	DecimalIntegerLiteral ExponentPartopt
  
DecimalIntegerLiteral ::
	0
	NonZeroDigit DecimalDigitsopt

DecimalDigits ::
	DecimalDigit
	DecimalDigits DecimalDigit
  
DecimalDigit :: one of
	0 1 2 3 4 5 6 7 8 9

NonZeroDigit :: one of
	1 2 3 4 5 6 7 8 9

ExponentPart ::
	ExponentIndicator SignedInteger
  
ExponentIndicator :: one of
	e E
  
SignedInteger ::
	DecimalDigits
	+ DecimalDigits
	- DecimalDigits

BinaryIntegerLiteral ::
	0b BinaryDigits
	0B BinaryDigits
  
BinaryDigits ::
	BinaryDigit
	BinaryDigits BinaryDigit
  
BinaryDigit :: one of
	0 1

OctalIntegerLiteral ::
	0o OctalDigits
	0O OctalDigits
  
OctalDigits ::
	OctalDigit
	OctalDigits OctalDigit

OctalDigit :: one of
	0 1 2 3 4 5 6 7

HexIntegerLiteral ::
	0x HexDigits
	0X HexDigits

HexDigits ::
	HexDigit
	HexDigits HexDigit
  
HexDigit :: one of
	0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
```



###### 2、写一个 UTF-8 Encoding 的函数

```js
function encodeUTF8(str) {
	return str.split('').reduce((acc, item) => acc += `\\u${item.charCodeAt().toString(16).padStart(4, '0')}`, '');
}

function encodeUTF8(str) {
	return str.split('').map((i) => `\\u${i.charCodeAt().toString(16).padStart(4, '0')}`).join('');
}
```



###### 3、写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

