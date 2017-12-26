const io = require('socket.io-client')

const chat = {
  init() {
    var me = this
    // me.socket = io('http://36.189.253.23:3000')
    me.socket = io('http://127.0.0.1:3000')
    me.GetUserNumber()
    me.Receive()
    me.Reconnect()
  },
  vm(vm) {
    this.vm = vm
  },
  conversation: [],
  Send(msg) {
    this.socket.emit('chat', msg)
  },
  Receive() {
    this.socket.on('chat', function (msg) {
      // console.log(msg)
      msg.time = new Date(msg.time).toLocaleTimeString()
      chat.conversation.push(msg)
      chat.vm.msgScroll()
    })
  },
  AddUser(username) {
    this.socket.emit('add user', username)
    this.username = username
  },
  GetUserNumber() {
    this.socket.on('usernumber', (num) => {
      chat.vm.usernumber = num
    })
  },
  Reconnect() {
    this.socket.on('reconnect', () => {
      this.AddUser(this.username)
      console.log(1)
    })
  }
}

export default chat
