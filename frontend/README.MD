# 实验室网站前端页面

React + AntDesign + React-router + Axios + Codemirror + React-markdown

## 过程记录 - 使用React开发前端

**P.S.** 适当了解一下纯`HTML+CSS+JS`的开发会有很大帮助。

1. `create-react-app`创建项目 - 创建出的文件需要手动删除，一般只留下单文件和`public/index.html, src/`即可
2. `index.js` - 这个文件一般时将整个前端应用的所有组件渲染到某个HTML节点里。一般来说只有`ReactDom.render(<App />, document.getElementById("root"));`即可
3. `App.js` - 整个App组件。所有其他想要在网页种添加的组件都是该组件的child
4. `*.js` - 对于任何你想要**组件化**的UI，都可以分离出来，然后使用与`App.js`类似的方式创建
5. `*.css` - CSS在这里仍然可以使用，需要注意导入的顺序

组件化 - 倘若不组件化，则像**网络请求状态管理，UI-动画、显示状态管理以及前端路由**等都会接踵而至，到头来还是要将他们剥离出来抽象化。