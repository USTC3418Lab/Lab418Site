# Lab418实验室网站

USTC网络安全实验室网站代码，采用SpringBoot编写，

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

-----

- UI: 卡片式，标题+markdown段落+时间戳
- UI: markdown编辑器完成，使用`CodeMirror+react-markdown`实现
- UI: 编辑、更新信息完成

## 数据库文件

部署时会将`/lab418/mysql/data`挂载到数据库容器内的`/var/lib/mysql`下
