# Lab418实验室网站

USTC网络安全实验室网站代码，采用SpringBoot+React编写

## 添加功能

**请按照如下步骤添加功能，不要直接push！**

1. 提issue描述功能，确定前端、后端的设计与实现，确定前后端接口
2. fork之后在**自己fork的项目**中完成编码与开发，并同步更新REAME.MD
3. 给**本项目**提交Pull request，由至少一个人review后，approve或request changes继续修改
4. 合并，处理冲突（如果有），完成

## 功能列表
- 常用信息展示
  - 添加
  - 修改
  - 删除
- 剪贴板
- 文件库 - 临时/永久
- 身份认证，系统
- 富文本编辑器

## 进行中的功能
- 容器化部署: 使用docker部署

## 已确定接口
| 接口名                 | 路径        | 方法 | 参数              | 返回值                            |
| ---------------------- | ----------- | ---- | ----------------- | --------------------------------- |
| 获取某个或所有常用信息 | /doc        | GET  | title             | `[{title, paragraph, timestamp}]` |
| 删除某一常用信息       | /doc/delete | GET  | title             | `{code, message}`                 |
| 增加常用信息           | /doc/add    | POST | {title,paragraph} | `{code,message}`                  |
| 修改常用信息           | /doc/update | POST | {title,paragraph} | `{code,message}`                  |
| 获取论文评级          | /ccf?paper={} | GET | paper | `[{title,con_abbr,conference,degree}]` |
### code,message

| code | message       | explain                              |
| ---- | ------------- | ------------------------------------ |
| 400  | DOC_EXISTED   | 添加/更新文档标题冲突                |
| 401  | DOC_NOT_FOUND | 更新文档失败，文档未找到(可能已删除) |
| 200  | SUCCESS       | 操作正常                             |

## 已完成功能

- 功能: 常用信息展示

-----

- 接口:获取所有常用信息  `/doc GET [doc]` &`/doc?title={} GET [doc]`
- 接口:删除某一常用信息  `/doc/delete?title={} GET`,删除成功时code为200，删除失败code返回400
- 接口:增加常用信息 `/doc/add POST` {title,paragraph} 添加成功返回200，如果已存在返回400
- 接口:修改某一信息 `/doc/update POST`  {title,paragraph} 修改成功为200，不存在返回401
- 添加redis缓存
- 接口:根据论文名查找评级 `/ccf?paper={}` 返回可能的评级列表,`[{title,con_abbr,conference,degree}]`
-----

- UI: 卡片式，标题+markdown段落+时间戳
- UI: markdown编辑器完成，使用`CodeMirror+react-markdown`实现
- UI: 编辑、更新信息完成

## 数据库设计
- 文档数据库 doc

| 字段  | 类型 | 主键 | 是否为空 | 说明|
| ---------------------- | ----------- | ---- | ----------------- | --------------------------------- |
| title |   Varchar | 是  | 不能 | 文档标题 |
| paragraph | Text |   |              | 文档内容 |
| timestamp | Long |  |  | 时间戳,ms单位 |


## 数据库文件

部署时会将`/lab418/mysql/data`挂载到数据库容器内的`/var/lib/mysql`下

