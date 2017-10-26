<template>
	<div>
		<a-scene physics="debug:true; gravity:0" id="scene">
			<!--		<a-light type="ambient"  color="#445451"></a-light>-->
			<a-assets>
				<img id="advertisement" src="~assets/logo.png">
			</a-assets>

			<a-sky color="#ddd"></a-sky>
      <!-- <div id="snake_box"> -->
        <a-box id="snake" static-body position="0 0 0" color="#000" look-controls walk queue="ishead:true">
          <a-camera id="camera" position="0 0 -.1" look-controls="enabled:false" wasd-controls="enabled:false" user-height="0">
            <a-cursor id="cursor"></a-cursor>
          </a-camera>
        </a-box>
        <a-box static-body position="0 0 -1" color="#111" queue="_id:1"></a-box>
        <a-box static-body position="0 0 -2" color="#111" queue="_id:2"></a-box>
      <!-- </div> -->
			<a-box id="box1" dynamic-body position="5 0 -5" width="1" height="1" depth="1" color="#333"></a-box>
			<a-plane static-body id="plane" color="#cac9f5" height="100" width="100" rotation="-90 0 0" position="0 -8 0"></a-plane>
		</a-scene>
	</div>
</template>

<script>
require("aframe");
require("aframe-animation-component");
require("aframe-physics-system");
require("./components");
//no-click
export default {
  data() {
    return {};
  },
  mounted() {
    var me = this;
    me.test();
  },
  methods: {
    test() {
      var box = document.querySelector("#camera");
      var playerEl = document.querySelector("#snake");
      var q = document.querySelector("a-scene").systems["queue"];
      console.log(q);

      // box.removeAttribute("color");
      playerEl.addEventListener("collide", function(e) {
        console.log("Player has collided with body #");

        var dom = e.detail.body.el;
        setTimeout(function() {
          dom.components["dynamic-body"].pause();
          // dom.pause();
          console.log(e.detail.target.el.components);
          dom.parentNode.removeChild(dom);
          // setTimeout(function() {
          // }, 5000);
        }, 0);

        e.detail.target.el; // Original entity (playerEl).
        e.detail.body.el; // Other entity, which playerEl touched.
        e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
        e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
      });
    }
  }
};
</script>

<style scoped>

</style>
