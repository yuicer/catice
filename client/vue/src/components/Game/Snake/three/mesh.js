import vm from 'src/main.js'
var vs = vm.$store.state;

var mesh = {
	wall_material: {},
	init() {
		this.wall_material_get();
		this.yuusya();
		this.slime();
		this.maze();

		//		this.crystal();
		//		this.get_box();
	},
	wall_material_get() {
		var loader = new THREE.TextureLoader(),
			img = require('assets/3d/wall.png'),
			me = this;
		me.wall_material = new Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.8 // high restitution
		);
		me.wall_material.map.wrapS = me.wall_material.map.wrapT = THREE.RepeatWrapping;
		me.wall_material.map.repeat.set(2, 2);
	},
	yuusya() {

		var material = new THREE.MeshNormalMaterial();
		material.visible = false;
		var yuusya = new Physijs.BoxMesh(
			new THREE.BoxGeometry(4, 4, 4),
			material

		);
		yuusya.castShadow = true;
		//		yuusya.receiveShadow = true;
		yuusya.position.set(375, 4, 800 - 20)

		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath('static/');
		mtlLoader.load('Gohan.mtl', function (materials) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.load('static/Gohan.obj', function (obj) {
				obj.scale.set(.2, .2, .2);
				obj.rotation.y = Math.PI;
				obj.position.y = -2;
				obj.traverse(function (child) {
					if (child instanceof THREE.Mesh) {
						yuusya.add(obj);
					}
				});
			});
		});
		vs.mesh.push(yuusya);
	},
	slime() {
		var material = new THREE.MeshNormalMaterial();
		//		material.visible = false;
		var slime = new Physijs.BoxMesh(
			new THREE.BoxGeometry(40, 100, 50),
			material,
			0
		);
		//		var objloader = new THREE.OBJLoader();
		//		objloader.load('static/un.obj', function (obj) {
		//			obj.traverse(function (child) {
		//				if (child instanceof THREE.Mesh) {
		//					slime.add(obj);
		//				}
		//			});
		slime.castShadow = true;
		//		yuusya.receiveShadow = true;
		slime.position.set(375, 4, 120 + 5) //z = 800+5
		vs.mesh.push(slime);

	},
	wall(type, length) {
		var wall = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 10, length),
			mesh.wall_material,
			0 // mass
		);
		wall.receiveShadow = true;
		wall.castShadow = true;
		//type 0横 1竖
		if (type)
			wall.rotation.z = Math.PI / 2;
		else
			wall.rotation.set(0, Math.PI / 2, Math.PI / 2)
		wall.position.y = 250;
		vs.mesh.push(wall);
		return wall

	},
	maze() {
		var loader = new THREE.TextureLoader(),
			img = require('assets/3d/floor1.jpg'),
			me = this,
			ground_material = new Physijs.createMaterial(
				new THREE.MeshLambertMaterial({
					map: loader.load(img),
					side: THREE.DoubleSide
				}),
				.4, // low friction
				.8 // high restitution
			);
		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		ground_material.map.repeat.set(12, 12);
		var me = this,
			ground = new Physijs.BoxMesh(
				new THREE.BoxGeometry(1000, 1, 1000),
				ground_material,
				0 // mass
			);
		ground.receiveShadow = true;
		ground.position.set(500, 0, 500)
		vs.mesh.push(ground);

		var ground1 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(1000, 1, 1000),
			mesh.wall_material,
			0 // mass
		);
		ground1.receiveShadow = true;
		ground1.position.set(500, 250, 500)
		vs.mesh.push(ground1);


		var b0 = new me.wall(0, 50);
		b0.position.add(new THREE.Vector3(375, 0, 800));
		//边界
		var a1 = new me.wall(1, 200);
		a1.position.add(new THREE.Vector3(350, 0, 700));
		var a2 = new me.wall(1, 200);
		a2.position.add(new THREE.Vector3(400, 0, 700));
		var b1 = new me.wall(0, 150);
		b1.position.add(new THREE.Vector3(275, 0, 600));
		var b2 = new me.wall(0, 150);
		b2.position.add(new THREE.Vector3(475, 0, 600));

		var a8 = new me.wall(1, 600);
		a8.position.add(new THREE.Vector3(550, 0, 300));

		var b5 = new me.wall(0, 100);
		b5.position.add(new THREE.Vector3(150, 0, 450));
		var a3 = new me.wall(1, 150);
		a3.position.add(new THREE.Vector3(200, 0, 525));

		//正方形
		var b3 = new me.wall(0, 100);
		b3.position.add(new THREE.Vector3(300, 0, 550));
		var a5 = new me.wall(1, 100);
		a5.position.add(new THREE.Vector3(350, 0, 500));
		var b6 = new me.wall(0, 100);
		b6.position.add(new THREE.Vector3(300, 0, 450));
		var a4 = new me.wall(1, 100);
		a4.position.add(new THREE.Vector3(250, 0, 500));
		//正方形
		var b4 = new me.wall(0, 100);
		b4.position.add(new THREE.Vector3(450, 0, 550));
		var a7 = new me.wall(1, 100);
		a7.position.add(new THREE.Vector3(500, 0, 500));
		var b7 = new me.wall(0, 100);
		b7.position.add(new THREE.Vector3(450, 0, 450));
		var a6 = new me.wall(1, 100);
		a6.position.add(new THREE.Vector3(400, 0, 500));

		var a9 = new me.wall(1, 150);
		a9.position.add(new THREE.Vector3(100, 0, 375));
		var a10 = new me.wall(1, 100);
		a10.position.add(new THREE.Vector3(150, 0, 350));
		var a11 = new me.wall(1, 100);
		a11.position.add(new THREE.Vector3(500, 0, 350));

		var b8 = new me.wall(0, 350);
		b8.position.add(new THREE.Vector3(325, 0, 400));
		var b10 = new me.wall(0, 350);
		b10.position.add(new THREE.Vector3(325, 0, 300));
		var b9 = new me.wall(0, 100);
		b9.position.add(new THREE.Vector3(50, 0, 300));

		var b11 = new me.wall(0, 300);
		b11.position.add(new THREE.Vector3(200, 0, 250));
		var b12 = new me.wall(0, 100);
		b12.position.add(new THREE.Vector3(450, 0, 250));
		var b13 = new me.wall(0, 100);
		b13.position.add(new THREE.Vector3(375, 0, 100));
		var b14 = new me.wall(0, 250);
		b14.position.add(new THREE.Vector3(175, 0, 50));
		var b15 = new me.wall(0, 50);
		b15.position.add(new THREE.Vector3(475, 0, 50));

		var a12 = new me.wall(1, 300);
		a12.position.add(new THREE.Vector3(0, 0, 150));
		var a13 = new me.wall(1, 200);
		a13.position.add(new THREE.Vector3(50, 0, 150));
		var a14 = new me.wall(1, 150);
		a14.position.add(new THREE.Vector3(350, 0, 175));
		var a15 = new me.wall(1, 150);
		a15.position.add(new THREE.Vector3(400, 0, 175));
		var a16 = new me.wall(1, 200);
		a16.position.add(new THREE.Vector3(500, 0, 150));

		var a17 = new me.wall(1, 50);
		a17.position.add(new THREE.Vector3(300, 0, 25));
		var a18 = new me.wall(1, 50);
		a18.position.add(new THREE.Vector3(450, 0, 25));
		var b16 = new me.wall(0, 300);
		b16.position.add(new THREE.Vector3(150, 0, 0));
		var b17 = new me.wall(0, 100);
		b17.position.add(new THREE.Vector3(500, 0, 0));
	},

	get_box: function () {
		// Loader
		var loader = new THREE.TextureLoader();

		// Materials
		var img2 = require('assets/3d/plywood.jpg')


		var box_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img2),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.1 // high restitution
		);
		box_material.map.wrapS = box_material.map.wrapT = THREE.RepeatWrapping;
		box_material.map.repeat.set(.25, .25);

		var geo = new THREE.BoxGeometry(10, 10, 10);
		geo.vertices[0].x = -5;
		geo.vertices[1].x = -5;
		//		for (let i = 0, l = geo.vertices.length; i < l; i++) {
		//			geo.vertices[i].z += 5;
		//		}
		var box = new Physijs.ConvexMesh(
			geo,
			box_material,
		);
		box.position.y = 80;
		box.position.x = 0;
		box.castShadow = true;
		box.receiveShadow = true;
		vs.mesh.push(box);

	},
	crystal: function () {
		//		var box = new Physijs.BoxMesh(
		//			new THREE.BoxGeometry(10, 10, 10),
		//			new THREE.MeshNormalMaterial(),
		//
		//		);
		//		box.position.y = 10;
		//		vs.mesh.push(box);

		function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
			var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
			for (let i = 0, l = geometry.vertices.length; i < l; i++) {
				geometry.vertices[i].x *= 0.2;
				geometry.vertices[i].y *= 0.2;
				geometry.vertices[i].z *= 0.2;
			}
			var meshMaterial = new THREE.MeshNormalMaterial();
			var mesh = new Physijs.ConvexMesh(geometry, meshMaterial);

			mesh.position.set(x, y, z);
			mesh.rotation.set(rx, ry, rz);
			//			mesh.scale.set(s, s, s);
			//			mesh.scale.set(.2, .2, .2)
			mesh.position.y = 20;
			mesh.castShadow = true;
			//			box.add(mesh);
			vs.mesh.push(mesh)
		}

		var hexShape = new THREE.Shape();
		hexShape.moveTo(0, 0.8);
		hexShape.lineTo(0.4, 0.5);
		hexShape.lineTo(0.3, 0);
		hexShape.lineTo(-0.3, 0);
		hexShape.lineTo(-0.4, 0.5);
		hexShape.lineTo(0, 0.8);

		var numberOfCrystals = 1;
		for (let i = 0; i < numberOfCrystals; i++) {
			var extrudeSettings = {
				amount: Math.random() * 200,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 1,
				bevelSize: (Math.random() * 10) + 10,
				bevelThickness: (Math.random() * 10) + 25
			};

			addShape(
				hexShape,
				extrudeSettings,
				0xff3333, // color
				0, // x pos
				0, // y pos
				0, // z pos
				Math.random() * 2 * Math.PI, // x rotation
				Math.random() * 2 * Math.PI, // y rotation
				Math.random() * 2 * Math.PI, // z rotation
				1
			);
		}
	},
	test: function () {
		// Materials
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({}),
			.8, // high friction
			.4 // low restitution
		);
		//		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		//		ground_material.map.repeat.set(2.5, 2.5);

		var ground_geometry = new THREE.PlaneGeometry(75, 75, 50, 50);
		for (var i = 0; i < ground_geometry.vertices.length; i += 9) {
			//			i += Math.floor((Math.random() * 9)) + 1;
			var vertex = ground_geometry.vertices[i];
			vertex.z = Math.random() * 5

		}
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();

		var ground = new Physijs.ConvexMesh(
			ground_geometry,
			ground_material,
			0, // mass
		);
		ground.rotation.x = Math.PI / -2;
		ground.scale.set(2, 2, 2)
		ground.castShadowShadow = true;
		ground.receiveShadow = true;
		ground.position.y = 30;
		vs.mesh.push(ground)
	},
}

//加载外部模型
//		var objloader = new THREE.OBJLoader();
//		objloader.load('static/untitled.obj', function (obj) {
//			obj.traverse(function (child) {
//				if (child instanceof THREE.Mesh) {
//					child.material.map = loader.load(img2);
//
//				}
//			});
//			//			2个直接转换的方法都是把这个物体做成了一个包裹它的立方体而已。。而且第二个方法的厚度还有问题
//			//			方法1：用一个同等大小的physi物体添加他，并遮挡，材质设置为透明
//			//			ground_material.visible = false;
//			//			var box3 = new Physijs.BoxMesh(
//			//				new THREE.BoxGeometry(15, 8, 15),
//			//				ground_material,
//			//				0
//			//			);
//			//			box3.add(obj)
//			//			vs.scene.add(box3)
//
//			//			方法2：直接转换，
//			//			var model = obj;
//			//			for (let x in model.children) {
//			//				let material = Physijs.createMaterial(
//			//					model.children[x].material,
//			//					1,
//			//					0
//			//				);
//			//				let mesh = new Physijs.BoxMesh(
//			//					model.children[x].geometry,
//			//					box_material,
//			//					0
//			//				);
//			//				mesh.castShadow = true;
//			//				mesh.receiveShadow = true;
//			//				mesh.scale.set(10, 4, 10);
//			//				mesh.position.y = 15;
//			//				vs.mesh.push(mesh)
//			//				vs.scene.add(mesh);
//			//			}
//		})

export default mesh;
