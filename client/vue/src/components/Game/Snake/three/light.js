import vm from 'src/main.js'
var vs = vm.$store.state;
var light = {
	init: function () {
		var spotlight = new THREE.SpotLight(0xffffff);
		spotlight.castShadow = true;
		spotlight.shadow.camera.left = -160;
		spotlight.shadow.camera.top = -160;
		spotlight.shadow.camera.right = 160;
		spotlight.shadow.camera.bottom = 160;
		spotlight.shadow.mapSize.width = spotlight.shadow.mapSize.height = 1024;
		//		spotlight.position.set(vs.mesh[1].position.x, vs.mesh[1].position.y, vs.mesh[1].position.z + 30);
		spotlight.angle = Math.PI / 6;
		spotlight.target = vs.mesh[0];
		//		vs.light[0] = spotlight;

		vs.light[0] = new THREE.AmbientLight(0x666666);
	},
}

export default light;
