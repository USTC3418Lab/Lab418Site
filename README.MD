# Lab418实验室网站

USTC网络安全实验室网站代码，采用SpringBoot编写，

## 待完成功能
- 常用信息展示
  - 功能细分
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
| 接口名           | 方法 | 参数 | 返回值                            |
| ---------------- | ---- | ---- | --------------------------------- |
| 获取所有常用信息 | GET  | title   | `[{title, paragraph, timestamp}]` |


## 已完成功能
- 常用信息展示
  - 功能细分 - 展示常用信息及时间戳
    - 数据格式:
      ```
      {
          "doc": {
              "title": str,
              "paragraph": str,
              "timestamp": long integer,
          }
      }
      ```
    - 说明: 使用GET请求获取所有信息，展示时根据时间戳由大到小排列文章。修改时直接POST整个，修改后更新时间戳

### 已确定接口
| 接口名           | 方法 | 参数 | 返回值                            |
| ---------------- | ---- | ---- | --------------------------------- |
| 获取所有常用信息 | GET  | 无   | `[{title, paragraph, timestamp}]` |
| 获取单个常用信息 | GET | title | `{title, paragraph, timestamp}` |
| 删除某一常用信息 | GET | title | `{code, message}` |
| 增加常用信息 | POST | {title,paragraph} | `{code,message}` |
| 修改常用信息 | POST | {title,paragraph} | `{code,message}` |

## 已完成功能
- 接口:获取所有常用信息  `/doc GET [doc]` &`/doc?title={} GET [doc]`
- 接口:删除某一常用信息  `/doc/delete?title={} GET`,删除成功时code为200，删除失败code返回500
- 接口:增加常用信息 `/doc/add POST` {title,paragraph} 添加成功返回200，如果已存在返回400
- 接口:修改某一信息 `/doc/update POST`  {title,paragraph} 修改成功为200，不存在返回401
- 添加redis缓存

- UI：卡片式，正文：标题+段落，右上角：时间戳+编辑按钮+删除按钮，按钮以icon形式展示
