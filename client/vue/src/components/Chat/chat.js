const io = require('socket.io-client')

const chat = {
  init() {
    var me = this
    me.socket = io('http://36.189.253.23:3000')
    // me.socket = io('http://127.0.0.1:3000')
    me.GetUserNumber()
    me.Receive()
  },
  vm(vm) {
    this.vm = vm
  },
  conversation: [],
  Send(msg, userInfo) {
    this.socket.emit('chat', msg, userInfo)
  },
  Receive() {
    this.socket.on('chat', function (msg) {
      msg.time = new Date(msg.time).toLocaleTimeString()
      chat.conversation.push(msg)
      chat.vm.msgScroll()
    })
  },
  AddUser(userInfo) {
    this.socket.emit('add user', userInfo)
  },
  GetUserNumber() {
    this.socket.on('usernumber', (num) => {
      chat.vm.usernumber = num
    })
  },
  Reconnect() {
    this.socket.on('reconnect', function () {
      if (chat.vm.userInfo) {
        this.AddUser(chat.vm.userInfo)
      }
    })
  }
}

export default chat
