<template>
   <div>
  	  
  	<a-scene>
<!--		<a-light type="ambient"  color="#445451"></a-light>-->
<!--  		<a-light type="point"  intensity="1"  position="2 4 4"></a-light>      -->
      	<a-sky color="#ECECEC"></a-sky>
		<a-camera>
   			<a-cursor
   				
   			></a-cursor>
  		</a-camera>
      	<a-box
      		id="box"
			position="-1 0 -5" 
			rotation="45 45 0" 
			color="#4CC3D9"
			float="to: -1 0.5 -5;"
			scale_click
      	></a-box>
      
    </a-scene>
   </div>
</template>

<script>
	require('aframe')
	require('aframe-animation-component');
	require('./components')
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
				var cc = document.querySelector('#box').object3D;
				console.log(cc)

			}
		},
	}

</script>

<style scoped>


</style>
