# Web端更新日志
## [4.0.0] - 2017-07-06

### 新增

- 新增机器人消息收发接口
- 新增机器人默认bot类型消息的xml解析方法
- 新增聊天室发送消息可选不保存历史消息配置

### 变更

- 修复部分iPhone机型断网重连后协议解析问题
- 修复转发消息数据库记录有误的问题

## [3.8.0] - 2017-06-06

### 新增

- 新增通用同步图片预览接口，支持私有化定制方案
- 连接初始化支持选择连接协议

### 变更

- 修复忽略群通知消息配置以后，对群状态更改相关bug
- 修复不开启数据库情况下，会话未读数不准的问题

## [3.6.0] - 2017-04-27

### 新增

- 发布订阅事件，以及多端登录状态事件的订阅

### 变更

- 修复若干开启同步会话未读数后产生的bugs

## [3.5.0] - 2017-03-15

### 新增

- 聊天室获取历史消息记录支持双向查询

## [3.4.0] - 2017-01-20

### 变更

- 优化 SDK 内部同步操作, 加快同步速度
- 获取本地消息去掉数量限制, 由开发者自己控制

## [3.3.0] - 2016-12-28

### 变更

- 优化连接建立方式

## [3.2.0] - 2016-11-30

### 新增

- [会话初始化参数](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#会话初始化参数) syncSessionUnread, 是否同步会话的未读数

### 变更

- [获取本地历史记录](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取本地历史记录), 详情参考文档

## [3.1.0] - 2016-10-26

### 新增

- [群对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群对象)增加`mute`字段
- [获取群禁言成员列表](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取群禁言成员列表)
- [发送消息的配置选项](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送消息的配置选项)增加开启易盾的参数
- [自定义系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#自定义系统通知)增加开启易盾的参数
- [发送聊天室消息的配置选项](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送聊天室消息的配置选项)增加开启易盾的参数
- [聊天室通知消息的类型](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#聊天室通知消息的类型)增加全体禁言的通知类型

## [2.8.0] - 2016-08-30

### 新增

- [消息撤回](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息撤回)

## [2.7.0] - 2016-08-11

### 变更

- [发送消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送消息)和[发送自定义系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#自定义系统通知)的时候, 如果发送方被接收方[加入了黑名单](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#加入黑名单/从黑名单移除), 那么将会发送失败, 返回错误码 7101

### 新增

- [获取用户名片](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取用户名片)和[获取用户名片数组](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取用户名片数组)可以传入参数`sync=true`来强制从服务器获取最新的数据
- [聊天室](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#聊天室)
  - [更新聊天室信息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新聊天室信息)
  - [更新自己在聊天室内的信息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新自己在聊天室内的信息)
- [图片操作](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#图片操作)增加了一系列预览图片的操作
- [发送消息的配置选项](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送消息的配置选项)增加了 apns 用于配置特殊推送选项, 只在群会话中使用

## [2.5.0] - 2016-07-08

### 变更
- [获取用户名片数组](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取用户名片数组)限制每次最多只能获取150个名片

### 新增

- [转发消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#转发消息)
- [重发消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#重发消息)
- [获取包含关键词的本地历史记录](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取包含关键词的本地历史记录)
  - 新增参数`global`表示是否全局搜索
- [同步开关`syncExtraTeamInfo`](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#同步开关), 控制是否同步额外的群信息, 默认`true`会同步额外的群信息, 目前包括
  - 当前登录用户是否开启某个群的消息提醒 (SDK 只是存储了此信息, 具体用此信息来做什么事情完全由开发者控制)
  - 调用接口[修改自己的群属性](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#修改自己的群属性)来关闭/开启某个群的消息提醒
  - 调用接口[是否需要群消息通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#是否需要群消息通知)来查询是否需要群消息通知
- [设置聊天室临时禁言](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#设置聊天室临时禁言)

## [2.4.0] - 2016-06-02

### 变更

- 在 Safari 下禁用数据库
- [发送消息已读回执](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送消息已读回执), 发送的时候请传入`session.lastMsg`

### 新增

- [群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群对象)字段增加
    - 群头像
    - 群被邀请模式
    - 群邀请模式
    - 群信息修改权限
    - 群信息自定义字段修改权限
- [修改自己的群属性](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#修改自己的群属性)字段增加
    - 扩展字段
- [更新群成员禁言状态](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新群成员禁言状态)
    - 对应的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息)类型为`'updateTeamMute'`

## [2.2.0] - 2016-04-28

- [获取本地系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取本地系统通知)加了一个参数`read`来限制已读状态

## [2.1.1] - 2016-04-18

### 变更

- 后续调用接口[初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)和[初始化聊天室](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化聊天室)时
    - 同时也会调用接口[更新配置](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新配置)和[更新聊天室配置](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新聊天室配置)更新传入的配置
    - 如果连接已断开, 会自动建立连接
- [发送本地消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送本地消息)
    - [消息对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息对象)增加一个字段`isLocal`表示是否是本地消息

## [2.1.0] - 2016-03-24

### 变更

- 使用 NIM.getInstance() 来[初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)
    - 此接口为单例模式, 对于同一个账号, 永远返回同一份实例, 即只有第一次调用会初始化一个实例, 后续调用此接口会直接返回初始化过的实例.
    - 增加[更新配置](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新配置)的接口
- 使用 Chatroom.getInstance() 来[初始化聊天室](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化聊天室)
    - 此接口为单例模式, 对于同一个账号的同一个聊天室, 永远返回同一份实例, 即只有第一次调用会初始化一个实例, 后续调用此接口会直接返回初始化过的实例.
    - 增加[更新聊天室配置](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新聊天室配置)的接口
- 聊天室回调`onmsg`变更为`onmsgs`, 传入的消息对象变更为消息数组
- 去掉初始化参数 dataSource

### 新增

- [已读回执](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#已读回执)
- [聊天室支持文件等各种类型的消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送聊天室消息)

## [2.0.2] - 2016-03-01

### 变更

- [普通群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群组)开放简介、公告和扩展字段
- [`session`](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#会话对象)增加`lastTextMsg`等字段

## [2.0.1] - 2016-02-19

### 变更

- [聊天室成员类型](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#聊天室成员类型)中的普通成员变更 "normal" -> "common"
- [设置聊天室普通成员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#设置聊天室普通成员)名字变更 markChatroomMemberLevel -> markChatroomCommonMember
- [设置聊天室普通成员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#设置聊天室普通成员)对应的[通知类型](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#聊天室通知消息的类型)变更
    - "addLevel" -> "addCommon"
    - "removeLevel" -> "removeCommon"
- 聊天室被关闭的时候, 聊天室成员收到的被踢通知的`reason`的值变更 "chatroomDismiss" -> "chatroomClosed"

## [2.0.0] - 2016-01-28

### 变更

- [发送自定义系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#自定义系统通知)返回拼装好的对象
- 去掉初始化参数 dataSource.getMsg 和 dataSource.getSysMsg, 由 SDK 来做消息和系统通知的过滤

### 新增

- [修改图片下载的名字](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#修改图片下载的名字)
- 取消文件上传, 请参考[发送文件消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送文件消息)
- [将音频url转为mp3](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#将音频url转为mp3)
- [语音转文字](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#语音转文字)

- 以下四个接口加了参数 `asc`, 默认`false`表示返回的消息按时间逆序排序; 传`true`表示按时间正序排序
    - [获取云端历史记录](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取云端历史记录)
    - [获取本地历史记录](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取本地历史记录)
    - [获取包含关键词的本地历史记录](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取包含关键词的本地历史记录)
- [群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息), 如果`attach`有`account`或者`accounts`字段, 那么`attach`的字段`users`包含这些账号对应的用户名片
- [聊天室](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#聊天室)

## [1.8.0] - 2016-01-18

### 修复

- 音频对象加了一个字段`mp3Url`
- 修复更新好友多端同步通知
- 修复离线自定义系统通知引起的存储问题

## [1.7.2] - 2015-12-30

### 修复

- 多Tab页可以使用数据库了
- 消息多端同步，未读数计数问题修复

## [1.7.1] - 2015-12-14

### 修复

- IE8 下不打开控制台，直接使用console会报错，已修复

## [1.7.0] - 2015-12-02

### 变更

- 断线自动重连
    - SDK 加入了断线自动的逻辑, 调整了`onerror`和`ondisconnect`的使用方法
    - 请参考开发手册中的[初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的关于`onwillreconnect`和`ondisconnect`的描述

- 同步
    - 所有同步接口均为增量同步, 请查看开发手册中的
        - [用户关系托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户关系托管) 中的初始化参数描述
        - [好友关系托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#好友关系托管) 中的初始化参数描述
        - [用户名片托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户名片托管) 中的初始化参数描述
        - [群组](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群组) 中的初始化参数描述
        - [会话](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#会话) 中的初始化参数描述
        - [消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息) 中的初始化参数描述
        - [系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#系统通知) 中的初始化参数描述
    - 去掉同步我的名片控制开关`syncMyInfo`

- [用户关系托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户关系托管)
    - 同步开关`syncBlacklistAndMutelist`名字变更为`syncRelations`
    - 方法`getBlacklistAndMutelist`名字变更为`getRelations`
    - `onblacklist` 和 `onmutelist` 收到的内容从账号数组变为对象数组, 包含以下几个字段
        - `account`, 账号
        - `updateTime`, 更新时间
        - `reocrd`, 拼装好的对象
        - 如果只关心账号, 那么可以将此对象数组转为账号数组
        ```
        var accounts = records.map(function(record) {
            return record.account;
        });
        ```
    - [加入黑名单/从黑名单移除](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#加入黑名单/从黑名单移除)、[加入静音列表/从静音列表移除](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#加入静音列表/从静音列表移除)以及对应的多端同步`onsyncmarkinblacklist`和`onsyncmarkinmutelist`, 都加了字段`record`包含拼装好的对象

- [用户名片托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户名片托管)
    - 增加回调`onupdatemyinfo`, 用于接收更新后的我的名片
    - 增加回调`users`, 用于接收好友的用户名片
    - 增加回调`onupdateuser`, 用于接收用户名片更新
    - 请参考开发手册中的 [用户名片托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户名片托管)的关于`onupdatemyinfo`、`users`和`onupdateuser`的描述

- [群组](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群组)
    - 创建群成功时传入的对象变了, 除了群对象, 额外传了创建者的信息, 请参考开发手册中的[创建群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#创建群)
    - 普通群, [拉人入群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#拉人入群)后, 所有[群成员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群成员对象)会收到一条类型为`'addTeamMembers'`的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息)。此类群通知消息的`attach`有一个字段`members`的值为被拉的群成员列表
    - 如果[接受邀请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#接受入群邀请), 那么该群的所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息), 此类群通知消息的`attach`有一个字段`members`的值为接收入群邀请的群成员列表
    - 如果[通过申请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#通过入群申请), 那么该群的所有群成员会收到一条类型为`'passTeamApply'`的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息), 此类群通知消息的`attach`有一个字段`members`的值为被通过申请的群成员列表
    - [添加群管理员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#添加群管理员)后, 所有[群成员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群成员对象)会收到一条类型为`'addTeamManagers'`的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息)。此类群通知消息的`attach`有一个字段`members`的值为被加为管理员的群成员列表
    - [移除群管理员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#移除群管理员)后, 所有[群成员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群成员对象)会收到一条类型为`'removeTeamManagers'`的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息)。此类群通知消息的`attach`有一个字段`members`的值为被移除管理员的群成员列表
    - [转让群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#转让群)后, 所有[群成员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群成员对象)会收到一条类型为`'transferTeam'`的[群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息)。此类群通知消息的`attach`有一个字段`members`的值为包含新旧群主的群成员列表

- [会话](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#会话)
    - 完善了会话机制, 请参考开发手册中的 [会话](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#会话)
        - 新的回调`onupdatesession`用于接收被更新的会话
        - 增加未读数管理机制
        - 新的方法
            - [设置当前会话](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#设置当前会话)
            - [重置会话未读数](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#重置会话未读数)
    - 增加了几个新字段, 请参考开发手册中的 [会话对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#会话对象)

- [消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息)
    - `onroamingmsgs` 和 `onofflinemsgs` 这两个回调为一个会话一个回调, 接收的内容从消息数组变更为一个对象, 包含以下几个字段
        - `session`, 会话
        - `scene`, 场景
        - `to`, 聊天对象
        - `msgs`, 消息数组, 按照时间正序排列
    - 消息对象的字段`idServer`类型变更为`String`, 影响方法`getHistoryMsgs`和`searchHistoryMsgs`
    - 消息增加了几个新字段, 请参考开发手册中的 [消息对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息对象)
    - 所有发送消息的接口均返回一个拼装好的[消息对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息对象)而不是消息的 `idClient`
        - 发送文本消息
        - 发送文件消息
            - 如果需要上传文件, 那么在`beforesend`收到要发送的[消息对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息对象)而不是消息的`idClient`
        - 发送`Geo`消息
        - 发送`tip`消息
        - 发送自定义消息
    - 发送消息的回调返回的也是一个拼装好的[消息对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息对象)
    - [本地历史记录](#本地历史记录)

- [系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#系统通知)
    - 完善了系统通知机制, 请参考开发手册中的 [系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#系统通知)
        - 增加回调`onupdatesysmsg`用于接收被更新的系统通知对象
        - 增加未读数管理机制
        - 收到系统通知后需要调用[标记系统通知为已读状态](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#标记系统通知为已读状态)来将系统通知标记为已读状态
    - 增加了几个新字段, 请参考开发手册中的 [系统通知对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#系统通知对象)
    - 所有拒绝、通过系统通知的接口加一个参数: 对应系统通知的`idServer`
        - passFriendApply
        - rejectFriendApply
        - acceptTeamInvite
        - rejectTeamInvite
        - passTeamApply
        - rejectTeamApply
    - 新的方法
        - [更新本地系统通知](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#更新本地系统通知)

### 新增

- 数据源, 请查看开发手册中的 [数据源](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#数据源)

- 数据库支持, 请查看开发手册中的 [数据库兼容性](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#数据库兼容性)

- 图片操作, 请参考开发手册中的 [图片操作](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#图片操作)

### 优化

- `onupdateteammember`接收到的对象只包含被更新的字段, 可以使用 `NIM.util.merge` 来合并数据
- `onsyncfriendaction(updateFriend)` 和 `updateFriend` 接收到的对象只包含被更新的字段, 可以使用 `NIM.util.merge` 来合并数据

- 日志样式优化

## [1.5.0] - 2015-09-30

### 变更

- 无

### 新增

- 用户名片托管, 请参考开发手册中的
    - [初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的关于`syncMyInfo`和`onmyinfo`的描述
    - [用户名片托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户名片托管)
- 静音群, 请参考开发手册中的
    - [修改自己的群属性](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#修改自己的群属性)

### 优化

- 无

## [1.4.0] - 2015-08-31

### 变更

- 去掉`onkicked`回调，如果被踢，在收到的`ondisconnect`回调里会包含被踢的相关信息
- 跟群相关名字变更，包括一系列的操作及对应的群通知消息类型和系统通知类型
    - 拉人入群从`'addMembers'`变更为`'addTeamMembers'`，对应的群通知消息的类型也从`'addMembers'`变更为`'addTeamMembers'`。
    - 踢人出群从`'removeMembers'`变更为`'removeTeamMembers'`，对应的群通知消息的类型也从`'removeMembers'`变更为`'removeTeamMembers'`。
    - 接受入群邀请从`'acceptInvite'`变更为`'acceptTeamInvite'`，对应的群通知消息的类型也从`'acceptInvite'`变更为`'acceptTeamInvite'`。
    - 拒绝入群邀请从`'rejectInvite'`变更为`'rejectTeamInvite'`，对应的系统通知类型也从`'rejectInvite'`变更为`'rejectTeamInvite'`。
    - 通过入群申请从`'passApply'`变更为`'passTeamApply'`，对应的群通知消息的类型也从`'passApply'`变更为`'passTeamApply'`。
    - 拒绝入群申请从`'rejectApply'`变更为`'rejectTeamApply'`，对应的系统通知类型也从`'rejectApply'`变更为`'rejectTeamApply'`。
    - 添加群管理员从`'addManagers'`变更为`'addTeamManagers'`，对应的群通知消息的类型也从`'addManagers'`变更为`'addTeamManagers'`。
    - 移除群管理员从`'removeManagers'`变更为`'removeTeamManagers'`，对应的群通知消息的类型也从`'removeManagers'`变更为`'removeTeamManagers'`。
    - 建议直接全局查找并替换相关名字。
    - 请参考开发手册中的
        - [群通知消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#群通知消息)
        - [系统通知类型](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#系统通知类型)
        - [拉人入群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#拉人入群)
        - [踢人出群](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#踢人出群)
        - [接受入群邀请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#接受入群邀请)
        - [拒绝入群邀请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#拒绝入群邀请)
        - [通过入群申请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#通过入群申请)
        - [拒绝入群申请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#拒绝入群申请)
        - [添加群管理员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#添加群管理员)
        - [移除群管理员](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#移除群管理员)
- 当前登录用户在其它端创建群后的回调，名字从`oncreateteam`变更为`onsynccreateteam`，另外添加了一系列其他的多端同步回调，请参考下面的文档

### 新增

- 用户关系托管
    - 请参考开发手册中的
        - [初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的关于`syncBlacklistAndMutelist`、`onblacklist`、`onmutelist`、`onsyncmarkinblacklist`和`onsyncmarkinmutelist`的描述
        - [用户关系托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#用户关系托管)
    - 消息对象加了一个字段`isMuted`来标明该消息在接收方是否应该被静音，请参考开发手册中的
        - [消息对象](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#消息对象)
- 好友关系托管, 请参考开发手册中的
    - [初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的关于`syncFriends`、`onfriends`和`onsyncfriendaction`的描述
    - [好友关系托管](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#好友关系托管)
    - [系统通知类型](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#系统通知类型)新增了与好友相关的类型
- 会话列表, 请参考开发手册中的
    - [初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的关于`syncSessions`和`onsessions`的描述
    - [获取会话列表](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#获取会话列表)
    - [删除会话](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#删除会话)
    - [批量删除会话](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#批量删除会话)
- 标记消息已读, 请参考开发手册中的
    - [初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的标记消息已读部分

### 优化

- 无

## [1.3.0] - 2015-07-31

### 变更

- 不支持断线自动重连，开发者可以手动重连，请参考
    - 开发手册中的[初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)的`ondisconnect`回调。
- 通过入群申请的参数`options.account`变更为`options.from`，请参考开发手册中的
    - [通过入群申请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#通过入群申请)
- 拒绝入群申请的参数`options.account`变更为`options.from`，请参考开发手册中的
    - [拒绝入群申请](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#拒绝入群申请)

### 新增

- 日志功能，请参考
    - 开发手册中的[初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#初始化SDK)
    - 开发手册中的[日志](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#日志)

### 优化

- IE8/IE9，上传文件超过100M时的错误提示，请参考开发手册中的
    - [预览文件](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#预览文件)
    - [发送文件消息](/docs/product/IM即时通讯/SDK开发集成/Web开发集成#发送文件消息)
