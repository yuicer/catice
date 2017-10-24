AFRAME.registerSystem('queue', {
  schema: {

  },
  init() {
    var me = this;
    me.position_recording = [];
  },
  add_queue() {
    var me = this;
    me.position_recording.unshift([])
  },
})
AFRAME.registerComponent('queue', {
  schema: {
    ishead: {
      default: false
    },
    distance: {
      default: 3
    },
    speed: {
      default: 1
    },
    frame: {
      default: 200
    },
  },
  init() {
    var me = this;
    if (me.data.ishead)
      me._id = 0;
    else
      me._id = 1;
    // me._id = me.system.position_recording.length;
    me.system.add_queue();
    console.log(me._id)
  },
  tick() {
    var me = this,
      current_position = me.el.getAttribute('position'),
      position_recording = me.system.position_recording[me._id];
    position_recording.push(current_position);
    if (me.data.ishead) {
      return;
    }
    if (me._id == 0) {
      return;
    }

    if (me.system.position_recording[me._id - 1].length > me.data.frame) {
      var target_position = me.system.position_recording[me._id - 1][me.data.frame];
      if (me.distance(current_position, target_position) > me.data.distance) {
        console.log(me.distance(current_position, target_position))
        me.el.setAttribute('position', target_position)
        console.log(current_position)
        alert(1)
        //current_position 出了错
      }
      console.log(me.el.getAttribute('position'), target_position)
    }
    // position_recording.pop();

  },
  distance(target, current) {
    return Math.sqrt(Math.pow((target.x - current.x), 2) + Math.pow((target.y - current.y), 2) + Math.pow((target.z - current.z), 2));
  }
})
