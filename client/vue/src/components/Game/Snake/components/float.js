AFRAME.registerComponent('float', {
  schema: {
    animation: {
      type: 'string',
      default: "property: position; dir: alternate; dur: 2000;loop:true; easing: easeInOutSine;"
    },
    to: {
      type: 'string',
      default: '0 0 0;'
    }
  },
  init() {
    var data = this.data;
    this.el.setAttribute('animation__float', data.animation + 'to:' + data.to);
  },
  pause() {
    console.log('pause')
  }
});
