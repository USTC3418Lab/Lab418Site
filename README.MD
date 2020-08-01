# Lab418实验室网站

USTC网络安全实验室网站代码，采用SpringBoot编写，

## 待完成功能
- 常用信息展示
  - 功能细分
    - 添加
    - 修改
    - 删除
- 容器化部署
- 剪贴板
- 文件库 - 临时/永久
- 身份认证，系统
- 富文本编辑器

## 进行中的功能
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
| 删除某一常用信息 | GET | title | `{code, operation, message}` |

## 已完成功能
- 接口:获取所有常用信息  `/doc GET [doc]` &`/doc?title={} GET [doc]`
- 接口:删除某一常用信息  `/doc/delete?title={} GET`,删除成功时code为200，删除失败code返回500

