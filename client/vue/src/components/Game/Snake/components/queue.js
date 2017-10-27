AFRAME.registerSystem('queue', {
  schema: {

  },
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
    _id: {
      default: -1
    }
  },
  init() {
    var me = this;
    if (me.data.ishead)
      me._id = 0;
    else {
      me._id = me.data._id;
      me.el.setAttribute('position', me.system.position_recording[me._id - 1][0]);
      this.el.setAttribute('visible', true)
    }
    // me._id = me.system.position_recording.length;
    var current_position = {},
      current_rotation = {};
    me.Copy(me.el.getAttribute('position'), current_position);
    me.Copy(me.el.getAttribute('rotation'), current_rotation);

    me.system.add_queue(current_position, current_rotation);
  },
  tick() {
    var me = this;
    me.DeduplicationStore()

    if (me.data.ishead)
      return;

    var target_position = me.system.position_recording[me._id - 1][me.system.position_recording[me._id - 1].length - 1],
      last_current_position = me.system.position_recording[me._id - 1][0],
      target_rotation = me.system.rotation_recording[me._id - 1][me.system.position_recording[me._id - 1].length - 1];
    if (me.Distance(last_current_position, target_position)) {
      me.el.setAttribute('position', target_position);
      me.el.setAttribute('rotation', target_rotation);
      me.system.position_recording[me._id - 1].pop();
      me.system.rotation_recording[me._id - 1].pop();
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
  },
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
  }
})
