require('aframe')
AFRAME.registerComponent('scale_click', {
	schema: {
		animation: {
			type: 'string',
			default: "property: scale; dir: alternate; dur: 300;easing: easeInSine; loop: false; to: 1.2 1 1.2"
		},
		to: {
			default: '1.2 1.2 1.2'
		}

	},
	init: function () {
		var data = this.data;
		this.el.addEventListener('click', function () {
			this.setAttribute('animation__scale', data.animation);
			console.log(data.animation)
		});
	}
});
