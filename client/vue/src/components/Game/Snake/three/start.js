import * as THREE from 'three';
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#canvas')
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('#canvas').scene = scene;

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
	color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

animate();




//var start = {
//	yuusya: {},
//	init: function () {
//		mesh.init();
//		light.init();
//		move.init();
//		//init const
//		var me = this;
//		me.yuusya = vs.mesh[0];
//		vs.scene.setGravity(new THREE.Vector3(0, -30, 0));
//
//		//set canvas
//		vs.renderer = new THREE.WebGLRenderer({
//			canvas: document.getElementById("canvas")
//		});
//		vs.renderer.setSize(window.innerWidth, window.innerHeight);
//		vs.renderer.shadowMap.enabled = true;
//		vs.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//
//		//set light
//		for (let i = 0; i < vs.light.length; i++) {
//			vs.scene.add(vs.light[i])
//		}
//
//		//set mesh
//		for (let i = 0; i < vs.mesh.length; i++) {
//			vs.scene.add(vs.mesh[i]);
//		}
//
//		//set camera
//		vs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
//		//		vs.camera.position.copy(me.yuusya.position).add(new THREE.Vector3(0, 80, 100));
//		vs.camera.position.add(new THREE.Vector3(0, 5, 10));
//		me.yuusya.add(vs.camera)
//
//		//get animate
//		game.animate();
//	},
//	onWindowResize: function () {
//		camera.aspect = window.innerWidth / window.innerHeight;
//		camera.updateProjectionMatrix();
//		renderer.setSize(window.innerWidth, window.innerHeight);
//	},
//
//	animate: function () {
//		vs.scene.simulate();
//		vs.renderer.render(vs.scene, vs.camera);
//		requestAnimationFrame(game.animate);
//	}
//}
