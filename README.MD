# Lab418实验室网站

USTC网络安全实验室网站代码，采用SpringBoot+React编写

### 如何构建

本项目采用前后端分离方式编写，文件夹结构如下:
```sh
.
├── deploy      # 部署脚本及dockerfile等
├── frontend    # 前端项目代码
├── LICENSE
├── .mvn        
├── mvnw.cmd    # 后端maven文件
├── mvnw
├── pom.xml
├── postman     # postman测试
├── README.MD
└── src         # 后端代码
```

### 构建前端

前端位于`frontend`目录中，使用`npm`构建，并且需要在构建后拷贝到后端代码的`static`文件夹下:
```sh
cd frontend/
npm run build
cp -rf build/* ../src/main/resources/static/
```

### 构建后端

在根目录运行`mvn compile`或在IDE中直接运行打包后端，生成`target/LabSite*.war`文件，之后通过tomcat部署即可。

**注意**：你可能需要更改[application.properties](https://github.com/USTC3418Lab/Lab418Site/blob/master/src/main/resources/application.properties)中的数据库等配置信息，其中
- `spring.datasource.password`字段需要通过[测试文件](https://github.com/USTC3418Lab/Lab418Site/blob/63ea52fa239ba7f5a03ffb46268b16b4d3f7d87b/src/test/java/com/example/jeffrey/LabSite/LabSiteApplicationTests.java#L32)生成。
- `config.basePath=/lab418/clouddisk`字段为网盘功能根目录，执行如下命令创建
  ```sh
  sudo mkdir -p -m 777 /Lab418/clouddisk/
  ```

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
- 内部网盘
- 富文本编辑器

## 已完成接口

| 接口名                 | 路径                 | 方法 | 参数                     | 返回值                                      | 返回值说明                 |
| ---------------------- | -------------------- | ---- | ------------------------ | ------------------------------------------- | -------------------------- |
| 获取某个或所有常用信息 | /doc                 | GET  | title                    | `[{title, paragraph, timestamp}]`           | 默认值                     |
| 删除某一常用信息       | /doc/delete          | GET  | title                    | `{code, message}`                           | 默认值                     |
| 增加常用信息           | /doc/add             | POST | {title,paragraph}        | `{code,message}`                            | 默认值                     |
| 修改常用信息           | /doc/update          | POST | {title,paragraph}        | `{code,message}`                            | 默认值                     |
| 剪贴板-获取历史记录    | /clipboard           | GET  | 无                       | `[{id, text, timestamp}]`                   | 默认值                     |
| 剪贴板-删除记录        | /clipboard/delete    | GET  | id(long)                 | `{code, message}`                           | 默认值                     |
| 剪贴板-添加记录        | /clipboard/add       | POST | text(str)                | `{code, message}`                           | 默认值                     |
| 获取论文评级           | /ccf?paper={}        | GET  | paper                    | `[{title,href,conference,degree}]`          | 默认值                     |
| 获取所有文件内容       | /cloud-disk          | GET  | 无                       | `[{title, isLeaf, key, children: [{...}]}]` | JSON数组                   |
| 上传单个文件           | /cloud-disk/upload   | POST | {file, dir}              | `{code, message}`                           | 默认值                     |
| 删除某个文件           | /cloud-disk/delete   | POST | filepath（包含文件全名） | `{code, message}`                           | 默认值                     |
| 下载某个文件           | /cloud-disk/download | GET  | filepath（包含文件全名） | 文件内容的数据流                            | 浏览器会自动识别为文件下载 |
| 新建文件夹             | /cloud-disk/mkdir    | POST | filepath（包含文件夹名） | `{code, message}`                           | 默认值                     |

**注**: 获取所有文件内容返回值
```
clouddisk
├── a
│   └── tmp.txt
├── cpp
│   ├── main.cpp
│   └── test.cpp
├── hello.h
└── world.py
```
```json
[
    {
        "title": "a",
        "isLeaf": false,
        "children": [
            {
                "title": "tmp.txt",
                "isLeaf": true,
                "children": null
            }
        ]
    },
    {
        "title": "cpp",
        "isLeaf": false,
        "children": [
            {
                "title": "main.cpp",
                "isLeaf": true,
                "children": null
            },
            {
                "title": "test.cpp",
                "isLeaf": true,
                "children": null
            },
        ]
    },
    {
        "title": "hello.h",
        "isLeaf": true,
        "children": null
    },
    {
        "title": "world.py",
        "isLeaf": true,
        "children": null
    },
]
```

## code,message


| code | message       | explain                              |
| ---- | ------------- | ------------------------------------ |
| 200  | SUCCESS       | 操作正常                             |
| 400  | DOC_EXISTED   | 添加/更新文档标题冲突                |
| 401  | DOC_NOT_FOUND | 更新文档失败，文档未找到(可能已删除) |
| 500  | MESSAGE       | 操作失败，message为失败原因          |

## 已完成功能

- 功能: 常用信息展示
  - 获取所有常用信息  `/doc GET [doc]` &`/doc?title={} GET [doc]`
  - 删除某一常用信息  `/doc/delete?title={} GET`,删除成功时code为200，删除失败code返回400
  - 增加常用信息 `/doc/add POST` {title,paragraph} 添加成功返回200，如果已存在返回400
  - 修改某一信息 `/doc/update POST`  {title,paragraph} 修改成功为200，不存在返回401
- 功能: 剪贴板-文本分享
  - 获取剪贴板历史记录，返回JSON数组
  - 删除记录，成功200，否则400
  - 添加记录，成功200，否则400
- 添加redis缓存
- 接口:根据论文名查找评级 `/ccf?paper={}` 返回可能的评级列表,`[{title,href,conference,degree}]`
- 网盘功能


## 数据库设计
- 文档数据库 doc

| 字段      | 类型    | 主键 | 是否为空 | 说明          |
| --------- | ------- | ---- | -------- | ------------- |
| title     | Varchar | 是   | 不能     | 文档标题      |
| paragraph | Text    |      |          | 文档内容      |
| timestamp | Long    |      |          | 时间戳,ms单位 |


## 数据库文件

部署时会将`/lab418/mysql/data`挂载到数据库容器内的`/var/lib/mysql`下

