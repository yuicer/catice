<template>
  <div id="box" :style="bg">
    <div id="wrapper">
      <h1>Catice</h1>
      <h2>游戏厅</h2>
      <h3>
        <a href="http://yuicer.com/slime">【打败史莱姆】(pc)</a>
        <p>最初之作</p>
      </h3>
      <h3>
        <a href="http://yuicer.com/snake">【贪吃蛇】</a>
        <p>吃掉其他方块，加载超慢！</p>
      </h3>
      <h3>
        <a href="http://yuicer.com/maze">【迷宫】(pc)</a>
        <p>养成游戏探索！wasd方向键移动</p>
      </h3>
      <h3>
        <a href="http://yuicer.com/rainbowCat">【彩虹喵飞机大战】(pc)</a>
        <p>wasd移动，空格键设计</p>
      </h3>
      <p>
        <del>
          <router-link to="chat">【聊天室】,没有钱。服务器挂掉辽</router-link>
        </del>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: [
        "#58B2DC",
        "#9E7A7A",
        "#B5495B",
        "#B47157",
        "#7BA23F",
        "#6E75A4",
        "#0C0C0C",
        "#707C74"
      ],
      bg: {
        backgroundColor: "",
        backgroundImage: `url(${require("assets/texture.png")})`
      }
    };
  },
  mounted() {
    this.bg.backgroundColor = this.color[
      Math.floor(Math.random() * this.color.length)
    ];
  },
  methods: {
    loading(index) {
      this.isload.splice(index, 1, true);
      console.log(this.isload);
    }
  }
};
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
