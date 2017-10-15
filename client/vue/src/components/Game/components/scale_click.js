AFRAME.registerComponent('scale_click', {
	schema: {
		animation: {
			type: 'string',
			default: "property: scale; dir: alternate; dur: 300;easing: easeInSine;"
		},
		to: {
			default: '1.2 1.2 1.2'
		}

	},
	timer: 0,
	init() {
		var data = this.data,
			me = this;
		this.el.addEventListener('click', function () {
			this.setAttribute('animation__scale', data.animation + 'to:' + data.to);
			if (me.timer)
				return;
			me.timer = setTimeout(() => {
				me.el.removeAttribute('animation__scale');
				me.timer = 0;
			}, 700);
		});
	}
});
