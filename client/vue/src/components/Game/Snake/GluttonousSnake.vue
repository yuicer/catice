<template>
   <div>
  	  
  	<a-scene>
<!--		<a-light type="ambient"  color="#445451"></a-light>-->
<!--  		<a-light type="point"  intensity="1"  position="2 4 4"></a-light>      -->
      	<a-sky color="#ECECEC"></a-sky>
      	<a-box
      		id="snake"
      		position="0,0,0"
      		color="#000"	      		
      	>
			<a-camera id="camera" look-controls="enabled: true; no_drag:true" wasd-controls="enabled: false">
				<a-cursor id="cursor"></a-cursor>
			</a-camera>
      	</a-box>
      	
      	
      	<a-box
      		id="box"
			position="-1 0 -5" 
			rotation="45 45 0" 
			color="#4CC3D9"
			float="to: -1 0.5 -5;"
			visible="false"	
			scale_click
      	></a-box>
      
    </a-scene>
   </div>
</template>

<script>
	require('static/aframe')
	require('aframe-animation-component');
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
				var dom3 = document.querySelector('#box');
				console.log(dom1.components)
				console.log(dom2.components)
//				dom3.setAttribute('visible',false)

			}
		},
	}

</script>

<style scoped>


</style>
