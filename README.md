## 功能
1、【新增】后台用户管理充值

2、【新增】小程序审核模式

3、【新增】后台查询ChatGPT余额、【新增】后台自义定配置小程序标题、欢迎语

4、【新增】关键词过滤功能

5、已对接流量主 – 已完成

6、转发领次数 – 已完成

7、看广告领次数 – 已完成

8、包月套餐 – 已完成

9、关键词过滤功能 – 已完成

10、多开版 – 已完成

11、分销 – 已完成

12、H5版 – 开发中

13、对接公众号 – 开发中


ChatGPT为你服务:

1. 知乎百度答题、做作业题目

2. 写代码、写文案、写论文，写小说

3. 文案润色、翻译、写诗作词

4. 扮演面试官、扮演书籍电影角色

5. 陪聊倾诉、解忧、讲故事．

6. 项目判断，资源寻找，百度答题

## 体验

[]()

![小程序界面](https://i.328888.xyz/2023/03/09/oHZQ5.png "小程序界面")
![小程序二维码](https://i.328888.xyz/2023/03/09/oHAnH.jpeg "小程序二维码")
## 后台安装步骤：

- 在宝塔新建个站点，php版本使用7.2 、 7.3 或 7.4，将“server”文件夹里的文件上传到站点根目录，运行目录设置为/public
- 导入数据库文件，数据库文件是 /db.sql
- 修改数据库连接配置，配置文件是/.env
- 正式使用时，请把调试模式关闭：/.env文件第一行，true改成false
- 超管后台地址：http://域名/super  初始账号密码：super  123456   及时修改
- 后台地址：http://域名/admin  初始账号密码：admin  123456   及时修改

## 小程序上传：

- 打开站点后台，找到小程序配置：系统->小程序->参数配置，配置小程序参数
- 在后台小程序管理“上传代码”页面，填入上传密钥，并配置好小程序的ip白名单，点击上传代码按钮
- 上传完成以后，登录小程序后台体验一下，没问题即可提交审核

**注意：需先配置支付参数、ChatGPT参数，否则小程序会因为功能不正常而驳回审核**

有问题联系QQ1396890578 微信cai139689 