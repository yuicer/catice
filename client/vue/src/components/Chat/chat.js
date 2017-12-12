const io = require('socket.io-client')
var socket = io('http://127.0.0.1:3000')
socket.on('chat', function (msg) {
  console.log(msg)
  msg.time = new Date(msg.time).toLocaleTimeString()
  chat.conversation.push(msg)
  // if (chat.vm.nameColor == 'black') {
  //   chat.vm.nameColor = msg.color
  // }
})
const chat = {
  vm(vm) {
    this.vm = vm
  },
  conversation: [],
  send(msg) {
    socket.emit('chat', msg)
  },
  addUser(user) {
    socket.emit('add user', user)
  },
}

export default chat
