# W18-Geek-FE

###### Server

- Build: webpack, babel, vue, jsx, postcss
- Watch: fsevent
- mock: ...
- http: ws

###### Client

- Debugger: vscode, devtool
- Source map

---

##### Babel

babel的编译主要是配置好对应的babelrc。



##### NPM

`npm install npm`

npm可以通过自举来配置自己的npm，所以也可以通过npm来实现自己的npm的包配置。



##### fsevents

fsevents可以监听对应的文件变化，在对应的文件变化之后可以做对应的处理。



##### Debugger

**如何产生debugger的断点？**

node启用一个监听进程 与 V8在同一个进程中，vscode 与 node 进程同步。这样在V8中的断点，就能通过node监听，通过ws来实现。

也是一个Client和Server的模式。



##### Devtool（as a Client）

基于Chrome的一个devtool的协议，可以较好的完成一个对应的devtool的设计和开发。



##### Source map

[JS Source Map](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

---

小结：

1. fsevents有很强的能力，通过ws来实现对文件的监听，然后在调用对应的包来处理事件，通过这个工具可以实现一个webpack的热加载。
2. devtool实际上还是一个客户端，关键是node和这个客户端的v8在同一个进程里面，两个建立监听的关系之后，就可以实现debugger的功能。

