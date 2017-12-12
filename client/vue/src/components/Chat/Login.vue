<template>
	<div id="main">
		<div id="outbox">
			<div @click="sign_switch" id="sign_up">{{sign_switch_word}}</div>
			<div id="box">
				<transition name="fade" mode="out-in">
					<!--登录-->
					<div v-if="is_sign_in" key="sign_in">
						<input type="text" v-model='sign_in_mail' maxlength="20" placeholder="mail" @keyup.enter="sign_in">
						<input type="password" v-model='sign_in_password' placeholder="Password" maxlength="16" @keyup.enter="sign_in">
						<div @click="sign_in" class="sign">sign in</div>
						<transition name="fade">
							<div id="error" v-show="error">
								{{error}}
							</div>
						</transition>
					</div>
					<!--注册-->
					<div v-else key="sign_up">
						<input type="text" v-model='sign_up_mail' maxlength="20" placeholder="your mail" @keyup.enter="sign_up">
						<input type="text" v-model='sign_up_password' maxlength="16" placeholder="your password" @keyup.enter="sign_up">
						<input type="text" v-model='sign_up_code' placeholder="verification code" @keyup.enter="sign_up">
						<div @click="sign_up" class="sign">sign up</div>
						<transition name="fade">
							<div id="error" v-show="error">
								{{error}}
							</div>
						</transition>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      is_sign_in: true,
      sign_switch_word: "sign up",
      //input
      error: "",
      sign_in_mail: "",
      sign_in_password: "",
      sign_up_mail: "",
      sign_up_password: "",
      sign_up_code: "",
      code: "",
      timer: 0
    };
  },
  mounted() {},
  watch: {
    error: function(val, oldVal) {
      var me = this;
      clearTimeout(me.timer);
      me.timer = setTimeout(() => {
        me.error = "";
      }, 1000);
    }
  },
  methods: {
    sign_up() {
      var me = this;
      if (me.sign_up_mail === "" || me.sign_up_password === "") {
        me.error = "options can not be null";
        return;
      }
      me.axios
        .post("account/sign_up", {
          mail: me.sign_up_mail,
          password: me.sign_up_password,
          code: me.sign_up_code
        })
        .then(res => {
          console.log(res);
          if (res.data.error) me.error = res.data.error;
          else {
            console.log("注册成功");
          }
        });
    },
    sign_in() {
      var me = this;
      if (me.sign_in_mail === "" || me.sign_in_password === "") {
        me.error = "Incorrect username or password.";
        return;
      }
      //传数据判断用户输入的信息是否正确，正确后执行下面函数
      //返回id，设置id
      me.axios
        .get("account/sign_in", {
          params: {
            mail: me.sign_in_mail,
            password: me.sign_in_password
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.error) me.error = res.data.error;
          else {
            me.$router.push("/main");
            console.log("登录成功");
          }
        });
    },
    sign_switch() {
      this.error = "";
      this.is_sign_in = !this.is_sign_in;
      this.sign_switch_word =
        this.sign_switch_word == "sign in" ? "sign up" : "sign in";
    },
    set_location() {
      var a = new Date().getTime();
      localStorage.setItem("time", a);
      //过期时间一周
      localStorage.setItem("expire", 604800000);
    }
  }
};
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
  margin: 15px -25px 0 0;
  transition: all 0.3s;
  font-size: 18px;
}

.sign {
  color: white;
  width: 80%;
  height: 50px;
  line-height: 50px;
  background: #333;
  border: 1px solid #666;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
  font-size: 24px;
  margin: 0 auto;
  transition: all 0.3s;
}

.sign:hover,
#sign_up:hover {
  background: #222;
  border: 1px solid #333;
}

#error {
  height: 40px;
  width: 300px;
  font-size: 18px;
  line-height: 40px;
  color: #fff;
  margin-top: 30px;
  padding: 0 10px;
  border-radius: 3px;
  background: #86181d;
}

input {
  border-radius: 3px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #4c4c4c;
  height: 50px;
  width: 100%;
  border: none;
  letter-spacing: 4px;
  padding-left: 20px;
}

#box {
  position: relative;
  height: 30vh;
  top: 40vh;
}

#outbox {
  max-width: 500px;
  margin: 0 auto;
  min-height: 100vh;
  width: 70%;
}

#main {
  background: #333;
  font-size: 18px;
}

::placeholder {
  color: #a6a6a6;
  font-size: 18px;
  font-family: Arial, "microsoft yahei", Helvetica, sans-serif;
}
</style>
