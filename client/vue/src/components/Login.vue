<template>
<div id="main">	
	<div @click="sign_up" id="sign_up">sign up</div>
	<div id="login">
		<div id="box"  v-if="is_sign_in">	
				<input type="text" v-model='phone_number' maxlength="11" placeholder="ID" @keyup.enter="sign_in">
				<input type="password" v-model='password' placeholder="Password" maxlength="16" @keyup.enter="sign_in">
			<div id="error">
					{{error}}
			</div>
			<div @click="sign_in" id="sign_in">sign in</div>
		</div>
		<div v-else>
				<input type="text" v-model='phone_number' maxlength="11" placeholder="ID" @keyup.enter="sign_in">
		</div>
	</div>
</div>
</template>
<script>
	export default {
		data() {
			return {
				is_sign_in: true,
				phone_number: '',
				password: '',
				error: '',
			}
		},
		mounted() {

		},
		methods: {
			sign_in() {
				//传数据判断用户输入的信息是否正确，正确后执行下面函数
				//返回id，设置id
				var me = this;
				me.axios.get('account', {
					params: {
						phone: '123456',
						password: '111111'
					},
				}).then(
					(res) => {
						console.log(res)
					},
				)
			},
			sign_up() {
				this.is_sign_in = !this.is_sign_in;
			},
			set_location() {
				var a = new Date().getTime()
				localStorage.setItem('time', a);
				//过期时间一周
				localStorage.setItem('expire', 604800000);
			},
		},

	}

</script>

<style scoped>
	#sign_up {
		color: #fff;
		float: right;
		width: 100px;
		background: #333;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
		border: 1px solid #666;
		border-radius: 3px;
		text-align: center;
		margin: 15px 25px 0 0;
		transition: all .3s;
	}
	
	#sign_in {
		color: white;
		width: 300px;
		height: 50px;
		line-height: 50px;
		background: #333;
		border: 1px solid #666;
		border-radius: 3px;
		cursor: pointer;
		text-align: center;
		font-size: 24px;
		margin: 0 auto;
		transition: all .3s;
	}
	
	#sign_in:hover,
	#sign_up:hover {
		background: #222;
		border: 1px solid #333;
	}
	
	#error {
		height: 40px;
		width: 100%;
		font-size: 18px;
		line-height: 2;
		display: inline-block;
	}
	
	input {
		border-radius: 3px;
		margin-bottom: 20px;
		font-size: 20px;
		color: #4c4c4c;
		height: 50px;
		width: 480px;
		border: none;
		letter-spacing: 4px;
		padding-left: 20px;
	}
	
	#login {
		position: relative;
		width: 500px;
		height: 30vh;
		left: calc((100vw - 500px)/2);
		top: 35vh;
	}
	
	#main {
		min-height: 100vh;
		width: 100%;
		background: #333;
	}
	
	::placeholder {
		color: #a6a6a6;
		font-size: 18px;
		font-family: Arial, 'microsoft yahei', Helvetica, sans-serif;
	}

</style>
