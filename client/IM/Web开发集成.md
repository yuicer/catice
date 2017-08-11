# Web SDK 开发手册

## SDK 概述

网易云信 SDK 为 Web 应用提供一个完善的 IM 系统开发框架, 屏蔽掉 IM 系统的复杂的细节, 对外提供较为简洁的 API 接口, 方便第三方应用快速集成 IM 功能。
网易云信还开发了可供开发者们参考，如何使用该SDK的Web Demo：
- [Web源码导读](/docs/product/通用/Demo源码导读/即时通讯Demo/Web源码导读)
- [Web(移动端H5)源码导读(不包含音视频)](/docs/product/通用/Demo源码导读/即时通讯Demo/WebH5源码导读)

## <span id="开发准备">开发准备</span>

### 下载并引入 SDK 文件

- 从[云信官网](http://netease.im/im-sdk-demo)下载 Web SDK 并解压
- 目录结构介绍
  - 如果要在浏览器里面使用 SDK, 相应的 JS 文件都在 `js` 目录下.
  - 如果要在微信小程序里面使用 SDK, 相应的 JS 文件在 `weixin-app` 目录下.
- 选择并引入
  - 如果要使用 IM 功能, 请引入 `NIM_Web_NIM_v.js`
    - 如果通过 script 标签引入, 请通过 `NIM` 来获取引用
  - 如果要使用聊天室功能, 请引入 `NIM_Web_Chatroom_v.js`
    - 如果通过 script 标签引入, 请通过 `Chatroom` 来获取引用
  - 如果同时使用 IM 和聊天室功能, 请引入 `NIM_Web_SDK_v.js`
    - <p style='color: #d9534f;'>如果通过 script 标签引入, 请通过 `SDK.NIM` 和 `SDK.Chatroom` 来获取 `NIM` 和 `Chatroom` 的引用, 下文中的 API 都是通过 `NIM` 和 `Chatroom` 来调用的</p>
  - 如果要使用 IM 的插件版实时音视频功能, 请引入 `NIM_Web_Netcall_v.js`, 通过 `Netcall` 来获取引用, 调用 `NIM.use(Netcall)` 来加载实时音视频插件
  - 如果要使用 IM 的WebRTC实时音视频功能, 请引入 `NIM_Web_WebRTC_v.js`, 通过 `WebRTC` 来获取引用, 调用 `NIM.use(WebRTC)` 来加载实时音视频插件

### <span id="babel打包">babel打包</span>

如果开发者选用 webpack/babel 来打包, 那么请使用 exclude 将 SDK 文件排除, 避免 babel 二次打包引起的错误

### <span id="浏览器兼容性">浏览器兼容性</span>

云信 Web SDK (不包含实时音视频)兼容到 IE8
- IE8/IE9 需要将项目部署在 HTTPS 环境下才能连接到云信服务器, 其它高级浏览器可以在 HTTP 或者 HTTPS 环境下连接到云信服务器

### <span id="数据库兼容性">数据库兼容性</span>

在支持数据库的浏览器上 SDK 会将数据缓存到数据库中, 后续同步都是增量更新, 加快初始化速度

#### <span id="支持数据库">是否支持数据库</span>

```javascript
// 通过此 `boolean` 值来查看 SDK 在某个浏览器上是否支持数据库
NIM.support.db
```

#### <span id="不使用数据库">不使用数据库</span>

如果开发者不想使用数据库, 那么可以设置初始化参数`db`为`false`来禁用数据库

```javascript
var nim = NIM.getInstance({
    db: false
});
```

### <span id="微信小程序">微信小程序</span>

使用前请找技术支持开通功能

#### require

请查阅[开发准备](#开发准备)来下载并引入 SDK 文件

- [一个微信小程序同时只能有一个 WebSocket 连接](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-socket.html), 所以没有办法同时使用 NIM 和 Chatroom
- 示例代码如下

```
// 只使用 NIM
var NIM = require('NIM_Web_NIM_v')
// 只使用 Chatroom
var Chatroom = require('NIM_Web_Chatroom_v')
```

#### 接口调用

微信小程序的大部分接口跟浏览器环境完全一致, 如有不同会额外说明, 请查阅其它章节

#### 真机准备

在[微信公众品台](http://mp.weixin.qq.com/) > 设置 > 开发设置 > 服务器配置, 配置域名白名单. 注意一个月内可申请3次修改, 请慎重修改.

**设置 IM 需要的域名**

- request合法域名
  - lbs.netease.im
  - wlnimsc0.netease.im
- socket合法域名
  - wlnimsc0.netease.im
- uploadFile合法域名
  - nos.netease.com
- downloadFile合法域名
  - nos.netease.com

**设置聊天室需要的域名**

- request合法域名
  - wlnim43.netease.im
- socket合法域名
  - wlnim43.netease.im
- uploadFile合法域名
  - nos.netease.com
- downloadFile合法域名
  - nos.netease.com

### <span id="依赖说明">依赖说明</span>

- SDK 使用一系列开源库来更好的完成工作, 所有库均挂在 NIM 下面
    - SDK 使用 [es5-shim](https://github.com/es-shims/es5-shim "target=_blank") 来让低版本浏览器兼容 ES5 的[部分方法](http://kangax.github.io/compat-table/es5/#es5shim "target=_blank")
    - SDK 使用 [platform.js](https://github.com/bestiejs/platform.js/ "target=_blank") 来检测浏览器平台, 通过 `NIM.platform` 来获取此库的引用
    - SDK 使用 [socket.io-client 0.9](https://github.com/socketio/socket.io-client/tree/0.9 "target=_blank") 来建立 Socket 连接, 通过 `NIM.io` 或 `window.io` 来获取此库的引用

## <span id="初始化SDK">初始化 SDK</span>

请查阅[开发准备](#开发准备)来下载并引入 SDK 文件

### 示例代码

- 此接口为单例模式, 对于同一个账号, 永远返回同一份实例, 即只有第一次调用会初始化一个实例
- 后续调用此接口会直接返回初始化过的实例, 同时也会调用接口[更新配置](#更新配置)更新传入的配置
- 后续调用此接口时, 如果连接已断开, 会自动建立连接
- 当发生掉线时，SDK会自动进行重连
- 开发者在收到`onconnect`回调之后代表链接已经建立, 此时 SDK 会开始同步数据, 随后在收到[`onsyncdone`](#同步完成)回调之后表示 SDK 完成了数据同步工作, 此时开发者可以进行渲染UI等操作了。
- 这里的`data`代表数据, 在后面章节的示例代码中会多次用到这个对象
- 这里的`nim`代表 SDK, 在后面章节的示例代码中会多次用到这个对象.
- 这里的参数并不是所有的初始化参数, 请查阅其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

```javascript
var data = {};
// 注意这里, 引入的 SDK 文件不一样的话, 你可能需要使用 SDK.NIM.getInstance 来调用接口
var nim = NIM.getInstance({
    // debug: true,
    appKey: 'appKey',
    account: 'account',
    token: 'token',
    onconnect: onConnect,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    onerror: onError
});
function onConnect() {
    console.log('连接成功');
}
function onWillReconnect(obj) {
    // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log('即将重连');
    console.log(obj.retryCount);
    console.log(obj.duration);
}
function onDisconnect(error) {
    // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log('丢失连接');
    console.log(error);
    if (error) {
        switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
            break;
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
            break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
            break;
        default:
            break;
        }
    }
}
function onError(error) {
    console.log(error);
}
```

### 参数解释

- `debug`: 是否开启日志, 开发者可以开启日志, 这样 SDK 会将关键操作的信息打印到控制台上, 便于调试
- `appKey`: 在云信管理后台查看应用的 appKey
- `account`: 帐号, 应用内唯一
- `token`: 帐号的 token, 用于建立连接
- `transports`: 用于建立长连接的协议数组，可不填，默认为['websocket', 'xhr-polling']
  - 默认状态 sdk优先使用websocket连接，如果浏览器不支持websocket，则使用xhr-polling
  - 开发者可手动设置连接及顺序，可支持选项包括websocket、xhr-polling、flashsocket
  - 示例如： transports: ['websocket'、'xhr-polling'、'flashsocket']
- `onconnect`: 连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段
    - `lastLoginDeviceId`: 上次登录的设备的设备号
    - `connectionId`: 本次登录的连接号
    - `ip`: 客户端IP
    - `port`: 客户端端口
    - `country`: 本次登录的国家
- `onwillreconnect`: 即将重连的回调
    - 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    - 此回调会收到一个对象, 包含额外的信息, 有以下字段
        - `duration`: 距离下次重连的时间
        - `retryCount`: 重连尝试的次数
- `ondisconnect`: 断开连接后的回调
    - 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    - 此回调会收到一个对象, 包含错误的信息, 有以下字段
        - `code`: 出错时的错误码, 可能为空
            - `302`: 账号或者密码错误, 请跳转到登录页面并提示错误
            - `417`: 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
            - `'kicked'`: 被踢
- `onerror`: 发生错误的回调, 会传入错误对象

### <span id="同步完成">同步完成</span>

SDK 在同步完成之后会通知开发者, 开发者可以在此回调之后再初始化自己的界面, 以及进行其他操作, 同步的数据包括下面章节中的

- 黑名单, 对应回调 `onblacklist`, 请参考[用户关系托管](#用户关系托管)里面的初始化参数
- 静音列表, 对应回调 `onmutelist`, 请参考[用户关系托管](#用户关系托管)里面的初始化参数
- 好友, 对应回调 `onfriends`, 请参考[好友关系托管](#好友关系托管)里面的初始化参数
- 我的名片, 对应回调 `onmyinfo`, 请参考[用户名片托管](#用户名片托管)里面的初始化参数
- 好友的名片, 对应回调 `onusers`, 请参考[用户名片托管](#用户名片托管)里面的初始化参数
- 群, 对应回调 `onteams`, 请参考[群组](#群组)里面的初始化参数
- 会话, 对应回调 `onsessions`, 请参考[会话](#会话)里面的初始化参数
- 漫游消息, 对应回调 `onroamingmsgs`, 请参考[消息](#消息)里面的初始化参数
- 离线消息, 对应回调 `onofflinemsgs`, 请参考[消息](#消息)里面的初始化参数
- 离线系统通知, 对应回调 `onofflinesysmsgs`, 请参考[系统通知](#系统通知)里面的初始化参数
- 离线自定义系统通知, 对应回调 `onofflinecustomsysmsgs`, 请参考[系统通知](#系统通知)里面的初始化参数

**示例代码**

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

```javascript
var nim = NIM.getInstance({
    onsyncdone: onSyncDone,
});
function onSyncDone() {
    console.log('同步完成');
}
```

### <span id="同步开关">同步开关</span>

SDK 默认会同步所有的数据, 开发者可以通过开关来选择不同步某些数据, 这些开关都是初始化参数

- `syncRelations`, 是否同步黑名单和静音列表, 默认`true`. 如果传`false`就收不到黑名单和静音列表, 即不会收到`onblacklist`回调和`onmutelist`回调, 开发者后续可以调用[获取黑名单和静音列表](#获取黑名单和静音列表)来获取黑名单和静音列表。
- `syncFriends`, 是否同步好友列表, 默认`true`. 如果传`false`就收不到`onfriends`回调, 开发者后续可以调用[获取好友列表](#获取好友列表)来获取好友列表。
- `syncFriendUsers`, 是否同步好友对应的用户名片列表, 默认`true`, 如果传`false`就收不到`onusers`回调.
- `syncRobots`, 是否同步机器人列表，默认`false`, 如果传`false`就收不到`onrobots`回调。
- `syncTeams`, 是否同步群列表, 默认`true`. 如果传`false`就收不到群列表, 即不会收到`onteams`回调, 开发者后续可以调用[获取群列表](#获取群列表)来获取群列表.
- `syncExtraTeamInfo`, 是否同步额外的群信息, 默认`true`会同步额外的群信息, 目前包括
    - 当前登录用户是否开启某个群的消息提醒 (SDK 只是存储了此信息, 具体用此信息来做什么事情完全由开发者控制)
    - 调用接口[修改自己的群属性](#修改自己的群属性)来关闭/开启某个群的消息提醒
    - 调用接口[是否需要群消息通知](#是否需要群消息通知)来查询是否需要群消息通知
- `syncTeamMembers`, 是否同步群成员, 默认`true`. 只有在`syncTeams`=`true`的时候才起作用, 如果传`false`就不会同步群成员, 即不会收到`onteammembers`和`onsyncteammembersdone`回调, 开发者后续可以调用[获取群成员](#获取群成员)来获取群成员.
- `syncRoamingMsgs`, 是否同步漫游消息, 默认`true`. 如果传`false`就收不到漫游消息, 即不会收到`onroamingmsgs`回调.
- `syncMsgReceipts`, 是否同步已读回执时间戳, 默认`true`. 如果传`false`就收不到已读回执时间戳.

**示例代码**

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

```javascript
var nim = NIM.getInstance({
    syncRelations: false
});
```

### <span id="完整的初始化代码">完整的初始化代码</span>

- 请查阅其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

```javascript
var data = {};
var nim = NIM.getInstance({
    // 初始化SDK
    // debug: true
    appKey: 'appKey',
    account: 'account',
    token: 'token',
    onconnect: onConnect,
    onerror: onError,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    // 多端登录
    onloginportschange: onLoginPortsChange,
    // 用户关系
    onblacklist: onBlacklist,
    onsyncmarkinblacklist: onMarkInBlacklist,
    onmutelist: onMutelist,
    onsyncmarkinmutelist: onMarkInMutelist,
    // 好友关系
    onfriends: onFriends,
    onsyncfriendaction: onSyncFriendAction,
    // 用户名片
    onmyinfo: onMyInfo,
    onupdatemyinfo: onUpdateMyInfo,
    onusers: onUsers,
    onupdateuser: onUpdateUser,
    onrobots: onRobots,
    // 群组
    onteams: onTeams,
    onsynccreateteam: onCreateTeam,
    onteammembers: onTeamMembers,
    onsyncteammembersdone: onSyncTeamMembersDone,
    onupdateteammember: onUpdateTeamMember,
    // 会话
    onsessions: onSessions,
    onupdatesession: onUpdateSession,
    // 消息
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg,
    // 系统通知
    onofflinesysmsgs: onOfflineSysMsgs,
    onsysmsg: onSysMsg,
    onupdatesysmsg: onUpdateSysMsg,
    onsysmsgunread: onSysMsgUnread,
    onupdatesysmsgunread: onUpdateSysMsgUnread,
    onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
    oncustomsysmsg: onCustomSysMsg,
    // 同步完成
    onsyncdone: onSyncDone
});

function onConnect() {
    console.log('连接成功');
}
function onWillReconnect(obj) {
    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log('即将重连');
    console.log(obj.retryCount);
    console.log(obj.duration);
}
function onDisconnect(error) {
    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log('丢失连接');
    console.log(error);
    if (error) {
        switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
            break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
            break;
        default:
            break;
        }
    }
}
function onError(error) {
    console.log(error);
}

function onLoginPortsChange(loginPorts) {
    console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
}

function onBlacklist(blacklist) {
    console.log('收到黑名单', blacklist);
    data.blacklist = nim.mergeRelations(data.blacklist, blacklist);
    data.blacklist = nim.cutRelations(data.blacklist, blacklist.invalid);
    refreshBlacklistUI();
}
function onMarkInBlacklist(obj) {
    console.log(obj);
    console.log(obj.account + '被你在其它端' + (obj.isAdd ? '加入' : '移除') + '黑名单');
    if (obj.isAdd) {
        addToBlacklist(obj);
    } else {
        removeFromBlacklist(obj);
    }
}
function addToBlacklist(obj) {
    data.blacklist = nim.mergeRelations(data.blacklist, obj.record);
    refreshBlacklistUI();
}
function removeFromBlacklist(obj) {
    data.blacklist = nim.cutRelations(data.blacklist, obj.record);
    refreshBlacklistUI();
}
function refreshBlacklistUI() {
    // 刷新界面
}
function onMutelist(mutelist) {
    console.log('收到静音列表', mutelist);
    data.mutelist = nim.mergeRelations(data.mutelist, mutelist);
    data.mutelist = nim.cutRelations(data.mutelist, mutelist.invalid);
    refreshMutelistUI();
}
function onMarkInMutelist(obj) {
    console.log(obj);
    console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
    if (obj.isAdd) {
        addToMutelist(obj);
    } else {
        removeFromMutelist(obj);
    }
}
function addToMutelist(obj) {
    data.mutelist = nim.mergeRelations(data.mutelist, obj.record);
    refreshMutelistUI();
}
function removeFromMutelist(obj) {
    data.mutelist = nim.cutRelations(data.mutelist, obj.record);
    refreshMutelistUI();
}
function refreshMutelistUI() {
    // 刷新界面
}

function onFriends(friends) {
    console.log('收到好友列表', friends);
    data.friends = nim.mergeFriends(data.friends, friends);
    data.friends = nim.cutFriends(data.friends, friends.invalid);
    refreshFriendsUI();
}
function onSyncFriendAction(obj) {
    console.log(obj);
    switch (obj.type) {
    case 'addFriend':
        console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
    case 'applyFriend':
        console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
        break;
    case 'passFriendApply':
        console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
    case 'rejectFriendApply':
        console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
        break;
    case 'deleteFriend':
        console.log('你在其它端删了一个好友' + obj.account);
        onDeleteFriend(obj.account);
        break;
    case 'updateFriend':
        console.log('你在其它端更新了一个好友', obj.friend);
        onUpdateFriend(obj.friend);
        break;
    }
}
function onAddFriend(friend) {
    data.friends = nim.mergeFriends(data.friends, friend);
    refreshFriendsUI();
}
function onDeleteFriend(account) {
    data.friends = nim.cutFriendsByAccounts(data.friends, account);
    refreshFriendsUI();
}
function onUpdateFriend(friend) {
    data.friends = nim.mergeFriends(data.friends, friend);
    refreshFriendsUI();
}
function refreshFriendsUI() {
    // 刷新界面
}

function onMyInfo(user) {
    console.log('收到我的名片', user);
    data.myInfo = user;
    updateMyInfoUI();
}
function onUpdateMyInfo(user) {
    console.log('我的名片更新了', user);
    data.myInfo = NIM.util.merge(data.myInfo, user);
    updateMyInfoUI();
}
function updateMyInfoUI() {
    // 刷新界面
}
function onUsers(users) {
    console.log('收到用户名片列表', users);
    data.users = nim.mergeUsers(data.users, users);
}
function onUpdateUser(user) {
    console.log('用户名片更新了', user);
    data.users = nim.mergeUsers(data.users, user);
}
function onRobots (robots) {
  console.log('收到机器人列表', robots);
  data.robots = robots;
}
function onTeams(teams) {
    console.log('群列表', teams);
    data.teams = nim.mergeTeams(data.teams, teams);
    onInvalidTeams(teams.invalid);
}
function onInvalidTeams(teams) {
    data.teams = nim.cutTeams(data.teams, teams);
    data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
    refreshTeamsUI();
}
function onCreateTeam(team) {
    console.log('你创建了一个群', team);
    data.teams = nim.mergeTeams(data.teams, team);
    refreshTeamsUI();
    onTeamMembers({
        teamId: team.teamId,
        members: owner
    });
}
function refreshTeamsUI() {
    // 刷新界面
}
function onTeamMembers(teamId, members) {
    console.log('群id', teamId, '群成员', members);
    var teamId = obj.teamId;
    var members = obj.members;
    data.teamMembers = data.teamMembers || {};
    data.teamMembers[teamId] = nim.mergeTeamMembers(data.teamMembers[teamId], members);
    data.teamMembers[teamId] = nim.cutTeamMembers(data.teamMembers[teamId], members.invalid);
    refreshTeamMembersUI();
}
function onSyncTeamMembersDone() {
    console.log('同步群列表完成');
}
function onUpdateTeamMember(teamMember) {
    console.log('群成员信息更新了', teamMember);
    onTeamMembers({
        teamId: teamMember.teamId,
        members: teamMember
    });
}
function refreshTeamMembersUI() {
    // 刷新界面
}

function onSessions(sessions) {
    console.log('收到会话列表', sessions);
    data.sessions = nim.mergeSessions(data.sessions, sessions);
    updateSessionsUI();
}
function onUpdateSession(session) {
    console.log('会话更新了', session);
    data.sessions = nim.mergeSessions(data.sessions, session);
    updateSessionsUI();
}
function updateSessionsUI() {
    // 刷新界面
}

function onRoamingMsgs(obj) {
    console.log('漫游消息', obj);
    pushMsg(obj.msgs);
}
function onOfflineMsgs(obj) {
    console.log('离线消息', obj);
    pushMsg(obj.msgs);
}
function onMsg(msg) {
    console.log('收到消息', msg.scene, msg.type, msg);
    pushMsg(msg);
}
function pushMsg(msgs) {
    if (!Array.isArray(msgs)) { msgs = [msgs]; }
    var sessionId = msgs[0].sessionId;
    data.msgs = data.msgs || {};
    data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
}

function onOfflineSysMsgs(sysMsgs) {
    console.log('收到离线系统通知', sysMsgs);
    pushSysMsgs(sysMsgs);
}
function onSysMsg(sysMsg) {
    console.log('收到系统通知', sysMsg)
    pushSysMsgs(sysMsg);
}
function onUpdateSysMsg(sysMsg) {
    pushSysMsgs(sysMsg);
}
function pushSysMsgs(sysMsgs) {
    data.sysMsgs = nim.mergeSysMsgs(data.sysMsgs, sysMsgs);
    refreshSysMsgsUI();
}
function onSysMsgUnread(obj) {
    console.log('收到系统通知未读数', obj);
    data.sysMsgUnread = obj;
    refreshSysMsgsUI();
}
function onUpdateSysMsgUnread(obj) {
    console.log('系统通知未读数更新了', obj);
    data.sysMsgUnread = obj;
    refreshSysMsgsUI();
}
function refreshSysMsgsUI() {
    // 刷新界面
}
function onOfflineCustomSysMsgs(sysMsgs) {
    console.log('收到离线自定义系统通知', sysMsgs);
}
function onCustomSysMsg(sysMsg) {
    console.log('收到自定义系统通知', sysMsg);
}

function onSyncDone() {
    console.log('同步完成');
}
```

## <span id="登录与登出">登录与登出</span>

### <span id="登出IM">登出 IM</span>

- [初始化 SDK](#初始化SDK)之后, SDK 会自动登录
- 在收到`onconnect`回调后可以调用`nim.disconnect();`来登出 SDK
- 登出 SDK 后可以调用`nim.connect();`来重新登入 SDK

### <span id="切换IM">切换 IM</soan>

如果需要切换 IM, 操作步骤如下
- 调用[登出IM](#登出IM)来登出IM
- 调用[初始化SDK](#初始化SDK)来初始化新的 IM

### <span id="更新IM配置">更新 IM 配置</span>

SDK 设计为单例模式, 如果需要更新当前 IM 的配置, 那么可以调用此接口, 参数列表和格式跟[NIM.getInstance](#初始化SDK)保持一致, 以更新 token 为例

```javascript
// 断开 IM
nim.disconnect();
// 更新 token
nim.setOptions({
    token: 'newToken'
});
// 重新连接
nim.connect();
```

### <span id="多端登录">多端登录</span>

云信支持多端同时登录, 即用户可以同时在移动端和网页端登录同一账号

#### <span id="多端登录初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onloginportschange: onLoginPortsChange
});
function onLoginPortsChange(loginPorts) {
    console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
}
```

**参数解释**

- `onloginportschange`: 多端登录状态变化的回调, 会收到[登录端](#登录端)列表, 以下情况会收到此回调
    - 登录时其它端在线
    - 登录后其它端上线或者下线

#### <span id="登录端">登录端</span>

登录端代表登录在某个设备上的相关信息, 有如下字段
- `type`: 登录的[设备类型](#设备类型)
- `os`: 登录设备的操作系统
- `mac`: 登录设备的 mac 地址
- `deviceId`: 登录设备ID, uuid
- `account`: 登录的帐号
- `connectionId`: 登录设备分配的连接号
- `ip`: 登录的服务器 IP
- `time`: 登录时间
- `online`: 是否在线

#### <span id="设备类型">设备类型</span>

目前云信支持的登录端有以下几种类型
- `'Android'` (安卓)
- `'iOS'` (苹果)
- `'PC'` (桌面)
- `'Web'` (浏览器)

#### <span id="踢其它端">踢其它端</span>

**示例代码**

```javascript
nim.kick({
    deviceIds: ['deviceId1'],
    done: onKick
});
function onKick(error, obj) {
    console.log('踢其它端' + (!error?'成功':'失败'));
    console.log(error);
    console.log(obj);
}
```

**参数解释**

- 其它登录端的设备号可以在`onloginportschange`回调里获取, 参考[登录端对象](#登录端对象)

## <span id="用户关系托管">用户关系托管</span>

SDK 提供了用户关系托管, 包括黑名单和静音列表

#### <span id="黑名单">黑名单</span>

- 如果一个用户被加入了黑名单, 那么就不再会收到此用户发送的消息
- 如果一个用户被从黑名单移除, 那么会重新收到此用户发送的消息

#### <span id="静音列表">静音列表</span>

- SDK只负责维护静音列表, 具体根据静音列表要进行的操作由开发者决定

### <span id="用户关系初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onblacklist: onBlacklist,
    onsyncmarkinblacklist: onMarkInBlacklist,
    onmutelist: onMutelist,
    onsyncmarkinmutelist: onMarkInMutelist
});
function onBlacklist(blacklist) {
    console.log('收到黑名单', blacklist);
    data.blacklist = nim.mergeRelations(data.blacklist, blacklist);
    data.blacklist = nim.cutRelations(data.blacklist, blacklist.invalid);
    refreshBlacklistUI();
}
function onMarkInBlacklist(obj) {
    console.log(obj);
    console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '黑名单');
    if (obj.isAdd) {
        addToBlacklist(obj);
    } else {
        removeFromBlacklist(obj);
    }
}
function addToBlacklist(obj) {
    data.blacklist = nim.mergeRelations(data.blacklist, obj.record);
    refreshBlacklistUI();
}
function removeFromBlacklist(obj) {
    data.blacklist = nim.cutRelations(data.blacklist, obj.record);
    refreshBlacklistUI();
}
function refreshBlacklistUI() {
    // 刷新界面
}
function onMutelist(mutelist) {
    console.log('收到静音列表', mutelist);
    data.mutelist = nim.mergeRelations(data.mutelist, mutelist);
    data.mutelist = nim.cutRelations(data.mutelist, mutelist.invalid);
    refreshMutelistUI();
}
function onMarkInMutelist(obj) {
    console.log(obj);
    console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表');
    if (obj.isAdd) {
        addToMutelist(obj);
    } else {
        removeFromMutelist(obj);
    }
}
function addToMutelist(obj) {
    data.mutelist = nim.mergeRelations(data.mutelist, obj.record);
    refreshMutelistUI();
}
function removeFromMutelist(obj) {
    data.mutelist = nim.cutRelations(data.mutelist, obj.record);
    refreshMutelistUI();
}
function refreshMutelistUI() {
    // 刷新界面
}
```

**参数解释**

- `onblacklist`: 同步黑名单的回调, 会传入黑名单列表`blacklist`
    - `blacklist`的属性`invalid`包含被删除的黑名单列表
    - 此回调是增量回调, 可以调用[nim.mergeRelations](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeRelations)和[nim.cutRelations](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutRelations)来合并数据
- `onsyncmarkinblacklist`: 当前登录用户在其它端[加入黑名单/从黑名单移除](#加入黑名单/从黑名单移除)后的回调, 会传入一个参数, 包含两个字段
    - `account`: 要加入黑名单/从黑名单移除的账号
    - `isAdd`: `true`表示加入黑名单, `false`表示从黑名单移除
    - `reocrd`, 拼装好的对象
- `onmutelist`: 同步静音列表的回调, 会传入静音列表`mutelist`
    - `mutelist`的属性`invalid`包含被删除的静音列表
    - 此回调是增量回调, 可以调用[nim.mergeRelations](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeRelations)和[nim.cutRelations](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutRelations)来合并数据
- `onsyncmarkinmutelist`: 当前登录用户在其它端[加入静音列表/从静音列表移除](#加入静音列表/从静音列表移除)后的回调, 会传入一个参数, 包含两个字段
    - `account`: 要加入静音列表/从静音列表移除的账号
    - `isAdd`: `true`表示加入静音列表, `false`表示从静音列表移除
    - `reocrd`, 拼装好的对象

### <span id="加入黑名单/从黑名单移除">加入黑名单/从黑名单移除</span>

- 此接口可以完成以下两个功能, 通过参数`isAdd`来决定实际的功能
    - `isAdd`为`true`时, 会将`account`[加入黑名单](#加入黑名单)
        - 如果一个用户被加入了黑名单, 那么就不再会收到此用户发送的消息
    - `isAdd`为`false`时, 会将`account`[从黑名单移除](#从黑名单移除)
        - 如果一个用户被从黑名单移除, 那么会重新收到此用户发送的消息
- 每个功能SDK都提供了相应的独立接口

```javascript
nim.markInBlacklist({
    account: 'account',
    // `true`表示加入黑名单, `false`表示从黑名单移除
    isAdd: true,
    done: markInBlacklistDone
});
function markInBlacklistDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('将' + obj.account + (isAdd ? '加入黑名单' : '从黑名单移除') + (!error?'成功':'失败'));
    if (!error) {
        onMarkInBlacklist(obj);
    }
}
```

### <span id="加入黑名单">加入黑名单</span>

- 如果一个用户被加入了黑名单, 那么就不再会收到此用户发送的消息
- SDK内部调用[nim.markInBlacklist](#加入黑名单/从黑名单移除)来完成实际工作

```javascript
nim.addToBlacklist({
    account: 'account',
    done: addToBlacklistDone
});
function addToBlacklistDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('加入黑名单' + (!error?'成功':'失败'));
    if (!error) {
        addToBlacklist(obj);
    }
}
```

### <span id="从黑名单移除">从黑名单移除</span>

- 如果一个用户被从黑名单移除, 那么会重新收到此用户发送的消息
- SDK内部调用[nim.markInBlacklist](#加入黑名单/从黑名单移除)来完成实际工作

```javascript
nim.removeFromBlacklist({
    account: 'account',
    done: removeFromBlacklistDone
});
function removeFromBlacklistDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('从黑名单移除' + (!error?'成功':'失败'));
    if (!error) {
        removeFromBlacklist(obj);
    }
}
```

### <span id="加入静音列表/从静音列表移除">加入静音列表/从静音列表移除</span>

- 此接口可以完成以下两个功能, 通过参数`isAdd`来决定实际的功能
    - `isAdd`为`true`时, 会将`account`[加入静音列表](#加入静音列表)
    - `isAdd`为`false`时, 会将`account`[从静音列表移除](#从静音列表移除)
- 每个功能SDK都提供了相应的独立接口

```javascript
nim.markInMutelist({
    account: 'account',
    // `true`表示加入静音列表, `false`表示从静音列表移除
    isAdd: 'true',
    done: markInMutelistDone
});
function markInMutelistDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('将' + obj.account + (isAdd ? '加入静音列表' : '从静音列表移除') + (!error?'成功':'失败'));
    if (!error) {
        onMarkInMutelist(obj);
    }
}
```

### <span id="加入静音列表">加入静音列表</span>

- SDK只负责维护静音列表, 具体要根据静音列表进行的操作由开发者决定
- SDK内部调用[nim.markInMutelist](#加入静音列表/从静音列表移除)来完成实际工作

```javascript
nim.addToMutelist({
    account: 'account',
    done: addToMutelistDone
});
function addToMutelistDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('加入静音列表' + (!error?'成功':'失败'));
    if (!error) {
        addToMutelist(obj);
    }
}
```

### <span id="从静音列表移除">从静音列表移除</span>

- SDK只负责维护静音列表, 具体要根据静音列表进行的操作由开发者决定
- SDK内部调用[nim.markInMutelist](#加入静音列表/从静音列表移除)来完成实际工作

```javascript
nim.removeFromMutelist({
    account: 'account',
    done: removeFromMutelistDone
});
function removeFromMutelistDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('从静音列表移除' + (!error?'成功':'失败'));
    if (!error) {
        removeFromMutelist(obj);
    }
}
```

### <span id="获取黑名单和静音列表">获取黑名单和静音列表</span>

- 如果开发者在[初始化SDK](#初始化SDK)的时候设置了`syncRelations`为`false`, 那么就收不到`onblacklist`和`onmutelist`回调, 可以调用此接口来获取黑名单和静音列表。

```javascript
nim.getRelations({
    done: getRelationsDone
});
function getRelationsDone(error, obj) {
    console.log('获取静音列表' + (!error?'成功':'失败'), error, obj);
    if (!error) {
        onBlacklist(obj.blacklist);
        onMutelist(obj.mutelist);
    }
}
```

## <span id="好友关系托管">好友关系托管</span>

- SDK 提供好友关系托管

### <span id="好友关系初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)
- 请参考[处理系统通知](#处理系统通知)里面的跟好友相关的逻辑

**示例代码**

```javascript
var nim = NIM.getInstance({
    onfriends: onFriends,
    onsyncfriendaction: onSyncFriendAction
});
function onFriends(friends) {
    console.log('收到好友列表', friends);
    data.friends = nim.mergeFriends(data.friends, friends);
    data.friends = nim.cutFriends(data.friends, friends.invalid);
    refreshFriendsUI();
}
function onSyncFriendAction(obj) {
    console.log(obj);
    switch (obj.type) {
    case 'addFriend':
        console.log('你在其它端直接加了一个好友' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
    case 'applyFriend':
        console.log('你在其它端申请加了一个好友' + obj.account + ', 附言' + obj.ps);
        break;
    case 'passFriendApply':
        console.log('你在其它端通过了一个好友申请' + obj.account + ', 附言' + obj.ps);
        onAddFriend(obj.friend);
        break;
    case 'rejectFriendApply':
        console.log('你在其它端拒绝了一个好友申请' + obj.account + ', 附言' + obj.ps);
        break;
    case 'deleteFriend':
        console.log('你在其它端删了一个好友' + obj.account);
        onDeleteFriend(obj.account);
        break;
    case 'updateFriend':
        console.log('你在其它端更新了一个好友', obj.friend);
        onUpdateFriend(obj.friend);
        break;
    }
}
function onAddFriend(friend) {
    data.friends = nim.mergeFriends(data.friends, friend);
    refreshFriendsUI();
}
function onDeleteFriend(account) {
    data.friends = nim.cutFriendsByAccounts(data.friends, account);
    refreshFriendsUI();
}
function onUpdateFriend(friend) {
    data.friends = nim.mergeFriends(data.friends, friend);
    refreshFriendsUI();
}
function refreshFriendsUI() {
    // 刷新界面
}
```

**参数解释**

- `onfriends`, 同步好友列表的回调, 会传入[好友](#好友对象)列表`friends`
    - `friends`的属性invalid包含被删除的好友列表
    - 此回调是增量回调, 可以调用[nim.mergeFriends](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeFriends)和[nim.cutFriends](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutFriends)来合并数据
- `onsyncfriendaction`, 当前登录用户在其它端进行好友相关的操作后的回调
    - 操作包括
        - [直接加为好友](#直接加为好友)
        - [申请加为好友](#申请加为好友)
        - [通过好友申请](#通过好友申请)
        - [拒绝好友申请](#拒绝好友申请)
        - [删除好友](#删除好友)
        - [更新好友](#更新好友)
    - 此回调会收到一个参数`obj`, 它有一个字段`type`的值为操作的类型, 具体类型如下：
        - `'addFriend'` (直接加为好友), 此时`obj`的字段如下:
            - `account`的值为被直接加为好友的账号
            - `friend`为被直接加为好友的[好友对象](#好友对象)
            - `ps`为附言
        - `'applyFriend'` (申请加为好友), 此时`obj`的字段如下:
            - `account`的值为被申请加为好友的账号
            - `ps`为附言
        - `'passFriendApply'` (通过好友申请), 此时`obj`的字段如下:
            - `account`的值为被通过好友申请的账号
            - `friend`为被通过好友申请的[好友对象](#好友对象)
            - `ps`为附言
        - `'rejectFriendApply'` (拒绝好友申请), 此时`obj`的字段如下:
            - `account`的值为被拒绝好友申请的账号
            - `ps`为附言
        - `'deleteFriend'` (删除好友), 此时`obj`的字段如下:
            - `account`的值为被删除好友的账号
        - `'updateFriend'` (更新好友), 此时`obj`的字段如下:
            - `friend`的值为被更新的[好友对象](#好友对象)
    - 可以调用[nim.mergeFriends](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeFriends)和[nim.cutFriendsByAccounts](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutFriendsByAccounts)来合并数据

### <span id="好友对象">好友对象</span>

好友对象有以下字段:
- `account`: 账号
- `alias`: 昵称
- `custom`: 扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
- `createTime`: 成为好友的时间
- `updateTime`: 更新时间

### <span id="直接加为好友">直接加为好友</span>

- [直接加某个用户为好友](#直接加为好友)后, 对方不需要确认, 直接成为当前登录用户的好友
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容
- 对方会收到一条类型为`'addFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为接收方的账号。

```javascript
nim.addFriend({
    account: 'account',
    ps: 'ps',
    done: addFriendDone
});
function addFriendDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('直接加为好友' + (!error?'成功':'失败'));
    if (!error) {
        onAddFriend(obj.friend);
    }
}
```

### <span id="申请加为好友">申请加为好友</span>

- [申请加某个用户为好友](#申请加为好友)后, 对方会收到一条类型为`'applyFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为接收方的账号, 用户在收到好友申请后, 可以选择通过或者拒绝好友申请。
    - 如果[通过好友申请](#通过好友申请), 那么申请方会收到一条类型为`'passFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为通过方的帐号, `to`字段的值为申请方的账号。
    - 如果[拒绝好友申请](#拒绝好友申请), 那么申请方会收到一条类型为`'rejectFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为申请方的账号。
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
nim.applyFriend({
    account: 'account',
    ps: 'ps',
    done: applyFriendDone
});
function applyFriendDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('申请加为好友' + (!error?'成功':'失败'));
}
```

### <span id="通过好友申请">通过好友申请</span>

- [申请加某个用户为好友](#申请加为好友)后, 对方会收到一条类型为`'applyFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为接收方的账号, 用户在收到好友申请后, 可以选择通过或者拒绝好友申请。
    - 如果[通过好友申请](#通过好友申请), 那么申请方会收到一条类型为`'passFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为通过方的帐号, `to`字段的值为申请方的账号。
    - 如果[拒绝好友申请](#拒绝好友申请), 那么申请方会收到一条类型为`'rejectFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为申请方的账号。
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
// 假设 sysMsg 是通过回调 `onsysmsg` 收到的系统通知
nim.passFriendApply({
    idServer: sysMsg.idServer,
    account: 'account',
    ps: 'ps',
    done: passFriendApplyDone
});
function passFriendApplyDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('通过好友申请' + (!error?'成功':'失败'));
    if (!error) {
        onAddFriend(obj.friend);
    }
}
```

### <span id="拒绝好友申请">拒绝好友申请</span>

- [申请加某个用户为好友](#申请加为好友)后, 对方会收到一条类型为`'applyFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为接收方的账号, 用户在收到好友申请后, 可以选择通过或者拒绝好友申请。
    - 如果[通过好友申请](#通过好友申请), 那么申请方会收到一条类型为`'passFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为通过方的帐号, `to`字段的值为申请方的账号。
    - 如果[拒绝好友申请](#拒绝好友申请), 那么申请方会收到一条类型为`'rejectFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为申请方的账号。
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
// 假设 sysMsg 是通过回调 `onsysmsg` 收到的系统通知
nim.rejectFriendApply({
    idServer: sysMsg.idServer,
    account: 'account',
    ps: 'ps',
    done: rejectFriendApplyDone
});
function rejectFriendApplyDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('拒绝好友申请' + (!error?'成功':'失败'));
}
```

### <span id="删除好友">删除好友</span>

- [删除好友](#删除好友)后, 被删除的人会收到一条类型为`'deleteFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为删除方的帐号, `to`字段的值为被删除方的账号。

```javascript
nim.deleteFriend({
    account: 'account',
    done: deleteFriendDone
});
function deleteFriendDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除好友' + (!error?'成功':'失败'));
    if (!error) {
        onDeleteFriend(obj.account);
    }
}
```

### <span id="更新好友">更新好友</span>

- 开发者可以用此接口来更新好友的备注
- 开发者也可以使用JSON格式的扩展字段来进行扩展

```javascript
nim.updateFriend({
    account: 'account',
    alias: 'alias',
    custom: 'custom',
    done: updateFriendDone
});
function updateFriendDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('更新好友' + (!error?'成功':'失败'));
    if (!error) {
        onUpdateFriend(obj);
    }
}
```

### <span id="获取好友列表">获取好友列表</span>

- 如果开发者在[初始化SDK](#初始化SDK)的时候设置了`syncFriends`为`false`, 那么就收不到`onfriends`回调, 可以调用此接口来获取好友列表。

```javascript
nim.getFriends({
    done: getFriendsDone
});
function getFriendsDone(error, friends) {
    console.log('获取好友列表' + (!error?'成功':'失败'), error, friends);
    if (!error) {
        onFriends(friends);
    }
}
```

## <span id="用户名片托管">用户名片托管</span>

SDK 提供用户名片托管

### <span id="用户名片初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onmyinfo: onMyInfo,
    onupdatemyinfo: onUpdateMyInfo,
    onusers: onUsers,
    onupdateuser: onUpdateUser
});
function onMyInfo(user) {
    console.log('收到我的名片', user);
    data.myInfo = user;
    updateMyInfoUI();
}
function onUpdateMyInfo(user) {
    console.log('我的名片更新了', user);
    data.myInfo = NIM.util.merge(data.myInfo, user);
    updateMyInfoUI();
}
function updateMyInfoUI() {
    // 刷新界面
}
function onUsers(users) {
    console.log('收到用户名片列表', users);
    data.users = nim.mergeUsers(data.users, users);
}
function onUpdateUser(user) {
    console.log('用户名片更新了', user);
    data.users = nim.mergeUsers(data.users, user);
}
```

**参数解释**

- `onmyinfo`: 同步登录用户名片的回调, 会传入[用户名片](#用户名片对象)
- `onupdatemyinfo`: 当前登录用户在其它端修改自己的个人名片之后的回调, 会传入[用户名片](#用户名片对象)
- `onusers`: 同步好友用户名片的回调, 会传入[用户名片](#用户名片对象)数组
    - 此回调是增量回调, 可以调用[nim.mergeUsers](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeUsers)来合并数据
- `onupdateuser`: 用户名片更新后的回调, 会传入[用户名片](#用户名片对象)，请参考[用户名片更新时机](#用户名片更新时机)

### <span id="用户名片对象">用户名片对象</span>

用户名片对象有以下字段：
- `account`: 账号
- `nick`: 昵称
- `avatar`: 头像
- `sign`: 签名
- `gender`: [性别](#性别)
- `email`: 邮箱
- `birth`: 生日
- `tel`: 电话号码
- `custom`: 扩展字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `createTime`: 创建时间
- `updateTime`: 更新时间

### <span id="性别">性别</span>

- `'unknown'` (未知)
- `'male'` (男)
- `'female'` (女)

### <span id="更新我的名片">更新我的名片</span>

```javascript
nim.updateMyInfo({
    nick: 'newNick',
    avatar: 'http://newAvatar',
    sign: 'newSign',
    gender: 'male',
    email: 'new@email.com',
    birth: '1900-01-01',
    tel: '13523578129',
    custom: '{type: "newCustom", value: "new"}',
    done: updateMyInfoDone
});
function updateMyInfoDone(error, user) {
    console.log('更新我的名片' + (!error?'成功':'失败'));
    console.log(error);
    console.log(user);
    if (!error) {
        onUpdateMyInfo(user);
    }
}
```

### <span id="用户名片更新时机">用户名片更新时机</span>

- 用户名片除自己之外，不保证其他用户名片实时更新，其他用户名片更新时机为
  - 收到此用户发来的消息
  - 每次同步会同步好友对应的用户名片
- 如果想手动刷新用户名片，请参考[获取用户名片](#获取用户名片)和[获取用户名片数组](#获取用户名片数组)

### <span id="获取用户名片">获取用户名片</span>

- 请参考[用户名片更新时机](#用户名片更新时机)
- 可以传入参数`sync=true`来强制从服务器获取最新的数据

```javascript
nim.getUser({
    account: 'account',
    done: getUserDone
});
function getUserDone(error, user) {
    console.log(error);
    console.log(user);
    console.log('获取用户名片' + (!error?'成功':'失败'));
    if (!error) {
        onUsers(user);
    }
}
```

### <span id="获取用户名片数组">获取用户名片数组</span>

- 请参考[用户名片更新时机](#用户名片更新时机)
- 可以传入参数`sync=true`来强制从服务器获取最新的数据
- 每次最多 150 个

```javascript
nim.getUsers({
    accounts: ['account1', 'account2'],
    done: getUsersDone
});
function getUsersDone(error, users) {
    console.log(error);
    console.log(users);
    console.log('获取用户名片数组' + (!error?'成功':'失败'));
    if (!error) {
        onUsers(users);
    }
}
```
## <span id="智能机器人">智能机器人</span>

### <span id="智能机器人简介">智能机器人简介</span>
- 智能聊天机器人解决方案依托网易IM即时通讯、语音识别、语义理解等服务，为开发者提供人机交互API/SDK、语音识别、意图识别、知识库配置、动态接口等功能，可以在应用IM内快速集成场景丰富的智能聊天机器人。
- 详见[网易人工智能](http://ai.163.com)

### <span id="同步机器人列表">同步机器人列表</span>
- 机器人列表的同步可以通过设置同步字段syncRobots: true来实现
  - 参见[完整的初始化代码](#完整的初始化代码)
- 用户也可以手动同步机器人列表
  - 手动同步机器人列表，其本质仍然是一个同步协议，所以会触发用户设置的同步函数 `onrobots` 的回调。
```javascript
  nim.getRobots();
```
- 机器人列表中的机器人对象包含以下字段：
  - `account`: 机器人账号，对应机器人消息中的robotAccid
  - `avatar`: 机器人头像
  - `createTime`: 机器人创建时间
  - `intro`: 机器人简介
  - `nick`: 机器人昵称

### <span id="智能机器人消息模板">智能机器人消息模板</span>
- 参见[机器人消息体模板说明](/docs/product/IM即时通讯/机器人消息体模板说明)

### <span id="发送智能机器人消息">发送智能机器人消息</span>
- 参见[发送机器人消息](#发送机器人消息)

## <span id="群组">群组</span>

### <span id="群组功能概述">群组功能概述</span>

SDK 提供了普通群以及高级群两种形式的群功能。 高级群拥有更多的权限操作，两种群聊形式在共有操作上保持了接口一致。**推荐 APP 开发时只选择一种群类型进行开发**。普通群和高级群在原则上是不能互相转换的，他们的群类型在创建时就已经确定。在 `SDK 2.4.0` 版本后，高级群可以拥有普通群的全部功能，推荐使用高级群进行开发。

- 普通群 开发手册中所提及的普通群都等同于 Demo 中的讨论组。普通群没有权限操作，适用于快速创建多人会话的场景。每个普通群只有一个管理员。管理员可以对群进行增减员操作，普通成员只能对群进行增员操作。在添加新成员的时候，并不需要经过对方同意。
- 高级群 高级群在权限上有更多的限制，权限分为群主、管理员、以及群成员。

### <span id="群组初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)
- 请参考[处理群通知消息](#处理群通知消息)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onteams: onTeams,
    onsynccreateteam: onCreateTeam,
    onteammembers: onTeamMembers,
    onsyncteammembersdone: onSyncTeamMembersDone,
    onupdateteammember: onUpdateTeamMember
});
function onTeams(teams) {
    console.log('收到群列表', teams);
    data.teams = nim.mergeTeams(data.teams, teams);
    onInvalidTeams(teams.invalid);
}
function onInvalidTeams(teams) {
    data.teams = nim.cutTeams(data.teams, teams);
    data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
    refreshTeamsUI();
}
function onCreateTeam(team) {
    console.log('你创建了一个群', team);
    data.teams = nim.mergeTeams(data.teams, team);
    refreshTeamsUI();
    onTeamMembers({
        teamId: team.teamId,
        members: owner
    });
}
function refreshTeamsUI() {
    // 刷新界面
}
function onTeamMembers(obj) {
    console.log('群id', teamId, '群成员', members);
    var teamId = obj.teamId;
    var members = obj.members;
    data.teamMembers = data.teamMembers || {};
    data.teamMembers[teamId] = nim.mergeTeamMembers(data.teamMembers[teamId], members);
    data.teamMembers[teamId] = nim.cutTeamMembers(data.teamMembers[teamId], members.invalid);
    refreshTeamMembersUI();
}
function onSyncTeamMembersDone() {
    console.log('同步群列表完成');
}
function onUpdateTeamMember(teamMember) {
    console.log('群成员信息更新了', teamMember);
    onTeamMembers({
        teamId: teamMember.teamId,
        members: teamMember
    });
}
function refreshTeamMembersUI() {
    // 刷新界面
}
```

**参数解释**

- `onteams`, 同步[群](#群对象)列表的回调, 会传入群数组
    - `teams`的属性`invalid`包含退出的群
    - 此回调是增量回调, 可以调用[nim.mergeTeams](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeTeams)和[nim.cutTeams](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutTeams)来合并数据
- `onsynccreateteam`, 当前登录帐号在其它端创建群之后, 会收到此回调, 会传入[群对象](#群对象)
- `onteammembers`, 同步群成员的回调, 一个群对应一个回调, 会传入群成员数组
    - 可以调用[nim.mergeTeamMembers](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeTeamMembers)和[nim.cutTeamMembers](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutTeamMembers)来合并数据
- `onsyncteammembersdone`, 当所有群的群成员同步结束时, 会调用此回调
- `onupdateteammember`, 群成员信息更新后的回调, 会传入[群成员](#群成员对象)对象, 不过此时的信息是不完整的, 只会包括被更新的字段。当前登录帐号在其它端修改自己的群属性时也会收到此回调。
- `onCreateTeam`, 创建群的回调, 此方法接收一个参数, 包含群信息和群主信息
- `onUpdateTeam`, 更新群的回调, 此方法接收一个参数, 更新后的群信息
- `onAddTeamMembers`, 新成员入群的回调, 此方法接收一个参数, 包含群信息和群成员信息
- `onRemoveTeamMembers`, 有人出群的回调, 此方法接收一个参数, 包含群信息和群成员账号
- `onUpdateTeamManagers`, 更新群管理员的回调, 此方法接收一个参数, 包含群信息和管理员信息
- `onDismissTeam`, 解散群的回调, 此方法接收一个参数, 包含被解散的群id
- `onTransferTeam`, 移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
- `onUpdateTeamMembersMute`, 更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息

### <span id="群对象">群对象</span>

群对象有如下字段
- `teamId`: 群Id
- `appId`: 群所属的app的id
- `type`: [群类型](#群类型)
- `name`: 群名字
- `avatar`: 群头像
- `intro`: 群简介
- `announcement`: 群公告
- `joinMode`: [群加入方式](#群加入方式), 仅限高级群
- `beInviteMode`: [群被邀请模式](#群被邀请模式), 仅限高级群
- `inviteMode`: [群邀请模式](#群邀请模式), 仅限高级群
- `updateTeamMode`: [群信息修改权限](#群信息修改权限), 仅限高级群
- `updateCustomMode`: [群信息自定义字段修改权限](#群信息自定义字段修改权限), 仅限高级群
- `owner`: 群主
- `level`: 群人数上限
- `memberNum`: 群成员数量
- `memberUpdateTime`: 群成员最后更新时间
- `createTime`: 群创建时间
- `updateTime`: 群最后更新时间
- `custom`: 第三方扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
- `serverCustom`: 第三方服务器扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
- `valid`: 是否有效, 解散后该群无效
- `validToCurrentUser`: 该群是否对当前用户有效, 如果无效, 那么说明被踢了
- `mute`: 是否禁言, 禁言状态下普通成员不能发送消息, 创建者和管理员可以发送消息

### <span id="群类型">群类型</span>

[群对象](#群对象)有一个字段`type`来标明群类型, 具体类型如下
- `'normal'` (普通群)
- `'advanced'` (高级群)

### <span id="群加入方式">群加入方式</span>

群加入方式有以下几种
- `'noVerify'` (不需要验证)
- `'needVerify'` (需要验证)
- `'rejectAll'` (禁止任何人加入)

### <span id="群被邀请模式">群被邀请模式</span>

群被邀请模式有以下几种
- `'needVerify'` (需要邀请方同意)
- `'noVerify'` (不需要邀请方同意)

### <span id="群邀请模式">群邀请模式</span>

群邀请模式有以下几种
- `'manager'` (只有管理员/群主可以邀请他人入群)
- `'all'` (所有人可以邀请他人入群)

### <span id="群信息修改权限">群信息修改权限</span>

群信息修改权限有以下几种
- `'manager'` (只有管理员/群主可以修改)
- `'all'` (所有人可以修改)

### <span id="群信息自定义字段修改权限">群信息自定义字段修改权限</span>

群信息自定义字段修改权限有以下几种
- `'manager'` (只有管理员/群主可以修改)
- `'all'` (所有人可以修改)

### <span id="群成员对象">群成员对象</span>

群成员对象有如下字段
- `teamId`: 群ID
- `account`: 帐号
- `type`: [群成员类型](#群成员类型)
- `nickInTeam`: 在群里面的昵称
- `active`: 普通群拉人进来的时候, 被拉的人处于未激活状态, 未激活状态下看不到这个群, 当有人说话后自动转为激活状态, 能看到该群
- `joinTime`: 入群时间
- `updateTime`: 更新时间

### <span id="群成员类型">群成员类型</span>

- `'normal'` (普通成员)
- `'owner'` (群主)
- `'manager'` (管理员)

### <span id="创建群">创建群</span>

- 普通群不可以设置[群加入方式](#群加入方式)
- 高级群的[群加入方式](#群加入方式)默认为 `'needVerify'`
- 高级群的[群被邀请模式](#群被邀请模式)默认为`'needVerify'`
- 高级群的[群邀请模式](#群邀请模式)默认为`'manager'`
- 高级群的[群信息修改权限](#群信息修改权限)默认为`'manager'`
- 高级群的[群信息自定义字段修改权限](#群信息自定义字段修改权限)默认为`'manager'`
- 普通群的创建者可以看到所有的群成员, 而被邀请的群成员在有人发消息之后才能看到该群, 而且会先收到一条类型为`'addTeamMembers'`的[群通知消息](#群通知消息), 然后会收到其它群消息。
- 高级群被邀请的群成员会收到一条类型为类型为`'teamInvite'`的[系统通知](#系统通知), 群成员只有接受邀请之后才会出现在该群中。
    - 接受邀请后, 所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](#群通知消息)。
    - 拒绝邀请后, 群主会收到一条类型为`'rejectTeamInvite'`的[系统通知](#系统通知)。
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
// 创建普通群
nim.createTeam({
    type: 'normal',
    name: '普通群',
    avatar: 'avatar',
    accounts: ['a1', 'a2'],
    ps: '我建了一个普通群',
    done: createTeamDone
});
// 创建高级群
nim.createTeam({
    type: 'advanced',
    name: '高级群',
    avatar: 'avatar',
    accounts: ['a1', 'a2'],
    intro: '群简介',
    announcement: '群公告',
    // joinMode: 'needVerify',
    // beInviteMode: 'needVerify',
    // inviteMode: 'manager',
    // updateTeamMode: 'manager',
    // updateCustomMode: 'manager',
    ps: '我建了一个高级群',
    custom: '群扩展字段, 建议封装成JSON格式字符串',
    done: createTeamDone
});
function createTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('创建' + obj.team.type + '群' + (!error?'成功':'失败'));
    if (!error) {
        onCreateTeam(obj.team, obj.owner);
    }
}
```

### <span id="发送群消息">发送群消息</span>

发送群消息时只需将上文中各个[发送消息](#发送消息)接口的`scene`替换为`'team'`, 将`to`替换为`群ID`。

### <span id="接收群消息">接收群消息</span>

参考上文的[接收消息](#接收消息)

### <span id="更新群">更新群</span>

- 普通群不可以更新
    - [群加入方式](#群加入方式)
    - [群被邀请模式](#群被邀请模式)
    - [群邀请模式](#群邀请模式)
    - [群信息修改权限](#群信息修改权限)
    - [群信息自定义字段修改权限](#群信息自定义字段修改权限)
- [更新群](#更新群)后, 所有群成员会收到一条类型为`'updateTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为更新群的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为被更新的[群信息](#群对象)

```javascript
nim.updateTeam({
    teamId: 123,
    name: '群名字',
    avatar: 'avatar',
    intro: '群简介',
    announcement: '群公告',
    joinMode: 'needVerify',
    custom: '自定义字段',
    done: updateTeamDone
});
function updateTeamDone(error, team) {
    console.log(error);
    console.log(team);
    console.log('更新群' + (!error?'成功':'失败'));
}
```

### <span id="拉人入群">拉人入群</span>

- 普通群, [拉人入群](#拉人入群)后, 所有[群成员](#群成员对象)会收到一条类型为`'addTeamMembers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为拉人的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`accounts`的值为被拉的人的帐号列表, `attach`有一个字段`members`的值为被拉的群成员列表。
    - 被邀请的群成员在有人说话后才能看到该`群`, 而且会先收到一条类型为`'addTeamMembers'`的[群通知消息](#群通知消息), 然后会收到其它[群消息](#消息类型)。
- 高级群的群主和管理员在邀请成员加入群（通过操作[创建群](#创建群)或[拉人入群](#拉人入群)）之后, 被邀请的人会收到一条类型为`'teamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为邀请方的帐号, `to`字段的值为对应的群ID, 此类系统通知的`attach`有一个字段`team`的值为被邀请进入的[群](#群对象), 被邀请的人可以选择接受邀请或者拒绝邀请。
    - 如果[接受邀请](#接受入群邀请), 那么该群的所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为接受入群邀请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`members`的值为接收入群邀请的群成员列表。
    - 如果[拒绝邀请](#拒绝入群邀请), 那么邀请你的人会收到一条类型为`'rejectTeamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝入群邀请的用户的帐号, `to`字段的值为对应的群ID。
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
nim.addTeamMembers({
    teamId: 123,
    accounts: ['a3', 'a4'],
    ps: '加入我们的群吧',
    done: addTeamMembersDone
});
function addTeamMembersDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('入群邀请发送' + (!error?'成功':'失败'));
}
```

### <span id="踢人出群">踢人出群</span>

- [踢人出群](#踢人出群)后, 所有[群成员](#群成员对象)会收到一条类型为`'removeTeamMembers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为踢人的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`accounts`的值为被踢的人的帐号列表。

```javascript
nim.removeTeamMembers({
    teamId: 123,
    accounts: ['a3', 'a4'],
    done: removeTeamMembersDone
});
function removeTeamMembersDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('踢人出群' + (!error?'成功':'失败'));
}
```

### <span id="接受入群邀请">接受入群邀请</span>

- 高级群的群主和管理员在邀请成员加入群（通过操作[创建群](#创建群)或[拉人入群](#拉人入群)）之后, 被邀请的人会收到一条类型为`'teamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为邀请方的帐号, `to`字段的值为对应的群ID, 此类系统通知的`attach`有一个字段`team`的值为被邀请进入的[群](#群对象), 被邀请的人可以选择接受邀请或者拒绝邀请。
    - 如果[接受邀请](#接受入群邀请), 那么该群的所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为接受入群邀请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`members`的值为接收入群邀请的群成员列表。
    - 如果[拒绝邀请](#拒绝入群邀请), 那么邀请你的人会收到一条类型为`'rejectTeamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝入群邀请的用户的帐号, `to`字段的值为对应的群ID。
- 参数`from`填邀请方的帐号

```javascript
// 假设 sysMsg 是通过回调 `onsysmsg` 收到的系统通知
nim.acceptTeamInvite({
    idServer: sysMsg.idServer,
    teamId: 123,
    from: 'zyy1',
    done: acceptTeamInviteDone
});
function acceptTeamInviteDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('接受入群邀请' + (!error?'成功':'失败'));
}
```

### <span id="拒绝入群邀请">拒绝入群邀请</span>

- 高级群的群主和管理员在邀请成员加入群（通过操作[创建群](#创建群)或[拉人入群](#拉人入群)）之后, 被邀请的人会收到一条类型为`'teamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为邀请方的帐号, `to`字段的值为对应的群ID, 此类系统通知的`attach`有一个字段`team`的值为被邀请进入的[群](#群对象), 被邀请的人可以选择接受邀请或者拒绝邀请。
    - 如果[接受邀请](#接受入群邀请), 那么该群的所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为接受入群邀请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`members`的值为接收入群邀请的群成员列表。
    - 如果[拒绝邀请](#拒绝入群邀请), 那么邀请你的人会收到一条类型为`'rejectTeamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝入群邀请的用户的帐号, `to`字段的值为对应的群ID。
- 参数`from`填邀请方的帐号
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
// 假设 sysMsg 是通过回调 `onsysmsg` 收到的系统通知
nim.rejectTeamInvite({
    idServer: sysMsg.idServer,
    teamId: 123,
    from: 'zyy1',
    ps: '就不',
    done: rejectTeamInviteDone
});
function rejectTeamInviteDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('拒绝入群邀请' + (!error?'成功':'失败'));
}
```

### <span id="申请入群">申请入群</span>

- 用户可以[申请加入高级群](#申请入群), 目标群的群主和管理员会收到一条类型为`'applyTeam'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为对应的群ID, 高级群的群主和管理员在收到入群申请后, 可以选择通过或者拒绝入群申请。
    - 如果[通过申请](#通过入群申请), 那么该群的所有群成员会收到一条类型为`'passTeamApply'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为通过入群申请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为申请方的帐号, `attach`有一个字段`members`的值为被通过申请的群成员列表。
    - 如果[拒绝申请](#拒绝入群申请), 那么申请人会收到一条类型为`'rejectTeamApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群](#群对象)。
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
nim.applyTeam({
    teamId: 123,
    ps: '请加',
    done: applyTeamDone
});
function applyTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('申请入群' + (!error?'成功':'失败'));
}
```

### <span id="通过入群申请">通过入群申请</span>

- 用户可以[申请加入高级群](#申请入群), 目标群的群主和管理员会收到一条类型为`'applyTeam'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为对应的群ID, 高级群的群主和管理员在收到入群申请后, 可以选择通过或者拒绝入群申请。
    - 如果[通过申请](#通过入群申请), 那么该群的所有群成员会收到一条类型为`'passTeamApply'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为通过入群申请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为申请方的帐号, `attach`有一个字段`members`的值为被通过申请的群成员列表。
    - 如果[拒绝申请](#拒绝入群申请), 那么申请人会收到一条类型为`'rejectTeamApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群](#群对象)。
- 参数`from`填申请方的帐号, 该参数的名字在v1.3.0版本中从`account`变为`from`

```javascript
// 假设 sysMsg 是通过回调 `onsysmsg` 收到的系统通知
nim.passTeamApply({
    idServer: sysMsg.idServer,
    teamId: 123,
    from: 'a2',
    done: passTeamApplyDone
});
function passTeamApplyDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('通过入群申请' + (!error?'成功':'失败'));
}
```

### <span id="拒绝入群申请">拒绝入群申请</span>

- 用户可以[申请加入高级群](#申请入群), 目标群的群主和管理员会收到一条类型为`'applyTeam'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为对应的群ID, 高级群的群主和管理员在收到入群申请后, 可以选择通过或者拒绝入群申请。
    - 如果[通过申请](#通过入群申请), 那么该群的所有群成员会收到一条类型为`'passTeamApply'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为通过入群申请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为申请方的帐号, `attach`有一个字段`members`的值为被通过申请的群成员列表。
    - 如果[拒绝申请](#拒绝入群申请), 那么申请人会收到一条类型为`'rejectTeamApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群](#群对象)。
- 参数`from`填申请方的帐号, 该参数的名字在v1.3.0版本中从`account`变为`from`
- `ps`: 附言, 选填, 开发者也可以使用JSON格式的字符串来扩展此内容

```javascript
// 假设 sysMsg 是通过回调 `onsysmsg` 收到的系统通知
nim.rejectTeamApply({
    idServer: sysMsg.idServer,
    teamId: 123,
    from: 'a2',
    ps: '就不',
    done: rejectTeamApplyDone
});
function rejectTeamApplyDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('拒绝入群申请' + (!error?'成功':'失败'));
}
```

### <span id="添加群管理员">添加群管理员</span>

- [添加群管理员](#添加群管理员)后, 所有[群成员](#群成员对象)会收到一条类型为`'addTeamManagers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为添加群管理员的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`accounts`的值为被加为管理员的帐号列表, `attach`有一个字段`members`的值为被加为管理员的群成员列表

```javascript
nim.addTeamManagers({
    teamId: 123,
    accounts: ['a2', 'a3'],
    done: addTeamManagersDone
});
function addTeamManagersDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('添加群管理员' + (!error?'成功':'失败'));
}
```

### <span id="移除群管理员">移除群管理员</span>

- [移除群管理员](#移除群管理员)后, 所有[群成员](#群成员对象)会收到一条类型为`'removeTeamManagers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为移除群管理员的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`accounts`的值为被移除的管理员的帐号列表, `attach`有一个字段`members`的值为被移除管理员的群成员列表

```javascript
nim.removeTeamManagers({
    teamId: 123,
    accounts: ['a2', 'a3'],
    done: removeTeamManagersDone
});
function removeTeamManagersDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('移除群管理员' + (!error?'成功':'失败'));
}
```

### <span id="主动退群">主动退群</span>

- [主动退群](#主动退群)后, 所有[群成员](#群成员对象)会收到一条类型为`'leaveTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为退群的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象)。

```javascript
nim.leaveTeam({
    teamId: 123,
    done: leaveTeamDone
});
function leaveTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('主动退群' + (!error?'成功':'失败'));
}
```

### <span id="转让群">转让群</span>

- [转让群](#转让群)后, 所有[群成员](#群成员对象)会收到一条类型为`'transferTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为转让群的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为为新群主的帐号, `attach`有一个字段`members`的值为包含新旧群主的群成员列表。
- 如果转让群的同时离开群, 那么相当于调用[主动退群](#主动退群)来离开群, 所有[群成员](#群成员对象)会再收到一条类型为`'leaveTeam'`的[群通知消息](#群通知消息)。

```javascript
nim.transferTeam({
    teamId: 123,
    account: 'zyy2',
    leave: false,
    done: transferOwnerDone
});
function transferOwnerDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('转让群' + (!error?'成功':'失败'));
}
```

### <span id="解散群">解散群</span>

- [解散群](#解散群)后, 所有[群成员](#群成员对象)会收到一条类型为`'dismissTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段为解散群的人的帐号, `to`字段的值为被对应的群ID。

```javascript
nim.dismissTeam({
    teamId: 123,
    done: dismissTeamDone
});
function dismissTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('解散群' + (!error?'成功':'失败'));
}
```

### <span id="修改自己的群属性">修改自己的群属性</span>

目前支持修改的属性有这些
- `nickInTeam`: 自己在群里面的群昵称
    - 更新昵称后, 所有其它在线的[群成员](#群成员对象)会收到[初始化SDK](#初始化SDK)时传入的`onupdateteammember`回调
- `muteTeam`: 是否关闭此群的消息提醒, `true`表示关闭提醒, 但是SDK仍然会收到这个群的消息, SDK只是记录这个设置, 具体根据这个设置要执行的操作由第三方APP决定, 设置之后可以调用接口[是否需要群消息通知](#是否需要群消息通知)来查询是否需要群消息通知
- `custom`: 第三方扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串

```javascript
nim.updateInfoInTeam({
    teamId: 123,
    // 此参数为可选参数
    // nickInTeam: '群昵称',
    // 静音群, 此参数为可选参数
    // muteTeam: true,
    // 第三方扩展字段
    // custom: '{}'
    done: updateInfoInTeamDone
});
function updateInfoInTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('修改自己的群属性' + (!error?'成功':'失败'));
}
```

### <span id="修改别人的群昵称">修改别人的群昵称</span>

- 所有其它在线的[群成员](#群成员对象)会收到会收到[初始化SDK](#初始化SDK)时传入的`onupdateteammember`回调

```javascript
nim.updateNickInTeam({
    teamId: 123,
    account: 'a2',
    nickInTeam: '群昵称',
    done: updateNickInTeamDone
});
function updateNickInTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('修改自己的群属性' + (!error?'成功':'失败'));
}
```

### <span id="更新群成员禁言状态">更新群成员禁言状态</span>

- [更新群成员禁言状态](#更新群成员禁言状态)后, 所有[群成员](#群成员对象)会收到一条类型为`'updateTeamMute'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为操作方, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为被禁言的帐号, `attach`有一个字段`members`的值为被禁言的群成员列表。

```javascript
nim.updateMuteStateInTeam({
    teamId: '123',
    account: 'a',
    mute: true,
    done: updateMuteStateInTeamDone
})
function updateMuteStateInTeamDone(error, obj) {
    console.log('更新群成员禁言状态' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="获取群禁言成员列表">获取群禁言成员列表</span>

```javascript
nim.getMutedTeamMembers({
  teamId: 'teamId',
  done: getMutedTeamMembersDone
})
function getMutedTeamMembersDone (error, obj) {
  console.log('获取群禁言成员列表' + (!error?'成功':'失败'))
  console.log(obj)
}
```

### <span id="获取群">获取群</span>

- 开发者可以调用此接口获取群资料

```javascript
nim.getTeam({
    teamId: 123,
    done: getTeamDone
});
function getTeamDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('获取群' + (!error?'成功':'失败'));
}
```

### <span id="获取群列表">获取群列表</span>

- 如果开发者在[初始化SDK](#初始化SDK)的时候设置了`syncTeams`为`false`, 那么就收不到`onteams`回调, 可以调用此方法来获取[群](#群对象)列表

```javascript
nim.getTeams({
    done: getTeamsDone
});
function getTeamsDone(error, teams) {
    console.log(error);
    console.log(teams);
    console.log('获取群列表' + (!error?'成功':'失败'));
    if (!error) {
        onTeams(teams);
    }
}
```

### <span id="获取群成员">获取群成员</span>

- 如果开发者在[初始化SDK](#初始化SDK)时选择设置了`syncTeamMembers`为`false`, 那么就收不到`onteammembers`回调, 可以调用此方法来获取[群成员](#群成员对象)列表
- [接受入群邀请](#接受入群邀请)之后调用此方法来获取[群成员](#群成员对象)列表

```javascript
nim.getTeamMembers({
    teamId: 123,
    done: getTeamMembersDone
});
function getTeamMembersDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('获取群成员' + (!error?'成功':'失败'));
    if (!error) {
        onTeamMembers(obj);
    }
}
```

### <span id="是否需要群消息通知">是否需要群消息通知</span>

- 此接口用于查询是否需要群消息通知
- 成功时会附上一个 map, key 是群 ID, value 是一个布尔值, 表示该群是否需要群消息通知
- 调用接口[修改自己的群属性](#修改自己的群属性)来关闭/开启某个群的消息提醒

```javascript
nim.notifyForNewTeamMsg({
    teamIds: ['123'],
    done: notifyForNewTeamMsgDone
})
function notifyForNewTeamMsgDone(error, map) {
    console.log(error);
    console.log(map);
    console.log('查询是否需要群消息通知' + (!error?'成功':'失败'));
}
```

## <span id="会话">会话</span>

### 生成规则

SDK 会根据漫游消息和离线消息来生成初始会话列表, 在收到消息和发送消息之后 SDK 会更新会话列表

### <span id="会话初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onsessions: onSessions,
    onupdatesession: onUpdateSession
});
function onSessions(sessions) {
    console.log('收到会话列表', sessions);
    data.sessions = nim.mergeSessions(data.sessions, sessions);
    updateSessionsUI();
}
function onUpdateSession(session) {
    console.log('会话更新了', session);
    data.sessions = nim.mergeSessions(data.sessions, session);
    updateSessionsUI();
}
function updateSessionsUI() {
    // 刷新界面
}
```

**参数解释**

- `syncSessionUnread`, 是否同步会话的未读数, 默认不同步
  - 如果选择同步
    - 那么在一个端读过的会话在其它端也会被标记为已读
    - 在调用[设置当前会话](#设置当前会话)的时候 SDK 会自动同步一次未读数, 此后如果收到当前会话的消息, 需要手动调用[重置会话未读数](#重置会话未读数)来同步未读数
- `onsessions`, 同步最近会话列表回调, 会传入会话列表, 按时间正序排列, 即最近聊过天的放在列表的最后面
    - 此回调是增量回调, 可以调用[nim.mergeSessions](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeSessions)来合并数据
- `onupdatesession`, 更新会话的回调, 会传入[会话对象](#会话对象), 以下情况会收到此回调
    - 收到消息
    - [发送消息](#发送消息)
    - [设置当前会话](#设置当前会话)
    - [重置会话未读数](#重置会话未读数)

### <span id="会话对象">会话对象</span>

会话对象有以下字段:

- `id`: 会话ID
- `scene`: [场景](#消息场景)
- `to`: 聊天对象, 账号或群ID
- `updateTime`: 会话更新的时间
- `unread`: 未读数
- `lastMsg`: 此会话的最后一条消息
- `msgReceiptTime`: 消息已读回执时间戳, 如果有此字段, 说明此时间戳之前的所有消息对方均已读
    - 目前仅对[`'p2p'`](#消息场景)会话起作用
    - 此字段不一定有, 只有对方发送过已读回执之后才会有
    - 调用接口[发送消息已读回执](#发送消息已读回执)来发送消息已读回执
    - 调用接口[查询消息是否被对方读过了](#查询消息是否被对方读过了)来查询消息是否被对方读过了
- `localCustom`: 本地自定义扩展字段
    - 在[支持数据库](#支持数据库)时可以调用[更新本地会话](#更新本地会话)来更新此字段, 此字段只会被更新到本地数据库, 不会被更新到服务器上

### <span id="未读数">未读数</span>

SDK 会自动管理会话的未读数, 会话对象的`unread`的值为会话的未读数, 如果开发者发现会话的未读数大于收到的离线消息数, 那么需要[从本地拉取未读取的消息](#获取本地历史记录)

会话未读数的初始化在不同的配置环境下，会有不同的计算规则：
- 开启数据库： db = true
  - 开启同步会话未读数： syncSessionUnread = true
    - 此时会话未读数通过服务器下推的Ack或本地存储的Ack时间戳，与本地数据库中对应会话的本地历史记录做比较，晚于该Ack且不是自己发的消息的数量，为未读数
    - 参见[会话初始化参数](#会话初始化参数)
  - 未开启会话未读数： syncSessionUnread = false
    - 此时会话未读数通过从本地数据库上次所记录的未读数中取得，如果有离线消息且消息属性标记为isUnreadable，则会在原来的未读数上增加计数
- 不开启数据库： db = false
  - 不开启自动标记消息已读： autoMarkRead = false
    - 此时服务器下推的所有离线消息算未读，漫游消息算已读
  - 开启自动标记消息已读： autoMarkRead = true
    - 此时每次收到离线消息，均会告知服务器该消息已读，下一次登录，服务器就不会下推离线消息，而将这些消息标记为漫游消息。没有离线消息，未读数在表现上均为0
    - 参见[标记消息为已收到](#标记消息为已收到)

### <span id="设置当前会话">设置当前会话</span>

- 如果是已经存在的会话记录, 会将此会话未读数置为 0, 开发者会收到`onupdatesession`回调
- 之后此会话在收到消息之后不会更新未读数

```javascript
nim.setCurrSession('sessionId')
```

### <span id="重置会话未读数">重置会话未读数</span>

- 如果是已经存在的会话记录, 会将此会话未读数置为 0, 那么会收到`onupdatesession`回调
- 之后此会话在收到消息之后依然会更新未读数

```javascript
nim.resetSessionUnread('sessionId')
```

### <span id="重置当前回话">重置当前回话</span>

- 重置当前会话后, 所有会话在收到消息之后会更新未读数

```javascript
nim.resetCurrSession();
```

### <span id="获取本地会话列表">获取本地会话列表</span>

- 在[支持数据库](#支持数据库)时, SDK 会将会话存储于数据库中, 并且在初始化时通过回调`onsessions`将会话列表返回给开发者, 不过此列表最多 100 条记录
- 如果想获取更多会话记录, 可以调用此方法来获取更多本地会话记录
- `lastSessionId`为上次查询的最后一条会话的`id`, 第一次不填
- `limit`为本次查询的会话数量限制, 最多 100 条, 默认 100 条
- 默认从最近的会话开始往前查找本地会话, 可以传参数`reverse=true`来从第一条会话开始往后查找本地会话

```javascript
nim.getLocalSessions({
    lastSessionId: lastSessionId,
    limit: 100,
    done: getLocalSessionsDone
});
function getLocalSessionsDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('获取本地会话列表' + (!error?'成功':'失败'));
    if (!error) {
        onSessions(obj.sessions);
    }
}
```

### <span id="插入一条本地会话记录">插入一条本地会话记录</span>

- 开发者可以插入一条本地会话记录, 在[支持数据库](#支持数据库)时, SDK 会将此会话存储于本地数据库, 反之, 数据仅存于内存里面
- SDK 会设置一个比当前所有会话更新时间大的一个时间为此会话的更新时间, 或者开发者可以传入参数`updateTime`来指定更新时间
- 在回调里面, 开发者需要保存生成的会话

```javascript
nim.insertLocalSession({
    scene: 'p2p',
    to: 'account',
    done: insertLocalSessionDone
});
function insertLocalSessionDone(error, obj) {
    console.log('插入本地会话记录' + (!error?'成功':'失败'), error, obj);
    if (!error) {
        onSessions(obj.session);
    }
}
```

### <span id="更新本地会话">更新本地会话</span>

- 更新 `id` 对应的本地会话
- 如果不[支持数据库](#支持数据库), 算成功
- 如果对应的会话不存在, 算成功, 返回 null
- 这些字段只会被更新到本地数据库, 不会被更新到服务器上
- 目前只允许更新 `localCustom`

```javascript
nim.updateLocalSession({
    id: 'p2p-account',
    localCustom: '{"key","value"}',
    done: updateLocalSessionDone
});
function updateLocalSessionDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('更新本地会话' + (!error?'成功':'失败'));
}
```

### <span id="删除本地会话">删除本地会话</span>

- 在[支持数据库](#支持数据库)时, 删了本地会话之后, 下次同步就同步不到对应的会话
- 如果不[支持数据库](#支持数据库), 算成功
- 如果对应的会话不存在, 算成功
- 参数 id 为会话 id 或 id 数组

```javascript
nim.deleteLocalSession({
    id: 'p2p-account',
    done: deleteLocalSessionDone
});
function deleteLocalSessionDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除本地会话' + (!error?'成功':'失败'));
}
```

### <span id="删除服务器上的会话">删除服务器上的会话</span>

- 删了服务器上的会话之后, 在不[支持数据库](#支持数据库)时, 下次同步就同步不到对应的会话以及会话对应的漫游消息; 此外, 在新设备上也同步不到对应的会话以及会话对应的漫游消息
- `scene`请参考[消息场景](#消息场景)
- `to` 为对方账号或群ID

```javascript
nim.deleteSession({
    scene: 'p2p',
    to: 'account',
    done: deleteSessionDone
});
function deleteSessionDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除服务器上的会话' + (!error?'成功':'失败'));
}
```

### <span id="批量删除服务器上的会话">批量删除服务器上的会话</span>

- 删了服务器上的会话之后, 在不[支持数据库](#支持数据库)时, 下次同步就同步不到对应的会话以及会话对应的漫游消息; 此外, 在新设备上也同步不到对应的会话以及会话对应的漫游消息
- `scene`请参考[消息场景](#消息场景)
- `to` 为对方账号或群ID

```javascript
nim.deleteSessions({
    sessions: {[
        scene: 'p2p',
        to: 'account'
    ], [
        scene: 'p2p',
        to: 'account1'
    ]},
    done: deleteSessionsDone
});
function deleteSessionsDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('批量删除会话' + (!error?'成功':'失败'));
}
```

## <span id="消息">消息</span>

### <span id="消息初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)
- 请参考[处理群通知消息](#处理群通知消息)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg
});
function onRoamingMsgs(obj) {
    console.log('收到漫游消息', obj);
    pushMsg(obj.msgs);
}
function onOfflineMsgs(obj) {
    console.log('收到离线消息', obj);
    pushMsg(obj.msgs);
}
function onMsg(msg) {
    console.log('收到消息', msg.scene, msg.type, msg);
    pushMsg(msg);
    switch (msg.type) {
    case 'custom':
        onCustomMsg(msg);
        break;
    case 'notification':
        // 处理群通知消息
        onTeamNotificationMsg(msg);
        break;
    default:
        break;
    }
}
function pushMsg(msgs) {
    if (!Array.isArray(msgs)) { msgs = [msgs]; }
    var sessionId = msgs[0].sessionId;
    data.msgs = data.msgs || {};
    data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
}
function onCustomMsg(msg) {
    // 处理自定义消息
}
```

**参数解释**

- `shouldIgnoreNotification`, 是否要忽略某条通知类消息, 该方法会接收一个消息对象, 如果该方法返回 true, 那么 SDK 将忽略此条通知类消息
- `onroamingmsgs`, 同步漫游[消息](#消息对象)的回调, 每个[会话](#会话对象)对应一个回调, 会传入消息数组
- `onofflinemsgs`, 同步离线[消息](#消息对象)的回调, 每个[会话](#会话对象)对应一个回调, 会传入消息数组
- 在[支持数据库](#支持数据库)时并且启用了多 tab 同时登录, 那么如果多个 tab 页同时断线重连之后, 只会有一个 tab 页负责存储漫游消息和离线消息, 即只会有一个 tab 页会收到 `onroamingmsgs` 和 `onofflinemsgs` 回调, 其它 tab 页在[同步完成](#同步完成)之后, 需要调用[获取本地历史记录](#获取本地历史记录)来从本地缓存中拉取消息记录
- `onmsg`, 收到[消息](#消息对象)的回调
    - 当前登录帐号在其它端发送消息之后也会收到此回调, 注意此时消息对象的`from`字段就是当前登录的帐号
- 可以调用[nim.mergeMsgs](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#mergeMsgs)来合并数据

### <span id="消息对象">消息对象</span>

消息对象有以下字段
- `scene`: [消息场景](#消息场景)
- `from`: 消息发送方, 帐号或群id
- `fromNick`: 消息发送方的昵称
- `fromClientType`: 发送方的[设备类型](#设备类型)
- `fromDeviceId`: 发送端设备id
- `to`: 消息接收方, 帐号或群id
- `time`: 时间戳
- `type`: [消息类型](#消息类型)
- `sessionId`: 消息所属的[会话](#会话对象)的ID
- `target`: 聊天对象, 账号或者群id
- `flow`: 消息的流向
    - 'in'表示此消息是收到的消息
    - 'out'表示此消息是发出的消息
- `status`: 消息发送状态
    - `'sending'` 发送中
    - `'success'` 发送成功
    - `'fail'` 发送失败
- `text`: 文本消息的文本内容, 请参考[发送文本消息](#发送文本消息)
- `file`: 文件消息的文件对象, 具体字段请参考[图片对象](#图片对象)、[音频对象](#音频对象)、[视频对象](#视频对象)、[文件对象](#文件对象), 请参考[发送文件消息](#发送文件消息)
- `geo`: 地理位置消息的[地理位置对象](#地理位置对象), 请参考[发送地理位置消息](#发送地理位置消息)
- `tip`: 提醒消息的内容, 请参考[发送提醒消息](#发送提醒消息)
- `content`: 自定义消息或机器人回复消息的消息内容, 开发者可以自行扩展, 建议封装成JSON格式字符串, 请参考[发送自定义消息](#发送自定义消息)
- `attach`: 群通知消息的附加信息, 参考[群通知消息](#群通知消息)来查看不同类型的群通知消息对应的附加信息
- `idClient`: SDK生成的消息id, 在发送消息之后会返回给开发者, 开发者可以在发送消息的回调里面根据这个ID来判断相应消息的发送状态, 到底是发送成功了还是发送失败了, 然后根据此状态来更新页面的UI。如果发送失败, 那么可以[重发消息](#重发消息)
- `idServer`: 服务器用于区分消息用的ID, 主要用于[获取云端历史记录](#获取云端历史记录)
- `isMuted`: 该消息在接收方是否应该被静音
- `resend`: 是否是重发的消息
- `custom`: 扩展字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `pushContent`: 自定义推送文案
- `pushPayload`: 自定义的推送属性
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `needPushNick`: 是否需要推送昵称
- `apns`: 特殊推送选项, 只在群会话中使用
- `apns.accounts`: 需要特殊推送的账号列表, 此字段不存在的话表示推送给当前会话内的所有用户
- `apns.content`: 需要特殊推送的文案
- `apns.forcePush`: 是否强制推送, true 表示即使推送列表中的用户屏蔽了当前会话（如静音）, 仍能够推送当前这条内容给相应用户
- `localCustom`: 本地自定义扩展字段
    - 在[支持数据库](#支持数据库)时可以调用[更新本地消息](#更新本地消息)来更新此字段, 此字段只会被更新到本地数据库, 不会被更新到服务器上
- `isHistoryable`: 是否存储云端历史
- `isRoamingable`: 是否支持漫游
- `isSyncable`: 是否支持发送者多端同步
- `cc`: 是否支持抄送
- `isPushable`: 是否需要推送
- `isOfflinable`: 是否要存离线
- `isUnreadable`: 是否计入消息未读数
- `isLocal`: 是否是本地消息, 请查阅[发送本地消息](#发送本地消息)

### <span id="消息场景">消息场景</span>

[消息对象](#消息对象)有一个字段`scene`来标明消息所属的场景, 具体场景如下
- `'p2p'` (点对点消息)
- `'team'` (群消息)

### <span id="消息类型">消息类型</span>

[消息对象](#消息对象)有一个字段`type`来标明消息的类型, 具体类型如下
- `'text'` (文本消息)
- `'image'` (图片消息)
- `'audio'` (音频消息)
- `'video'` (视频消息)
- `'file'` (文件消息)
- `'geo'` (地理位置消息)
- `'custom'` (自定义消息)
- `'tip'` (提醒消息)
    - 提醒消息用于会话内的状态提醒，如进入会话时出现的欢迎消息，或者会话命中敏感词后的提示消息等等.
- `'robot'` (AI机器人消息)
- `'notification'` (群通知消息)
    - 某些群操作后所有群成员会收到一条相应的群通知消息, 详细介绍请参考[群通知消息](#群通知消息)
    - 此类消息不会计入未读数
    - 请参考[消息对象](#消息对象)、[消息类型](#消息类型)

### <span id="群通知消息">群通知消息</span>

- 群通知消息是[消息](#消息类型)的一种
- 某些群操作后所有群成员会收到一条相应的群通知消息
- 群通知消息对应的[消息对象](#消息对象)有一个字段`attach`包含了额外的信息, `attach`有一个字段`type`来标识群通知消息的类型
    - `'updateTeam'` ([更新群](#更新群))
        - [更新群](#更新群)后, 所有群成员会收到一条类型为`'updateTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为更新群的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为被更新的[群信息](#群对象)
    - `'addTeamMembers'` ([拉人入群](#拉人入群))
        - 普通群, [拉人入群](#拉人入群)后, 所有[群成员](#群成员对象)会收到一条类型为`'addTeamMembers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为拉人的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`accounts`的值为被拉的人的帐号列表, `attach`有一个字段`members`的值为被拉的群成员列表。
    - `'removeTeamMembers'` ([踢人出群](#踢人出群))
        - [踢人出群](#踢人出群)后, 所有[群成员](#群成员对象)会收到一条类型为`'removeTeamMembers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为踢人的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`accounts`的值为被踢的人的帐号列表。
    - `'acceptTeamInvite'` ([接受入群邀请](#接受入群邀请))
        - 高级群的群主和管理员在邀请成员加入群（通过操作[创建群](#创建群)或[拉人入群](#拉人入群)）之后, 被邀请的人会收到一条类型为`'teamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为邀请方的帐号, `to`字段的值为对应的群ID, 此类系统通知的`attach`有一个字段`team`的值为被邀请进入的[群](#群对象), 被邀请的人可以选择接受邀请或者拒绝邀请。
            - 如果[接受邀请](#接受入群邀请), 那么该群的所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为接受入群邀请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`members`的值为接收入群邀请的群成员列表。
            - 如果[拒绝邀请](#拒绝入群邀请), 那么邀请你的人会收到一条类型为`'rejectTeamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝入群邀请的用户的帐号, `to`字段的值为对应的群ID。
    - `'passTeamApply'` ([通过入群申请](#通过入群申请))
        - 用户可以[申请加入高级群](#申请入群), 目标群的群主和管理员会收到一条类型为`'applyTeam'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为对应的群ID, 高级群的群主和管理员在收到入群申请后, 可以选择通过或者拒绝入群申请。
            - 如果[通过申请](#通过入群申请), 那么该群的所有群成员会收到一条类型为`'passTeamApply'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为通过入群申请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为申请方的帐号, `attach`有一个字段`members`的值为被通过申请的群成员列表。
            - 如果[拒绝申请](#拒绝入群申请), 那么申请人会收到一条类型为`'rejectTeamApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群](#群对象)。
    - `'addTeamManagers'` ([添加群管理员](#添加群管理员))
        - [添加群管理员](#添加群管理员)后, 所有[群成员](#群成员对象)会收到一条类型为`'addTeamManagers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为添加群管理员的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`accounts`的值为被加为管理员的帐号列表, `attach`有一个字段`members`的值为被加为管理员的群成员列表
    - `'removeTeamManagers'` ([移除群管理员](#移除群管理员))
        - [移除群管理员](#移除群管理员)后, 所有[群成员](#群成员对象)会收到一条类型为`'removeTeamManagers'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为移除群管理员的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`accounts`的值为被移除的管理员的帐号列表, `attach`有一个字段`members`的值为被移除管理员的群成员列表
    - `'leaveTeam'` ([主动退群](#主动退群))
        - [主动退群](#主动退群)后, 所有[群成员](#群成员对象)会收到一条类型为`'leaveTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为退群的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象)。
    - `'dismissTeam'` ([解散群](#解散群))
        - [解散群](#解散群)后, 所有[群成员](#群成员对象)会收到一条类型为`'dismissTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段为解散群的人的帐号, `to`字段的值为被对应的群ID。
    - `'transferTeam'` ([转让群](#转让群))
        - [转让群](#转让群)后, 所有[群成员](#群成员对象)会收到一条类型为`'transferTeam'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为转让群的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为为新群主的帐号, `attach`有一个字段`members`的值为包含新旧群主的群成员列表。
    - `'updateTeamMute'` ([更新群成员禁言状态](#更新群成员禁言状态))
        - [更新群成员禁言状态](#更新群成员禁言状态)后, 所有[群成员](#群成员对象)会收到一条类型为`'updateTeamMute'`的[群通知消息](#群通知消息)。此类群通知消息的`from`字段的值为操作方, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为被禁言的帐号, `attach`有一个字段`members`的值为被禁言的群成员列表。
- 如果`attach`有`account`或者`accounts`字段, 那么`attach`的字段`users`包含这些账号对应的用户名片
- 更新群昵称不会收到群通知消息, 所有其它在线的群成员会收到[初始化SDK](#初始化SDK)时传入的`onupdateteammember`回调, 请参考[修改自己的群属性](#修改自己的群属性)和[修改别人的群昵称](#修改别人的群昵称)

### <span id="处理群通知消息">处理群通知消息</span>

- 这一章节涉及到了群和群成员的处理, 要跟以下章节一起看
    - [群组初始化参数](#群组初始化参数)里面的 `onteams`, `onsynccreateteam`, `onteammembers`, `onupdateteammember`
    - [消息初始化参数](#消息初始化参数)里面的 `onmsg`
    - [群通知消息](#群通知消息)

**示例代码**

```javascript
function onTeamNotificationMsg(msg) {
    // 处理群通知消息
    var type = msg.attach.type,
        from = msg.from,
        teamId = msg.to,
        timetag = msg.time,
        team = msg.attach.team,
        account = msg.attach.account,
        accounts = msg.attach.accounts,
        members = msg.attach.members;
    switch (type) {
    case 'updateTeam':
        team.updateTime = timetag;
        onTeams(team);
        break;
    case 'addTeamMembers':
        onAddTeamMembers(team, accounts, members);
        break;
    case 'removeTeamMembers':
        onRemoveTeamMembers(team, teamId, accounts);
        break;
    case 'acceptTeamInvite':
        onAddTeamMembers(team, [from], members);
        break;
    case 'passTeamApply':
        onAddTeamMembers(team, [account], members);
        break;
    case 'addTeamManagers':
        updateTeamManagers(teamId, members);
        break;
    case 'removeTeamManagers':
        updateTeamManagers(teamId, members);
        break;
    case 'leaveTeam':
        onRemoveTeamMembers(team, teamId, [from]);
        break;
    case 'dismissTeam':
        dismissTeam(teamId);
        break;
    case 'transferTeam':
        transferTeam(team, members);
        break;
    }
}
function onAddTeamMembers(team, accounts, members) {
    var teamId = team.teamId;
    /*
    如果是别人被拉进来了，那么拼接群成员列表
    如果是自己被拉进来了，那么同步一次群成员列表
    */
    if (accounts.indexOf(data.account) === -1) {
        onTeamMembers({
            teamId: teamId,
            members: members
        });
    } else {
        nim.getTeamMembers({
            teamId: teamId,
            sync: true,
            done: function(error, obj) {
                if (!error) {
                    onTeamMembers(obj);
                }
            }
        });
    }
    onTeams(team);
}
function onRemoveTeamMembers(team, teamId, accounts) {
    /*
    如果是别人被踢了，那么移除群成员
    如果是自己被踢了，那么离开该群
    */
    if (accounts.indexOf(data.account) === -1) {
        if (team) {
            onTeams(team);
        }
        data.teamMembers[teamId] = nim.cutTeamMembersByAccounts(data.teamMembers[teamId], teamId, accounts);
        refreshTeamMembersUI();
    } else {
        leaveTeam(teamId);
    }
}
function updateTeamManagers(teamId, members) {
    onTeamMembers({
        teamId: teamId,
        members: members
    });
};
function leaveTeam(teamId) {
    onInvalidTeams({
        teamId: teamId
    });
    removeAllTeamMembers(teamId);
}
function dismissTeam(teamId) {
    onInvalidTeams({
        teamId: teamId
    });
    removeAllTeamMembers(teamId);
}
function removeAllTeamMembers(teamId) {
    delete data.teamMembers[teamId];
    refreshTeamMembersUI();
}
function transferTeam(team, members) {
    var teamId = team.teamId;
    onTeamMembers({
        teamId: teamId,
        members: members
    });
    onTeams(team);
}
```

**参数解释**

- 这里面用到了[nim.cutTeamMembersByAccounts](http://dev.netease.im/docs/interface/即时通讯Web端/NIMSDK-Web/NIM.html#cutTeamMembersByAccounts)来合并群成员

### <span id="发送消息">发送消息</span>

- 跟发消息相关的接口有
    - [发送文本消息](#发送文本消息)
    - [预览文件](#预览文件)
    - [发送文件消息](#发送文件消息)
    - [发送地理位置消息](#发送地理位置消息)
    - [发送提醒消息](#发送提醒消息)
    - [发送自定义消息](#发送自定义消息)
    - [发送机器人消息](#发送机器人消息)
    - [发送消息的配置选项](#发送消息的配置选项)
    - [发送本地消息](#发送本地消息)
    - [重发消息](#重发消息)
    - [转发消息](#转发消息)
    - [消息撤回](#消息撤回)
- 先解释几个所有发送消息的接口都用到的参数
    - `scene`参数用来指定发送消息的[场景](#消息场景)
    - `to`参数用来指定消息的接收方, 发送点对点消息时填帐号, 发送群消息时填群ID
    - 发送消息的接口会返回SDK生成的ID, 对应为字段`idClient`, 有一个例外是直接发送文件消息是在`beforesend`回调里获取这个值
    - 在`done`回调中可以根据`error`对象和[消息对象](#消息对象)的`idClient`字段来确定对应的消息的发送状态。
        - 如果`error`为空, 那么表明`idClient`对应的消息发送成功
        - `error`不为空, 表明`idClient`对应的消息发送失败, `error`包含详细的错误信息
- 以下代码皆以发送点对点消息（`scene`为`'p2p'`）为例, 如需发送群消息, 请将`scene`的值替换为`'team'`, 将`to`的值替换为群ID

#### <span id="发送文本消息">发送文本消息</span>

- 文本消息是[消息](#消息类型)的一种

```javascript
var msg = nim.sendText({
    scene: 'p2p',
    to: 'account',
    text: 'hello',
    done: sendMsgDone
});
console.log('正在发送p2p text消息, id=' + msg.idClient);
pushMsg(msg);
function sendMsgDone(error, msg) {
    console.log(error);
    console.log(msg);
    console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
    pushMsg(msg);
}
```

#### <span id="预览文件">预览文件</span>

- 开发者可以预览文件, 支持以下几种场景
    - 通过参数`fileInput`传入文件选择 dom 节点或者节点 ID
    - 通过参数`blob`传入 Blob 对象
    - 通过参数`dataURL`传入包含 MIME type 和 base64 数据的 data URL, 此用法需要浏览器支持 window.Blob
    - 通过参数`wxFilePath`传入临时文件路径, 仅供微信小程序使用, 通过 wx.chooseImage 或者 wx.startRecord 拿到的临时文件路径
- SDK会将文件上传到文件服务器, 然后将拿到的文件对象在`done`回调中传给开发者, 文件对象有以下几种
    - [图片对象](#图片对象)
    - [音频对象](#音频对象)
    - [视频对象](#视频对象)
    - [文件对象](#文件对象)
- 开发者在拿到文件对象之后, 可以调用[发送文件消息](#发送文件消息)来发送文件消息。
- 文件大小限制为最大100M
    - 高级浏览器会在上传前就检测文件大小
    - IE8/IE9 会在上传完成后检测文件大小

```javascript
nim.previewFile({
    type: 'image',
    fileInput: fileInput,
    uploadprogress: function(obj) {
        console.log('文件总大小: ' + obj.total + 'bytes');
        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
        console.log('上传进度: ' + obj.percentage);
        console.log('上传进度文本: ' + obj.percentageText);
    },
    done: function(error, file) {
        console.log('上传image' + (!error?'成功':'失败'));
        // show file to the user
        if (!error) {
            var msg = nim.sendFile({
                scene: 'p2p',
                to: 'account',
                file: file,
                done: sendMsgDone
            });
            console.log('正在发送p2p image消息, id=' + msg.idClient);
            pushMsg(msg);
        }
    }
});
```

#### <span id="发送文件消息">发送文件消息</span>

- 文件消息是[消息](#消息类型)的一种
- 开发者可以直接发送文件消息
    - 支持以下几种场景
        - 通过参数`fileInput`传入文件选择 dom 节点或者节点 ID
        - 通过参数`blob`传入 Blob 对象
        - 通过参数`dataURL`传入包含 MIME type 和 base64 数据的 data URL, 此用法需要浏览器支持 window.Blob
        - 通过参数`wxFilePath`传入临时文件路径, 仅供微信小程序使用, 通过 wx.chooseImage 或者 wx.startRecord 拿到的临时文件路径
    - SDK会先将文件上传到文件服务器, 然后把拿到的文件对象在`uploaddone`回调中传给用户, 然后将其拼装成文件消息发送出去。
- 开发者也可以先[预览文件](#预览文件)来获取文件对象, 然后调用此接口发送文件消息。
- 直接发送文件消息的话会在`beforesend`回调里面传入SDK生成的`idClient`, 如果先预览文件再发送, 那么此接口会直接返回`idClient`
- 参数`type`指定了要发送的文件类型, 包括图片、音频、视频和普通文件, 对应的值分别为`'image'`、`'audio'`、`'video'`和`'file'`, 不传默认为`'file'`。
- 图片、音频、视频和普通文件的区别在于具体的文件信息不一样, 具体字段请参考
    - [图片对象](#图片对象)
    - [音频对象](#音频对象)
    - [视频对象](#视频对象)
    - [文件对象](#文件对象)
- 文件大小限制为最大100M
    - 高级浏览器会在上传前就检测文件大小
    - IE8和IE9会在上传完成后检测文件大小

```javascript
nim.sendFile({
    scene: 'p2p',
    to: 'account',
    type: 'image',
    fileInput: fileInput,
    beginupload: function(upload) {
        // - 如果开发者传入 fileInput, 在此回调之前不能修改 fileInput
        // - 在此回调之后可以取消图片上传, 此回调会接收一个参数 `upload`, 调用 `upload.abort();` 来取消文件上传
    },
    uploadprogress: function(obj) {
        console.log('文件总大小: ' + obj.total + 'bytes');
        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
        console.log('上传进度: ' + obj.percentage);
        console.log('上传进度文本: ' + obj.percentageText);
    },
    uploaddone: function(error, file) {
        console.log(error);
        console.log(file);
        console.log('上传' + (!error?'成功':'失败'));
    },
    beforesend: function(msg) {
        console.log('正在发送p2p image消息, id=' + msg.idClient);
        pushMsg(msg);
    },
    done: sendMsgDone
});
```

#### <span id="图片对象">图片对象</span>

当[发送图片消息](#发送文件消息)或收到图片消息时, [消息对象](#消息对象)的`file`字段代表图片对象, 包含以下属性:
- `name`: 名字
- `size`: 大小, 单位byte
- `md5`: md5
- `url`: url
- `ext`: 扩展名
- `w`: 宽, 单位px
- `h`: 高, 单位px

#### <span id="音频对象">音频对象</span>

当[发送音频消息](#发送文件消息)或收到音频消息时, [消息对象](#消息对象)的`file`字段代表音频对象, 包含以下属性:
- `name`: 名字
- `size`: 大小, 单位byte
- `md5`: md5
- `url`: url
- `ext`: 扩展名
- `dur`: 长度, 单位ms

#### <span id="视频对象">视频对象</span>

当[发送视频消息](#发送文件消息)或收到视频消息时, [消息对象](#消息对象)的`file`字段代表视频对象, 包含以下属性:
- `name`: 名字
- `size`: 大小, 单位byte
- `md5`: md5
- `url`: url
- `ext`: 扩展名
- `dur`: 长度, 单位ms
- `w`: 宽, 分辨率, 单位px
- `h`: 高, 分辨率, 单位px

#### <span id="文件对象">文件对象</span>

当[发送文件消息](#发送文件消息)或收到文件消息时, [消息对象](#消息对象)的`file`字段代表文件对象, 包含以下属性:
- `name`: 名字
- `size`: 大小, 单位byte
- `md5`: md5
- `url`: url
- `ext`: 扩展名

#### <span id="发送地理位置消息">发送地理位置消息</span>

- 地理位置消息是[消息](#消息类型)的一种, `geo`参数请参考[地理位置对象](#地理位置对象)

```javascript
var msg = nim.sendGeo({
    scene: 'p2p',
    to: 'account',
    geo: {
        lng: '116.3833',
        lat: '39.9167',
        title: 'Beijing'
    },
    done: sendMsgDone
});
console.log('正在发送p2p geo消息, id=' + msg.idClient);
pushMsg(msg);
```

#### <span id="地理位置对象">地理位置对象</span>

当[发送地理位置消息](#发送地理位置消息)或收到地理位置消息时, [消息对象](#消息对象)的`geo`字段代表地理位置对象, 包含以下属性:
- `lng`: 经度
- `lat`: 纬度
- `title`: 地址描述

#### <span id="发送提醒消息">发送提醒消息</span>

- 提醒消息是[消息](#消息类型)的一种
- 提醒消息用于会话内的状态提醒，如进入会话时出现的欢迎消息，或者会话命中敏感词后的提示消息等等.

```javascript
var msg = nim.sendTipMsg({
    scene: 'p2p',
    to: 'account',
    tip: 'tip content',
    done: sendMsgDone
});
console.log('正在发送p2p提醒消息, id=' + msg.idClient);
pushMsg(msg);
```

#### <span id="发送自定义消息">发送自定义消息</span>

- 自定义消息是[消息](#消息类型)的一种
- 在网易云信开放的web-demo源码中，type-1为[石头剪刀布]，type-2为[阅后即焚]，type-3为[贴图表情]，type-4为[白板教学]
- 下面的代码用自定义消息实现了`石头剪刀布`游戏

```javascript
var value = Math.ceil(Math.random()*3);
var content = {
    type: 1,
    data: {
        value: value
    }
};
var msg = nim.sendCustomMsg({
    scene: 'p2p',
    to: 'account',
    content: JSON.stringify(content),
    done: sendMsgDone
});
console.log('正在发送p2p自定义消息, id=' + msg.idClient);
pushMsg(msg);
```

#### <span id="发送机器人消息">发送机器人消息</span>

- 机器人消息是[消息](#消息类型)的一种
- **注意** 这里的机器人消息区别于开发者业务后台自行设定的机器人，而是网易云智能AI中配置的机器人消息，可以在[网易云智能AI服务](http://sw.bot.163.com)开通机器人服务
- 机器人内容格式规范可参考[机器人消息体模板说明](/docs/product/IM即时通讯/机器人消息体模板说明)
- 机器人消息参数：
  - `robotAccid` 机器人帐号id
    - 如果是直接p2p与机器人聊天，此项可不填，to字段即为robotAccid。
  - `body` 用于记录原始文本数据，在UI中展现，如"@机器人 你好"，实际发给机器人的字段则是"你好"二字。
  - `content` 机器人消息体，为javascript对象
    - `type` 机器人消息类型，封装有：
      - `welcome`: 欢迎消息
      - `text`: 文本消息，需要配合参数content
      - `link`: bot链接消息，需要配合参数params、target
    - `content` 机器人文本消息内容
    - `params` 机器人链接消息参数
    - `target` 机器人链接消息目标

```javascript
// 直接在p2p会话中发送机器人消息
var msg = nim.sendRobotMsg({
    scene: 'p2p',
    to: 'robotAccid',
    content: {
      type: 'text',
      content: '机器人你好'
    }
    done: sendMsgDone
});

// 在于他人的会话中通过@机器人 发送机器人消息
var msg = nim.sendRobotMsg({
  scene: 'p2p',
  to: 'account',
  robotAccid: 'robotAccid',
  content: {
    type: 'link',
    params: 'a=1&b=2',
    target: 'A511F4B67336BE45-954F87865D2205C8'
  }
  done: sendMsgDone
})

function sendMsgDone(error, msg) {
    console.log(error, msg);
    console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
    // ...
}
```

#### <span id="机器人回复消息模板解析">机器人回复消息模板解析</span>
- 对于使用网易AI服务得到的机器人自动回复消息，SDK预置了相关的模板解析函数(同步函数)，帮助开发者解析相应的xml模板。
- xml模板可参考[机器人消息体模板说明](/docs/product/IM即时通讯/机器人消息体模板说明)
- 对于如下格式的xml模板
```xml
<template>
  <LinearLayout>
    <text name="label">您好，我是网易云信，点击下面的按钮测试复杂交互</text>
  </LinearLayout>
  <LinearLayout>
    <link style="button" target="http://netease.im" type="url">
      <text name="label">访问官网</text>
    </link>
    <link style="button" target="A511F4B67336BE45-954F87865D2205C8" type="block">
      <text name="label">测试动态接口</text>
    </link>
    <link style="button" target="A511F4B67336BE45-598B5F469F035733" type="block">
      <text name="label">继续对话</text>
    </link>
  </LinearLayout>
</template>
```
- 调用sdk内置的方法parseRobotTemplate，将其转化为
```javascript
{
  json: [
    {
      type:"text",
      name: "label"
      text: "您好，我是网易云信，点击下面的按钮测试复杂交互",
    },
    {
      type:"url",
      style: "button",
      target: "http://netease.im",
      text: [
        {
          type:"text",
          name:"label",
          text:"访问官网"
        }
      ]
    },
    {
      type:"block",
      params:"",
      style:"button",
      target:"A511F4B67336BE45-954F87865D2205C8",
      text: [
        type:"text",
        name:"label",
        text:"测试动态接口"
      ]
    },
    {
      type:"block",
      params:"",
      style:"button",
      target:"A511F4B67336BE45-598B5F469F035733",
      text: {
        type:"text",
        name:"label",
        text:"继续对话"
      }
    }
  ],
  raw: `原始的xml字符串。。。`
}
```
- 代码使用参考示例：
```javascript
  if (msg.type === 'robot') {
    if (msg.content && msg.content.flag === 'bot') {
      if (msg.content.message) {
        msg.content.message = msg.content.message.map(item => {
          switch (item.type) {
            case 'template':
              item.content = nim.parseRobotTemplate(item.content)
              break
            case 'text':
            case 'image':
            case 'answer':
              break
          }
          return item
        })
      }
    }
  }
```

#### <span id="发送消息的配置选项">发送消息的配置选项</span>

- 上面的各个发送消息的接口都可以配置额外的选项, 来满足开发者对服务器的自定义需求。
    - `custom`: 扩展字段
        - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
    - `pushContent`: 自定义推送文案
    - `pushPayload`: 自定义的推送属性
        - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
    - `needPushNick`: 是否需要推送昵称
    - `apns`: 特殊推送选项, 只在群会话中使用
    - `apns.accounts`: 需要特殊推送的账号列表, 不填表示推送给当前会话内的所有用户
    - `apns.content`: 需要特殊推送的文案, 不填的话默认为 pushContent
    - `apns.forcePush` 是否强制推送, 不填的话默认 true. true 表示即使推送列表中的用户屏蔽了当前会话（如静音）, 仍能够推送当前这条内容给相应用户
    - `isHistoryable`: 是否存储云端历史
    - `isRoamingable`: 是否支持漫游
    - `isSyncable`: 是否支持发送者多端同步
    - `cc`: 是否支持抄送
    - `isPushable`: 是否需要推送
    - `isOfflinable`: 是否要存离线
    - `isUnreadable`: 是否计入消息未读数
    - `yidunEnable`: 是否需要过易盾反垃圾
    - `antiSpamContent`: 在开启`yidunEnable`后, 开发者自定义的反垃圾字段（json格式)，格式如下：{"type": 1, "data": "custom content"} 字段说明：type:1.文本，2.图片，3视频，data内容:文本内容or图片地址or视频地址
- 下面给一个发送文本消息的例子, 发送其它消息的接口类似

```javascript
var msg = nim.sendText({
    scene: 'p2p',
    to: 'account',
    text: 'hello',
    custom: '{}',
    done: sendMsgDone
});
```

#### <span id="发送本地消息">发送本地消息</span>

- 发送消息时可以指定参数`isLocal`为`true`, 那么SDK并不会发送此条消息, 而是直接调用回调表示发送成功, 并更新对应的会话

```javascript
var value = Math.ceil(Math.random()*3);
var content = {
    type: 1,
    data: {
        value: value
    }
};
var msg = nim.sendCustomMsg({
    scene: 'p2p',
    to: 'account',
    content: JSON.stringify(content),
    isLocal: true,
    done: sendMsgDone
});
console.log('正在发送p2p自定义消息, id=' + msg.idClient);
pushMsg(msg);
```

#### <span id="重发消息">重发消息</span>

如果消息发送失败, 那么可以重发消息

```javascript
nim.resendMsg({
  msg: someMsg,
  done: sendMsgDone
})
console.log('正在重发消息', someMsg)
```

#### <span id="转发消息">转发消息</span>

- `msg`: 待转发的消息
- `scene`: 新的[场景](#消息场景)
- `to`: 新的接收方, 对方帐号或者群id

```javascript
nim.forwardMsg({
  msg: someMsg,
  scene: 'p2p',
  to: 'account',
  done: sendMsgDone
})
console.log('正在转发消息', someMsg)
```

#### <span id="消息撤回">消息撤回</span>

- 在会话时，允许用户撤回一定时间内发送过的消息,这个时长可以由云信管理后台进行配置。
- 如果需要在撤回后显示一条已撤回的提示 ( 见 Demo 交互 ) ，开发者可以自行构造一条提醒消息并插入本地数据库。
- [撤回消息](#消息撤回)后, 消息接收方会收到一条类型为`'deleteMsg'`的[系统通知](#系统通知), 此类系统通知的 `msg` 为被删除的消息的部分字段。如果是群消息, 那么群里的所有人都会收到这条系统通知. 如果同时在多个端登录了同一个账号, 那么其它端也会收到这条系统通知.
- `msg`: 待撤回的消息

```js
nim.deleteMsg({
  msg: someMsg,
  done: deleteMsgDone
})
console.log('正在撤回消息', someMsg)
function deleteMsgDone (error) {
  console.log('撤回消息' + (!error?'成功':'失败'), error);
}
```

### <span id="标记消息为已收到">标记消息为已收到</span>

- 先解释一下消息发送和接收的流程, A 发消息给 B, 实际的流程是:
    - A 将消息发送给服务器, 如果 B 在线, 服务器会将消息推给 B; 如果 B 不在线, 服务器会在 B 上线的时候将此消息作为离线消息推给 B
    - B 在收到在线消息和离线消息之后, 需要告诉服务器收到了这些消息, 这样 B 下次登录时服务器就不会再次推这些消息
    - 如果 B 没有告诉服务器收到了这些消息, 那么 B 下次登录时, 服务器会再次将这些消息推给 B
- 默认情况下, SDK 在收到消息（包括在线消息和离线消息）之后就将消息标记为已收到, 这样下次登录时就不会再收到这些消息, 一般情况下开发者不需要关心此接口
    - 在[支持数据库](#支持数据库)时, SDK 会将消息存储于数据库中, 如果开发者发现会话的未读数大于收到的离线消息数, 那么需要[从本地拉取未读取的消息](#获取本地历史记录).
    - 在不[支持数据库](#支持数据库)时, 如果开发者想控制标记消息为已收到的时机, 那么可以设置初始化参数`autoMarkRead`为`false`, 这样SDK就不会自动标记消息为已收到, 此时需要开发者在适当的时机调用此接口来标记消息为已收到, 否则下次登录后还是会收到未标记为已收到的消息.

**示例代码**

```javascript
var nim = NIM.getInstance({
    autoMarkRead: false
});
nim.markMsgRead(someMsg);
// or
nim.markMsgRead([someMsg]);
```

### <span id="已读回执">已读回执</span>

- [会话对象](#会话对象)加了一个属性`msgReceiptTime`表示消息已读回执时间戳, 如果有此字段, 说明此时间戳之前的所有消息对方均已读
    - 目前仅对[`'p2p'`](#消息场景)会话起作用
    - 此字段不一定有, 只有对方发送过已读回执之后才会有
    - 调用接口[发送消息已读回执](#发送消息已读回执)来发送消息已读回执
    - 调用接口[查询消息是否被对方读过了](#查询消息是否被对方读过了)来查询消息是否被对方读过了

#### <span id="发送消息已读回执">发送消息已读回执</span>

- 目前只支持[`'p2p'`](#消息场景)会话
- 如果没有传入消息, 则直接返回成功
- 如果已经发送过比传入的消息的时间戳大的已读回执, 那么直接返回成功
- 参数`msg`为要发送已读回执的会话的最后一条收到的消息, 可以直接通过[session.lastMsg](#会话对象)来获取此消息

```javascript
nim.sendMsgReceipt({
    msg: session.lastMsg,
    done: sendMsgReceiptDone
});
function sendMsgReceiptDone(error, obj) {
    console.log('发送消息已读回执' + (!error?'成功':'失败'), error, obj);
}
```

#### <span id="查询消息是否被对方读过了">查询消息是否被对方读过了</span>

- 目前只支持[`'p2p'`](#消息场景)会话

```javascript
var isRemoteRead = nim.isMsgRemoteRead(msg);
```

## <span id="历史记录">历史记录</span>

### <span id="本地历史记录">本地历史记录</span>

- 在[支持数据库](#支持数据库)的时候, SDK 会将消息存储于数据库中
- 当开发者发现会话的未读数大于消息数量时, 说明有未读消息存储于数据库里面, 需要调用[获取本地历史记录](#获取本地历史记录)来获取更多消息
- 其它接口
    - [获取包含关键词的本地历史记录](#获取包含关键词的本地历史记录)
    - [获取 idClient 对应的本地消息](#获取 idClient 对应的本地消息)
    - [获取 idClients 对应的本地消息](#获取 idClients 对应的本地消息)
    - [更新本地消息](#更新本地消息)
    - [删除本地消息](#删除本地消息)
    - [删除某个会话的本地消息](#删除某个会话的本地消息)
    - [删除所有本地消息](#删除所有本地消息)

#### <span id="获取本地历史记录">获取本地历史记录</span>

- `sessionId` 如果提供该参数, 那么查询该会话的消息
- `sessionIds` 如果提供该参数, 那么查询这几个会话的消息
- `start=0` 开始时间
- `end=Infinity` 结束时间
- `desc=true` true 表示从 end 开始查, false 表示从 begin 开始查
- `limit=100` limit 数量限制
- `type` [消息类型](#消息类型), 如果提供该参数, 那么查询该类型的消息
- `types` 如果提供该参数, 那么查询这几种类型的消息
- `keyword` 如果提供参数, 那么查询匹配该关键词的消息

```javascript
nim.getLocalMsgs({
  sessionId: 'p2p-account'
  limit: 100,
  done: getLocalMsgsDone
})
function getLocalMsgsDone(error, obj) {
  console.log('获取本地消息' + (!error?'成功':'失败'), error, obj)
}
```

#### <span id="获取 idClient 对应的本地消息">获取 idClient 对应的本地消息</span>

- 如果不[支持数据库](#支持数据库), 算成功, 返回 null

```javascript
nim.getLocalMsgByIdClient({
    idClient: 'd7a1b2c63066e1038e9aa01321652370',
    done: getLocalMsgByIdClientDone
});
function getLocalMsgByIdClientDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('获取本地消息' + (!error?'成功':'失败'));
    if (!error) {
        console.log(obj.msg);
    }
}
```

#### <span id="获取 idClients 对应的本地消息">获取 idClients 对应的本地消息</span>

- 如果不[支持数据库](#支持数据库), 算成功, 返回空数组

```javascript
nim.getLocalMsgsByIdClients({
    idClients: [
        'd7a1b2c63066e1038e9aa01321652370',
        '22e604c7811c23586355f63f24658525'
    ],
    done: getLocalMsgsByIdClientsDone
});
function getLocalMsgsByIdClientsDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('获取本地消息' + (!error?'成功':'失败'));
    if (!error) {
        console.log(obj.msgs);
    }
}
```

#### <span id="更新本地消息">更新本地消息</span>

- 更新 `idClient` 对应的本地消息
- 如果不[支持数据库](#支持数据库), 算成功
- 如果对应的消息不存在, 算成功, 返回 null
- 这些字段只会被更新到本地数据库, 不会被更新到服务器上

```javascript
 nim.updateLocalMsg({
     id: 'p2p-account',
     localCustom: '{"key","value"}',
     done: updateLocalMsgDone
 });
 function updateLocalMsgDone(error, obj) {
     console.log(error);
     console.log(obj);
     console.log('更新本地消息' + (!error?'成功':'失败'));
 }
```

#### <span id="删除本地消息">删除本地消息</span>

- 如果不[支持数据库](#支持数据库), 算成功
- 如果对应的消息不存在, 算成功

```javascript
nim.deleteLocalMsg({
    msg: msg,
    done: deleteLocalMsgDone
});
function deleteLocalMsgDone(error, obj) {
    console.log('删除本地消息' + (!error?'成功':'失败'), error, obj);
}
```

#### <span id="删除某个会话的本地消息">删除某个会话的本地消息</span>

- 如果不[支持数据库](#支持数据库), 算成功

```javascript
nim.deleteLocalMsgsBySession({
    scene: 'p2p',
    to: 'account',
    done: deleteLocalMsgsBySessionDone
});
function deleteLocalMsgsBySession(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除会话本地消息' + (!error?'成功':'失败'));
}
```

#### <span id="删除所有本地消息">删除所有本地消息</span>

- 如果不[支持数据库](#支持数据库), 算成功
- 此方法同时会清空所有的会话, 请开发者自己清空内存里面的会话列表

```javascript
nim.deleteAllLocalMsgs({
    done: deleteAllLocalMsgsDone
});
function deleteAllLocalMsgsDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除所有本地消息' + (!error?'成功':'失败'));
}
```

### <span id="云端历史记录">云端历史记录</span>

#### <span id="获取云端历史记录">获取云端历史记录</span>

- 获取某个会话的历史记录, 会在结果回调函数`done`里面接收到[消息](#消息对象)数组
- 参数解释
    - `scene`: 请参考[消息场景](#消息场景)
    - `to`: 帐号或者群id
    - `beginTime`: 时间戳, 开始时间, 精确到ms, 默认为0
    - `endTime`: 时间戳, 结束时间, 精确到ms, 默认为服务器的当前时间
    - `lastMsgId`: 上次查询的最后一条消息的`idServer`, 第一次不填
    - `limit`: 本次查询的消息数量限制, 最多100条, 默认100条
    - `reverse`: 默认`false`表示从`endTime`开始往前查找历史消息; `true`表示从`beginTime`开始往后查找历史消息
    - `asc`: 默认`false`表示返回的消息按时间逆序排序; `true`表示按时间正序排序
- 该接口用于获取一段时间内的历史消息, 由参数`beginTime`和`endTime`来控制时间范围。
    - 当`reverse`为`false`时, 后续查询的`endTime`对应上次查询的最后一条消息的`time`字段
    - 当`reverse`为`true`时, 后续查询的`beginTime`对应上次查询的最后一条消息的`time`字段

```javascript
nim.getHistoryMsgs({
    scene: 'p2p',
    to: 'a2',
    done: getHistoryMsgsDone
});
function getHistoryMsgsDone(error, obj) {
    console.log('获取p2p历史消息' + (!error?'成功':'失败'));
    console.log(error);
    console.log(obj);
    if (!error) {
        console.log(obj.msgs);
    }
}
```

## <span id="系统通知">系统通知</span>

### <span id="系统通知初始化参数">初始化参数</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数
    - [初始化SDK](#初始化SDK)
    - [多端登录初始化参数](#多端登录初始化参数)
    - [用户关系初始化参数](#用户关系初始化参数)
    - [好友关系初始化参数](#好友关系初始化参数)
    - [用户名片初始化参数](#用户名片初始化参数)
    - [群组初始化参数](#群组初始化参数)
    - [会话初始化参数](#会话初始化参数)
    - [消息初始化参数](#消息初始化参数)
    - [系统通知初始化参数](#系统通知初始化参数)
    - [同步完成](#同步完成)
    - [完整的初始化代码](#完整的初始化代码)

**示例代码**

```javascript
var nim = NIM.getInstance({
    onofflinesysmsgs: onOfflineSysMsgs,
    onsysmsg: onSysMsg,
    onupdatesysmsg: onUpdateSysMsg,
    onsysmsgunread: onSysMsgUnread,
    onupdatesysmsgunread: onUpdateSysMsgUnread,
    onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
    oncustomsysmsg: onCustomSysMsg
});
function onOfflineSysMsgs(sysMsgs) {
    console.log('收到离线系统通知', sysMsgs);
    pushSysMsgs(sysMsgs);
}
function onSysMsg(sysMsg) {
    console.log('收到系统通知', sysMsg)
    pushSysMsgs(sysMsg);
}
function onUpdateSysMsg(sysMsg) {
    pushSysMsgs(sysMsg);
}
function pushSysMsgs(sysMsgs) {
    data.sysMsgs = nim.mergeSysMsgs(data.sysMsgs, sysMsgs);
    refreshSysMsgsUI();
}
function onSysMsgUnread(obj) {
    console.log('收到系统通知未读数', obj);
    data.sysMsgUnread = obj;
    refreshSysMsgsUI();
}
function onUpdateSysMsgUnread(obj) {
    console.log('系统通知未读数更新了', obj);
    data.sysMsgUnread = obj;
    refreshSysMsgsUI();
}
function refreshSysMsgsUI() {
    // 刷新界面
}
function onOfflineCustomSysMsgs(sysMsgs) {
    console.log('收到离线自定义系统通知', sysMsgs);
}
function onCustomSysMsg(sysMsg) {
    console.log('收到自定义系统通知', sysMsg);
}
```

**参数解释**

- `onofflinesysmsgs`, 同步离线[系统通知](#系统通知)的回调, 会传入系统通知数组
- 在[支持数据库](#支持数据库)时并且启用了多 tab 同时登录, 那么如果多个 tab 页同时断线重连之后, 只会有一个 tab 页负责存储离线系统通知, 即只会有一个 tab 页会收到 `onofflinesysmsgs`回调, 其它 tab 页在[同步完成](#同步完成)之后, 需要调用[获取本地系统通知](#获取本地系统通知)来从本地缓存中拉取系统通知
- `onsysmsg`, 收到[系统通知](#系统通知)的回调, 会传入系统通知
- 收到系统通知后需要调用[标记系统通知为已读状态](#标记系统通知为已读状态)来将系统通知标记为已读状态
- `onupdatesysmsg`, 更新系统通知后的回调, 会传入{@link SystemMessage|系统通知}
    - 以下情况会收到此回调
        - [通过好友申请](#通过好友申请)
        - [拒绝好友申请](#拒绝好友申请)
        - [接受入群邀请](#接受入群邀请)
        - [拒绝入群邀请](#拒绝入群邀请)
        - [通过入群申请](#通过入群申请)
        - [拒绝入群申请](#拒绝入群申请)
    - 这些操作的发起方会收到此回调, 接收被更新的系统通知, 根据操作的类型系统通知会被更新为下面两种状态
        - `'passed'`: 已通过
        - `'rejected'`: 已拒绝
- `onsysmsgunread`: 收到系统通知未读数的回调
    - SDK 会管理内建系统通知的未读数, 此回调接收的对象包括以下字段
        - `friend`: 所有跟好友相关的系统通知的未读数
        - `addFriend`: 直接加为好友的未读数
        - `applyFriend`: 申请加为好友的未读数
        - `passFriendApply`: 通过好友申请的未读数
        - `rejectFriendApply`: 拒绝好友申请的未读数
        - `deleteFriend`: 删除好友的未读数
        - `team`: 所有跟群相关的系统通知的未读数
        - `teamInvite`: 入群邀请的未读数
        - `rejectTeamInvite`: 接受入群邀请的未读数
        - `applyTeam`: 入群申请的未读数
        - `rejectTeamApply`: 拒绝入群申请的未读数
        - `deleteMsg`: 撤回消息的未读数
- `onupdatesysmsgunread`: 更新系统通知未读数的回调
- `onofflinecustomsysmsgs`, 同步离线[自定义系统通知](#自定义系统通知)的回调, 会传入系统通知数组
- `oncustomsysmsg`, 收到[自定义系统通知](#自定义系统通知)的回调, 会传入系统通知

系统通知分为两种
- 内建系统通知
    - 目前所有的内建系统通知都是与高级群相关的通知, 某些群操作后相关的群成员会收到相应的系统通知。
    - 内建系统通知与[群通知消息](#群通知消息)的区别是系统通知是发给单人的通知, 群通知消息是发给所有群成员的消息。
- [自定义系统通知](#自定义系统通知)

### <span id="系统通知对象">系统通知对象</span>

系统通知对象有以下字段
- `time`: 时间戳
- `type`: [系统通知类型](#系统通知类型), [自定义系统通知](#自定义系统通知)无此字段
- `from`: 系统通知的来源, 账号或者群ID
- `to`: 系统通知的目标, 账号或者群ID
- `idServer`: 内建系统通知的 idServer
- `read`: 内建系统通知是否已读
- `category`: [内建系统通知种类](#内建系统通知种类)
- `state`: [内建系统通知状态](#内建系统通知状态)
- `error`: 内建系统通知的状态为 `'error'` 时, 此字段包含错误的信息
- `localCustom`: 内建系统通知的本地自定义扩展字段
    - 在[支持数据库时](#支持数据库)可以调用[更新本地会话](#更新本地会话)来更新此字段, 此字段只会被更新到本地数据库, 不会被更新到服务器上
- `ps`: 内建系统通知的附言
- `attach`: 内建系统通知的附加信息, 参考[系统通知类型](#系统通知类型)来查看不同类型的系统通知对应的附加信息
- `scene`: 自定义系系统通知的场景, 参考[消息场景](#消息场景)
- `content`: [自定义系统通知](#自定义系统通知)的内容
- `isPushable`: 是否需要推送
- `apnsText`: [自定义系统通知](#自定义系统通知)的apns推送文案, 仅对接收方为iOS设备有效
- `pushPayload`: 自定义系统通知的推送属性
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `needPushNick`: 是否需要推送昵称
- `sendToOnlineUsersOnly`: [自定义系统通知](#自定义系统通知)是否只发送给在线用户。
    - `true`时只发送给在线用户, 适合发送即时通知, 比如正在输入。
    - `false`时假如目标用户或群不在线, 会在其上线后推送过去。
    - 该参数只对点对点自定义系统通知有效, 对群自定义系统通知无效, 群自定义系统通知只会发给在线的群成员, 不会存离线。
- `cc`: 自定义系统通知是否抄送

### <span id="系统通知类型">系统通知类型</span>

[系统通知对象](#系统通知对象)有一个字段`type`来标明系统通知的类型, 自定义系统通知无此字段, 具体类型如下
- `'teamInvite'` (入群邀请)
    - 高级群的群主和管理员在邀请成员加入群（通过操作[创建群](#创建群)或[拉人入群](#拉人入群)）之后, 被邀请的人会收到一条类型为`'teamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为邀请方的帐号, `to`字段的值为对应的群ID, 此类系统通知的`attach`有一个字段`team`的值为被邀请进入的[群](#群对象), 被邀请的人可以选择接受邀请或者拒绝邀请。
        - 如果[接受邀请](#接受入群邀请), 那么该群的所有群成员会收到一条类型为`'acceptTeamInvite'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为接受入群邀请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`members`的值为接收入群邀请的群成员列表。
        - 如果[拒绝邀请](#拒绝入群邀请), 那么邀请你的人会收到一条类型为`'rejectTeamInvite'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝入群邀请的用户的帐号, `to`字段的值为对应的群ID。
- `'rejectTeamInvite'` (拒绝入群邀请)
    - 见`'teamInvite'`
- `'applyTeam'` (入群申请)
    - 用户可以[申请加入高级群](#申请入群), 目标群的群主和管理员会收到一条类型为`'applyTeam'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为对应的群ID, 高级群的群主和管理员在收到入群申请后, 可以选择通过或者拒绝入群申请。
        - 如果[通过申请](#通过入群申请), 那么该群的所有群成员会收到一条类型为`'passTeamApply'`的[群通知消息](#群通知消息), 此类群通知消息的`from`字段的值为通过入群申请的人的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群对象](#群对象), `attach`有一个字段`account`的值为申请方的帐号, `attach`有一个字段`members`的值为被通过申请的群成员列表。
        - 如果[拒绝申请](#拒绝入群申请), 那么申请人会收到一条类型为`'rejectTeamApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为对应的群ID, `attach`有一个字段`team`的值为对应的[群](#群对象)。
- `'rejectTeamApply'` (拒绝入群申请)
    - 见`'applyTeam'`
- `'addFriend'`
    - [直接加某个用户为好友](#直接加为好友)后, 对方不需要确认, 直接成为当前登录用户的好友
    - 对方会收到一条类型为`'addFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为接收方的账号。
- `'applyFriend'`
    - [申请加某个用户为好友](#申请加为好友)后, 对方会收到一条类型为`'applyFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为申请方的帐号, `to`字段的值为接收方的账号, 用户在收到好友申请后, 可以选择通过或者拒绝好友申请。
        - 如果[通过好友申请](#通过好友申请), 那么申请方会收到一条类型为`'passFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为通过方的帐号, `to`字段的值为申请方的账号。
        - 如果[拒绝好友申请](#拒绝好友申请), 那么申请方会收到一条类型为`'rejectFriendApply'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为拒绝方的帐号, `to`字段的值为申请方的账号。
- `'passFriendApply'`
    - 见 `'applyFriend'`
- `'rejectFriendApply'`
    - 见 `'applyFriend'`
- `'deleteFriend'`
    - [删除好友](#删除好友)后, 被删除的人会收到一条类型为`'deleteFriend'`的[系统通知](#系统通知), 此类系统通知的`from`字段的值为删除方的帐号, `to`字段的值为被删除方的账号。
- `'deleteMsg'`
    - [撤回消息](#消息撤回)后, 消息接收方会收到一条类型为`'deleteMsg'`的[系统通知](#系统通知), 此类系统通知的 `msg` 为被删除的消息的部分字段。如果是群消息, 那么群里的所有人都会收到这条系统通知. 如果同时在多个端登录了同一个账号, 那么其它端也会收到这条系统通知.
- `'custom'`
    - 自定义系统通知

### <span id="内建系统通知种类">内建系统通知种类</span>

上文中的[系统通知类型](#系统通知类型)除了`'custom'`之外的其它类型都属于内建系统通知, 这些类型归为两大种类

- `'team'`
- `'friend'`

### <span id="内建系统通知状态">内建系统通知状态</span>

- `'init'`: 未处理状态
- `'passed'`: 已通过
- `'rejected'`: 已拒绝
- `'error'`: 错误

### <span id="处理系统通知">处理系统通知</span>

这里涉及到了好友的处理, 请跟[好友关系托管](#好友关系托管)合在一起看

```javascript
function handleSysMsgs(sysMsgs) {
    if (!Array.isArray(sysMsgs)) {sysMsgs=[sysMsgs];}
    sysMsgs.forEach(function(sysMsg) {
        var idServer = sysMsg.idServer;
        switch (sysMsg.type) {
        case 'addFriend':
            onAddFriend(sysMsg.friend);
            break;
        case 'applyFriend':
            break;
        case 'passFriendApply':
            onAddFriend(sysMsg.friend);
            break;
        case 'rejectFriendApply':
            break;
        case 'deleteFriend':
            onDeleteFriend(sysMsg.from);
            break;
        case 'applyTeam':
            break;
        case 'rejectTeamApply':
            break;
        case 'teamInvite':
            break;
        case 'rejectTeamInvite':
            break;
        default:
            break;
        }
    });
}
```

### <span id="标记系统通知为已读状态">标记系统通知为已读状态</span>

- SDK 在收到系统通知后会更新系统通知未读数, 开发者需要调用此接口来通知 SDK 将某条系统通知标记为已读状态, 标记后会触发`onupdatesysmsgunread`回调
- `sysMsgs`为通过`onofflinesysmsgs`或者`onsysmsg`接收到的系统通知或者系统通知数组

```javascript
nim.markSysMsgRead({
    sysMsgs: someSysMsg, // or [someSysMsg]
    done: markSysMsgReadDone
});
function markSysMsgReadDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('标记系统通知为已读状态' + (!error?'成功':'失败'));
}
```

### <span id="获取本地系统通知">获取本地系统通知</span>

- 在[支持数据库](#支持数据库)的时候, SDK 会将内建系统通知存储于数据库中
- 当开发者发现系统通知的未读数大于系统通知数量时, 说明有未读系统通知存储于数据库里面, 需要从本地拉取这部分系统通知
- 默认获取所有种类的系统通知, 可以传入参数`category`来限制[系统通知种类](#内建系统通知种类)
- 默认获取所有类型的系统通知, 可以传入参数`type`来限制[系统通知类型](#系统通知类型)
- 默认获取所有已读和未读的系统通知, 可以传入参数`read`来限制已读状态
    - 如果不传, 默认获取所有已读和未读的系统通知
    - 如果传 `true`, 那么只获取已读的系统通知
    - 如果传 `false`, 那么只获取未读的系统通知
- `lastIdServer`为上次查询的最后一条系统通知的`idServer`, 第一次不填
- `limit`为本次查询的消息数量限制, 最多 100 条, 默认 100 条
- 默认从最近的系统通知开始往前查找本地系统通知, 可以传入参数`reverse=true`来从第一条系统通知开始往后查找本地系统通知

```javascript
nim.getLocalSysMsgs({
    lastIdServer: 'lastIdServer',
    limit: 100,
    done: getLocalSysMsgsDone
});
function getLocalSysMsgsDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('获取本地系统通知' + (!error?'成功':'失败'));
    if (!error) {
        console.log(obj.sysMsgs);
    }
}
```

### <span id="更新本地系统通知">更新本地系统通知</span>

- 更新 `idServer` 对应的本地系统通知
- 如果不[支持数据库](#支持数据库), 算成功
- 如果对应的系统通知不存在, 算成功, 返回 null
- 这些字段只会被更新到本地数据库, 不会被更新到服务器上

```javascript
nim.updateLocalSysMsg({
    idServer: '1234',
    status: 'bingo',
    localCustom: '{"key","value"}',
    done: updateLocalSysMsgDone
});
function updateLocalSysMsgDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('更新本地系统通知' + (!error?'成功':'失败'));
}
```

### <span id="删除本地系统通知">删除本地系统通知</span>

- 删除 `idServer` 对应的本地系统通知
- 如果不[支持数据库](#支持数据库), 算成功
- 如果对应的系统通知不存在, 算成功

```javascript
nim.deleteLocalSysMsg({
    idServer: '1234',
    done: deleteLocalSysMsgDone
});
function deleteLocalSysMsgDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除本地系统通知' + (!error?'成功':'失败'));
}
```

### <span id="删除所有本地系统通知">删除所有本地系统通知</span>

- 如果不[支持数据库](#支持数据库), 算成功
- 此方法同时会清空系统通知未读数, 开发者会收到`onupdatesysmsgunread`

```javascript
nim.deleteAllLocalSysMsgs({
    done: deleteAllLocalSysMsgsDone
});
function deleteAllLocalSysMsgsDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('删除所有本地系统通知' + (!error?'成功':'失败'));
}
```

### <span id="自定义系统通知">自定义系统通知</span>

- 开发者可以向其他用户或群发送自定义系统通知, 默认只发给在线用户, 如果需要发送给离线用户, 那么需要设置参数`sendToOnlineUsersOnly=false`, 请参考下面的示例代码
- 自定义系统通知和自定义消息的区别如下
    - 自定义消息属于[消息](#消息类型), 会存储在云信的消息数据库中, 需要跟其他消息一同展现给用户。
    - 自定义系统通知属于[系统通知](#系统通知), 用于第三方通知自己, 不会存储在云信的数据库中, SDK不会解析这些通知, SDK仅仅负责传递这些通知。
- SDK 不存储自定义系统通知, 不管理自定义系统通知的未读数
- 可选参数有
  - `yidunEnable`: 是否需要过易盾反垃圾
  - `antiSpamContent`: 在开启`yidunEnable`后, 开发者自定义的反垃圾字段（json格式)，格式如下：{"type": 1, "data": "custom content"} 字段说明：type:1.文本，2.图片，3视频，data内容:文本内容or图片地址or视频地址

```javascript
var content = {
    type: 'type',
    value: 'value'
};
content = JSON.stringify(content);
var msgId = nim.sendCustomSysMsg({
    scene: 'p2p',
    to: 'account',
    content: content,
    sendToOnlineUsersOnly: false,
    apnsText: content,
    done: sendCustomSysMsgDone
});
console.log('正在发送p2p自定义系统通知, id=' + msgId);
function sendCustomSysMsgDone(error, msg) {
    console.log('发送' + msg.scene + '自定义系统通知' + (!error?'成功':'失败') + ', id=' + msg.idClient);
    console.log(error);
    console.log(msg);
}
```

## <span id="聊天室">聊天室</span>

请查阅[开发准备](#开发准备)来下载并引入 SDK 文件

### <span id="聊天室功能概述">聊天室功能概述</span>

- 目前不支持通过 SDK 接口建立/解散聊天室。
- 进入聊天室时必须建立新的连接，退出聊天室或者被踢会断开连接，在聊天室中掉线会有自动重连，开发者需要监听聊天室连接状态来做出正确的界面表现。
- 支持聊天人数无上限。
- 聊天室只允许用户手动进入，无法进行邀请。
- 支持同时进入多个聊天室，会建立多个连接。
- 断开聊天室连接后，服务器不会再推送该聊天室的消息给此用户。
- 在进行一切操作之前，必须先进入聊天室。即必须先初始化好聊天室并且收到`onconnect`回调。
- 用户进入聊天室之后，不会收到此聊天室的历史消息推送。如有历史消息需求，可以调用[消息查询接口](#获取聊天室历史消息)进行显示。
- [聊天室成员分固定成员和游客两种类型](#聊天室成员类型)。

### <span id="获取聊天室服务器地址">获取聊天室服务器地址</span>

初始化聊天室之前要先获取聊天室服务器地址, 有两种方式

- 如果开发者有 NIM 的实例, 那么可以直接从 IM 连接上获取聊天室服务器地址, 示例代码如下

```javascript
nim.getChatroomAddress({
    chatroomId: 'chatroomId',
    done: getChatroomAddressDone
});
function getChatroomAddressDone(error, obj) {
    console.log('获取聊天室地址' + (!error?'成功':'失败'), error, obj);
}
```

- 如果开发者没有 NIM 的实例, 那么需要[从服务器获取聊天室服务器地址](/docs/product/IM即时通讯/服务端API文档?#请求聊天室地址), 请参考 demo 来查看具体的做法

### <span id="初始化聊天室">初始化聊天室</span>

- 初始化聊天室之前，必须[拿到聊天室服务器地址](#获取聊天室服务器地址)
- 此接口为单例模式, 对于同一个账号, 永远返回同一份实例, 即只有第一次调用会初始化一个实例
- 后续调用此接口会直接返回初始化过的实例, 同时也会调用接口[更新聊天室配置](#更新聊天室配置)更新传入的配置
- 后续调用此接口时, 如果连接已断开, 会自动建立连接
- 当发生掉线时，SDK会自动进行重连
- 在收到`onconnect`回调之后说明成功进入聊天室, 此时可以进行其他的聊天室操作了.

**示例代码**

```javascript
// 注意这里, 引入的 SDK 文件不一样的话, 你可能需要使用 SDK.Chatroom.getInstance 来调用接口
var chatroom = Chatroom.getInstance({
    appKey: 'appKey',
    account: 'account',
    token: 'token',
    chatroomId: 'chatroomId',
    chatroomAddresses: [
        'address1',
        'address2'
    ],
    onconnect: onChatroomConnect,
    onerror: onChatroomError,
    onwillreconnect: onChatroomWillReconnect,
    ondisconnect: onChatroomDisconnect,
    // 消息
    onmsgs: onChatroomMsgs
});
function onChatroomConnect(chatroom) {
    console.log('进入聊天室', chatroom);
}
function onChatroomWillReconnect(obj) {
    // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    console.log('即将重连', obj);
}
function onChatroomDisconnect(error) {
    // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    console.log('连接断开', error);
    if (error) {
        switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
            break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
            break;
        default:
            break;
        }
    }
}
function onChatroomError(error, obj) {
    console.log('发生错误', error, obj);
}
function onChatroomMsgs(msgs) {
    console.log('收到聊天室消息', msgs);
}
```

**参数解释**

- `appKey`: 在云信管理后台查看应用的 appKey
- `account`: 帐号, 应用内唯一
- `token`: 帐号的 token, 用于建立连接
- `chatroomId`: 聊天室 id
- `chatroomAddresses`: 聊天室地址列表
- `chatroomNick`: 进入聊天室后展示的昵称, 如果不设置并且托管了用户资料, 那么使用用户资料里面的昵称
- `chatroomAvatar`: 进入聊天室后展示的头像, 如果不设置并且托管了用户资料, 那么使用用户资料里面的头像
- `chatroomCustom`: 扩展字段, 设置了之后, 通过[获取聊天室成员列表](#获取聊天室成员列表)获取的聊天室成员信息会包含此字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `chatroomEnterCustom`: 扩展字段, 如果填了, 那么其它聊天室成员收到的[聊天室通知消息](#聊天室消息)的`attach.custom`的值为此字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `onconnect`: 连接建立后的回调, 会传入[聊天室信息](#聊天室信息对象)
- `onwillreconnect`: 即将重连的回调
    - 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
    - 此回调会收到一个对象, 包含额外的信息, 有以下字段
        - `duration`: 距离下次重连的时间
        - `retryCount`: 重连尝试的次数
- `ondisconnect`: 断开连接后的回调
    - 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
    - 此回调会收到一个对象, 包含错误的信息, 有以下字段
        - `code`: 出错时的错误码, 可能为空
            - `302`: 账号或者密码错误
            - `'kicked'`: 被踢
    - 当`code`为`'kicked'`的时候, 此对象会有以下字段
        - `reason`: 被踢的原因
            - `chatroomClosed`: 聊天室关闭了
            - `managerKick`: 被管理员踢出
            - `samePlatformKick`: 不允许同一个帐号重复登录同一个聊天室
        - `message`: 文字描述的被踢的原因
- `onerror`: 发生错误的回调, 会传入错误对象
- `onmsgs`: 收到消息的回调, 会传入[聊天室消息对象](#聊天室消息对象)数组

### <span id="退出聊天室">退出聊天室</span>

- [初始化聊天室](#初始化聊天室)并收到`onconnect`回调之后, 表明进入了聊天室
- 在收到`onconnect`回调后可以调用`chatroom.disconnect();`来退出聊天室
- 退出聊天室后可以调用`chatroom.connect();`来重新进入聊天室

### <span id="切换聊天室">切换聊天室</span>

如果需要切换聊天室, 操作步骤如下
- 调用[退出聊天室](#退出聊天室)来退出聊天室
- 调用[初始化聊天室](#初始化聊天室)来初始化新的聊天室

### <span id="更新聊天室配置">更新聊天室配置</span>

聊天室设计为单例模式, 如果需要更新当前聊天室的配置, 那么可以调用此接口, 参数列表和格式跟[Chatroom.getInstance](#初始化聊天室)保持一致, 以更新 token 为例

```javascript
// 断开聊天室
chatroom.disconnect()
// 更新 token
chatroom.setOptions({
    token: 'newToken'
});
// 重新连接
chatroom.connect()
```

### <span id="聊天室信息对象">聊天室信息对象</span>

聊天室信息对象有以下字段
- `id`: 聊天室 id
- `name`: 聊天室名字
- `announcement`: 聊天室公告
- `broadcastUrl`: 直播地址
- `custom`: 第三方扩展字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `createTime`: 创建时间
- `updateTime`: 更新时间
- `creator`: 创建者账号
- `onlineMemberNum`: 当前在线人数
- `mute` 是否禁言, 禁言状态下普通成员不能发送消息, 创建者和管理员可以发送消息

### <span id="获取聊天室信息">获取聊天室信息</span>

```javascript
chatroom.getChatroom({
    done: getChatroomDone
});
function getChatroomDone(error, obj) {
    console.log('获取聊天室信息' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="更新聊天室信息">更新聊天室信息</span>

- 当[更新聊天室信息](#更新聊天室信息)时, 所有聊天室成员会收到类型为`'updateChatroom'`的[聊天室通知消息](#聊天室消息)。

可更新的字段有
- `'name'`: 聊天室名字
- `'announcement'`: 聊天室公告
- `'broadcastUrl'`: 直播地址
- `'custom'`: 第三方扩展字段

```javascript
chatroom.updateChatroom({
  chatroom: {
    name: 'newName',
    announcement: 'newAnnouncement',
    broadcastUrl: 'newBroadcastUrl',
  },
  needNotify: true,
  custom: 'biu',
  custom: 'newCustom',
  done: updateChatroomDone
})
function updateChatroomDone () {
  console.log('更新聊天室信息' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="更新自己在聊天室内的信息">更新自己在聊天室内的信息</span>

- 当[更新自己在聊天室内的信息](#更新自己在聊天室内的信息)时, 所有聊天室成员会收到类型为`'updateMemberInfo'`的[聊天室通知消息](#聊天室消息)。

可更新的字段有
- `'nick'` 聊天室内的昵称
- `'avatar'` 聊天室内的头像
- `'custom'`: 第三方扩展字段

```javascript
chatroom.updateMyChatroomMemberInfo({
  member: {
    nick: 'newNick',
    avatar: 'newAvatar',
    custom: 'newCustom',
  },
  needNotify: true,
  custom: 'biu',
  done: updateMyChatroomMemberInfoDone
})
function updateMyChatroomMemberInfoDone (error, obj) {
  console.log('更新自己在聊天室内的信息' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="聊天室消息">聊天室消息</span>

#### <span id="聊天室消息对象">聊天室消息对象</span>

聊天室消息对象有以下字段
- `chatroomId`: 聊天室 ID
- `idClient`: SDK生成的消息id, 在发送消息之后会返回给开发者, 开发者可以在发送消息的结果回调里面根据这个ID来判断相应消息的发送状态, 到底是发送成功了还是发送失败了, 然后根据此状态来更新页面的UI。如果发送失败, 那么可以重新发送此消息
- `from`: 消息发送方, 帐号
- `fromNick`: 消息发送方的昵称
- `fromAvatar`: 消息发送方的头像
- `fromCustom`: 消息发送方的扩展字段
- `fromClientType`: 发送方的[设备类型](#设备类型)
- `type`: [聊天室消息类型](#聊天室消息类型)
- `flow`: 消息的流向
    - 'in'表示此消息是收到的消息
    - 'out'表示此消息是发出的消息
- `text`: 文本消息的文本内容, 请参考[发送聊天室文本消息](#发送聊天室文本消息)
- `file`: 文件消息的文件对象, 具体字段请参考[图片对象](#图片对象)、[音频对象](#音频对象)、[视频对象](#视频对象)、[文件对象](#文件对象), 请参考[发送聊天室文件消息](#发送聊天室文件消息)
- `geo`: 地理位置消息的[地理位置对象](#地理位置对象), 请参考[发送聊天室地理位置消息](#发送聊天室地理位置消息)
- `tip`: 提醒消息的内容, 请参考[发送聊天室提醒消息](#发送聊天室提醒消息)
- `content`: 自定义消息的消息内容, 开发者可以自行扩展, 建议封装成JSON格式字符串, 请参考[发送聊天室自定义消息](#发送聊天室自定义消息)
- `attach`: [聊天室通知消息](#聊天室消息类型)的附加信息, 参考[聊天室通知消息的类型](#聊天室通知消息的类型)来查看详细解释
- `custom`: 扩展字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `resend`: 是否是重发的消息
- `time`: 时间戳

#### <span id="聊天室消息类型">聊天室消息类型</span>

- `'text'` (文本)
- `'image'` (图片)
- `'audio'` (音频)
- `'video'` (视频)
- `'file'` (文件)
- `'geo'` (地理位置)
- `'custom'` (自定义消息)
- `'tip'` (提醒消息)
    - 提醒消息用于会话内的状态提醒，如进入会话时出现的欢迎消息，或者会话命中敏感词后的提示消息等等.
- `'notification'` (聊天室通知消息)
    - 某些聊天室操作后所有聊天室成员会收到一条相应的聊天室通知消息, 详细介绍请参考[聊天室通知消息的类型](#聊天室通知消息的类型)

#### <span id="聊天室通知消息的类型">聊天室通知消息的类型</span>

- 聊天室通知消息是[聊天室消息](#聊天室消息)的一种, 请参考[聊天室消息类型](#聊天室消息类型), 某些聊天室操作后所有聊天室成员会收到一条相应的聊天室通知消息
- 聊天室通知消息有一个字段`attach`包含了额外的信息, `attach`有一个字段`type`来标识聊天室通知消息的类型
    - `memberEnter`
        - 当有人进入聊天室时, 所有聊天室成员会收到类型为`'memberEnter'`的[聊天室通知消息](#聊天室消息)。
    - `memberExit`
        - 当有人退出聊天室时, 所有聊天室成员会收到类型为`'memberExit'`的[聊天室通知消息](#聊天室消息)。
    - `addManager`
        - 当有人被[加为管理员](#设置聊天室管理员)时, 所有聊天室成员会收到类型为`'addManager'`的[聊天室通知消息](#聊天室消息)。
    - `removeManager`
        - 当有人被[移除管理员](#设置聊天室管理员)时, 所有聊天室成员会收到类型为`'removeManager'`的[聊天室通知消息](#聊天室消息)。
    - `addCommon`
        - 当有人被[加为普通成员](#设置聊天室普通成员)时, 所有聊天室成员会收到类型为`'addCommon'`的[聊天室通知消息](#聊天室消息)。
    - `removeCommon`
        - 当有人被[移除普通成员](#设置聊天室普通成员)时, 所有聊天室成员会收到类型为`'removeCommon'`的[聊天室通知消息](#聊天室消息)。
    - `blackMember`
        - 当有人被[加入黑名单](#设置聊天室黑名单)时, 所有聊天室成员会收到类型为`'blackMember'`的[聊天室通知消息](#聊天室消息)。
    - `unblackMember`
        - 当有人被[移除黑名单](#设置聊天室黑名单)时, 所有聊天室成员会收到类型为`'blackMember'`的[聊天室通知消息](#聊天室消息)。
    - `gagMember`
        - 当有人被[加入禁言名单](#设置聊天室禁言名单)时, 所有聊天室成员会收到类型为`'gagMember'`的[聊天室通知消息](#聊天室消息)。
    - `ungagMember`
        - 当有人被[移除禁言名单](#设置聊天室禁言名单)时, 所有聊天室成员会收到类型为`'ungagMember'`的[聊天室通知消息](#聊天室消息)。
    - `kickMember`
        - 当有人被[踢出聊天室](#踢聊天室成员)时, 所有聊天室成员会收到类型为`'kickMember'`的[聊天室通知消息](#聊天室消息)。
    - `updateChatroom`
        - 当[更新聊天室信息](#更新聊天室信息)时, 所有聊天室成员会收到类型为`'updateChatroom'`的[聊天室通知消息](#聊天室消息)。
    - `updateMemberInfo`
        - 当[更新自己在聊天室内的信息](#更新自己在聊天室内的信息)时, 所有聊天室成员会收到类型为`'updateMemberInfo'`的[聊天室通知消息](#聊天室消息)。
    - `addTempMute`
    - `removeTempMute`
        - 当有人被[设置聊天室临时禁言](#设置聊天室临时禁言)时，所有聊天室成员会收到类型为`'addTempMute' or 'removeTempMute'`的[聊天室通知消息](#聊天室消息)。
    - `muteRoom` 聊天室被禁言了,只有管理员可以发言,其他人都处于禁言状态
    - `unmuteRoom` 聊天室解除全体禁言状态
- `attach`的字段`from`为操作方的账号, `fromNick`为操作方的昵称, `to`为被操作方的账号, `toNick`为被操作方的昵称
    - 如果是`addTempMute`, `attach`的字段`duration`代表本次禁言的时长
    - 如果是`removeTempMute`, `attach`的字段`duration`代表解禁提前的时长

### <span id="发送聊天室消息">发送聊天室消息</span>

包括以下接口

- [发送聊天室文本消息](#发送聊天室文本消息)
- [预览聊天室文件](#预览聊天室文件)
- [发送聊天室文件消息](#发送聊天室文件消息)
- [发送聊天室地理位置消息](#发送聊天室地理位置消息)
- [发送聊天室提醒消息](#发送聊天室提醒消息)
- [发送聊天室自定义消息](#发送聊天室自定义消息)
- [发送聊天室消息的配置选项](#发送聊天室消息的配置选项)

#### <span id="发送聊天室文本消息">发送聊天室文本消息</span>

```javascript
var msg = chatroom.sendText({
    text: 'hello',
    done: sendChatroomMsgDone
});
console.log('正在发送聊天室text消息, id=' + msg.idClient);
function sendChatroomMsgDone(error, msg) {
    console.log('发送聊天室' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient, error, msg);
}
```

#### <span id="预览聊天室文件">预览聊天室文件</span>

- 开发者可以预览文件, 支持以下几种场景
    - 通过参数`fileInput`传入文件选择 dom 节点或者节点 ID
    - 通过参数`blob`传入 Blob 对象
    - 通过参数`dataURL`传入包含 MIME type 和 base64 数据的 data URL, 此用法需要浏览器支持 window.Blob
- SDK会将文件上传到文件服务器, 然后将拿到的文件对象在`done`回调中传给开发者, 文件对象有以下几种
    - [图片对象](#图片对象)
    - [音频对象](#音频对象)
    - [视频对象](#视频对象)
    - [文件对象](#文件对象)
- 开发者在拿到文件对象之后, 可以调用[发送聊天室文件消息](#发送聊天室文件消息)来发送文件消息。
- 文件大小限制为最大100M
    - 高级浏览器会在上传前就检测文件大小
    - IE8/IE9 会在上传完成后检测文件大小

```javascript
chatroom.previewFile({
    type: 'image',
    fileInput: fileInput,
    uploadprogress: function(obj) {
        console.log('文件总大小: ' + obj.total + 'bytes');
        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
        console.log('上传进度: ' + obj.percentage);
        console.log('上传进度文本: ' + obj.percentageText);
    },
    done: function(error, file) {
        console.log('上传image' + (!error?'成功':'失败'));
        // show file to the user
        if (!error) {
            var msg = chatroom.sendFile({
                scene: 'p2p',
                to: 'account',
                file: file,
                done: sendChatroomMsgDone
            });
            console.log('正在发送聊天室image消息, id=' + msg.idClient);
        }
    }
});
```

#### <span id="发送聊天室文件消息">发送聊天室文件消息</span>

- 文件消息是[聊天室消息](#聊天室消息类型)的一种
- 开发者可以直接发送文件消息
    - 支持以下几种场景
        - 通过参数`fileInput`传入文件选择 dom 节点或者节点 ID
        - 通过参数`blob`传入 Blob 对象
        - 通过参数`dataURL`传入包含 MIME type 和 base64 数据的 data URL, 此用法需要浏览器支持 window.Blob
    - SDK会先将文件上传到文件服务器, 然后把拿到的文件对象在`uploaddone`回调中传给用户, 然后将其拼装成文件消息发送出去。
- 开发者也可以先[预览聊天室文件](#预览聊天室文件)来获取文件对象, 然后调用此接口发送文件消息。
- 直接发送文件消息的话会在`beforesend`回调里面传入SDK生成的`idClient`, 如果先预览文件再发送, 那么此接口会直接返回`idClient`
- 参数`type`指定了要发送的文件类型, 包括图片、音频、视频和普通文件, 对应的值分别为`'image'`、`'audio'`、`'video'`和`'file'`, 不传默认为`'file'`。
- 图片、音频、视频和普通文件的区别在于具体的文件信息不一样, 具体字段请参考
    - [图片对象](#图片对象)
    - [音频对象](#音频对象)
    - [视频对象](#视频对象)
    - [文件对象](#文件对象)
- 文件大小限制为最大100M
    - 高级浏览器会在上传前就检测文件大小
    - IE8和IE9会在上传完成后检测文件大小

```javascript
chatroom.sendFile({
    type: 'image',
    fileInput: fileInput,
    uploadprogress: function(obj) {
        console.log('文件总大小: ' + obj.total + 'bytes');
        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
        console.log('上传进度: ' + obj.percentage);
        console.log('上传进度文本: ' + obj.percentageText);
    },
    uploaddone: function(error, file) {
        console.log('上传' + (!error?'成功':'失败'), error, file);
    },
    beforesend: function(msg) {
        console.log('正在发送聊天室image消息, id=' + msg.idClient);
    },
    done: sendChatroomMsgDone
});
```

#### <span id="发送聊天室地理位置消息">发送聊天室地理位置消息</span>

- 地理位置消息是[聊天室消息](#聊天室消息类型)的一种, `geo`参数请参考[地理位置对象](#地理位置对象)

```javascript
var msg = chatroom.sendGeo({
    scene: 'p2p',
    to: 'account',
    geo: {
        lng: '116.3833',
        lat: '39.9167',
        title: 'Beijing'
    },
    done: sendChatroomMsgDone
});
console.log('正在发送聊天室geo消息, id=' + msg.idClient);
```

#### <span id="发送聊天室提醒消息">发送聊天室提醒消息</span>

- 提醒消息是[聊天室消息](#聊天室消息类型)的一种
- 提醒消息用于会话内的状态提醒，如进入会话时出现的欢迎消息，或者会话命中敏感词后的提示消息等等.

```javascript
var msg = chatroom.sendTipMsg({
    scene: 'p2p',
    to: 'account',
    tip: 'tip content',
    done: sendChatroomMsgDone
});
console.log('正在发送聊天室提醒消息, id=' + msg.idClient);
```

#### <span id="发送聊天室自定义消息">发送聊天室自定义消息</span>

```javascript
var value = Math.ceil(Math.random()*3);
var content = {
    type: 1,
    data: {
        value: value
    }
};
var msg = chatroom.sendCustomMsg({
    content: JSON.stringify(content),
    done: sendChatroomMsgDone
});
console.log('正在发送聊天室自定义消息, id=' + msg.idClient);
```

#### <span id="发送聊天室消息的配置选项">发送聊天室消息的配置选项</span>

- 上面的各个发送消息的接口都可以配置额外的选项, 来满足开发者对服务器的自定义需求。
    - `custom`: 扩展字段
        - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
    - `yidunEnable`: 是否需要过易盾反垃圾
    - `antiSpamContent`: 在开启`yidunEnable`后, 开发者自定义的反垃圾字段（json格式)，格式如下：{"type": 1, "data": "custom content"} 字段说明：type:1.文本，2.图片，3视频，data内容:文本内容or图片地址or视频地址
- 下面给一个发送文本消息的例子, 发送其它消息的接口类似

```javascript
var msg = chatroom.sendText({
    text: 'hello',
    custom: '{}',
    done: sendChatroomMsgDone
});
console.log('正在发送聊天室text消息, id=' + msg.idClient);
```

### <span id="获取聊天室历史消息">获取聊天室历史消息</span>

- 获取从 timetag 对应的时间点往前的若干条数据
- 不填 timetag 的话默认为服务器当前时间
- limit 不填的话默认 100 条
- `reverse`: 默认`false`表示从`timetag`开始往前查找历史消息; `true`表示从`timetag`开始往后查找历史消息

```javascript
chatroom.getHistoryMsgs({
    timetag: 1451393192478,
    limit: 100,
    done: getHistoryMsgsDone
});
function getHistoryMsgsDone(error, obj) {
    console.log('获取聊天室历史' + (!error?'成功':'失败'), error, obj.msgs);
}
```

### <span id="聊天室成员">聊天室成员</span>

#### <span id="聊天室成员对象">聊天室成员对象</span>

聊天室成员对象有以下字段

- `chatroomId`: 聊天室 ID
- `account`: 账号
- `nick`: 聊天室内的昵称
- `avatar`: 聊天室内的头像
- `type`: [聊天室成员类型](#聊天室成员类型)
- `guest` 是否是游客
- `blacked` 是否被拉黑
- `gaged` 是否被禁言
- `level`: 级别
- `online`: 是否在线, 只有固定成员才能离线, 对游客而言只能是在线
- `enterTime`: 进入聊天室的时间, 如果离线, 无该字段
- `custom`: 扩展字段
    - 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- `updateTime`: 更新时间
- `tempMuted`: 是否被临时禁言
- `tempMuteDuration`: 临时禁言剩余时长

#### <span id="聊天室成员类型">聊天室成员类型</span>

聊天室成员分为固定成员和游客两种。固定成员又分为房主、管理员、普通成员和受限成员四种。禁言用户和拉黑用户都属于受限用户。

- `'owner'` (房主)
- `'manager'` (管理员)
- `'restricted'` (受限制, 被拉黑或者禁言)
- `'common'` (普通成员)
- `'guest'` (游客)

### <span id="获取聊天室成员列表">获取聊天室成员列表</span>

- `guest`: `true`表示获取游客, `false`表示获取非游客成员
    - 游客列表按照游客进入聊天室的时间倒序排列
    - 非游客（即固定成员）列表按照成为固定成员的时间倒序排列
- 当设置`guest=false`来获取非游客成员时, 默认会获取所有的固定成员, 包括不在线的, 可以设置`onlyOnline=true`来只获取在线的固定成员
- time 分页用, 查找该时间戳之前的成员
    - 默认 0 代表当前服务器时间
    - 获取游客时, 此字段填上次获取的最后一个游客的`enterTime`
    - 获取非游客时, 此字段填上次获取的最后一个非游客的`updateTime`
- limit 分页用, 默认 100

```javascript
chatroom.getChatroomMembers({
    guest: false,
    limit: 100,
    done: getChatroomMembersDone
});
function getChatroomMembersDone(error, obj) {
    console.log('获取聊天室成员' + (!error?'成功':'失败'), error, obj.members);
}
```

### <span id="获取聊天室成员信息">获取聊天室成员信息</span>

- `accounts`: 待查询的账号列表, 每次最多20个

```javascript
chatroom.getChatroomMembersInfo({
    accounts: ['account1', 'account2'],
    done: getChatroomMembersInfoDone
});
function getChatroomMembersInfoDone(erorr, obj) {
    console.log('获取聊天室成员信息' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="管理聊天室成员">管理聊天室成员</span>

包括以下接口

- [设置聊天室管理员](#设置聊天室管理员)
- [设置聊天室普通成员](#设置聊天室普通成员)
- [设置聊天室黑名单](#设置聊天室黑名单)
- [设置聊天室禁言名单](#设置聊天室禁言名单)
- [设置聊天室临时禁言](#设置聊天室临时禁言)

#### <span id="设置聊天室管理员">设置聊天室管理员</span>

- 管理员可以[设置聊天室普通成员](#设置聊天室普通成员), [设置聊天室黑名单](#设置聊天室黑名单), [设置聊天室禁言名单](#设置聊天室禁言名单), [踢聊天室成员](#踢聊天室成员)
- `account`: 待设置的账号
- `isAdd`: `true`表示添加, `false`表示移除
    - 当有人被[加为管理员](#设置聊天室管理员)时, 所有聊天室成员会收到类型为`'addManager'`的[聊天室通知消息](#聊天室消息)。
    - 当有人被[移除管理员](#设置聊天室管理员)时, 所有聊天室成员会收到类型为`'removeManager'`的[聊天室通知消息](#聊天室消息)。
- `custom`: 扩展字段, 如果填了, 那么其它聊天室成员收到的[聊天室通知消息](#聊天室消息)的`attach.custom`的值为此字段
- 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃

```javascript
chatroom.markChatroomManager({
    account: 'account',
    isAdd: true,
    done: markChatroomManagerDone
});
function markChatroomManagerDone(error, obj) {
    console.log('添加聊天室管理员' + (!error?'成功':'失败'), error, obj.member);
}
```

#### <span id="设置聊天室普通成员">设置聊天室普通成员</span>

- `account`: 待设置的账号
- `isAdd`: 是否加为普通成员
    - 当有人被[加为普通成员](#设置聊天室普通成员)时, 所有聊天室成员会收到类型为`'addCommon'`的[聊天室通知消息](#聊天室消息)。
    - 当有人被[移除普通成员](#设置聊天室普通成员)时, 所有聊天室成员会收到类型为`'removeCommon'`的[聊天室通知消息](#聊天室消息)。
- `level`: 等级
- `custom`: 扩展字段, 如果填了, 那么其它聊天室成员收到的[聊天室通知消息](#聊天室消息)的`attach.custom`的值为此字段
- 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃

```javascript
chatroom.markChatroomCommonMember({
    account: 'account',
    level: 1,
    done: markChatroomCommonMemberDone
});
function markChatroomCommonMemberDone(error) {
    console.log('设置聊天室普通成员' + (!error?'成功':'失败'), error);
}
```

#### <span id="设置聊天室黑名单">设置聊天室黑名单</span>

- 被加入黑名单的人将不能进入此聊天室
- `account`: 待设置的账号
- `isAdd`: `true`表示添加, `false`表示移除
    - 当有人被[加入黑名单](#设置聊天室黑名单)时, 所有聊天室成员会收到类型为`'blackMember'`的[聊天室通知消息](#聊天室消息)。
    - 当有人被[移除黑名单](#设置聊天室黑名单)时, 所有聊天室成员会收到类型为`'blackMember'`的[聊天室通知消息](#聊天室消息)。
- `custom`: 扩展字段, 如果填了, 那么其它聊天室成员收到的[聊天室通知消息](#聊天室消息)的`attach.custom`的值为此字段
- 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃

```javascript
chatroom.markChatroomBlacklist({
    account: 'account',
    isAdd: true,
    done: markChatroomBlacklistDone
});
function markChatroomBlacklistDone(error, obj) {
    console.log('添加聊天室黑名单' + (!error?'成功':'失败'), error, obj.member);
}
```

#### <span id="设置聊天室禁言名单">设置聊天室禁言名单</span>

- 被加入禁言名单的人将不能在该聊天室发送消息
- `account`: 待设置的账号
- `isAdd`: `true`表示添加, `false`表示移除
    - 当有人被[加入禁言名单](#设置聊天室禁言名单)时, 所有聊天室成员会收到类型为`'gagMember'`的[聊天室通知消息](#聊天室消息)。
    - 当有人被[移除禁言名单](#设置聊天室禁言名单)时, 所有聊天室成员会收到类型为`'ungagMember'`的[聊天室通知消息](#聊天室消息)。
- `custom`: 扩展字段, 如果填了, 那么其它聊天室成员收到的[聊天室通知消息](#聊天室消息)的`attach.custom`的值为此字段
- 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃

```javascript
chatroom.markChatroomGaglist({
    account: 'account',
    isAdd: true,
    done: markChatroomGaglistDone
});
function markChatroomGaglistDone(error, obj) {
    console.log('添加聊天室禁言名单' + (!error?'成功':'失败'), error, obj.member);
}
```

#### <span id="设置聊天室临时禁言">设置聊天室临时禁言</span>

- 当有人被[设置聊天室临时禁言](#设置聊天室临时禁言)时，所有聊天室成员会收到类型为`'addTempMute' or 'removeTempMute'`的[聊天室通知消息](#聊天室消息)。
- `account`: 帐号
- `duration`: 禁言时长，单位秒，传0表示解除禁言
- `needNotify`: 是否需要下发对应的通知消息
- `custom`: 对应的通知消息的扩展字段

```javascript
chatroom.updateChatroomMemberTempMute({
  account: 'account',
  duration: 60,
  needNotify: true,
  custom: 'biu',
  done: updateChatroomMemberTempMuteDone
})
function updateChatroomMemberTempMuteDone(error, obj) {
  console.log('设置聊天室临时禁言' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="踢聊天室成员">踢聊天室成员</span>

- `account`: 待踢的账号
- `custom`: 扩展字段, 如果填了, 那么其它聊天室成员收到的[聊天室通知消息](#聊天室消息)的`attach.custom`的值为此字段, 被踢的人收到的`ondisconnect`回调接收的参数的`custom`的值为此字段
- 推荐使用`JSON`格式构建, 非`JSON`格式的话, Web端会正常接收, 但是会被其它端丢弃
- 当有人被[踢出聊天室](#踢聊天室成员)时, 所有聊天室成员会收到类型为`'kickMember'`的[聊天室通知消息](#聊天室消息)。

```javascript
chatroom.kickChatroomMember({
    account: 'account',
    done: kickChatroomMemberDone
});
function kickChatroomMember(error, obj) {
    console.log('踢人' + (!error?'成功':'失败'), error, obj);
}
```

<!--

### <span id="关闭聊天室">关闭聊天室</span>

- 请调用[服务器接口](/docs/product/IM即时通讯/服务端API文档?#修改聊天室开/关闭状态)来关闭聊天室
- 聊天室关闭后, 所有人都会被踢出聊天室, 所有人都不能再次进入该聊天室
- 所有人都会收到`ondisconnect`回调, 此回调会收到一个对象, 此对象的`code`属性为`kicked`, `reason`为`chatroomClosed`

```javascript
chatroom.closeChatroom({
    done: closeChatroomDone
});
function closeChatroomDone(error, obj) {
    console.log('关闭聊天室' + (!error?'成功':'失败'), error, obj);
}
```
 -->

## <span id="事件发布及订阅">事件发布及订阅</span>

用户可以通过事件发布及订阅，来实现"发布-订阅"的设计模式编程方法。可应用于多端登录状态同步、用户个性化信息订阅、逻辑异步流处理等场景。

### <span id="发布订阅事件">发布订阅事件</span>

- 向各个客户端发布独立事件

**示例代码**

```javascript
  nim.publishEvent({
    type: 100000,
    value: 2,
    custom: 'hello world',
    vaildTime: 60,
    sync: false,
    done: publishEventDone
  });
  function publishEventDone(error, obj) {
    console.log('发布事件' + (!error?'成功':'失败'), error, obj);
  }
```

**参数解释**

- `type`, 事件类型，用户自定义可发布事件类型值为100000以上，通过上层逻辑定义其含义
- `value`, 事件值，与对应事件类型一一对应，用上层订阅其含义，必须是自然数
- `custom`, 用户自定义事件的扩展属性，可选参数，最大256字节
- `vaildTime`, 用户发布事件的有效时间，可选参数，以秒为单位，范围在60s~7天(604800s)，默认7天
- `broadcastType`, 事件广播类型，可选参数，1:仅在线 2:在线和离线，默认2(在线和离线)
- `sync`, 是否同步给自己，可选参数，true/false，默认false
- `done`, 用户自定义的结果回调函数，第一个参数为error，如果成功则error为null

### <span id="订阅事件">订阅事件</span>

- 向特定用户订阅特定事件

**示例代码**

```javascript
  nim.subscribeEvent({
      type: 100000,
      accounts: ['cs3', 'cs4'],
      subscribeTime: 70,
      sync: true,
      done: subscribeEventDone
  });
  function subscribeEventDone(error, obj) {
      console.log('订阅事件' + (!error?'成功':'失败'), error, obj);
  }
```

**参数解释**

- `type`, 事件类型，用户自定义可发布事件类型值为100000以上，通过上层逻辑定义其含义;1为服务器特殊事件，即多端登录状态，可订阅不可发布。
- `subscribeTime`, 订阅关系的有效时间，单位秒 60s~30天(2592000)，默认30天
- `sync` 订阅后是否立即同步最新事件，true:同步，false:不同步，默认同步
- `vaildTime`, 用户发布事件的有效时间，可选参数，以秒为单位，范围在60s~7天(604800s)，默认7天
- `broadcastType`, 事件广播类型，可选参数，1:仅在线 2:在线和离线，默认2(在线和离线)
- `sync`, 是否同步给自己，可选参数，true/false，默认false
- `done`, 用户自定义的结果回调函数
  - 此回调包含两个参数，第一个参数为error，如果成功则error为null；第二个参数为obj, 它有一个字段failedAccounts的值为操作的类型, 具体类型如下：
    - `failedAccounts`, 失败的账号数组，如果为空数组则表示操作全部成功

### <span id="按账号取消订阅事件">按账号取消订阅事件</span>

- 向特定用户取消订阅特定事件

**示例代码**

```javascript
  nim.unSubscribeEventsByAccounts({
      type: 100000,
      accounts: ['cs3'],
      done: unSubscribeEventDone
  });
  function unSubscribeEventDone(error, obj) {
      console.log('取消订阅事件' + (!error?'成功':'失败'), error, obj);
  }
```

**参数解释**

- `type`, 事件类型，用户自定义可发布事件类型值为100000以上，通过上层逻辑定义其含义;1为服务器特殊事件，即多端登录状态，可订阅不可发布。
- `accounts`, 取消订阅好友的账号列表。当accounts元素数量大于100时，SDK会以每100个帐号做为一组事务进行处理，按组并行执行操作(每组操作为一个事务)，任意一组失败都会抛出异常，但之前成功的组不会因后续失败的组而异常回滚；若用户有较强烈的事务处理要求，可多次调用此接口，且每次accounts元素数量小于100，进行上层实现
- `done`, 用户自定义的结果回调函数
  - 此回调包含两个参数，第一个参数为error，如果成功则error为null；第二个参数为obj, 它有一个字段failedAccounts的值为操作的类型, 具体类型如下：
    - `failedAccounts`, 失败的账号数组，如果为空数组则表示操作全部成功

### <span id="取消指定事件的全部订阅关系">取消指定事件的全部订阅关系</span>

- 取消指定事件的全部订阅关系

**示例代码**

```javascript
  nim.unSubscribeEventsByType({
      type: 100000,
      done: unSubscribeEventDone
  });
  function unSubscribeEventDone(error, obj) {
      console.log('取消订阅事件' + (!error?'成功':'失败'), error, obj);
  }
```

**参数解释**

- `type`, 事件类型，用户自定义可发布事件类型值为100000以上，通过上层逻辑定义其含义;1为服务器特殊事件，即多端登录状态，可订阅不可发布。
- `done`, 用户自定义的结果回调函数
  - 此回调包含两个参数，第一个参数为error，如果成功则error为null；第二个参数为obj, 它有一个字段failedAccounts的值为操作的类型, 具体类型如下：
    - `failedAccounts`, 失败的账号数组，如果为空数组则表示操作全部成功

### <span id="按账号获取指定事件的订阅关系">按账号获取指定事件的订阅关系</span>

- 按账号获取指定事件的订阅关系

**示例代码**

```javascript
  nim.querySubscribeEventsByAccounts({
      type: 100000,
      accounts: ['cs3'],
      done: querySubscribeEventDone
  });
  function querySubscribeEventDone(error, obj) {
      console.log('获取订阅列表' + (!error?'成功':'失败'), error, obj);
  }
```

**参数解释**

- `type`, 事件类型，用户自定义可发布事件类型值为100000以上，通过上层逻辑定义其含义;1为服务器特殊事件，即多端登录状态，可订阅不可发布。
- `accounts`, 查询订阅好友的账号列表。当accounts元素数量大于100时，SDK会以每100个帐号做为一组事务进行处理，按组并行执行操作(每组操作为一个事务)，任意一组失败都会抛出异常，但之前成功的组不会因后续失败的组而异常回滚；若用户有较强烈的事务处理要求，可多次调用此接口，且每次accounts元素数量小于100，进行上层实现
- `done`, 用户自定义的结果回调函数
  - 此回调会收到两个参数，第一个参数为error，如果成功则error为null；第二个参数为obj, 它有一个字段msgEventSubscribes的值为操作的类型, 具体类型如下：
  - `msgEventSubscribes`, 事件订阅对象数组，数组对象中包含以下一些字段
    - `msgEventSubscribes[i].time` 订阅时间
    - `msgEventSubscribes[i].to` 订阅者
    - `msgEventSubscribes[i].type` 订阅事件类型

### <span id="订阅推送初始化参数">服务器推送的订阅事件(初始化)</span>

- 这里的参数并不是所有的初始化参数, 请查阅[初始化 SDK](#初始化SDK), 以及其它章节的初始化参数

**示例代码**

```javascript
  var nim = NIM.getInstance({
    onpushevents: onPushEvents
  });
  function onPushEvents(param) {
    console.log('订阅事件', param.msgEvents);
  }

```

**参数解释**

- `onpushevents`, 服务器推送事件的回调函数，以下情况会收到此回调：
  - 订阅了对应账号对应类型的事件，且订阅关系在有效期内，对方发布了相应时间
  - 此回调会收到一个参数param, 它有一个字段msgEvents的值为操作的类型, 具体类型如下：
  - `msgEvents`, 推送事件对象数组，数组对象中包含以下一些字段
    - `msgEvents[i].account`，发布对应事件的账号
    - `msgEvents[i].type`，事件类型
    - `msgEvents[i].value`，事件值
    - `msgEvents[i].clientType`，客户端类型
    - `msgEvents[i].custom`，用户发布事件的自定义消息
    - `msgEvents[i].idClient`，消息本地客户端id
    - `msgEvents[i].idServer`，消息服务器id
    - `msgEvents[i].serverConfig`，服务器下推的配置消息（客户端不可发布）

## <span id="多端在线状态同步">多端在线状态同步</span>

多端在线状态同步基于事件的发布与订阅模型，参见[事件发布及订阅](#事件发布及订阅)

**实现方式**

- 首先定义对应账号的登录事件，登录事件的type为1，示例代码如下：
  ``` javascript
    this.nim.subscribeEvent({
      // type 1 为登录事件，用于同步多端登录状态
      type: 1,
      accounts: ['cs1', 'cs2'],
      subscribeTime: 3600 * 24 * 30,
      // 同步订阅事件，保证每次登录时会收到推送消息
      sync: true,
      done: function onSubscribeEvent (err, res) {
        if (err) {
          console.error('订阅好友事件失败', err)
        } else {
          console.info('订阅好友事件', res)
        }
      }
    });
  ```

- 每次对方出现在线状态变更时，会收到对应的变更事件推送，可参见[服务器推送的订阅事件(初始化)](#订阅推送初始化参数)，示例代码如下：
  ``` javascript
    function onPushEvents (param) {
      if (param.msgEvents) {
        param.msgEvents.forEach(data => {
          console.log(updateMultiPortStatus(data))
        })
      }
    }
    function updateMultiPortStatus (data) {
      if (data.account) {
        var account = data.account
        var multiPortStatus = ''

        function getMultiPortStatus (customType, custom) {
          // 服务器下推多端事件标记的特定序号对应值
          var netState = {
            0: '',
            1: 'Wifi',
            2: 'WWAN',
            3: '2G',
            4: '3G',
            5: '4G'
          }
          var onlineState = {
            0: '在线',
            1: '忙碌',
            2: '离开'
          }

          var custom = custom || {}
          if (customType !== 0) {
            // 有serverConfig.online属性，已被赋值端名称
            custom = custom[customType]
          } else if (custom[4]) {
            custom = custom[4]
            multiPortStatus = '电脑'
          } else if (custom[2]) {
            custom = custom[2]
            multiPortStatus = 'iOS'
          } else if (custom[1]) {
            custom = custom[1]
            multiPortStatus = 'Android'
          } else if (custom[16]) {
            custom = custom[16]
            multiPortStatus = 'Web'
          }
          if (custom) {
            custom = JSON.parse(custom)
            if (typeof custom['net_state'] === 'number') {
              var tempNetState = netState[custom['net_state']]
              if (tempNetState) {
                multiPortStatus += ('[' + tempNetState + ']')
              }
            }
            if (typeof custom['online_state'] === 'number') {
              multiPortStatus += onlineState[custom['online_state']]
            } else {
              multiPortStatus += '在线'
            }
          }
          return multiPortStatus
        }

        // demo自定义多端登录同步事件
        if (+data.type === 1) {
          if (+data.value === 1 || +data.value === 2 || +data.value === 3 || +data.value === 10001) {
            var serverConfig = JSON.parse(data.serverConfig)
            var customType = 0
            multiPortStatus = ''
            // 优先判断serverConfig字段
            if (serverConfig.online) {
              if (serverConfig.online.indexOf(4) >= 0) {
                multiPortStatus = '电脑'
                customType = 4
              } else if (serverConfig.online.indexOf(2) >= 0) {
                multiPortStatus = 'iOS'
                customType = 2
              } else if (serverConfig.online.indexOf(1) >= 0) {
                multiPortStatus = 'Android'
                customType = 1
              } else if (serverConfig.online.indexOf(16) >= 0) {
                multiPortStatus = 'Web'
                customType = 16
              }
            }
            if (data.custom && (Object.keys(data.custom).length > 0)) {
              var portStatus = getMultiPortStatus(customType, data.custom)
              // 如果serverConfig里有属性而custom里没有对应属性值
              if ((multiPortStatus !== '') && (portStatus === '')) {
                multiPortStatus += '在线'
              } else {
                multiPortStatus += portStatus
              }
            } else if (customType !== 0) {
              multiPortStatus += '在线'
            } else {
              multiPortStatus = '离线'
            }
          }
        }
        return multiPortStatus
      }
      return '离线'
    }
  ```

## <span id="图片操作">图片操作</span>

使用[预览文件](#预览文件)和[发送文件消息](#发送文件消息)拿到图片 url 之后，可以调用 SDK 提供的图片操作来处理图片, 所有的操作在 NIM 和 Chatroom 上都提供, 下文仅以 NIM 为例给出使用方法, 图片操作分为两大类
- 一类是通过 url 拼接的方式来处理图片, 此类接口是同步的, 一般用于展示图片, 通过此类方式生成的 url 仅可用于 UI 展示, 调用其它非图片处理接口的时候不能传入此类 url
  - [预览图片通用方法](#预览图片通用方法)
  - [预览去除图片元信息](#预览去除图片元信息)
  - [预览图片质量](#预览图片质量)
  - [预览interlace图片](#预览interlace图片)
  - [预览旋转图片](#预览旋转图片)
  - [预览高斯模糊图片](#预览高斯模糊图片)
  - [预览裁剪图片](#预览裁剪图片)
  - [预览生成缩略图](#预览生成缩略图)
- 一类是通过服务器来处理图片, 此类接口是异步的, 一般用于生成新的 url, 调用其它非图片处理接口的时候可以传入此类 url
  - [去除图片元信息](#去除图片元信息)
  - [修改图片质量](#修改图片质量)
  - [interlace图片](#interlace图片)
  - [旋转图片](#旋转图片)
  - [高斯模糊图片](#高斯模糊图片)
  - [裁剪图片](#裁剪图片)
  - [生成缩略图](#生成缩略图)
  - [处理图片](#处理图片)

### <span id="预览图片通用方法">预览图片通用方法</span>
- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
即将以下常用的图片处理方法合并到一个接口中
  - [预览去除图片元信息](#预览去除图片元信息)
  - [预览图片质量](#预览图片质量)
  - [预览interlace图片](#预览interlace图片)
  - [预览旋转图片](#预览旋转图片)
  - [预览生成缩略图](#预览生成缩略图)
- 该接口同时会根据私有化部署原则，在connect的config中判别downloadUrl是否存在而进行相应的链接替换
  - 如果不存在，则链接的hostname和protocol保持不变
  - 如果存在，则链接的hostname和protocol会替换成downloadUrl的
  - 例如:
    - downloadUrl = https://nos.netease.im
    - 原始链接为 http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=
    - 替换链接为 https://nos.netease.im/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=

- 代码示例
```javascript
  var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
  var newImageUrl = nim.viewImageSync({
    url: url, // 必填
    strip: true, // 去除图片元信息 true or false 可选填
    quality: 80, // 图片质量 0 - 100 可选填
    interlace: true, // 渐变清晰， 可选填
    rotate: 90, // 旋转角度，顺时针，可选填
    thumbnail: { // 生成缩略图， 可选填
      width: 80,
      height: 20,
      mode: cover
    }
  });
```
- newImageUrl形如： http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ2OTUyMDc1NzAyNl8wMTA0NmIyMi0yNTQzLTQ2OTYtOWE0OC0zYjk0YjIyMWQyMjA=?imageView&stripmeta=1&quality=80&interlace=1&rotate=90&thumbnail=80z20


### <span id="预览去除图片元信息">预览去除图片元信息</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 去除后的图片将不包含 [EXIF](https://en.wikipedia.org/wiki/Exchangeable_image_file_format) 信息

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var stripMetaUrl = nim.viewImageStripMeta({
  url: url,
  strip: true
});
```

### <span id="预览图片质量">预览图片质量</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 默认图片质量为100，开发者可以降低图片质量来省流量

```javascript
var url = 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var qualityUrl = nim.viewImageQuality({
    url: url,
    quality: 20
});
// 预览图片质量后的图片 url 如下
// qualityUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&quality=20'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的预览图片质量的结果
```

### <span id="预览interlace图片">预览interlace图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 在网络环境较差时, interlace 后的图片会以从模糊到清晰的方式呈现给用户

```javascript
var url = 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var interlaceUrl = nim.viewImageInterlace({
    url: url
});
// interlace 后的图片 url 如下
// interlaceUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&interlace=1'
```

### <span id="预览旋转图片">预览旋转图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url

```javascript
var url = 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var rotateUrl = nim.viewImageRotate({
    url: url,
    angle: 90
});
// 旋转后的图片的 url 如下
// rotateUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&rotate=90'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的旋转结果
```

### <span id="预览高斯模糊图片">预览高斯模糊图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url

```javascript
var url = 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var blurUrl = nim.viewImageBlur({
    url: url,
    radius: 5,
    sigma: 3
});
// 高斯模糊后的图片 url 如下
// blurUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&blur=5x3'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的高斯模糊后的结果
```

### <span id="预览裁剪图片">预览裁剪图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 从坐标 (x, y) 处截取尺寸为 width*height 的图片，(0, 0) 代表左上角
- width/height 不能小于0, 如果 width/height 大于图片的原始宽度/高度, 那么将被替换为图片的原始宽度/高度
- 举个栗子, 假如说之前通过[预览文件](#预览文件)拿到的 url 为
    [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=)
- 传入 x/y/width/height 为 100/0/250/250 得到的裁剪图片的 url 为
    [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&crop=100_0_250_250](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&crop=100_0_250_250)
- 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果

```javascript
var url = 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var cropUrl = nim.viewImageCrop({
    url: url,
    x: 100,
    y: 0,
    width: 250,
    height: 250
});
// 裁剪后的图片的 url 如下
// cropUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&crop=100_0_250_250'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果
```

### <span id="预览生成缩略图">预览生成缩略图</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- width/height 限制了缩略图的尺寸
    - width/height 必须大于等于 0, 不能同时为 0, 必须小于 4096
- 不同模式下生成的缩略图是不一样的, 目前支持以下三种模式
    - `'cover'`: 原图片等比缩略, 缩略图一边等于请求的尺寸, 另一边大于请求的尺寸, 即缩略图刚好能覆盖住尺寸为 width*height 的矩形
        - 举个栗子, 假如说之前通过[预览文件](#预览文件)拿到的 url 为
            [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=)
        - 此模式下传入 80*100 的尺寸得到的缩略图 url 为
            [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80z100](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80z100)
        - 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同尺寸得到的缩略图
    - `'contain'`: 原图片等比缩略, 缩略图一边等于请求的尺寸, 另一边大于请求的尺寸, 即尺寸为 width*height 的矩形刚好能覆盖住缩略图
        - 还是拿上面的 url 为例, 传入 80*100 的尺寸得到的缩略图 RUL 为
            [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80x100](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80x100)
        - 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同尺寸得到的缩略图
    - `'crop'`: 先等比缩略原图片, 使得一边等于请求的尺寸, 另一边大于请求的尺寸, 然后对大于请求尺寸的那条边进行裁剪, 使得最终的图片大小刚好等于请求的尺寸
        - 还是拿上面的 url 为例, 传入 80*100 的尺寸得到的缩略图 url 为
            [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100)
        - 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同尺寸得到的缩略图
- 如果缩略图尺寸大于图片尺寸，默认情况下图片不会被放大，可以传入参数`enlarge=true`来放大图片
    - 举个栗子, 假如说之前通过[预览文件](#预览文件)拿到的 url 为
        [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=)
    - 此 url 对应的图片尺寸为 512-256, 如果使用 `'cover'` 模式来裁剪, 传入尺寸 1024-512, 得到的缩略图 url 为
        [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=1024z512](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=1024z512)
    - 会发现图片尺寸并没有放大, 如果再传入参数 `enlarge=true`, 得到的缩略图 url 为
        [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=1024z512&enlarge=1](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=1024z512&enlarge=1)
    - 会发现图片被放大了
- `'crop'` 模式下可以传入参数 axis.x 或 axis.y 来控制最后一步裁剪的位置
    - x/y 必须为整数, 取值范围为 0-10, 此方法内部使用 Math.round 来格式化 x/y
    - x 为 0 时表示裁取最左端, x 为 10 时表示裁取最右端
    - y 为 0 时表示裁取最上端, y 为 10 时表示裁取最下端
    - x/y 默认值均为 5, 即裁取正中间
    - 拿上面的 url 为例, 传入 80*100 的尺寸得到的缩略图 url 为
        [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100)
        - 依次传入 x=0,1,2,3,4,5,6,7,8,9,10 得到的缩略图 url 为
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=0_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=0_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=1_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=1_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=2_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=2_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=3_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=3_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=4_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=4_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=5_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=5_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=6_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=6_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=7_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=7_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=8_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=8_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=9_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=9_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=10_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=10_5)
    - 拿上面的 url 为例, 传入 200*50 的尺寸得到的缩略图 RUL 为
        [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50)
        - 依次传入 y=0,2,4,6,8,10 得到的缩略图 url 为
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_0](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_0)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_1](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_1)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_2](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_2)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_3](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_3)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_4](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_4)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_5](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_5)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_6](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_6)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_7](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_7)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_8](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_8)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_9](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_9)
            - [https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_10](https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=200y50&axis=5_10)
 *

```javascript
var url = 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var thumbnailUrl = nim.viewImageThumbnail({
    url: url,
    mode: 'cover',
    width: 80,
    height: 100
});
// 缩略后的图片的 url 如下
// thumbnailUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80z100'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果
 *
thumbnailUrl = nim.viewImageThumbnail({
    url: url,
    mode: 'contain',
    width: 80,
    height: 100
});
// 缩略后的图片的 url 如下
// thumbnailUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80x100'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果
 *
thumbnailUrl = nim.viewImageThumbnail({
    url: url,
    mode: 'contain',
    width: 80,
    height: 100
});
// 缩略后的图片的 url 如下
// thumbnailUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果

thumbnailUrl = nim.viewImageThumbnail({
    url: url,
    mode: 'contain',
    width: 80,
    height: 100,
    axis: {
        // x 可取的值请参考上文描述
        x: 0
    }
});
// 缩略后的图片的 url 如下
// thumbnailUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=0_5'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果

thumbnailUrl = nim.viewImageThumbnail({
    url: url,
    mode: 'contain',
    width: 80,
    height: 100,
    axis: {
        // y 可取的值请参考上文描述
        y: 0
    }
});
// 缩略后的图片的 url 如下
// thumbnailUrl === 'https://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=?imageView&thumbnail=80y100&axis=5_0'
// 开发者在浏览器中打开上面的链接之后, 可以直接修改 url 里面的数字来观察不同的裁剪结果
```

### <span id="去除图片元信息">去除图片元信息</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 去除后的图片将不包含 [EXIF](https://en.wikipedia.org/wiki/Exchangeable_image_file_format) 信息

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
nim.stripImageMeta({
  url: url,
  strip: true,
  done: stripImageMetaDone
});
function stripImageMetaDone(error, obj) {
  console.log('去除图片元信息' + (!error?'成功':'失败'), error, obj);
}
```

### <span id="修改图片质量">修改图片质量</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 默认图片质量为100，开发者可以降低图片质量来省流量

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var qualityUrl = nim.qualityImage({
    url: url,
    quality: 5,
    done: qualityImageDone
});
function qualityImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('修改图片质量' + (!error?'成功':'失败'));
}
```

### <span id="interlace图片">interlace图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 在网络环境较差时, interlace 后的图片会以从模糊到清晰的方式呈现给用户

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var interlaceUrl = nim.interlaceImage({
    url: url,
    done: interlaceImageDone
});
function interlaceImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('interlace 图片' + (!error?'成功':'失败'));
}
```

### <span id="旋转图片">旋转图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var rotateUrl = nim.rotateImage({
    url: url,
    angle: 90,
    done: rotateImageDone
});
function rotateImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('旋转图片' + (!error?'成功':'失败'));
}
```

### <span id="高斯模糊图片">高斯模糊图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var blurUrl = nim.blurImage({
    url: url,
    radius: 5,
    sigma: 3,
    done: blurImageDone
});
function blurImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('高斯模糊图片' + (!error?'成功':'失败'));
}
```

### <span id="裁剪图片">裁剪图片</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- 从坐标 (x, y) 处截取尺寸为 width*height 的图片，(0, 0) 代表左上角
- width/height 不能小于0, 如果 width/height 大于图片的原始宽度/高度, 那么将被替换为图片的原始宽度/高度

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var cropUrl = nim.cropImage({
    url: url,
    x: 100,
    y: 0,
    width: 250,
    height: 250,
    done: function cropImageDone
});
function cropImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('裁剪图片' + (!error?'成功':'失败'));
}
```

### <span id="生成缩略图">生成缩略图</span>

- 只支持通过[预览文件](#预览文件)或[发送文件消息](#发送文件消息)拿到的图片 url, 或者经过其他图片操作后拿到的图片 url
- width/height 限制了缩略图的尺寸
    - width/height 必须大于等于 0, 不能同时为 0, 必须小于 4096
- 不同模式下生成的缩略图是不一样的, 目前支持以下三种模式
    - `'cover'`: 原图片等比缩略, 缩略图一边等于请求的尺寸, 另一边大于请求的尺寸, 即缩略图刚好能覆盖住尺寸为 width*height 的矩形
    - `'contain'`: 原图片等比缩略, 缩略图一边等于请求的尺寸, 另一边大于请求的尺寸, 即尺寸为 width*height 的矩形刚好能覆盖住缩略图
    - `'crop'`: 先等比缩略原图片, 使得一边等于请求的尺寸, 另一边大于请求的尺寸, 然后对大于请求尺寸的那条边进行裁剪, 使得最终的图片大小刚好等于请求的尺寸
- 如果缩略图尺寸大于图片尺寸，默认情况下图片不会被放大，可以传入参数`enlarge=true`来放大图片
- `'crop'` 模式下可以传入参数 axis.x 或 axis.y 来控制最后一步裁剪的位置
    - x/y 必须为整数, 取值范围为 0-10, 此方法内部使用 Math.round 来格式化 x/y
    - x 为 0 时表示裁取最左端, x 为 10 时表示裁取最右端
    - y 为 0 时表示裁取最上端, y 为 10 时表示裁取最下端
    - x/y 默认值均为 5, 即裁取正中间

```javascript
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var thumbnailUrl = nim.thumbnailImage({
    url: url,
    mode: 'cover',
    width: 80,
    height: 100,
    done: thumbnailImageDone
});
function thumbnailImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('生成缩略图' + (!error?'成功':'失败'));
}
```

### <span id="处理图片">处理图片</span>

此方法接收一组图片操作, 按操作顺序依次处理图片, 可选的操作包括：
- [修改图片质量](#修改图片质量)
- [interlace 图片](#interlace 图片)
- [旋转图片](#旋转图片)
- [高斯模糊图片](#高斯模糊图片)
- [裁剪图片](#裁剪图片)
- [生成缩略图](#生成缩略图)

每个操作所需的参数请参考上面的各个方法, 除了上面方法列出来的参数之外, 每个操作需要提供操作类型, 分别是
- `'quality'`
- `'interlace'`
- `'rotate'`
- `'blur'`
- `'crop'`
- `'thumbnail'`

```javascript
// 裁剪后旋转
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
nim.processImage({
    url: url,
    ops: [
        {
            type: 'crop',
            x: 100,
            y: 0,
            width: 250,
            height: 250,
        },
        {
            type: 'thumbnail',
            mode: 'cover',
            width: 80,
            height: 80
        }
    ],
    done: processImageDone
});
function processImageDone(error, obj) {
    console.log(error);
    console.log(obj);
    console.log('处理图片' + (!error?'成功':'失败'));
}
```

## 工具方法

### <span id="修改图片下载的名字">修改图片下载的名字</span>

- 此方法会返回一个新的地址

```
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ0MzE0NTgyNDI0M184YjFkYTMwMS02NjcxLTRiYjktYTUwZC04ZTVlZjZlNzZjMzA=';
var nameUrl = nim.packFileDownloadName({
    url: url,
    name: '测试.jpg'
});
console.log(nameUrl);
```

### <span id="将音频url转为mp3">将音频url转为mp3</span>

- 此方法会返回一个新的地址

```
var url = 'http://b12026.nos.netease.com/MTAxMTAxMA==/bmltYV8xMTQwMzFfMTQ1MTg4ODk5MjMxMV9mNmI1Y2QyZC03N2UzLTQxNmUtYWY5NC1iODlhZGY4ZTYzYWQ=';
var mp3Url = nim.audioToMp3({
    url: url
});
console.log(mp3Url);
```

### <span id="语音转文字">语音转文字</span>

- 仅支持通过[预览文件](#预览文件)或者[发送文件消息](#发送文件消息)拿到的音频 url, 或者收到的音频消息的 url

```
var url = 'http://nim.nos.netease.com/MTAxMTAwMg==/bmltYV8xNDc5OTNfMTQ1MTg5MDI2MjY0MF9lYzk1MWMyZC1hMzRmLTQ1YzctYWI2ZS1kZWE2NTA2M2Q4NjY=';
nim.audioToText({
    url: url,
    done: audioToTextDone
});
function audioToTextDone(error, obj) {
    console.log('语音转文字' + (!error?'成功':'失败'), error, obj);
}
```

### Blob

- 将包含 MIME type 和 base64 数据的 data URL 转换为 Blob 对象

```javascript
var dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAyADIDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAIEBgUDAf/EACwQAAEEAQMCBQMFAQAAAAAAAAEAAgMRBAUSISIxBhNBUWEUMnEjkaGxstH/xAAaAQACAwEBAAAAAAAAAAAAAAAAAQIDBAUG/8QAIREAAgIBAwUBAAAAAAAAAAAAAAECERIEFCExM0FxodH/2gAMAwEAAhEDEQA/ANkiKtm5gxI203fK87Y2XVnv+w7lXNpK2ebLKhHMyUuDHbtpokdr9lksjPzM187pMowYEBIfKw7TIR3ArsL4vuquJNlYenYub9TPE2U1I272lx4cGngjtYPp8rPuoWLI3SLlaTqr8pz8XLa2PNiHW1vZw9CPhdVXxkpK0MIiKQBZzXcgxZGVJz+hh20D3cTf+QtE40LDS4+gaLJXE13FfFqNSxyRvkg8qTpI2HktPNe7gVRqe2x4tqzh5OP5PhAxMaDULXHn1sElWtQo+HJdvb6cEbvwP5VbLex3hzJxnSmSXHjDJKFciq49vlT1SYjw8xrTuknYyNu1v3E1dD8WuZza9kPwSymAaRnMNzF7GFx4LmubyCtoOyxpx/q9UwtMi3mPGAllcfgU3n3WyW/SJ4EkERFrA+EWORahkxszJnS5QEz3MEZMguwBX9eq9FFzA4EEWCk0n1HbqjN5GmQyajKxkhDiwxuO8dba+1xruOVX1DCZp2JFPNlDysZrY4uN5DjxurgE178LRnToDN5vXd9r4UpNPxZQBLE14BsB3ItZ9tF3Y4OKmnNWvPNfTx0zAxsKHdj9Zl63yu5dIT6n/ivqLWNY3a0ABSWhJJUiIRETAIiIAIiIAIiIAIiIA//Z';

var blob = NIM.blob.fromDataURL(dataURL);

// blob instanceof Blob === true;
```
