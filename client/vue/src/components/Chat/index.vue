<template>
  <div id="bg" :style="bg">
    <div id="login" v-if="!islogin">
      <input type="text" spellcheck="false" placeholder="login with your name" @keyup.enter="login" v-model.lazy="myname">
    </div>
    <div id="room" v-else>
      <div id="left"></div>
      <div id="right">
        <div id="head">
          <div id="roomname">
            <i class="fas fa-home"></i>
            <span>聊天室</span>
          </div>
          <div id="usernumber">
            <i class="fas fa-user"></i>
            <span>{{usernumber}}</span>
          </div>
        </div>
        <div id="body">

          <div class="msg" v-for="(item,index) in conversation" :key="index">
            <div v-if="item.type==='info'" class="info">{{item.msg}}</div>
            <div v-else>
              <div class="name" :style="{color:item.color}">{{item.name}}</div>
              <div class="time">{{item.time}}</div>
              <div class="word">{{item.msg}}</div>
            </div>
          </div>

        </div>
        <div id="foot">
          <div contenteditable="true" tabindex="0" spellcheck="false" @keydown.enter.exact.prevent="submit($event)" class="editor"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import chat from './chat.js'
  import color from './color.js'
  require('static/fontawesome-all.min.js')
  export default {
    data() {
      return {
        chatBodyHeight: '',
        chatBodyNoScrollHeight: 200,
        usernumber: 0,
        msg: '',
        conversation: chat.conversation,
        bg: {
          backgroundColor: color.bgcolor.rgb,
          backgroundImage: 'url(' + require('assets/texture.png') + ')'
        },
        nameColor: 'black',
        myname: '',
        islogin: false
      }
    },
    mounted() {
      chat.vm(this)
    },
    methods: {
      test() {

      },
      login() {
        var me = this
        me.islogin = true
        chat.init()
        chat.AddUser(me.myname)
        setTimeout(() => {
          me.chatBodyHeight = window.getComputedStyle(document.querySelector('#body')).height.slice(0, -2)
        }, 0)
      },
      submit(e) {
        e.preventDefault()
        var msg = e.target.innerText
        if (msg == '') {
          return
        }
        chat.Send(msg)
        e.target.innerText = ''
      },
      msgScroll() {
        var me = this
        var dom = document.querySelector('#body')
        if (dom.scrollHeight - dom.scrollTop - me.chatBodyHeight - me.chatBodyNoScrollHeight < 0) {
          var speed = 15
          var timer = setInterval(() => {
            var oldTop = dom.scrollTop
            dom.scrollTop += speed
            if (dom.scrollTop == oldTop) {
              clearInterval(timer)
            }
          }, 16)
        }
      }
    }

  }
</script>
<style scoped>
  .editor {
    padding: 5px 10px;
    line-height: 1.5;
    cursor: text;
    outline: 0;
    max-height: 200px;
    overflow-y: auto;
    width: 80%;
    margin: 0 auto;
    border-radius: 3px;
    border: 2px solid rgba(160, 160, 162, 0.7);
    background: #fff;
    font-size: 16px;
    -webkit-user-modify: read-write-plaintext-only;
    position: absolute;
    left: 7%;
    bottom: 0;
  }
  #foot {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    position: relative;
    /* height: ; */
  }
  .info {
    color: #aaa;
    font-size: 14px;
  }
  .word {
    margin-top: 5px;
    margin-left: 10px;
  }
  .name,
  .time {
    display: inline-block;
  }
  .name {
    margin-right: 15px;
    font-weight: bold;
  }
  .time {
    font-size: 15px;
    color: #999;
  }
  .msg {
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    animation: msg 0.3s;
    transition: all 0.3s;
    margin: 20px 0;
  }

  #body {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 90px);
  }
  #roomname {
    float: left;
    font-weight: bold;
  }
  #usernumber {
    float: right;
    color: #717274;
    font-size: 16px;
  }
  #head {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
  }
  #right {
    height: 100%;
    position: relative;
  }
  #room {
    border-radius: 3px;
    margin: 0 auto;
    position: relative;
    top: 2%;
    height: 96%;
    max-width: 900px;
    box-sizing: border-box;
    padding: 20px;
    font-size: 18px;
    font-family: PingFang SC, Microsoft YaHei, NotoSansJP, Slack-Lato, appleLogo,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    background: rgba(255, 255, 255, 0.85);
    color: #2c2d30;
  }
  #login {
    width: 500px;
    height: 100px;
    line-height: 0;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 35%;
    /* margin-top: -100px; */
    text-align: center;
  }
  ::placeholder {
    color: #a6a6a6;
    font-size: 14px;
    font-family: Arial, "microsoft yahei", Helvetica, sans-serif;
  }
  #login > input {
    border-radius: 3px;
    font-size: 18px;
    color: #4c4c4c;
    height: 40px;
    width: 300px;
    border: none;
    letter-spacing: 3px;
    padding-left: 20px;
    outline: 0;
  }
  #bg {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9de;
    min-height: 36px;
    border-radius: 3px;
  }
  @keyframes msg {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
