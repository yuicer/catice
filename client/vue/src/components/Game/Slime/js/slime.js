import game from './game'
import yuusya from './yuusya'
import img from './img'
var slime = {
    canvas: {},
    ctx: {},
    x: 315,
    y: 100,
    width: 170,
    height: 120,
    frame: 0,
    frame_hurt: 0,
    hp: 10,
    hurted: false,
    died: false,
    speed: 1,
    assault: false,
    assault_step: 0,
    assault_random_step: 0,
    assaultX: 0,
    assaultY: 0,

    init: function () {
        var me = slime;
        me.ctx = game.ctx;
        me.x = 315;
        me.y = 100;
        me.width = 170;
        me.height = 120;
        me.frame = 0;
        me.frame_hurt = 0;
        me.hp = 10;
        me.hurted = false;
        me.died = false;
        me.speed = 1;
        me.assault = false;
        me.assault_step = 0;
        me.assault_random_step = 0;
        me.assaultX = 0;
        me.assaultY = 0;
    },
    draw: function () {
        var me = slime;
        me.is_hurt();
        me.is_assault();
        if (me.hp == 0) {
            me.draw_die();
        } else {

            if (me.hurted)
                me.draw_hurted_slime();
            else if (me.assault)
                me.draw_slime_assault();
            else
                me.draw_slime();
        }
    },
    draw_slime: function () {
        var me = slime,
            dx = yuusya.x - slime.x - slime.width / 2 + yuusya.width / 2,
            dy = yuusya.y - slime.y - slime.height / 2 + yuusya.height / 2,
            s = Math.sqrt(dx * dx + dy * dy);


        me.x += dx / s * me.speed;
        me.y += dy / s * me.speed;

        if (me.frame < 10)
            me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height);
        else if (me.frame < 20)
            me.ctx.drawImage(img.slime_4, me.x, me.y, me.width, me.height);
        else if (me.frame < 30)
            me.ctx.drawImage(img.slime_5, me.x, me.y, me.width, me.height);
        else if (me.frame < 40)
            me.ctx.drawImage(img.slime_4, me.x, me.y, me.width, me.height);
        else if (me.frame < 50)
            me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height);
        else if (me.frame < 60)
            me.ctx.drawImage(img.slime_2, me.x, me.y, me.width, me.height);
        else if (me.frame < 70)
            me.ctx.drawImage(img.slime_1, me.x, me.y, me.width, me.height);
        else if (me.frame < 80)
            me.ctx.drawImage(img.slime_2, me.x, me.y, me.width, me.height);


        me.frame = (me.frame + 1) % 80;
    },

    draw_slime_assault: function () {
        var me = slime,
            dx = me.assaultX - me.x - me.width / 2 + yuusya.width / 2,
            dy = me.assaultY - me.y - me.height / 2 + yuusya.height / 2,
            s = Math.sqrt(dx * dx + dy * dy);

        if (me.assault_step <= 70) {
            if (me.frame < 10)
                me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height)
            else if (me.frame < 20)
                me.ctx.drawImage(img.slime_4, me.x, me.y, me.width, me.height)
            else if (me.frame < 30)
                me.ctx.drawImage(img.slime_5, me.x, me.y, me.width, me.height)
            else if (me.frame < 40)
                me.ctx.drawImage(img.slime_4, me.x, me.y, me.width, me.height)
            else if (me.frame < 50)
                me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height)
            else if (me.frame < 60)
                me.ctx.drawImage(img.slime_2, me.x, me.y, me.width, me.height)
            else if (me.frame < 70)
                me.ctx.drawImage(img.slime_1, me.x, me.y, me.width, me.height)
            else if (me.frame < 80)
                me.ctx.drawImage(img.slime_2, me.x, me.y, me.width, me.height)

            me.frame = (me.frame + 1) % 80;

        } else if (me.assault_step > 70) {

            me.x += dx / s * me.speed * 5;
            me.y += dy / s * me.speed * 5;


            me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height);
        }
        me.assault_step++;

        if (dx < me.speed * 5 && dy < me.speed * 5) {
            me.assault = false;
            me.assault_step = (10 - me.hp) * 5;
            me.frame = 0;
        }

    },
    //采用加上随机数，同时受伤后增加技能触发概率
    is_assault: function () {
        var me = slime,
            random = Math.random() * 10000;
        if (!me.assault) {
            if (me.assault_random_step * 20 + random > 10000) {
                me.assaultX = yuusya.x;
                me.assaultY = yuusya.y;
                me.frame = 0;
                me.assault = true;

            }
        }

    },

    draw_hurted_slime: function () {
        var me = slime;
        if (me.frame_hurt < 6)
            me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 12)
            me.ctx.drawImage(img.hurt_1, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 42)
            me.ctx.drawImage(img.hurt_2, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 48)
            me.ctx.drawImage(img.hurt_1, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 54) {
            me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height);
            me.frame = 0;
            me.frame_hurt = 0;
            me.hurted = false;
        }
        me.frame_hurt++;
    },
    is_hurt: function () {
        var me = slime;
        //攻击被反弹
        if (yuusya.arrowX > me.x + 40 && yuusya.arrowX < me.x + me.width - 40 && yuusya.arrowY > me.y && yuusya.arrowY < me.y + me.height - 20 && !me.hurted && yuusya.arrow_state == 0) {
            yuusya.is_arrow_rebound = true;
            yuusya.arrow_rebound_angle = (Math.random() - 0.5) * Math.PI / 2;
        }
        //攻击有效，（背后攻击）hp--
        if (yuusya.arrowX > me.x + 40 && yuusya.arrowX < me.x + me.width - 40 && yuusya.arrowY > me.y && yuusya.arrowY < me.y + me.height - 20 && !me.hurted && yuusya.arrow_state == 1) {
            me.hp--;
            me.hurted = true;
            me.speed += 0.3;
            me.assault_step += 5;
            me.assault_random_step++;
        }


    },

    draw_die: function () {
        var me = slime;
        if (me.frame_hurt < 8)
            me.ctx.drawImage(img.slime_3, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 16)
            me.ctx.drawImage(img.hurt_1, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 46)
            me.ctx.drawImage(img.hurt_2, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 56)
            me.ctx.drawImage(img.die_1, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 66)
            me.ctx.drawImage(img.die_2, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 76)
            me.ctx.drawImage(img.die_3, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt < 86)
            me.ctx.drawImage(img.die_4, me.x, me.y, me.width, me.height);
        else if (me.frame_hurt > 85) {
            me.ctx.drawImage(img.die_5, me.x, me.y, me.width, me.height);
            me.died = true;
        }
        if (me.frame_hurt > 150) {
            game.gameover = true;
            game.win = true;
        }

        me.frame_hurt++;
    },
}
export default slime;
