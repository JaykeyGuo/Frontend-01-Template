# W20-Geek-FE

### 无头浏览器

Phantom JS

将bin文件放到系统的bin文件夹里，就可以在控制台执行。

通过Phantom JS可以直接渲染出对应的页面图片，或者是获取对应的DOM结点。

---

先访问对应的链接，获取到github回调的code，然后处理通过code换取accesstoken，再通过accesstoken换取用户信息。

---

1. 获取code，这一步需要在浏览器中执行，通过node，在命令行中打开浏览器，得到github的回调code
2. 通过code换取token，在后端服务通过code换取对应的token，并通过token生成一个对应带有publish的a标签
3. 点击发布标签，在publish-tool中完成对应的身份验证之后，即可发布对应的文件到服务器。

代码详见：toy-publish，或者是 https://github.com/JaykeyGuo/toy-publish