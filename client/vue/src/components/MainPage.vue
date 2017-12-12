<template>
  <div id="box" :style="bg">
    <div id="wrapper">
      <h1>Catice</h1>
      <h2>
        <router-link to="/chat">聊天室</router-link>
      </h2>
      <h2>游戏厅</h2>
      <h3>
        <router-link to="game/slime">打败史莱姆</router-link>
      </h3>
      <h3>
        <router-link to="game/snake">贪吃蛇</router-link>
      </h3>
    </div>
    <canvas></canvas>
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
        }
      }
    },
    mounted() {
      this.bg.backgroundColor = this.color[Math.floor(Math.random() * this.color.length)]
    }
  }
</script>
<style scoped>
  #box {
    width: 100%;
    height: 100%;
  }
  #wrapper {
    position: absolute;
    left: 0;
    width: 320px;
    text-align: center;
    top: 45%;
    left: 50%;
    margin-left: -160px;
    margin-top: -160px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
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
  }
  h3 {
    font-size: 18px;
    margin-left: -5px;
  }
  p {
    font-size: 16px;
    font-weight: lighter;
    line-height: 2em;
    margin: 0;
    letter-spacing: 2px;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  a {
    color: currentColor;
    text-decoration: none;
    font-weight: normal;
    position: relative;
  }
  a::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    right: -30px;
    top: 45%;
    background: currentColor;
    border-radius: 50%;
    transition: all 0.3s;
  }
  a:hover::before {
    right: -10px;
  }
</style>
