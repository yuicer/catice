AFRAME.registerSystem('queue', {
  schema: {

  },
  init() {
    var me = this;
    me.position = [];
  },
  add_queue() {
    var me = this;
    me.position.unshift({})
  },
})
AFRAME.registerComponent('queue', {
  schema: {
    head: {
      default: false
    },
    speed: {
      default: 1
    },
    frame: {
      default: 100
    },
  },
  init() {
    var me = this;
    me._id = me.system.position.length;
    me.system.add_queue()
  },
  tick() {
    var me = this,
      current_position = me.el.getAttribute('position'),
      old_position = me.system.position[me._id][me.data.frame]
    if (current_position, old_position)
      return
    else
      current_position = old_position;
  },
  distance() {

  }
})
