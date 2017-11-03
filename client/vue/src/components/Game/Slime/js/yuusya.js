import game from './game'
import slime from './slime'
import img from './img'
var KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD'
];

function isEmptyObject(keys) {
  var key;
  for (key in keys) {
    return false;
  }
  return true;
}

var yuusya = {
  //勇者宽度
  died: false,
  width: 35,
  height: 75,
  //勇者左上位置 
  x: 400,
  y: 500,
  speed: 2,
  //鼠标位置
  mouseX: 0,
  mouseY: 0,
  arrowX: 0,
  arrowY: 0,
  arrow_width: 16,
  arrow_height: 30,
  arrow_angle: 0,
  arrow_speed: 7,
  is_arrow_rebound: false,
  arrow_rebound_angle: 0,
  arrow_rebound_step: 0,
  ctx: {},
  canvas: {},
  //勇者的动作
  keys: {},
  pre_action: "KeyW",
  frame: 0,
  frame_arrow: 0,
  //-1的时在手上,0的时候魔法箭正在发射，100的时候停在外面，1的时候正在回来,200被反弹.
  arrow_state: -1,
  init: function () {
    var me = yuusya;
    me.canvas = document.getElementById("canvas");
    me.ctx = game.ctx;
    me.died = false;
    me.width = 35;
    me.height = 75;
    //勇者左上位置 
    me.x = 400;
    me.y = 500;
    me.speed = 2;
    //鼠标位置
    me.mouseX = 0;
    me.mouseY = 0;
    me.arrowX = 0;
    me.arrowY = 0;
    me.arrow_width = 16;
    me.arrow_height = 30;
    me.arrow_angle = 0;
    me.arrow_speed = 7;
    me.is_arrow_rebound = false;
    me.arrow_rebound_angle = 0;
    me.arrow_rebound_step = 0;
    me.frame = 0;
    me.frame_arrow = 0;
    //-1的时在手上;0的时候魔法箭正在发射，100的时候停在外面，1的时候正在回来,200被反弹.
    me.arrow_state = -1;

    me.move();
    me.mouse();
    //刚开始箭带在身上
  },
  draw: function () {
    var me = yuusya;
    me.is_die();

    if (!me.died) {
      if (me.is_arrow_rebound)
        me.draw_arrow_rebound();
      else
        me.draw_arrow();
      me.draw_yuusya();
    }
  },
  draw_yuusya: function () {
    var me = yuusya,
      keys = me.keys,
      old_position = {
        x: me.x,
        y: me.y
      };
    //不动，pre_action
    if (isEmptyObject(keys)) {
      if (me.pre_action == KEYS[0]) {
        me.ctx.drawImage(img.up_1, me.x, me.y, me.width, me.height)
      } else if (me.pre_action == KEYS[2]) {
        me.ctx.drawImage(img.down_1, me.x, me.y, me.width, me.height)
      } else if (me.pre_action == KEYS[1]) {
        me.ctx.drawImage(img.left_1, me.x, me.y, me.width, me.height)
      } else if (me.pre_action == KEYS[3]) {
        me.ctx.drawImage(img.right_1, me.x, me.y, me.width, me.height)
      }
    } else {
      if (keys.KeyW) {
        if (me.y > 70)
          me.y -= me.speed;
      }
      if (keys.KeyS) {
        if (me.y < 800 - me.height)
          me.y += me.speed;
      }
      if (keys.KeyA) {
        if (me.x > 0)
          me.x -= me.speed;
      }
      if (keys.KeyD) {
        if (me.x < 1000 - me.width)
          me.x += me.speed;
      }

      if (me.y < old_position.y) {
        me.draw_yuusya_img('up');
        me.pre_action = me.keys.KeyW;
      } else if (me.y > old_position.y) {
        me.draw_yuusya_img('down');
        me.pre_action = me.keys.KeyS;
      } else {
        if (me.x < old_position.x) {
          me.draw_yuusya_img('left');
          me.pre_action = me.keys.KeyA;
        } else if (me.x > old_position.x) {
          me.draw_yuusya_img('right');
          me.pre_action = me.keys.KeyD;
        } else {
          if (me.pre_action == KEYS[0]) {
            me.ctx.drawImage(img.up_1, me.x, me.y, me.width, me.height)
          } else if (me.pre_action == KEYS[2]) {
            me.ctx.drawImage(img.down_1, me.x, me.y, me.width, me.height)
          } else if (me.pre_action == KEYS[1]) {
            me.ctx.drawImage(img.left_1, me.x, me.y, me.width, me.height)
          } else if (me.pre_action == KEYS[3]) {
            me.ctx.drawImage(img.right_1, me.x, me.y, me.width, me.height)
          }
        }
      }
    }
    me.frame = (me.frame + 1) % 32;
  },
  draw_yuusya_img: function (string) {
    var me = this;
    if (me.frame < 6)
      me.ctx.drawImage(img[string + '_1'], me.x, me.y, me.width, me.height);
    else if (me.frame < 16)
      me.ctx.drawImage(img[string + '_2'], me.x, me.y, me.width, me.height);
    else if (me.frame < 22)
      me.ctx.drawImage(img[string + '_3'], me.x, me.y, me.width, me.height);
    else if (me.frame < 32)
      me.ctx.drawImage(img[string + '_4'], me.x, me.y, me.width, me.height);
  },
  draw_arrow: function () {
    var me = this;
    //冰锥未发射
    if (me.arrow_state == -1) {
      me.arrowX = me.x + me.arrow_width / 2;
      me.arrowY = me.y;
    }
    //冰锥在手上，向鼠标点击的地方发射
    else if (me.arrow_state == 0) {
      var dx = me.mouseX - me.arrowX,
        dy = me.mouseY - me.arrowY,
        s = Math.sqrt(dx * dx + dy * dy);

      me.arrow_angle = Math.atan2(dy, dx) - Math.PI / 2 - Math.PI;

      me.arrowX += dx / s * me.arrow_speed;
      me.arrowY += dy / s * me.arrow_speed;
      //设置精度,只检查x就好，这里设置精度为10和arrow_speed一样，避免造成不能准确定位
      //没有考虑在移动过程中会不断逼近这个进度，导致错误发生
      if (me.arrowX < me.mouseX + me.arrow_speed / 2 && me.arrowX > me.mouseX - me.arrow_speed / 2 && me.arrowY < me.mouseY + me.arrow_speed / 2 && me.arrowY > me.mouseY - me.arrow_speed / 2)
        me.arrow_state = 100;

      me.ctx.save();
      me.ctx.translate(me.arrowX + me.arrow_width / 2, me.arrowY + me.arrow_height / 2);
      me.ctx.rotate(me.arrow_angle);
      if (me.frame_arrow < 10)
        me.ctx.drawImage(img.icicle_1, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
      else if (me.frame_arrow < 20)
        me.ctx.drawImage(img.icicle_2, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
      me.ctx.restore();

      me.frame_arrow = (me.frame_arrow + 1) % 20;
    }
    //冰锥在外面，向按下f时勇者位置移动
    else if (me.arrow_state == 1) {
      var dx = me.x + me.arrow_width / 2 - me.arrowX,
        dy = me.y - me.arrowY,
        s = Math.sqrt(dx * dx + dy * dy);

      me.arrow_angle = Math.atan2(dy, dx) - Math.PI / 2 - Math.PI;

      me.arrowX += dx / s * me.arrow_speed;
      me.arrowY += dy / s * me.arrow_speed;

      //设置精度,只检查x就好，这里设置精度为6和me.arrow_speed一样，避免造成不能准确定位
      if (me.arrowX < (me.x + me.arrow_width / 2 + me.arrow_speed / 2) && me.arrowX > (me.x + me.arrow_width / 2 - me.arrow_speed / 2) && me.arrowY < (me.y + me.arrow_speed / 2) && me.arrowY > (me.y - me.arrow_speed / 2))
        me.arrow_state = -1;

      me.ctx.save();
      me.ctx.translate(me.arrowX + me.arrow_width / 2, me.arrowY + me.arrow_height / 2);
      me.ctx.rotate(me.arrow_angle);
      if (me.frame_arrow < 10)
        me.ctx.drawImage(img.icicle_1, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
      else if (me.frame_arrow < 20)
        me.ctx.drawImage(img.icicle_2, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
      me.ctx.restore();

      me.frame_arrow = (me.frame_arrow + 1) % 20;
    } else //冰锥在外面停留
    {
      me.ctx.save();
      me.ctx.translate(me.arrowX + me.arrow_width / 2, me.arrowY + me.arrow_height / 2);
      me.ctx.rotate(me.arrow_angle);
      me.ctx.drawImage(img.icicle_1, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
      me.ctx.restore();
    }
  },
  draw_arrow_rebound: function () {
    var me = this;
    me.arrow_state = 200;

    me.arrowX -= Math.cos(me.arrow_angle + me.arrow_rebound_angle - Math.PI / 2) * me.arrow_speed;
    me.arrowY -= Math.sin(me.arrow_angle + me.arrow_rebound_angle - Math.PI / 2) * me.arrow_speed;

    me.ctx.save();
    me.ctx.translate(me.arrowX + me.arrow_width / 2, me.arrowY + me.arrow_height / 2);
    me.ctx.rotate(me.arrow_angle + me.arrow_rebound_angle - Math.PI);
    if (me.frame_arrow < 10)
      me.ctx.drawImage(img.icicle_1, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
    else if (me.frame_arrow < 20)
      me.ctx.drawImage(img.icicle_2, 0 - me.arrow_width / 2, 0 - me.arrow_height / 2, me.arrow_width, me.arrow_height);
    me.ctx.restore();

    me.frame_arrow = (me.frame_arrow + 1) % 20;
    me.arrow_rebound_step++;
    if (me.arrow_rebound_step > 20) {
      me.arrow_rebound_step = 0;
      me.arrow_state = 100;
      me.is_arrow_rebound = false;
      me.arrow_angle = me.arrow_angle + me.arrow_rebound_angle - Math.PI;
    }
  },
  is_die: function () {
    var me = this;
    if (me.x > slime.x + 40 && me.x < slime.x + slime.width - 40 && me.y > slime.y && me.y + me.height < slime.y + slime.height) {
      me.died = true;
      game.gameover = true;
    }
  },
  //键盘移动
  move: function () {
    var me = this;
    me.canvas.onkeydown = function (e) {
      var code = event.code;
      if (KEYS.indexOf(code) !== -1) {
        me.keys[code] = code;
      }
    }
    me.canvas.onkeyup = function (e) {
      var code = event.code;
      delete me.keys[code];
    }
  },
  mouse: function () {
    var me = yuusya;
    me.canvas.addEventListener("click", function (e) {
      //
      if (me.arrow_state == -1 || me.arrow_state == 100) {
        if (e.offsetX > 1000 - me.arrow_width)
          me.mouseX = 1000 - me.arrow_width
        else
          me.mouseX = e.offsetX;

        if (e.offsetY < 100) //场景上边门的高度 
          me.mouseY = 100;
        else if (e.offsetY > 800 - me.arrow_height)
          me.mouseY = 800 - me.arrow_height;
        else
          me.mouseY = e.offsetY;

        //因为有旋转的原因，导致冰锥并不能准确的定位到鼠标的位置，所以这里修改下
        me.mouseY -= me.arrow_height / 2;
        //鼠标点击控制收回和放出
        if (me.arrow_state == -1 && !me.died)
          me.arrow_state = 0;
        if (me.arrow_state == 100 && !me.died)
          me.arrow_state = 1;
      }
    });
  },
}
export default yuusya;
