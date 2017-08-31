<template>
   <div id="box">
  	  
  	<a-scene>
<!--		<a-light type="ambient"  color="#445451"></a-light>-->
<!--  		<a-light type="point"  intensity="1"  position="2 4 4"></a-light>      -->
      	<a-sky color="#ECECEC"></a-sky>
		<a-camera>
   			<a-cursor></a-cursor>
  		</a-camera>
      	<a-box 
			position="-1 0 -5" 
			rotation="45 45 0" 
			color="#4CC3D9"
			animation=
				"property: position; 
				dir: alternate; 
				dur: 2000;
				loop:true;	
				easing: easeInOutSine;
				to: -1 0.5 -5;"
      	></a-box>
      	
      	<a-sphere 
			position="1 0.5 -4" 
			radius=".5" 
			color="#EF2D5E"
			animation=
				"property: position; 
				dir: alternate; 
				dur: 2000;
				loop:true;	
				easing: easeInOutSine;
				to: 1.3 0 -3.5;"
			scale-on-click		
				
      	></a-sphere>
<!--      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>-->
      
      
    </a-scene>
  	  
  	  <transition name="fade" mode="out-in">
  	  	<router-view></router-view>
      </transition>
   </div>
</template>

<script>
	require('aframe')
	require('aframe-animation-component');
	export default {
		data() {
			return {}
		},
		components: {},
		mounted() {
			//有注册信息才能登陆
			var me = this;
			me.cursor();
		},
		methods: {
			cursor() {
				AFRAME.registerComponent('scale-on-click', {
					schema: {
						to: {
							default: '1.2 1.2 1.2'
						}
					},
					init: function() {
						var data = this.data;
						this.el.addEventListener('click', function() {
							this.setAttribute('scale', data.to);
						});
					}
				});
			}
		},
	}

</script>

<style scoped>


</style>
