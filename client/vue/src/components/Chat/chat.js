const io = require('socket.io-client')
var socket = io('http://36.189.253.23:3000')
socket.on('chat', function (msg) {
  // console.log(msg)
  msg.time = new Date(msg.time).toLocaleTimeString()
  chat.conversation.push(msg)
  chat.vm.msgScroll()
})
socket.on('usernumber', (num) => {
  chat.vm.usernumber = num
  console.log(num)
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
