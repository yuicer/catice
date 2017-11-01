<template>
	<div>
		<a-scene physics="debug:true; gravity:0" id="scene">
			<!--		<a-light type="ambient"  color="#445451"></a-light>-->
			<a-assets>
				<img id="advertisement" src="~assets/logo.png">
			</a-assets>
      <!-- 贪吃蛇本体 -->
        <a-box id="snake" eat static-body look-controls move queue="ishead:true">
          <a-camera id="camera" position="0 0 -.1" look-controls="enabled:false" wasd-controls="enabled:false" user-height="0">
            <a-cursor id="cursor"></a-cursor>
          </a-camera>
        </a-box>
      
			<a-sky id="sky" color="#ddd"></a-sky>

      <!-- 界限空间,暂时没用，不能检测碰撞 -->
			
      <a-plane static-body class="plane" color="#cac9f5" height="150" width="150" rotation="-90 0 0" position="0 -5 0"></a-plane>
      <!-- <a-plane static-body class="plane" color="#cac9f5" height="150" width="150" rotation="90 0 0" position="0 75 0"></a-plane> -->
      <!-- <a-plane static-body class="plane" color="#cac9f5" height="150" width="150" rotation="0 -90 0" position="75 0 0"></a-plane> -->
      <!-- <a-plane static-body class="plane" color="#cac9f5" height="150" width="150" rotation="0 90 0" position="-75 0 0"></a-plane> -->
      <!-- <a-plane static-body class="plane" color="#cac9f5" height="150" width="150" rotation="0 180 0" position="0 0 75"></a-plane> -->
      <!-- <a-plane static-body class="plane" color="#cac9f5" height="150" width="150" rotation="0 0 0" position="0 0 -75"></a-plane>  -->
     
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
    me.GenerateFood();
  },
  methods: {
    GenerateFood() {
      var me = this,
        scene = document.querySelector("a-scene");
      setInterval(() => {
        var dom = document.createElement("a-box");
        dom.setAttribute("food", "");
        scene.appendChild(dom);
      }, 3000);
    }
  }
};
</script>

<style scoped>

</style>
