import img from './img.js'
import slime from './slime.js'
import yuusya from './yuusya.js'
var game = {
  ctx: {},
  timer: 0,
  gameover: false,
  win: false,
  frame: 0,
  rAF: {}, //用来cancelAnimationFrame(globalID);取消循环动画
  bg_img: {},
  canvas: {},
  init: function () {
    var me = game;
    me.canvas = document.getElementById("canvas");
    // me.canvas.height = document.documentElement.clientHeight;
    // me.canvas.width = document.documentElement.clientWidth;
    me.ctx = me.canvas.getContext("2d");
    me.timer = 0;
    me.gameover = false;
    me.win = false;
    me.frame = 0;
    me.rAF = {};
    me.game_start();

  },
  //这里当图片全部加载完成后开始绘制;
  loop: function () {

    var me = game;
    if (img.complete()) {
      if (!me.gameover) {
        me.bg_draw();

        yuusya.draw();
        slime.draw();
      } else {
        me.game_over();
      }
    }

    me.rAF = window.requestAnimationFrame(me.loop);
  },

  bg_draw: function () {
    var me = game;

    me.ctx.drawImage(img.bg, 0, 0, 1000, 800);

  },
  game_start: function () {
    var me = game,
      start_img = new Image(),
      game_intro = document.getElementById("game_intro");

    //游戏开始前背景图片
    var test = require("../game_img/start_bg.png")
    start_img.src = test;
    //        start_img.src = "../game_img/start_bg.png";
    start_img.onload = function () {
      me.ctx.drawImage(start_img, 0, 0, 1000, 800);
    }

    //这里添加一个点击事件用来获取canvas焦点，但是为了和后面游戏的控制分开，所以用event事件,主要用来初始化
    function a() {
      me.canvas.removeEventListener("click", a);

      //隐藏游戏说明
      game_intro.style.display = "none";
      img.init();
      yuusya.init();
      slime.init();

      me.loop();
    }
    me.canvas.addEventListener("click", a);
  },
  game_over: function () {
    var me = game;
    var rgba_a = 0;
    me.ctx.font = "70px Verdana";

    if (me.frame < 10)
      rgba_a = 0.1;
    else if (me.frame < 20)
      rgba_a = 0.3;
    else if (me.frame < 30)
      rgba_a = 0.5;
    else if (me.frame < 40)
      rgba_a = 0.7;
    else if (me.frame > 39)
      rgba_a = 0.9;


    me.ctx.fillStyle = "rgba(100,100,100," + rgba_a + ")";
    me.ctx.fillRect(0, 0, 1000, 800);
    me.ctx.fillStyle = "rgba(255,255,255," + rgba_a + ")";
    if (me.win) {
      me.ctx.fillText("You Win", 370, 350);
    } else
      me.ctx.fillText("Over", 420, 350);

    me.ctx.lineCap = "round"
    me.ctx.lineWidth = 2;
    me.ctx.beginPath();

    me.ctx.stroke();
    if (me.frame == 59) {
      function b() {
        window.cancelAnimationFrame(me.rAF);
      }
      setTimeout(b, 1000)
    }
    me.frame++;
  },
}
export default game;
