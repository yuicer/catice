<template>
  <div id="box" :style="bg">
    <div id="wrapper">
      <h1>Catice</h1>
      <h2 @click="loading(0)">
        <router-link to="chat">【聊天室】</router-link>
        <i v-if="isload[0]" class="loading fas fa-spinner fa-spin"></i>
      </h2>
      <h2>游戏厅</h2>
      <h3 @click="loading(1)">
        <a href="http://yuicer.com/slime">【打败史莱姆】(pc)</a>
        <p>稍微好那么一点点的游戏。</p>
        <i v-if="isload[1]" class="loading fas fa-spinner fa-spin"></i>
      </h3>
      <h3 @click="loading(2)">
        <a href="http://yuicer.com/snake">【贪吃蛇】</a>
        <p>吃掉其他方块的无聊游戏，加载还超慢！摔</p>
        <i v-if="isload[2]" class="loading fas fa-spinner fa-spin"></i>
      </h3>
      <h3 @click="loading(3)">
        <a href="http://yuicer.com/maze">【迷宫】(pc)</a>
        <p>浪费你的1分钟时间！wasd方向键移动</p>
        <i v-if="isload[3]" class="loading fas fa-spinner fa-spin"></i>
      </h3>
      <p v-if="isload[1]||isload[2]||isload[3]">正在全力加载！loading...</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        color: ['#58B2DC', '#9E7A7A', '#B5495B', '#B47157', '#7BA23F', '#6E75A4', '#0C0C0C', '#707C74'],
        bg: {
          backgroundColor: '',
          backgroundImage: 'url(require("assets/texture.png"))'
        },
        isload: [false, false, false]
      }
    },
    mounted() {
      this.bg.backgroundColor = this.color[Math.floor(Math.random() * this.color.length)]
    },
    methods: {
      loading(index) {
        this.isload.splice(index, 1, true)
        console.log(this.isload)
      }
    }
  }
</script>
<style scoped>
  .loading {
    position: absolute;
    right: 30px;
    top: 20%;
    color: #fff;
    font-size: inherit;
  }
  #box {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 100%;
    height: 100%;
    min-height: 600px;
    min-width: 375px;
  }
  #wrapper {
    position: absolute;
    left: 0;
    width: 320px;
    text-align: center;
    left: 50%;
    top: 30%;
    transform: translate3d(-50%, -30%, 0);
    /* margin-left: -160px; */
    /* margin-top: -160px; */

    color: #fff;
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  }

  h1 {
    font-weight: bold;
    font-size: 36px;
    letter-spacing: 0.8em;
    text-transform: uppercase;
    margin-bottom: 50px;
    margin-left: 20px;
  }

  h2 {
    font-weight: normal;
    font-size: 26px;
    letter-spacing: 1em;
    margin-bottom: 30px;
    margin-left: 20px;
    position: relative;
  }
  h3 > p {
    font-size: 15px;
  }
  h3 {
    font-size: 18px;
    margin-left: -5px;
    position: relative;
    letter-spacing: 2px;
  }
  p {
    font-size: 16px;
    font-weight: lighter;
    line-height: 2em;
    margin: 0;
    letter-spacing: 2px;
  }

  a {
    color: currentColor;
    text-decoration: none;
    font-weight: normal;
    position: relative;
  }
</style>
