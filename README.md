# Talk
基于Node.js技术开发的一个介于微博和论坛的小项目


## 开发计划
1. 登录注册(已基本成完)
2. 个人基本信息(已基本成完)
3. 发表说说
4. 首页显示说说
5. 分页
6. 成员列表和用户个人主页
7. 用户列表
8. 待续


以上内容只是初步想法，以后根据实际情况修改。


## 相关技术
#### 后端
* `node.js` 
* `express ` Node.js 框架
* `ejs` 前端模板
* `express-session`
* `formidable`前端表单数据提交
* `mongodb` 芒果数据库
* `silly-datetime` 时间戳插件

#### 前端
* `jquery`
* `bootstrap`
* `toast.js` 消息提示框插
* `cropper.js` 图片裁剪插件


#### 数据库
* `Mongodb`


#### 开发环境
* `Node`
* `Mongodb`

#### 数据库表
* `users` 用户表



## 功能模块说明
1. 登录注册 (login.ejs，register.ejs)
>登录注册  比较简单,就是插入数据和查找数据 。在Model文件夹下面db.js中已经好的底层的方法，直接调用就好。这要注意的是在登录后
生成session。

2. 个人信息(personal.ejs)
>个人信息的修改页面比较复杂，前台页面主要是头像的上传和裁剪，我这用到jquery插件cropper.js，这个插件功能差不错方便。
这个我将数据全部提交到后台(图片是裁剪后 生产数据流 传入后台)，


## 更新记录
1. 2017/07/26 开坑
2. 2017/07/27 创建 首页
3. 2017/07/27 前台注册页面的完成，验证，和ajax
4. 2017/07/28 完成注册用户功能
5. 2017/07/28 注册时 验证用户名是否存在
6. 2017/07/28 注册时 验证用户名是否存在
7. 2017/08/01 注册完善
8. 2017/08/10 登录功能完成
8. 2017/08/18 个人信息的前台验证和后台数据提交
8. 2017/08/28 个人信息的头像裁剪和上传并保存数据库中

> 这个项目是我在公司有空时候做的 ， 现在还在学习Node.js，在用这个项目做练习，给位有什么好的建议和意见欢迎提出来


## 历程
#### 1. 2017/07/26
开坑，动手这个项目，用的是MVC架构。这是第一次用Node.js开发一个项目，也是一次前后台一起写。


#### 2. 2017/08/10
动手做项目快一个月了，现在已完成登录注册，基本的雏形已经有了，有些地方的细节不够完善

#### 3. 2017/08/18
个人信息的填写页面 做好久，其中图片上传和裁剪部门有点复杂。这里 我没有将图片上传到后台进行裁剪，而是在前台裁剪后通过数据流的形式
传入到后台处理。

#### 4. 2017/08/28
终于把个人信息页面完成了，这个上传图片并保存在后台搞了我一天的时间。不过挺值的，让对node.js有了更深的了解

> 路漫漫其修远兮 吾将上下而求索
