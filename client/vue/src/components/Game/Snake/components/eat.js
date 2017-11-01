var features = [
  'speed',
  'power'
];

AFRAME.registerComponent('eat', {
  schema: {
    color: {
      default: '#333'
    }
  },
  init() {
    var me = this;
    me.Collide();
    me.scale = 1;
    me.scale_string = '1 1 1';
    me.el.setAttribute('color', me.data.color)
  },
  AddSnakeTail() {
    var me = this,
      dom = document.createElement('a-box'),
      sky = document.querySelector('#sky'),
      scene = document.querySelector('a-scene');
    dom.setAttribute('visible', false);
    dom.setAttribute('static-body', '');
    dom.setAttribute('queue', '');
    dom.setAttribute('scale', me.scale_string);
    scene.insertBefore(dom, sky);
  },
  Collide() {
    var me = this,
      snake = me.el;
    snake.addEventListener('collide', function (e) {
      var dom = e.detail.body.el,
        feature = dom.components['food'].feature;
      setTimeout(() => {
        if (dom.parentNode) {
          dom.parentNode.removeChild(dom);
          me.GetAbility(feature);
          me.AddSnakeTail();
        }
      }, 0);
    });
  },
  GetAbility(feature) {
    var me = this,
      type = features.indexOf(feature);
    if (type == 0) {
      me.SpeedUp();
    } else if (type == 1)
      me.PowerUp();
  },
  SpeedUp() {
    var me = this;
    me.el.components['move'].data.speed += 1;
    setTimeout(function () {
      me.el.components['move'].data.speed -= .9;
    }, 1000);
  },
  PowerUp() {
    var me = this,
      scene = me.el.sceneEl,
      entities = scene.systems['queue'].entities;
    me.scale += .1;
    me.scale_string = me.scale + ' ' + me.scale + ' ' + me.scale;
    for (var i in entities)
      entities[i].setAttribute('scale', me.scale_string);
  }
})
