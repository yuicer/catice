AFRAME.registerComponent('produce_food', {
  schema: {
    interval: {
      default: 3000
    }
  },
  init() {
    var me = this,
      scene = document.querySelector("a-scene");
    me.timer = setInterval(() => {
      var dom = document.createElement("a-box");
      dom.setAttribute("food", "");
      scene.appendChild(dom);
    }, me.data.interval);
  },
  remove() {
    var me = this;
    clearInterval(me.timer);
  }
})
