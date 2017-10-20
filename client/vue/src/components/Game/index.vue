<template>
	<div>
		<a-scene physic>
			<!--		<a-light type="ambient"  color="#445451"></a-light>-->
			<a-assets>
				<img id="advertisement" src="~assets/logo.png">
			</a-assets>

			<a-sky color="#ddd"></a-sky>

			<!-- <a-box id="snake" static-body position="0 0 0" color="#000" look-controls wasd-controls="fly:true">
				<a-camera id="camera" position="0 1 1" look-controls="enabled:false" wasd-controls="enabled:false" user-height="0">
					<a-cursor id="cursor"></a-cursor>
				</a-camera>
			</a-box> -->

			<!--<a-box static-body id="box" position="0 0 -5" color="#4CC3D9" float="to: -1 1 -5;" visible="false" scale_click> -->
			<a-camera id="camera" wasd-controls="fly:true">
				<a-box id="box1" static-body position="0 -1 -1" width="1" height="1" depth="1"></a-box>
			</a-camera>

			</a-box> -->
			<a-sphere position="5 0.5 -5" radius="2"></a-sphere>
			<a-sphere id="sphere1" dynamic-body position="-1 0.5 -5" radius="1"></a-sphere>
			<a-box id="box1" dynamic-body position="5 1 -5" width="1" height="1" depth="1"></a-box>
			<a-box id="box2" dynamic-body position="5 0 -5" width="1" height="1" depth="1"></a-box>
			<a-plane static-body id="plane" color="#cac9f5" height="100" width="100" rotation="-90 0 0" position="0 -8 0"></a-plane>

		</a-scene>
	</div>
</template>

<script>
require('aframe')
require('aframe-animation-component');
require('aframe-physics-system');
require('./components')
//no-click
export default {
	data() {
		return {}
	},
	mounted() {
		var me = this;
		me.test();
	},
	methods: {
		test() {
			var playerEl = document.querySelector('#camera');
			playerEl.addEventListener('collide', function(e) {
				console.log('Player has collided with body #' + e.detail.body.id);

				e.detail.target.el;  // Original entity (playerEl).
				e.detail.body.el;    // Other entity, which playerEl touched.
				e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
				e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
			});

			// var playerEl = document.querySelector('#snake').components['static-body'];
			// var box = document.querySelector('#box1').components['dynamic-body']
			// playerEl.el.addEventListener('collide', function(e) {
			// 	console.log('Player has collided with body #' + e.detail.body.id);

			// 	e.detail.target.el;  // Original entity (playerEl).
			// 	e.detail.body.el;    // Other entity, which playerEl touched.
			// 	e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
			// 	e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
			// });
			// console.log(playerEl, box)
		}
	},
}

</script>

<style scoped>

</style>
