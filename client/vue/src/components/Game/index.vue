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
		<a-camera id="camera" look-controls="enabled:true" wasd-controls="fly:true"  universal-controls>
			<a-box
				id="snake"
				position="0,0,0"
				color="#000"	      		
			>
					<a-cursor id="cursor"></a-cursor>
			</a-box>
		</a-camera>
      	
      	<a-box      	
      		id="box"
			position="-1 0 -5" 
			color="#4CC3D9"
			float="to: -1 0.5 -5;"
			visible="false"	
			scale_click
      	></a-box>
<!--      	<a-plane id="plane" src="#advertisement" height="10" width="10" rotation="0 0 90" position="0 0 -10"  scale_click></a-plane>-->
      	
      
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
				var dom2 = document.querySelector('#cursor');


			}
		},
	}

</script>

<style scoped>


</style>
