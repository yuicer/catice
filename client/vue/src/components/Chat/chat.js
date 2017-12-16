const io = require('socket.io-client')
// var socket = io('http://36.189.253.23:3000')

const chat = {
  init() {
    var me = this
    me.socket = io('http://127.0.0.1:3000')
    me.getUserNumber()
    me.receive()
  },
  vm(vm) {
    this.vm = vm
  },
  conversation: [],
  send(msg) {
    this.socket.emit('chat', msg)
  },
  receive() {
    this.socket.on('chat', function (msg) {
      // console.log(msg)
      msg.time = new Date(msg.time).toLocaleTimeString()
      chat.conversation.push(msg)
      chat.vm.msgScroll()
    })
  },
  addUser(user) {
    this.socket.emit('add user', user)
  },
  getUserNumber() {
    this.socket.on('usernumber', (num) => {
      chat.vm.usernumber = num
    })
  },
}

export default chat
