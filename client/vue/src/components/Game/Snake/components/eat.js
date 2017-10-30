AFRAME.registerComponent('eat', {
  schema: {
    color: {
      default: '#333'
    }
  },
  init() {
    var me = this;
    me.Collide();
    me.el.setAttribute('color', me.data.color)
  },
  AddSnakeTail() {
    var dom = document.createElement('a-box'),
      sky = document.querySelector('#sky'),
      scene = document.querySelector('a-scene');
    dom.setAttribute('visible', false);
    dom.setAttribute('static-body', '');
    dom.setAttribute('queue', '')
    scene.insertBefore(dom, sky);
  },
  Collide() {
    var me = this,
      snake = me.el;
    snake.addEventListener('collide', function (e) {
      var dom = e.detail.body.el;
      console.log(dom.components['food'].feature)
      setTimeout(function () {
        if (dom.parentNode) {
          dom.parentNode.removeChild(dom);
          me.AddSnakeTail();
        }
      }, 0);
    });
  },
  SpeedUp() {

  },
})
