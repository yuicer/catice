<template>
   <div id="canvas_box">
		<canvas tabindex="0" id="canvas"></canvas>
   </div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			var me = this;
			require('./three/start.js')

		},
		methods: {

		},
	}

</script>

<style scoped>
	canvas {
		display: block;
	}

</style>
