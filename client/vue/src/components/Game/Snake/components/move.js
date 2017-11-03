var KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
];
var CLAMP_VELOCITY = 0.00001;
var MAX_DELTA = 0.2;
var utils = AFRAME.utils,
  bind = utils.bind;

function isEmptyObject(keys) {
  var key;
  for (key in keys) {
    return false;
  }
  return true;
}
AFRAME.registerComponent('move', {
  schema: {
    speed: {
      default: .5
    },
    acceleration: {
      default: 65
    },
    easing: {
      default: 20
    },
    enabled: {
      default: true
    },
    adAxis: {
      default: 'x',
      oneOf: ['x', 'y', 'z']
    },
    adEnabled: {
      default: true
    },
    adInverted: {
      default: false
    },
    wsAxis: {
      default: 'y',
      oneOf: ['x', 'y', 'z']
    },
    wsEnabled: {
      default: true
    },
    wsInverted: {
      default: false
    }
  },
  init() {
    this.keys = {};
    this.position = {};
    this.velocity = new THREE.Vector3(0, 0, .001);
    // this.
    this.onKeyDown = bind(this.onKeyDown, this);
    this.onKeyUp = bind(this.onKeyUp, this);
  },
  tick(time, delta) {
    var currentPosition;
    var data = this.data;
    var el = this.el;
    var movementVector;
    var position = this.position;
    var velocity = this.velocity;

    if (!velocity[data.adAxis] && !velocity[data.wsAxis] && !velocity.z &&
      isEmptyObject(this.keys)) {
      return;
    }

    // Update velocity.
    delta = delta / 1000;
    this.updateVelocity(delta);

    if (!velocity[data.adAxis] && !velocity[data.wsAxis] && !velocity.z) {
      return;
    }

    // Get movement vector and translate position.
    currentPosition = el.getAttribute('position');
    movementVector = this.getMovementVector(delta);
    position.x = currentPosition.x + movementVector.x;
    position.y = currentPosition.y + movementVector.y;
    position.z = currentPosition.z + movementVector.z;
    el.setAttribute('position', position);
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
  updateVelocity: function (delta) {
    var acceleration;
    var adAxis;
    var adSign;
    var data = this.data;
    var keys = this.keys;
    var velocity = this.velocity;
    var wsAxis;
    var wsSign;
    var speed = data.speed;

    adAxis = data.adAxis;
    wsAxis = data.wsAxis;

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
      velocity[adAxis] = 0;
      velocity[wsAxis] = 0;
      // velocity.z = 0;
      return;
    }

    // Decay velocity.
    if (velocity[adAxis] !== 0) {
      velocity[adAxis] -= velocity[adAxis] * data.easing * delta;
    }
    if (velocity[wsAxis] !== 0) {
      velocity[wsAxis] -= velocity[wsAxis] * data.easing * delta;
    }
    if (velocity.z !== 0) {
      velocity.z -= velocity.z * data.easing * delta;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity[adAxis]) < CLAMP_VELOCITY) {
      velocity[adAxis] = 0;
    }
    if (Math.abs(velocity[wsAxis]) < CLAMP_VELOCITY) {
      velocity[wsAxis] = 0;
    }
    if (Math.abs(velocity.z) < CLAMP_VELOCITY) {
      velocity.z = 0;
    }

    if (!data.enabled) {
      return;
    }

    // Update velocity using keys pressed.
    acceleration = data.acceleration;
    if (data.adEnabled) {
      adSign = data.adInverted ? -1 : 1;
      if (keys.KeyA || keys.ArrowLeft) {
        velocity[adAxis] -= adSign * acceleration * delta;
      }
      if (keys.KeyD || keys.ArrowRight) {
        velocity[adAxis] += adSign * acceleration * delta;
      }
    }
    if (data.wsEnabled) {
      wsSign = data.wsInverted ? -1 : 1;
      if (keys.KeyW || keys.ArrowUp) {
        velocity[wsAxis] += wsSign * acceleration * delta;
      }
      if (keys.KeyS || keys.ArrowDown) {
        velocity[wsAxis] -= wsSign * acceleration * delta;
      }
    }
    velocity.z -= acceleration * delta * speed;
  },

  getMovementVector: (function () {
    var directionVector = new THREE.Vector3(0, 0, 0);
    var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      var rotation = this.el.getAttribute('rotation');
      var velocity = this.velocity;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      // Absolute.
      if (!rotation) {
        return directionVector;
      }

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(rotation.x), THREE.Math.degToRad(rotation.y), THREE.Math.degToRad(rotation.z));
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    };
  })(),
  attachKeyEventListeners() {
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
