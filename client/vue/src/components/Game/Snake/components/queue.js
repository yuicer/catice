AFRAME.registerSystem('queue', {
  init() {
    var me = this;
    me.position_recording = [];
    me.rotation_recording = [];
    me.entities = [];
  },
  add_queue(el) {
    var me = this;
    me.position_recording.push([]);
    me.rotation_recording.push([]);
    me.entities.push(el);
  },
})
AFRAME.registerComponent('queue', {
  schema: {
    ishead: {
      default: false
    },
    distance: {
      default: 1.2
    },
    frame: {
      default: 50
    }
  },
  init() {
    var me = this,
      current_position = {},
      current_rotation = {};
    //设置id
    me._id = me.system.position_recording.length;
    me.system.add_queue(me.el);
    //设置初始位置
    if (me.data.ishead) {
      me.Copy(me.el.getAttribute('position'), current_position);
      me.Copy(me.el.getAttribute('rotation'), current_rotation);
    } else {
      current_position = me.system.position_recording[me._id - 1][0];
      current_rotation = me.system.rotation_recording[me._id - 1][0];
      me.el.setAttribute('position', current_position);
      me.el.setAttribute('rotation', current_rotation);
      this.el.setAttribute('visible', true)
    }
    me.system.position_recording[me._id].unshift(current_position);
    me.system.rotation_recording[me._id].unshift(current_rotation);
  },
  tick() {
    var me = this;

    if (me.data.ishead) {
      me.DeduplicationStore();
      return;
    }
    if (me.system.position_recording[me._id - 1].length > me.data.frame) {
      var target_position = me.system.position_recording[me._id - 1][me.data.frame],
        last_current_position = me.system.position_recording[me._id - 1][0],
        target_rotation = me.system.rotation_recording[me._id - 1][me.data.frame];
      if (me.Distance(last_current_position, target_position)) {
        me.el.setAttribute('position', target_position);
        me.el.setAttribute('rotation', target_rotation);
        me.DeduplicationStore();
      }
    }
  },
  Distance(target, current) {
    var flag = false,
      result = 0;
    result = Math.sqrt(Math.pow((target.x - current.x), 2) + Math.pow((target.y - current.y), 2) + Math.pow((target.z - current.z), 2));
    if (result > this.data.distance)
      flag = true;

    return flag;
  },
  //去掉重复的位置后存储移动轨迹
  DeduplicationStore() {
    var me = this,
      current_position = {},
      current_rotation = {},
      last_position = {},
      is_equel;

    me.Copy(me.el.getAttribute('position'), current_position);
    me.Copy(me.el.getAttribute('rotation'), current_rotation);

    me.Copy(me.system.position_recording[me._id][0], last_position);
    is_equel = me.Equel(last_position, current_position);
    if (!is_equel) {
      me.system.position_recording[me._id].unshift(current_position);
      me.system.rotation_recording[me._id].unshift(current_rotation);
    }
    if (me.system.position_recording[me._id].length > me.data.frame + 1) {
      me.system.position_recording[me._id].pop();
    }
  },
  Copy(A, B) {
    for (var i in A) {
      B[i] = A[i];
      if (typeof A[i] == 'object')
        this.Copy(A[i], B[i])
    }
  },
  Equel(A, B) {
    var flag = true;
    for (var i in A) {
      if (typeof A[i] == 'object')
        flag = this.Equel(A[i], B[i]);
      else if (A[i] !== B[i])
        flag = false;
      if (!flag)
        return flag;
    }
    return flag;
  }
})
