AFRAME.registerSystem('queue', {
  init() {
    var me = this;
    me.position_recording = [];
    me.rotation_recording = [];
  },
  add_queue(position, rotation) {
    var me = this;
    me.position_recording.unshift([position])
    me.rotation_recording.unshift([rotation])
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
  },
  init() {
    var me = this;
    //设置_id
    me._id = me.system.position_recording.length;
    //设置尾巴们的初始位置并可见
    var current_position = {},
      current_rotation = {};
    //头
    if (me.data.ishead) {
      me.Copy(me.el.getAttribute('position'), current_position);
      me.Copy(me.el.getAttribute('rotation'), current_rotation);
    }
    //尾巴
    else {
      current_position = me.system.position_recording[me._id - 1][0];
      current_rotation = me.system.rotation_recording[me._id - 1][0];
      me.el.setAttribute('position', current_position);
      me.el.setAttribute('rotation', current_rotation);
      this.el.setAttribute('visible', true)
    }
    //队列添加一个新数组，且数组第一个元素为初始位置
    me.system.add_queue(current_position, current_rotation);
    //存储位置供后一个尾巴使用
  },
  tick() {
    var me = this;
    //头不需要设位置，只存位置
    if (me.data.ishead) {
      me.DeduplicationStore();
      return;
    }

    let length = me.system.position_recording[me._id - 1].length - 1,
      target_position = me.system.position_recording[me._id - 1][length],
      last_current_position = me.system.position_recording[me._id - 1][0],
      target_rotation = me.system.rotation_recording[me._id - 1][length];
    if (me.Distance(last_current_position, target_position)) {
      me.el.setAttribute('position', target_position);
      me.el.setAttribute('rotation', target_rotation);
      me.system.position_recording[me._id - 1].pop();
      me.system.rotation_recording[me._id - 1].pop();
    }

    me.DeduplicationStore();
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
      target_position = {},
      is_equel;
    me.Copy(me.el.getAttribute('position'), current_position);
    me.Copy(me.el.getAttribute('rotation'), current_rotation);

    me.Copy(me.system.position_recording[me._id][0], target_position);
    is_equel = me.Equel(target_position, current_position);
    if (!is_equel) {
      me.system.position_recording[me._id].unshift(current_position);
      me.system.rotation_recording[me._id].unshift(current_rotation);
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
