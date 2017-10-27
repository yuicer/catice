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
    let _id = scene.systems['queue'].position_recording.length;
    dom.setAttribute('queue', '_id:' + _id);
    scene.insertBefore(dom, sky);
  },
  Collide() {
    var me = this,
      snake = me.el;
    snake.addEventListener('collide', function (e) {
      var dom = e.detail.body.el;
      setTimeout(function () {
        console.log(dom.components['food'].feature)
        // dom.components["dynamic-body"].pause();
        dom.parentNode.removeChild(dom);
        me.AddSnakeTail();
      }, 0);
    });
  }
})
