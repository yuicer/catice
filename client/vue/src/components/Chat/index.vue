<template>
  <div id="bg" :style="bg">
    <div id="login" v-if="!islogin">
      <input type="text" placeholder="login with your name" @keyup.enter="login" v-model.lazy="name">
    </div>
    <div id="room" v-else>
      <div id="left"></div>
      <div id="right">

        <div id="head">
          聊天室
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
          <div contenteditable="true" @change="submit" class="editor">
            <p></p>
          </div>
          <!-- <input type="text" @change="submit" v-model="msg"> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import chat from './chat.js'
  import color from './color.js'
  export default {
    data() {
      return {
        msg: '',
        conversation: chat.conversation,
        bg: {
          backgroundColor: color.bgcolor.rgb,
          backgroundImage: 'url(require("assets/texture.png"))'
        },
        nameColor: 'black',
        name: '',
        islogin: false,
      }
    },
    mounted() {
      chat.vm(this)
    },
    methods: {
      test() {
        var me = this
        setInterval(() => {
          console.log(me.nameColor, chat.nameColor)
        }, 1000)
      },
      login() {
        chat.addUser(this.name)
        this.islogin = true
      },
      submit() {
        chat.send(this.msg)
        this.msg = ''
      }
    }

  }
</script>
<style scoped>
  .editor {
    position: absolute;
    bottom: 0;
    height: 40px;
    cursor: text;
    width: 80%;
    left: 10%;
    border: 2px solid rgba(160, 160, 162, 0.7);
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
    transition: all 0.3s;
    margin: 20px 0;
  }

  #body {
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 800px;
    height: calc(100% - 50px);
  }
  #head {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
  }
  #right {
    height: 100%;
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
  }
  #bg {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-corner {
    background: #fff;
  }
  ::-webkit-scrollbar-track {
    background: #f3f3f3;
    box-shadow: inset 0 -4px 0 0, inset 0 4px 0 0;
    color: #fff;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: #d9d9de;
    box-shadow: inset 0 -2px, inset 0 -3px, inset 0 2px, inset 0 3px;
    min-height: 36px;
    border-radius: 3px;
    color: #fff;
  }
</style>
