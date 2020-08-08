# 实验室网站前端页面

React+AntDesign


## 问题与解决

1. SVG动态添加不起作用
   > 需要使用`document.createElementNS`创建svg和path元素
2. `display: none`不会触发transition
   > display更改会重绘，所以只能使用`visibility:hidden`+绝对定位实现