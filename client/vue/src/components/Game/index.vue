<template>
	<div>
		<div id="111"></div>
		<a-scene>
			<!--		<a-light type="ambient"  color="#445451"></a-light>-->
			<!--  		<a-light type="point"  intensity="1"  position="2 4 4"></a-light>      -->
			<a-assets>
				<img id="advertisement" src="~assets/logo.png">
			</a-assets>

			<a-sky color="#ddd"></a-sky>

			<a-camera id="camera" look-controls="enabled:true" wasd-controls="enabled:false" user-height="0">
				<a-box id="snake" position="0 -1 -0.5" color="#000" walk>
					<a-cursor id="cursor"></a-cursor>
					<a-box position="0 0 -1"></a-box>
				</a-box>
			</a-camera>

			<a-box id="box" position="0 0 -5" color="#4CC3D9" float="to: -1 1 -5;" visible="false" scale_click></a-box>
			<!-- <a-plane id="plane" height="100" width="100" rotation="0 0 45" position="0 -50 0"></a-plane> -->

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
			var dom1 = document.querySelector('#camera');
			console.log(dom1.components)
			// console.log(utils)
			// dom1.components.float.pause();
		}
	},
}

</script>

<style scoped>

</style>
