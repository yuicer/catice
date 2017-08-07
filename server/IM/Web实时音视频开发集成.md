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

[初始化SDK](/docs/product/IM即时通讯/SDK开发集成/Web开发集成?#初始化SDK)

## <span id="登录与登出">登录与登出</span>

[登录与登出](/docs/product/IM即时通讯/SDK开发集成/Web开发集成?#登录与登出)
## <span id="音视频通话">音视频通话(插件版)</span>

### <span id="备注">备注</span>

- 从V3.9.1开始支持WebRTC,该WebRTC为Beta版。对于WebRTC Beta版，在有 webrtc 客户端参与的房间中需要打开该开关, 如果没有 webrtc 客户端参与，不要打开该开关。该开关在 发起通话(点对点)、预定会议(多人) 时设置

### <span id="准备工作">准备工作</span>

- 加载 JS 文件
  - 依赖 `NIM_Web_NIM_v.js`, 请依次加载引入`NIM_Web_NIM_v.js`、 `NIM_Web_Netcall_v.js`, 然后请确认调用 `NIM.use(Netcall)` 来加载音视频通话插件.
- 安装 PC 插件
  - 此版本的音视频通话功能依赖于 PC 插件进行视频的采集传输和音频的播放, 请下载并安装 PC 插件, 然后启动 PC 插件.
  
### <span id="兼容性要求">兼容性要求</span>
   - 音视频通话pcagent方案基于webgl技术进行视频渲染，请注意[浏览器兼容性](http://caniuse.com/#search=webgl)情况。
   - 此外对于**高画质大尺寸**的视频渲染与传输，对计算机硬件要求比较高，请斟酌使用。

### <span id="初始化音视频通话">初始化音视频通话</span>

请参考示例代码来初始化音视频通话, 示例代码和参数解释如下:

```js
const netcall = Netcall.getInstance({
  nim: window.nim,
  container: document.getElementById('container'),
  remoteContainer: document.getElementById('container'),
  mirror: true
})
```

- kickLast, 是否踢掉上次的通话, 默认 false
- nim, 音视频通话是基于 IM 的, 需要传入 NIM 实例
- container, 播放自己视频画面的容器节点
- remoteContainer, 播放对方画面的容器节点
- mirror, 是否对自己的画面进行镜像处理, 默认 false, 一般来讲请将此参数设置为 true（既自己看自己是反项的）
- mirrorRemote, 是否对对方的画面进行镜像处理, 默认 false

### <span id="音视频通话事件">音视频通话事件</span>

在初始化音视频通话之后, 在调用任何方法之前, 请先监听一些音视频通话事件, 基本上所有的音视频通话操作都是异步的, 而且这些操作会触发音视频通话的某些事件, 具体事件会在各个操作里面详细介绍.

### <span id="初始化信令">初始化信令</span>

Web 音视频通话依赖于 PC 插件, 所以在使用任何音视频通话功能之前, 需要先建立和 PC 插件之间的信令通道, 示例代码如下

```js
var signalInited = false
// 信令通道初始化完毕之后, 开发者可以启用音视频通话相关的 UI, 比如说展示呼叫别人的按钮
// 信令通道初始化失败的时候, 请展示错误并禁用所有音视频通话相关的 UI
netcall.initSignal().then(() => {
  console.log('signalInited')
  signalInited = true
}).catch(err => {
  console.log('initSignalError', err)
  signalInited = false
}))
// 当信令通道断开时, 会触发 signalClosed 事件
netcall.on('signalClosed', () => {
  console.log('on signalClosed')
  signalInited = false
  hangup()
})
// 初始化过程中会通过 devices 事件回传所有的设备列表
netcall.on('devices', obj => {
  console.log('on devices', obj)
})
```

### <span id="停止信令">停止信令</span>

当音视频通话结束之后, 需要停止信令通道, 然后禁用所有音视频通话相关的 UI, 示例代码如下

```js
netcall.stopSignal()
```

### <span id="发起音视频通话呼叫">发起音视频通话呼叫</span>

在初始化信令之后, 可以发起音视频通话呼叫

- 展示了如何在没有摄像头设备的时候切换到音频通话
- 代码里面用到了其它接口
  - [获取指定类型的所有设备](#获取指定类型的所有设备)
- 示例代码和参数解释如下:

```js
const switchToAudioIfNoVideoDevice = true
let type = Netcall.DEVICE_TYPE_VIDEO
let callTimer
netcall.getDevicesOfType(type).then(obj => {
  // 在没有摄像头设备的时候切换到音频通话
  if (type === Netcall.NETCALL_TYPE_VIDEO && switchToAudioIfNoVideoDevice && !obj.devices.length) {
    type = Netcall.NETCALL_TYPE_AUDIO
  }
  netcall.call({
    type,
    account: 'callee',
    webrtcEnable: true,
    pushConfig: {
      // enable: true,
      // needBadge: true,
      // needPushNick: true,
      pushContent: '推送内容',
      custom: JSON.stringify({
        key: 'value'
      })
    },
    sessionConfig: {

    }
  }).then(obj => {
    console.log('call success', obj)
  }, err => {
    // 被叫不在线
    if (err.code === 11001) {
      console.log('callee offline', err)
    }
  })
  // 设置超时计时器
  callTimer = setTimeout(() => {
    if (!netcall.callAccepted) {
      console.log('超时未接听, hangup')
      hangup()
    }
  }, 1000 * 30)
})
```

- type, 通话类型, 可选值有
  - Netcall.NETCALL_TYPE_AUDIO 音频
  - Netcall.NETCALL_TYPE_VIDEO 视频
- webrtcEnable, 是否支持WebRTC方式接入，可选，默认为不开启
- account, 对方账号
- pushConfig, 推送配置, 可选属性有
  - enable, 是否需要推送, 默认 true
  - needBadge, 是否需要角标计数, 默认 true
  - needPushNick, 是否需要推送昵称, 默认 true
  - pushContent, 推送内容
  - custom, 自定义通知数据, 推荐封装成 JSON 字符串
  - pushPayload, JSON格式的推送 payload,
  - sound, 推送声音
- sessionConfig, 会话配置, 每次通话会伴随着一次会话, 可以对此次会话进行一些配置
  - videoQuality, 视频分辨率, 可选值有
    - Netcall.CHAT_VIDEO_QUALITY_NORMAL 视频默认分辨率 480x320
    - Netcall.CHAT_VIDEO_QUALITY_LOW 视频低分辨率 176x144
    - Netcall.CHAT_VIDEO_QUALITY_MEDIUM 视频中分辨率 352x288
    - Netcall.CHAT_VIDEO_QUALITY_HIGH 视频高分辨率 480x320
    - Netcall.CHAT_VIDEO_QUALITY_480P 视频480p分辨率 640x480
  - videoFrameRate, 视频帧率，实际帧率因画面采集频率和机器性能限制可能达不到期望值
    - Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL 视频通话帧率默认值 最大取每秒15帧
    - Netcall.CHAT_VIDEO_FRAME_RATE_5 视频通话帧率 最大取每秒5帧
    - Netcall.CHAT_VIDEO_FRAME_RATE_10 视频通话帧率 最大取每秒10帧
    - Netcall.CHAT_VIDEO_FRAME_RATE_15 视频通话帧率 最大取每秒15帧
    - Netcall.CHAT_VIDEO_FRAME_RATE_20 视频通话帧率 最大取每秒20帧
    - Netcall.CHAT_VIDEO_FRAME_RATE_25 视频通话帧率 最大取每秒25帧
  - videoBitrate, 视频码率, >=100000 <= 5000000 有效
  - highAudio, 高清语音开关, 默认关闭
  - recordVideo, 视频录制开关, 默认关闭
  - recordAudio, 音频录制开关, 默认关闭

### <span id="清理音视频通话呼叫超时计时器">清理音视频通话呼叫超时计时器</span>

```js
clearCallTimer () {
  clearTimeout(callTimer)
}
```

### <span id="挂断音视频通话">挂断音视频通话</span>

- 挂断请调用 `netcall.hangup()`
- 这里加上了一些清理工作, 比如说重置之前记录的各种状态, 以及
  - [清理音视频通话呼叫超时计时器](#清理音视频通话呼叫超时计时器)
  - [停止本地视频流](#停止本地视频流)
  - [停止远程视频流](#停止远程视频流)
  - [停止麦克风设备](#停止麦克风设备)
  - [停止播放自己声音的设备](#停止播放自己声音的设备)
  - [停止播放对方声音的设备](#停止播放对方声音的设备)
  - [停止摄像头设备](#停止摄像头设备)
- 这些清理操作并不会有任何副作用

```js
function resetWhenHangup () {
  beCalledInfo = null
  beCalling = false
  clearCallTimer()
  netcall.stopLocalStream()
  netcall.stopRemoteStream()
  netcall.stopDeviceAudioIn()
  netcall.stopDeviceAudioOutLocal()
  netcall.stopDeviceAudioOutChat()
  netcall.stopDeviceVideo()
},
function hangup () {
  netcall.hangup()
  resetWhenHangup()
},
```

### <span id="监听挂断音视频通话">监听挂断音视频通话</span>

当一方挂断之后, 另一方会收到 `hangup` 事件, 此时做一些清理工作即可

```js
netcall.on('hangup', obj => {
  console.log('on hangup', obj)
  resetWhenHangup()
})
```

### <span id="被呼叫">被呼叫</span>

被叫用户在初始化音视频通话之后可以监听被呼叫的事件, 然后展示接听和挂断按钮

- 一个用户可以同时被多个用户呼叫, 即会收到多次 beCalling 事件
- 下面用示例代码来展示如何只接通第一次被叫, 其它被叫直接挂断, 开发者可以根据自己的场景来修改此处的逻辑
- 此示例代码用到了其它接口, 请参考下面的文档
  - [不是当前会话的channelId](#不是当前会话的channelId)
  - [挂断音视频通话](#挂断音视频通话)
  - [发送音视频通话控制指令](#发送音视频通话控制指令)

```js
let beCalling = false
let beCalledInfo = null
netcall.on('beCalling', obj => {
  console.log('on beCalling', obj)
  // 获取通话标识符 channelId, 每一通会话的 channelId 都不一样
  const {channelId} = obj
  // 通知对方自己已经收到此次通话的请求
  netcall.control({
    channelId,
    command: Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
  })
  // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则直接挂断
  if (!netcall.calling && !beCalling) {
    beCalling = true
    beCalledInfo = obj
  } else {
    let busy = false
    if (netcall.calling) {
      busy = netcall.notCurrentChannelId(obj)
    } else if (beCalling) {
      busy = beCalledInfo.channelId !== channelId
    }
    // 如果忙, 那么挂断并通知对方自己忙
    if (busy) {
      netcall.control({
        channelId,
        command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
      })
      netcall.response({
        accepted: false,
        beCalledInfo: obj
      })
    }
  }
})
```

### <span id="拒绝音视频通话被呼叫">拒绝音视频通话被呼叫</span>

可以先通知对方自己忙, 拒绝的时候需要回传在 `beCalling` 事件里面接收到的对象

```js
netcall.control({
  channelId: beCalledInfo.channelId,
  command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
})
netcall.response({
  accepted: false,
  beCalledInfo: beCalledInfo
})
beCalledInfo = null
beCalling = false
```

### <span id="监听拒绝音视频通话被呼叫">监听拒绝音视频通话被呼叫</span>

当被叫拒绝音视频通话被呼叫之后, 主叫会收到 `callRejected` 事件, 一般来讲需要进行如下操作

- [清理音视频通话呼叫超时计时器](#清理音视频通话呼叫超时计时器)
- [停止本地视频流](#停止本地视频流)
- [停止远程视频流](#停止远程视频流)
- [停止信令](#停止信令)

```js
netcall.on('callRejected', obj => {
  console.log('on callRejected', obj)
  clearCallTimer()
  netcall.stopLocalStream()
  netcall.stopRemoteStream()
})
```

### <span id="接听音视频通话被呼叫">接听音视频通话被呼叫</span>

- 接听的时候需要回传在 `beCalling` 事件里面接收到的对象
- 同时可以设置 sessionConfig, 请参考 [发起音视频通话呼叫](#发起音视频通话呼叫)
- 注意前文说过在做任何操作之前必须先[初始化信令](#初始化信令)

```js
beCalling = false
netcall.initSignal().then(() => {
  return netcall.response({
    accepted: true,
    beCalledInfo: beCalledInfo,
    sessionConfig: sessionConfig
  })
}).catch(err => {
  netcall.control({
    channelId: beCalledInfo.channelId,
    command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
  })
  hangup()
  beCalledInfo = null
  console.log('接听失败', err)
})
```

### <span id="监听接听音视频通话被呼叫">监听接听音视频通话被呼叫</span>

- 当被叫接听音视频通话被呼叫之后, 主叫和被叫都会收到 `callAccepted` 事件, 一般来讲需要进行如下操作
  - [清理音视频通话呼叫超时计时器](#清理音视频通话呼叫超时计时器)
  - 如果是视频呼叫, 那么需要
    - [启动麦克风设备](#启动麦克风设备)
    - [启动播放对方声音的设备](#启动播放对方声音的设备)
    - [启动摄像头设备](#启动摄像头设备)
    - [开启本地视频流](#开启本地视频流)
    - [开启远程视频流](#开启远程视频流)
  - 如果是音频呼叫, 那么需要
    - [启动麦克风设备](#启动麦克风设备)
    - [启动播放对方声音的设备](#启动播放对方声音的设备)
    - [停止摄像头设备](#停止摄像头设备)
- 此外还会收到一系列事件
  - deviceStatus, 通知设备状态的变更
  - streamResize, 自己的视频尺寸的变更
  - remoteStreamResize, 对方的视频尺寸的变更

```js
netcall.on('callAccepted', obj => {
  console.log('on callAccepted', obj)
  clearCallTimer()
  if (obj.type === Netcall.NETCALL_TYPE_VIDEO) {
    startDeviceAudioIn()
    startDeviceAudioOutChat()
    startDeviceVideo()
    netcall.startLocalStream()
    netcall.startRemoteStream()
  } else {
    startDeviceAudioIn()
    startDeviceAudioOutChat()
    stopDeviceVideo()
  }
})
netcall.on('deviceStatus', obj => {
  console.log('on deviceStatus', obj)
})
netcall.on('streamResize', obj => {
  console.log('on streamResize', obj)
})
netcall.on('remoteStreamResize', obj => {
  console.log('on remoteStreamResize', obj)
})
```

### <span id="监听音视频通话被叫操作多端同步通知">监听音视频通话被叫操作多端同步通知</span>

假如你在多台设备上登录了同一个账号, 此时如果被呼叫, 那么所有的设备都会收到 `beCalling` 事件, 当你在某台设备接听或者拒绝之后, 其它设备会收到这个操作的通知, 名字叫 `callerAckSync`, 收到此事件后一般来讲需要隐藏相应的被呼叫界面

```js
netcall.on('callerAckSync', obj => {
  console.log('on callerAckSync', obj)
  if (beCalledInfo && obj.channelId === beCalledInfo.channelId) {
    beCalledInfo = false
    beCalling = false
  }
})
```

### <span id="设置自己画面的尺寸">设置自己画面的尺寸</span>

最终显示的画面不大于所设置的宽和高
裁剪: 
cut: true(默认值), 画面按照提供的宽高等比例裁剪，返回裁剪后的实际大小
cut: false, 画面不进行裁剪, 返回按原始比例放大缩小后的实际宽高

```js
netcall.setVideoViewSize({
  width: 300,
  height: 300,
  cut: true
})
```

### <span id="设置对方画面的尺寸">设置对方画面的尺寸</span>

最终显示的画面不大于所设置的宽和高
裁剪: 
cut: true(默认值), 画面按照提供的宽高等比例裁剪，返回裁剪后的实际大小
cut: false, 画面不进行裁剪, 返回按原始比例放大缩小后的实际宽高

```js
netcall.setVideoViewRemoteSize({
  width: 300,
  height: 300,
  cut: true
})
```

### <span id="启动麦克风设备">启动麦克风设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceAudioIn () {
  netcall.startDevice({
    type: Netcall.DEVICE_TYPE_AUDIO_IN,
    device
  }).then(() => {
    // 通知对方自己开启了麦克风
    netcall.control({
      command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
    })
  }).catch(() => {
    console.log('启动麦克风失败')
  })
}
```

### <span id="停止麦克风设备">停止麦克风设备</span>

```js
function stopDeviceAudioIn () {
  netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN).then(() => {
    // 通知对方自己关闭了麦克风
    netcall.control({
      command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
    })
  })
}
```

### <span id="启动播放自己声音的设备">启动播放自己声音的设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceAudioOutLocal () {
  netcall.startDevice({
    type: Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL,
    device
  }).catch(() => {
    console.log('播放自己的声音失败')
  })
}
```

### <span id="停止播放自己声音的设备">停止播放自己声音的设备</span>

```js
function stopDeviceAudioOutLocal () {
  netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL)
}
```

### <span id="启动播放对方声音的设备">启动播放对方声音的设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceAudioOutChat () {
  netcall.startDevice({
    type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT,
    device
  }).catch(() => {
    console.log('播放对方的声音失败')
  })
}
```

### <span id="停止播放对方声音的设备">停止播放对方声音的设备</span>

```js
function stopDeviceAudioOutChat () {
  netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT)
}
```

### <span id="启动摄像头设备">启动摄像头设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备
通过参数 width 和 height 来设置摄像头捕获的视频的最大宽度和高度

```js
function startDeviceVideo () {
  netcall.startDevice({
    type: Netcall.DEVICE_TYPE_VIDEO,
    width: 300,
    height: 300
  }).then(() => {
    // 通知对方自己开启了摄像头
    netcall.control({
      command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON
    })
  }).catch(() => {
    // 通知对方自己的摄像头不可用
    netcall.control({
      command: Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID
    })
    console.log('启动摄像头失败')
  })
}
```

### <span id="停止摄像头设备">停止摄像头设备</span>

```js
stopDeviceVideo () {
  netcall.stopDevice(Netcall.DEVICE_TYPE_VIDEO).then(() => {
    // 通知对方自己关闭了摄像头
    netcall.control({
      command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF
    })
  })
}
```

### <span id="是当前会话的channelId">是当前会话的channelId</span>

```js
// obj 需包含 channelId 属性
netcall.isCurrentChannelId(obj)
```

### <span id="不是当前会话的channelId">不是当前会话的channelId</span>

```js
// obj 需包含 channelId 属性
netcall.notCurrentChannelId(obj)
```

### <span id="获取指定类型的所有设备">获取指定类型的所有设备</span>

此接口返回 Promise, 可选类型有

- Netcall.DEVICE_TYPE_AUDIO_IN 麦克风
- Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL 用于播放自己声音的设备
- Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT 播放对方声音的扬声器
- Netcall.DEVICE_TYPE_VIDEO 摄像头

```js
netcall.getDevicesOfType(type)
```

### <span id="开启本地视频流">开启本地视频流</span>

开启之后, 会接收并绘制自己的视频数据

```js
netcall.startLocalStream()
```

### <span id="停止本地视频流">停止本地视频流</span>

停止之后, 会停止接收并绘制自己的视频数据

```js
netcall.stopLocalStream()
```

### <span id="开启远程视频流">开启远程视频流</span>

开启之后, 会接收并绘制对方的视频数据

```js
netcall.startRemoteStream()
```

### <span id="停止远程视频流">停止远程视频流</span>

停止之后, 会停止接收并绘制对方的视频数据

```js
netcall.stopRemoteStream()
```

### <span id="发送音视频通话控制指令">发送音视频通话控制指令</span>

- SDK 提供此接口用于通话的双方来发送控制指令, 可选参数有
- channelId, 要发送指令的通话的 channelId, 如果不填那么默认为当前通话
- command, 可选控制指令有
  - Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
  - Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
  - Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
  - Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
  - Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
  - Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
  - Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
  - Netcall.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
  - Netcall.NETCALL_CONTROL_COMMAND_BUSY 占线
  - Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
  - Netcall.NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
  - Netcall.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
  - Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 告诉对方自己开始录制视频了
  - Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 告诉对方自己结束录制视频了

```js
netcall.control({
  channelId,
  command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
})
```

### <span id="监听音视频通话控制指令">监听音视频通话控制指令</span>

```js
netcall.on('control', obj => {
  // 如果不是当前通话的指令, 直接丢掉
  if (netcall.notCurrentChannelId(obj)) {
    return
  }
  console.log('on control', obj)
  const {type} = obj
  switch (type) {
    // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
      console.log('对方打开了音频')
      break
    // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
      console.log('对方关闭了音频')
      break
    // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
      console.log('对方打开了视频')
      break
    // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
      console.log('对方关闭了视频')
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
      agreeSwitchAudioToVideo()
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
      switchAudioToVideo()
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
      switchVideoToAudio()
      break
    // NETCALL_CONTROL_COMMAND_BUSY 占线
    case Netcall.NETCALL_CONTROL_COMMAND_BUSY:
      console.log('对方忙')
      break
    // NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
    // NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
    // NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
    // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 通知对方自己开始录制视频了
    // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 通知对方自己结束录制视频了
  }
})

/*
 * 音视频通话切换示例函数 begin
 */

function askSwitchVideoToAudio () {
  // 通知对方从视频切换到音频, 不需要同意直接切
  this.netcall.control({
    command: Netcall.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO
  })
  switchVideoToAudio()
}
function switchVideoToAudio () {
  stopDeviceVideo()
  netcall.switchVideoToAudio()
  netcall.stopLocalStream()
  netcall.stopRemoteStream()
}
function askSwitchAudioToVideo () {
  // 请求从音频切换到视频
  netcall.control({
    command: Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO
  })
}
function agreeSwitchAudioToVideo () {
  // 同意从音频切换到视频
  netcall.control({
    command: Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE
  })
  switchAudioToVideo()
}
function switchAudioToVideo () {
  netcall.switchAudioToVideo()
  startDeviceVideo()
  netcall.startLocalStream()
  netcall.startRemoteStream()
}

/*
 * 音视频通话切换示例函数 end
 */
```

### <span id="从视频模式切换为音频模式">从视频模式切换为音频模式</span>

```js
netcall.switchVideoToAudio()
```

### <span id="从音频模式切换为视频模式">从音频模式切换为视频模式</span>

```js
netcall.switchAudioToVideo()
```

### <span id="设置会话的视频质量">设置会话的视频质量</span>

在[监听接听音视频通话被呼叫](#监听接听音视频通话被呼叫)之后, 可以动态设置会话的视频质量, 可选视频质量有

- Netcall.CHAT_VIDEO_QUALITY_NORMAL 视频默认分辨率 480x320
- Netcall.CHAT_VIDEO_QUALITY_LOW 视频低分辨率 176x144
- Netcall.CHAT_VIDEO_QUALITY_MEDIUM 视频中分辨率 352x288
- Netcall.CHAT_VIDEO_QUALITY_HIGH 视频高分辨率 480x320
- Netcall.CHAT_VIDEO_QUALITY_480P 视频480p分辨率 640x480

```js
netcall.setSessionVideoQuality(Netcall.CHAT_VIDEO_QUALITY_NORMAL)
```

### <span id="设置会话的视频帧率">设置会话的视频帧率</span>

在[监听接听音视频通话被呼叫](#监听接听音视频通话被呼叫)之后, 可以动态设置会话的视频帧率, 可选视频帧率有

- Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL 视频通话帧率默认值 最大取每秒15帧
- Netcall.CHAT_VIDEO_FRAME_RATE_5 视频通话帧率 最大取每秒5帧
- Netcall.CHAT_VIDEO_FRAME_RATE_10 视频通话帧率 最大取每秒10帧
- Netcall.CHAT_VIDEO_FRAME_RATE_15 视频通话帧率 最大取每秒15帧
- Netcall.CHAT_VIDEO_FRAME_RATE_20 视频通话帧率 最大取每秒20帧
- Netcall.CHAT_VIDEO_FRAME_RATE_25 视频通话帧率 最大取每秒25帧

```js
netcall.setSessionVideoFrameRate(Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL)
```

### <span id="设置会话的视频码率">设置会话的视频码率</span>

在[监听接听音视频通话被呼叫](#监听接听音视频通话被呼叫)之后, 可以动态设置会话的视频码率,  >=100000 <= 5000000 有效

```js
netcall.setSessionVideoBitrate(0)
```

### <span id="设置采集音量">设置采集音量</span>

音量大小, 0-255

```js
netcall.setCaptureVolume(100)
```

### <span id="设置播放音量">设置播放音量</span>

音量大小, 0-255

```js
netcall.setPlayVolume(100)
```

### <span id="网络探测">网络探测</span>

```js
netcall.netDetect().then(obj => {
  console.log('netDetect success', obj)
}, err => {
  console.log('netDetect error', err)
})
```

### <span id="监听各种信息事件">监听各种信息事件</span>

```js
let netStatus = {}
netcall.on('netStatus', obj => {
  netStatus = NIM.util.merge({}, netStatus, obj)
})

let statistics = {}
netcall.on('statistics', obj => {
  statistics = obj
})

let audioVolumn = {}
netcall.on('audioVolumn', obj => {
  audioVolumn = NIM.util.merge({}, audioVolumn, obj)
})
```
### <span id="监听异常">监听异常</span>

```js
netcall.on('error', obj => {
	if (type === 'heartBeatError') {
		// pc35秒没收到心跳包，会抛出异常（此后所有操作会返回code: 1） 需要重新建立信令
		// todo
	}
   this.addLog('on error', obj)
})
```
### <span id="多人会议">多人会议</span>
与点对点通话的流程不同，多人会议暂不支持呼叫、推送和挂断等服务，只提供基本的预订、加入和离开会议接口。
目前呼叫方案可以参照demo使用点对点通知发送呼叫

##### <span id="预订会议">预订会议</span>

```js
this.netcall.createChannel({
  channelName: channelName //必填
  custom: custom //可选
  webrtcEnable: webrtcEnable // 是否支持WebRTC方式接入，可选，默认为不开启
}).then(obj => {
  // 预定会议成功后的上层逻辑操作
  // eg: 初始化会议UI显示
  // eg: 加入会议
})
```
需要先预订，本人和其他人才能加入会议。

会议通过 channelName 字段做标识；可以通过扩展字段 custom 在会议的创建和加入之间传递自定义的额外信息。

同一个会议名称，只在会议使用完并且房间被销毁（所有人都离开房间）以后才可以重复使用，开发者需要保证不会出现重复预订某会议名称而不使用的情况。

预定结果通过promise的then和catch捕捉

##### <span id="加入会议">加入会议</span>

```js
netcall.joinChannel({
  channelName: channelName, //必填
  type: type,
  custom: custom, //可选
  sessionConfig: sessionConfig
}).then(obj => {
  // 加入会议成功后的上层逻辑操作
  // eg: 开启摄像头
  // eg: 开启麦克风
  // eg: 开启本地流
  // eg: 设置音量采集、播放
  // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式
})
```

参数解读

```
channelName: 会议id(必填)
type: 通话类型(音频还是视频)
sessionConfig 会话配置，具体请参考API文档
{
  videoQuality 视频分辨率
  videoFrameRate 视频帧率
  videoBitrate 视频码率
  highAudio=false 高清语音开关, 默认关闭
  recordVideo=false 视频录制开关, 默认关闭
  recordAudio=false 音频录制开关, 默认关闭
  bypassRtmp=false 推流开关, 默认关闭，推流相关配置前提开关打开
  rtmpUrl 推流地址
  rtmpRecord=false 推流录制开关, 默认关闭
  splitMode 推流的布局, 默认平铺
}
```
加入会议结果通过promise的then和catch捕捉

##### <span id="离开会议">离开会议</span>

```js
netcall.leaveChannel().then(obj => {
  // 离开会议后的扫尾工作
})
```

##### <span id="改变自己在会议中的角色">改变自己在会议中的角色</span>

```js
// 观众切换到互动者
netcall.changeRoleToPlayer().then(obj => {
  // todo
})

// 互动者切换到观众
netcall.changeRoleToAudience().then(obj => {
  // todo
})
```

##### <span id="指定某用户设置是否对其静音">指定某用户设置是否对其静音(同p2p)</span>

```js
// 设置禁音
netcall.setAudioBlack(account).then(obj => {
  // todo
})

// 放开禁音
netcall.setAudioBlack(account).then(obj => {
  // todo
})
```
静音后将听不到该用户的声音。

需要在用户加入以后才能进行设置，该接口也可用于点对点双人通话。

##### <span id="第三方用户加入会议的通知">第三方用户加入会议的通知</span>

```js
netcall.on('joinChannel', function (obj) {
  // 通知上层有其他用户加入了会议，上层做相应逻辑和UI处理
})
```

##### <span id="第三方用户离开会议的通知">第三方用户离开会议的通知</span>

```js
netcall.on('leaveChannel', function (obj) {
  // 通知上层有其他用户离开了会议，上层做相应逻辑和UI处理
})
```
## <span id="WebRTC_基于WebRTC的实时音视频">WebRTC(Beta)</span>

### <span id="WebRTC_备注">备注</span>

1. 目前该版本为待优化的测试版本，欢迎开发者提供bug反馈和优化建议，让我们一起做得更好
2. 对于WebRTC Beta版，在有 webrtc 客户端参与的房间中需要打开该开关, 如果没有 webrtc 客户端参与，不要打开该开关。
3. 请注意：WebRTC 的音视频支持需要开启https, http模式下无法捕捉摄像头和麦克风
4. 目前同步上线的demo只支持点对点通话，多人通话随后就到~

### <span id="WebRTC_兼容性要求">兼容性要求</span>
   - WebRTC API目前还处于完善的过程中，请注意[浏览器兼容性](http://caniuse.com/#search=webrtc)情况，推荐使用最新稳定版本chrome(目前sdk只验证了chrome，后期会兼容其他浏览器)。
   - 目前同步上线的demo里面只兼容chrome浏览器

### <span id="WebRTC_准备工作">准备工作</span>

- 加载 JS 文件
  - 请参考[开发准备](#开发准备)下载并引入相关的 JS 文件, 然后请确认调用 `NIM.use(WebRTC)` 来加载基于WebRTC的实时音视频插件.

### <span id="WebRTC_初始化实时音视频">初始化实时音视频</span>

请参考示例代码来初始化实时音视频, 示例代码和参数解释如下:

```js
const netcall = WebRTC.getInstance({
  nim: window.nim,
  container: document.getElementById('container'),
  remoteContainer: document.getElementById('container')
})
```

- nim, 实时音视频是基于 IM 的, 需要传入 NIM 实例
- container, 播放自己视频画面的容器节点
- remoteContainer, 点对点播放对方画面的容器节点

### <span id="WebRTC_实时音视频事件">实时音视频事件</span>

在初始化实时音视频之后, 在调用任何方法之前, 请先监听一些实时音视频事件, 基本上所有的实时音视频操作都是异步的, 而且这些操作会触发实时音视频的某些事件, 具体事件会在各个操作里面详细介绍.


### <span id="WebRTC_发起音视频呼叫">发起音视频呼叫</span>

- 展示了如何在没有摄像头设备的时候切换到音频通话
- 代码里面用到了其它接口
  - [获取指定类型的所有设备](#获取指定类型的所有设备)
- 示例代码和参数解释如下:

```js
const switchToAudioIfNoVideoDevice = true
let type = WebRTC.DEVICE_TYPE_VIDEO
let callTimer

  netcall.call({
    type,
    account: 'callee',
    pushConfig: {
      // enable: true,
      // needBadge: true,
      // needPushNick: true,
      pushContent: '推送内容',
      custom: JSON.stringify({
        key: 'value'
      })
    },
    sessionConfig: {

    }
  }).then(obj => {
    console.log('call success', obj)
    // 设置超时计时器
    callTimer = setTimeout(() => {
      if (!netcall.callAccepted) {
        console.log('超时未接听, hangup')
        hangup()
      }
    }, 1000 * 30)
  }, err => {
    // 被叫不在线
    if (err.code === 11001) {
      console.log('callee offline', err)
    }
  })
  
```

- type, 通话类型, 可选值有
  - WebRTC.NETCALL_TYPE_AUDIO 音频
  - WebRTC.NETCALL_TYPE_VIDEO 视频
- account, 对方账号
- pushConfig, 推送配置, 可选属性有
  - enable, 是否需要推送, 默认 true
  - needBadge, 是否需要角标计数, 默认 true
  - needPushNick, 是否需要推送昵称, 默认 true
  - pushContent, 推送内容
  - custom, 自定义通知数据, 推荐封装成 JSON 字符串
  - pushPayload, JSON格式的推送 payload,
  - sound, 推送声音
- sessionConfig, 会话配置, 每次通话会伴随着一次会话, 可以对此次会话进行一些配置
  - videoQuality, 视频分辨率, 可选值有
    - WebRTC.CHAT_VIDEO_QUALITY_NORMAL 视频默认分辨率 480x320
    - WebRTC.CHAT_VIDEO_QUALITY_LOW 视频低分辨率 176x144
    - WebRTC.CHAT_VIDEO_QUALITY_MEDIUM 视频中分辨率 352x288
    - WebRTC.CHAT_VIDEO_QUALITY_HIGH 视频高分辨率 480x320
    - WebRTC.CHAT_VIDEO_QUALITY_480P 视频480p分辨率 640x480
  - videoFrameRate, 视频帧率，实际帧率因画面采集频率和机器性能限制可能达不到期望值
    - WebRTC.CHAT_VIDEO_FRAME_RATE_NORMAL 视频通话帧率默认值 最大取每秒15帧
    - WebRTC.CHAT_VIDEO_FRAME_RATE_5 视频通话帧率 最大取每秒5帧
    - WebRTC.CHAT_VIDEO_FRAME_RATE_10 视频通话帧率 最大取每秒10帧
    - WebRTC.CHAT_VIDEO_FRAME_RATE_15 视频通话帧率 最大取每秒15帧
    - WebRTC.CHAT_VIDEO_FRAME_RATE_20 视频通话帧率 最大取每秒20帧
    - WebRTC.CHAT_VIDEO_FRAME_RATE_25 视频通话帧率 最大取每秒25帧
  - highAudio, 高清语音开关, 默认关闭

### <span id="WebRTC_清理音视频呼叫超时计时器">清理音视频呼叫超时计时器</span>

```js
clearCallTimer () {
  clearTimeout(callTimer)
}
```

### <span id="WebRTC_挂断音视频通话">挂断音视频通话</span>

- 挂断请调用 `netcall.hangup()`
- 这里加上了一些清理工作, 比如说重置之前记录的各种状态, 以及
  - [清理音视频呼叫超时计时器](#清理音视频呼叫超时计时器)
  - [停止本地视频流](#停止本地视频流)
  - [停止远程视频流](#停止远程视频流)
  - [停止麦克风设备](#停止麦克风设备)
  - [停止播放自己声音的设备](#停止播放自己声音的设备)
  - [停止播放对方声音的设备](#停止播放对方声音的设备)
  - [停止摄像头设备](#停止摄像头设备)
- 这些清理操作并不会有任何副作用

```js
function resetWhenHangup () {
  beCalledInfo = null
  beCalling = false
  clearCallTimer()
  netcall.stopLocalStream()
  netcall.stopRemoteStream()
  netcall.stopDeviceAudioIn()
  netcall.stopDeviceAudioOutLocal()
  netcall.stopDeviceAudioOutChat()
  netcall.stopDeviceVideo()
},
function hangup () {
  netcall.hangup()
  resetWhenHangup()
},
```

### <span id="WebRTC_监听挂断音视频通话">监听挂断音视频通话</span>

当一方挂断之后, 另一方会收到 `hangup` 事件, 此时做一些清理工作即可

```js
netcall.on('hangup', obj => {
  console.log('on hangup', obj)
  resetWhenHangup()
})
```

### <span id="WebRTC_被呼叫">被呼叫</span>

被叫用户在初始化实时音视频之后可以监听被呼叫的事件, 然后展示接听和挂断按钮

- 一个用户可以同时被多个用户呼叫, 即会收到多次 beCalling 事件
- 下面用示例代码来展示如何只接通第一次被叫, 其它被叫直接挂断, 开发者可以根据自己的场景来修改此处的逻辑
- 此示例代码用到了其它接口, 请参考下面的文档 
  - [发送音视频通话控制指令](#发送音视频通话控制指令)

```js
let beCalling = false
let beCalledInfo = null
netcall.on('beCalling', obj => {
  console.log('on beCalling', obj)
  // 获取通话标识符 channelId, 每一通会话的 channelId 都不一样
  const {channelId} = obj
  // 通知对方自己已经收到此次通话的请求
  netcall.control({
    channelId,
    command: WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED
  })
  // 只有在没有通话并且没有被叫的时候才记录被叫信息, 否则直接挂断
  if (!netcall.calling && !beCalling) {
    beCalling = true
    beCalledInfo = obj
  } else {
    // 通知呼叫方我方繁忙
    netcall.control({
        channelId: channelId,
        command: Netcall.NETCALL_CONTROL_COMMAND_BUSY
    });
  }
})
```

### <span id="WebRTC_拒绝音视频被呼叫">拒绝音视频被呼叫</span>

可以先通知对方自己忙, 拒绝的时候需要回传在 `beCalling` 事件里面接收到的对象

```js
netcall.control({
  channelId: beCalledInfo.channelId,
  command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
})
netcall.response({
  accepted: false,
  beCalledInfo: beCalledInfo
})
beCalledInfo = null
beCalling = false
```

### <span id="WebRTC_监听拒绝音视频被呼叫">监听拒绝音视频被呼叫</span>

当被叫拒绝音视频被呼叫之后, 主叫会收到 `callRejected` 事件, 一般来讲需要进行如下操作

- [清理音视频呼叫超时计时器](#清理音视频呼叫超时计时器)

```js
netcall.on('callRejected', obj => {
  console.log('on callRejected', obj)
  clearCallTimer()
})
```

### <span id="WebRTC_接听音视频被呼叫">接听音视频被呼叫</span>

- 接听的时候需要回传在 `beCalling` 事件里面接收到的对象
- 同时可以设置 sessionConfig, 请参考 [发起音视频呼叫](#发起音视频呼叫)

```js
beCalling = false
netcall.response({
  accepted: true,
  beCalledInfo: beCalledInfo,
  sessionConfig: sessionConfig
}).catch(err => {
  netcall.control({
    channelId: beCalledInfo.channelId,
    command: WebRTC.NETCALL_CONTROL_COMMAND_BUSY
  })
  hangup()
  beCalledInfo = null
  console.log('接听失败', err)
})
```

### <span id="WebRTC_监听接听音视频被呼叫">监听接听音视频被呼叫</span>

- 当被叫接听音视频被呼叫之后, 主叫和被叫都会收到 `callAccepted` 事件, 一般来讲需要进行如下操作
  - [清理音视频呼叫超时计时器](#清理音视频呼叫超时计时器)
  - 如果是视频呼叫, 那么需要
    - [启动麦克风设备](#启动麦克风设备)
    - [启动播放对方声音的设备](#启动播放对方声音的设备)
    - [启动摄像头设备](#启动摄像头设备)
    - [开启本地视频流](#开启本地视频流)
    - [开启远程视频流](#开启远程视频流)
  - 如果是音频呼叫, 那么需要
    - [启动麦克风设备](#启动麦克风设备)
    - [启动播放对方声音的设备](#启动播放对方声音的设备)
    - [停止摄像头设备](#停止摄像头设备)
- 此外还会收到一系列事件
  - deviceStatus, 通知设备状态的变更

```js
netcall.on('callAccepted', obj => {
  console.log('on callAccepted', obj)
  clearCallTimer()
  let promise;
  if (obj.type === WebRTC.NETCALL_TYPE_VIDEO) {
    promise = startDeviceVideo().then(()=>{
      netcall.startLocalStream()
    })
  } else {
    promise = stopDeviceVideo()
  }
  promise.then(()=>{
    return startDeviceAudioIn()
  }).then(()=>{
    return netcall.startRtc()
  }).then(()=>{
    return startDeviceAudioOutChat()
  }).then(()=>{
    if (obj.type === WebRTC.NETCALL_TYPE_VIDEO) {
      return netcall.startRemoteStream()
    }
  })
})
netcall.on('deviceStatus', obj => {
  console.log('on deviceStatus', obj)
})

```

### <span id="WebRTC_监听音视频被叫操作多端同步通知">监听音视频被叫操作多端同步通知</span>

假如你在多台设备上登录了同一个账号, 此时如果被呼叫, 那么所有的设备都会收到 `beCalling` 事件, 当你在某台设备接听或者拒绝之后, 其它设备会收到这个操作的通知, 名字叫 `callerAckSync`, 收到此事件后一般来讲需要隐藏相应的被呼叫界面

```js
netcall.on('callerAckSync', obj => {
  console.log('on callerAckSync', obj)
  if (beCalledInfo && obj.channelId === beCalledInfo.channelId) {
    beCalledInfo = false
    beCalling = false
  }
})
```

### <span id="WebRTC_设置自己画面的尺寸">设置自己画面的尺寸</span>

最终显示的画面不大于所设置的宽和高
裁剪: 
cut: true(默认值), 画面按照提供的宽高等比例裁剪，返回裁剪后的实际大小
cut: false, 画面不进行裁剪, 返回按原始比例放大缩小后的实际宽高

```js
netcall.setVideoViewSize({
  width: 300,
  height: 300,
  cut: true
})
```

### <span id="WebRTC_设置对方画面的尺寸">设置对方画面的尺寸</span>

最终显示的画面不大于所设置的宽和高
裁剪: 
cut: true(默认值), 画面按照提供的宽高等比例裁剪，返回裁剪后的实际大小
cut: false, 画面不进行裁剪, 返回按原始比例放大缩小后的实际宽高

```js
netcall.setVideoViewRemoteSize({
  width: 300,
  height: 300,
  cut: true
})
```

### <span id="WebRTC_启动麦克风设备">启动麦克风设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceAudioIn () {
  return netcall.startDevice({
    type: WebRTC.DEVICE_TYPE_AUDIO_IN,
    device
  }).then(() => {
    // 通知对方自己开启了麦克风
    netcall.control({
      command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
    })
  }).catch(() => {
    console.log('启动麦克风失败')
  })
}
```

### <span id="WebRTC_停止麦克风设备">停止麦克风设备</span>

```js
function stopDeviceAudioIn () {
  return netcall.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_IN).then(() => {
    // 通知对方自己关闭了麦克风
    netcall.control({
      command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF
    })
  })
}
```

### <span id="WebRTC_启动播放自己声音的设备">启动播放自己声音的设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceAudioOutLocal () {
  return netcall.startDevice({
    type: WebRTC.DEVICE_TYPE_AUDIO_OUT_LOCAL,
    device
  }).catch(() => {
    console.log('播放自己的声音失败')
  })
}
```

### <span id="WebRTC_停止播放自己声音的设备">停止播放自己声音的设备</span>

```js
function stopDeviceAudioOutLocal () {
  return netcall.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_OUT_LOCAL)
}
```

### <span id="WebRTC_启动播放对方声音的设备">启动播放对方声音的设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceAudioOutChat () {
  return netcall.startDevice({
    type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT,
    device
  }).catch(() => {
    console.log('播放对方的声音失败')
  })
}
```

### <span id="WebRTC_停止播放对方声音的设备">停止播放对方声音的设备</span>

```js
function stopDeviceAudioOutChat () {
  return netcall.stopDevice(WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT)
}
```

### <span id="WebRTC_启动摄像头设备">启动摄像头设备</span>

可以传入 device 参数来指定开启某个特定设备; 如果不传 device 参数, 那么默认启动第一个此类设备

```js
function startDeviceVideo () {
  return netcall.startDevice({
    type: WebRTC.DEVICE_TYPE_VIDEO
  }).then(() => {
    // 通知对方自己开启了摄像头
    netcall.control({
      command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON
    })
  }).catch(() => {
    // 通知对方自己的摄像头不可用
    netcall.control({
      command: WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID
    })
    console.log('启动摄像头失败')
  })
}
```

### <span id="WebRTC_停止摄像头设备">停止摄像头设备</span>

```js
stopDeviceVideo () {
  return netcall.stopDevice(WebRTC.DEVICE_TYPE_VIDEO).then(() => {
    // 通知对方自己关闭了摄像头
    netcall.control({
      command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF
    })
  })
}
```

### <span id="WebRTC_是当前会话的channelId">是当前会话的channelId</span>

```js
// obj 需包含 channelId 属性
netcall.isCurrentChannelId(obj)
```

### <span id="WebRTC_不是当前会话的channelId">不是当前会话的channelId</span>

```js
// obj 需包含 channelId 属性
netcall.notCurrentChannelId(obj)
```

### <span id="WebRTC_获取指定类型的所有设备">获取指定类型的所有设备</span>

此接口返回 Promise, 可选类型有

- WebRTC.DEVICE_TYPE_AUDIO_IN 麦克风
- WebRTC.DEVICE_TYPE_AUDIO_OUT_LOCAL 用于播放自己声音的设备
- WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT 播放对方声音的扬声器
- WebRTC.DEVICE_TYPE_VIDEO 摄像头

```js
netcall.getDevicesOfType(type)
```

### <span id="WebRTC_开始WebRtc音视频连接">开始WebRtc音视频连接</span>

开始建立WebRTC连接，发送和接收音视频数据

```js
netcall.startRtc().then(()=>{
  // todo
}).catch(err=>{
  console.log(err)
})
```


### <span id="WebRTC_开启本地视频流">开启本地视频流</span>

开启之后, 会显示自己的视频数据

```js
netcall.startLocalStream()
```

### <span id="WebRTC_停止本地视频流">停止本地视频流</span>

停止之后, 会停止显示自己的视频数据

```js
netcall.stopLocalStream()
```

### <span id="WebRTC_开启远程视频流">开启远程视频流</span>

开启之后, 会显示对方的视频数据
多人会议需要传入目标account或者uid和node节点

```js
// 这里传入account或者uid都可以
netcall.startRemoteStream({
  // account: obj.account
  uid: obj.uid,
  node: document.querySelector('#video')
})
```

### <span id="WebRTC_停止远程视频流">停止远程视频流</span>

停止之后, 会停止显示对方的视频数据
多人会议需要传入目标account或者uid

```js
// 这里传入account或者uid都可以
netcall.stopRemoteStream({
  // account: obj.account
  uid: obj.uid
})
```

### <span id="WebRTC_暂停播放自己的视频画面">暂停播放自己的视频画面</span>

```js
netcall.suspendLocalStream()
```

### <span id="WebRTC_继续播放自己的视频画面">继续播放自己的视频画面</span>

```js
netcall.resumeLocalStream()
```

### <span id="WebRTC_暂停播放对方的视频画面">暂停播放对方的视频画面</span>

多人会议需要传入目标account或者uid

```js
// 这里传入account或者uid都可以
netcall.suspendRemoteStream({
  // account: obj.account
  uid: obj.uid
})
```

### <span id="WebRTC_继续播放对方的视频画面">继续播放对方的视频画面</span>

多人会议需要传入目标account或者uid

```js
// 这里传入account或者uid都可以
netcall.resumeRemoteStream({
  // account: obj.account
  uid: obj.uid
})
```

### <span id="WebRTC_发送音视频通话控制指令">发送音视频通话控制指令</span>

- SDK 提供此接口用于通话的双方来发送控制指令, 可选参数有
- channelId, 要发送指令的通话的 channelId, 如果不填那么默认为当前通话
- command, 可选控制指令有
  - WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
  - WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
  - WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
  - WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
  - WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
  - WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
  - WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
  - WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
  - WebRTC.NETCALL_CONTROL_COMMAND_BUSY 占线
  - WebRTC.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
  - WebRTC.NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
  - WebRTC.NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
  - WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 告诉对方自己开始录制视频了
  - WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 告诉对方自己结束录制视频了

```js
netcall.control({
  channelId,
  command: WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON
})
```

### <span id="WebRTC_监听音视频通话控制指令">监听音视频通话控制指令</span>

```js
netcall.on('control', obj => {
  // 如果不是当前通话的指令, 直接丢掉
  if (netcall.notCurrentChannelId(obj)) {
    return
  }
  console.log('on control', obj)
  const {type} = obj
  switch (type) {
    // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
    case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
      console.log('对方打开了音频')
      break
    // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
    case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
      console.log('对方关闭了音频')
      break
    // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
    case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
      console.log('对方打开了视频')
      break
    // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
    case WebRTC.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
      console.log('对方关闭了视频')
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
    case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
      agreeSwitchAudioToVideo()
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
    case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
    case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
      switchAudioToVideo()
      break
    // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
    case WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
      switchVideoToAudio()
      break
    // NETCALL_CONTROL_COMMAND_BUSY 占线
    case WebRTC.NETCALL_CONTROL_COMMAND_BUSY:
      console.log('对方忙')
      break
    // NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
    // NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
    // NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
  }
})

/*
 * 音视频切换示例函数 begin
 */

function askSwitchVideoToAudio () {
  // 通知对方从视频切换到音频, 不需要同意直接切
  this.netcall.control({
    command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO
  })
  switchVideoToAudio()
}
function switchVideoToAudio () {
  stopDeviceVideo()
  netcall.stopLocalStream()
  netcall.stopRemoteStream()
  netcall.switchVideoToAudio()
}
function askSwitchAudioToVideo () {
  // 请求从音频切换到视频
  netcall.control({
    command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO
  })
}
function agreeSwitchAudioToVideo () {
  // 同意从音频切换到视频
  netcall.control({
    command: WebRTC.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE
  })
  switchAudioToVideo()
}
function switchAudioToVideo () {
  startDeviceVideo().then(function() {
    netcall.startLocalStream()
  }.bind(this)).then(function() {
    return netcall.switchAudioToVideo();
  }.bind(this)).then(function(){
    netcall.startRemoteStream()
  }.bind(this)).catch(function(e) {
    console.log(e);
  })
}

/*
 * 音视频切换示例函数 end
 */
```

### <span id="WebRTC_从视频模式切换为音频模式">从视频模式切换为音频模式</span>

```js
netcall.switchVideoToAudio()
```

### <span id="WebRTC_从音频模式切换为视频模式">从音频模式切换为视频模式</span>

```js
netcall.switchAudioToVideo()
```

### <span id="WebRTC_设置会话的视频质量">设置会话的视频质量</span>

设置会话的视频质量, 可选视频质量有

- WebRTC.CHAT_VIDEO_QUALITY_NORMAL 视频默认分辨率 480x320
- WebRTC.CHAT_VIDEO_QUALITY_LOW 视频低分辨率 176x144
- WebRTC.CHAT_VIDEO_QUALITY_MEDIUM 视频中分辨率 352x288
- WebRTC.CHAT_VIDEO_QUALITY_HIGH 视频高分辨率 480x320
- WebRTC.CHAT_VIDEO_QUALITY_480P 视频480p分辨率 640x480

```js
netcall.setSessionVideoQuality(WebRTC.CHAT_VIDEO_QUALITY_NORMAL)
```

### <span id="WebRTC_设置会话的视频帧率">设置会话的视频帧率</span>

设置会话的视频帧率, 可选视频帧率有

- WebRTC.CHAT_VIDEO_FRAME_RATE_NORMAL 视频通话帧率默认值 最大取每秒15帧
- WebRTC.CHAT_VIDEO_FRAME_RATE_5 视频通话帧率 最大取每秒5帧
- WebRTC.CHAT_VIDEO_FRAME_RATE_10 视频通话帧率 最大取每秒10帧
- WebRTC.CHAT_VIDEO_FRAME_RATE_15 视频通话帧率 最大取每秒15帧
- WebRTC.CHAT_VIDEO_FRAME_RATE_20 视频通话帧率 最大取每秒20帧
- WebRTC.CHAT_VIDEO_FRAME_RATE_25 视频通话帧率 最大取每秒25帧

```js
netcall.setSessionVideoFrameRate(WebRTC.CHAT_VIDEO_FRAME_RATE_NORMAL)
```

### <span id="WebRTC_设置采集音量">设置采集音量</span>

音量大小, 0-255

```js
netcall.setCaptureVolume(100)
```

### <span id="WebRTC_设置播放音量">设置播放音量</span>

音量大小, 0-255
多人会议需要传入目标account或者uid

```js
netcall.setPlayVolume({
  account: 'testaccount'
  volume: 100
})
```

### <span id="WebRTC_设置目标静音">设置目标静音</span>

设置后，不能听到目标声音
多人会议需要传入目标account，不设置则操作所有远程流

```js
netcall.setAudioBlack(account)
```

### <span id="WebRTC_设置目标非静音">设置目标非静音</span>

设置后，能听到目标声音
多人会议需要传入目标account，不设置则操作所有远程流

```js
netcall.setAudioStart(account)
```

### <span id="WebRTC_显示目标画面">显示目标画面</span>

设置后，能看到目标视频画面
多人会议需要传入目标account，不设置则操作所有远程流

```js
netcall.setVideoShow(account)
```

### <span id="WebRTC_禁止显示目标画面">禁止显示目标画面</span> 

设置后，不能看到目标视频画面
多人会议需要传入目标account，不设置则操作所有远程流

```js
netcall.setVideoBlack(account)
```

### <span id="WebRTC_开启video录制">开启video录制</span> 

录制目标帐号的视频和音频，不传参则录制当前登录帐号的视频和音频
目前只支持webm格式的视频，可以用chrome浏览器打开

```js
netcall.startRecordMp4({account}).then().catch()
```

### <span id="WebRTC_停止video录制">停止video录制</span> 

结束视频和音频录制，弹框选择保存本地

```js
netcall.stopRecordMp4().then().catch()
```

### <span id="WebRTC_开启混音录制">开启混音录制</span>

混合本地和所有远程音频流，进行录制并保存
目前只支持webm格式的音频，可以用chrome浏览器打开

```js
netcall.startRecordAac().then().catch()
```

### <span id="WebRTC_停止混音录制">停止混音录制</span>

结束混音录制，弹框选择保存本地

```js
netcall.stopRecordAac().then().catch()
```

### <span id="WebRTC_开启多人会议">开启多人会议</span>

与点对点通话的流程不同，多人会议暂不支持呼叫、推送和挂断等服务，只提供基本的预订、加入和离开会议接口。
目前呼叫方案可以参照demo使用点对点通知发送呼叫

##### <span id="WebRTC_预订会议">预订会议</span>

```js
this.netcall.createChannel({
  channelName: channelName //必填
  custom: custom //可选
}).then(obj => {
  // 预定会议成功后的上层逻辑操作
  // eg: 初始化会议UI显示
  // eg: 加入会议
}).catch()
```

需要先预订，本人和其他人才能加入会议。

会议通过 channelName 字段做标识；可以通过扩展字段 custom 在会议的创建和加入之间传递自定义的额外信息。

同一个会议名称，只在会议使用完并且房间被销毁（所有人都离开房间）以后才可以重复使用，开发者需要保证不会出现重复预订某会议名称而不使用的情况。

预定结果通过promise的then和catch捕捉

##### <span id="WebRTC_加入会议">加入会议</span>

```js
netcall.joinChannel({
  channelName: channelName, //必填
  type: type,
  custom: custom, //可选
  sessionConfig: sessionConfig
}).then(obj => {
  // 加入会议成功后的上层逻辑操作
  // eg: 开启摄像头
  // eg: 开启麦克风
  // eg: 开启本地流
  // eg: 设置音量采集、播放
  // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式
})
netcall.joinChannel({
  channelName: channelName,
  type,
  custom: channelCustom,
  sessionConfig: sessionConfig
}).then(obj => {
  // 加入会议成功后的上层逻辑操作
  // eg: 开启摄像头
  // eg: 开启麦克风
  // eg: 开启本地流
  // eg: 设置音量采集、播放
  // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式
  // 下面为示例代码
  console.log('joinChannel', obj)
  if (this.role === 'player') {
    changeRoleToPlayer()
  } else {
    changeRoleToAudience()
  }

  var promise;
  if (obj.type === WebRTC.NETCALL_TYPE_VIDEO) {
    promise = startDeviceVideo()
  } else {
    promise = stopDeviceVideo()
  }
  promise.then(function () {
    setVideoViewSize()
    return startDeviceAudioIn();
  }.bind(this)).then(function () {
    setCaptureVolume()
  }.bind(this)).then(function () {
    addLog("开始webrtc连接")
    return webrtc.startRtc();
  }.bind(this)).then(function () {
    addLog("webrtc连接成功")
    return startDeviceAudioOutChat();
  }.bind(this)).catch(function (e) {
    addLog("连接出错");
    console.error(e);
    hangup()
  }.bind(this))
}, err => {
  console.error('joinChannelErr', err)
})
```
参数解读

```
channelName: 会议id(必填)
type: 通话类型(音频还是视频)
sessionConfig 会话配置，具体请参考API文档
{
  videoQuality 视频分辨率
  videoFrameRate 视频帧率
  highAudio=false 高清语音开关, 默认关闭
}
```
加入会议结果通过promise的then和catch捕捉


##### <span id="WebRTC_离开会议">离开会议</span>

```js
netcall.leaveChannel().then(obj => {
  // 离开会议后的扫尾工作
})
```

##### <span id="WebRTC_改变自己在会议中的角色">改变自己在会议中的角色</span>

```js
// 观众切换到互动者
netcall.changeRoleToPlayer().then(obj => {
  // todo
})

// 互动者切换到观众
netcall.changeRoleToAudience().then(obj => {
  // todo
})
```

### <span id="WebRTC_监听各种信息事件">监听各种信息事件</span>
```js

// 通话过程中，WebRTC连接断开
netcall.on('rtcConnectFailed', event => {
  
})

// 设备列表
netcall.on('devices', (devices) => {
  
})

// 设备列表发生变化
netcall.on('deviceStatus', (devices) => {
  
})

// 发现新设备
netcall.on('deviceAdd', (devices) => {
  
})

// 有设备被移除
netcall.on('deviceRemove', (devices) => {
  
})

// 音量监控
netcall.on('audioVolume', (obj) => {

})

// 有人加入多人会议房间
netcall.on('joinChannel', obj => {

})

// 有人离开多人会议房间
netcall.on('leaveChannel', obj => {

})

```

