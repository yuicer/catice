var KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
];
var utils = AFRAME.utils,
  bind = utils.bind;
AFRAME.registerComponent('walk', {
  schema: {

  },
  init() {
    this.keys = {};
    this.position = {};
    // this.
    this.onKeyDown = bind(this.onKeyDown, this);
    this.onKeyUp = bind(this.onKeyUp, this);
  },
  tick() {
    if (this.keys.KeyW == true)
      console.log(1)
  },
  remove() {
    this.removeKeyEventListeners();
  },

  play() {
    this.attachKeyEventListeners();
  },

  pause() {
    this.keys = {};
    this.removeKeyEventListeners();
  },
  attachKeyEventListeners() {
    console.log(this.keys)
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },
  removeKeyEventListeners() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },
  onKeyDown(event) {
    var code = event.code;
    if (KEYS.indexOf(code) !== -1) {
      this.keys[code] = true;
    }
  },
  onKeyUp(event) {
    var code = event.code;
    delete this.keys[code];
  }
})
