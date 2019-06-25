<template>
  <div class="login">
    <div class="logo">
      <img src="http://offer.net199.com/dingdong/xcx/loginlogo.png" alt="">
    </div>
    <div class="login-wrapper">
      <div class="fieldBox">
        <!-- <i-input title="手机号" :value="loginmobile" autofocus placeholder="请输入手机号"  /> -->
        <span class="fiedname">手机号:</span>  <input title="手机号:" type="text" v-model.lazy="loginmobile" placeholder="请输入手机号">
      </div>
      <div class="fieldBox">
        <!-- <i-input title="密码" :value='loginpassword' type="password" placeholder="请输入密码" /> -->
         <span class="fiedname">密　码:</span><input title="密码:" type="password" v-model.lazy="loginpassword" placeholder="请输入密码">
      </div>
      <div class="btnBox">
        <button type="submit" @click="dologin">登录</button>
      </div>

    </div>
    <!-- 登录绑定end -->
    <div class="login-foot">
      <p>微信登录</p>
      <hr />
      <a href="">
        <img src="http://offer.net199.com/dingdong/xcx/weixin.png" />
      </a>
    </div>

    <i-toast id="toast" />
  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
export default {
  components: {},

  data () {
    return {
      loginmobile: '',
      loginpassword: ''
    }
  },

  created () {},
  methods: {
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    dologin () {
      var _this = this
      fly
        .post('http://api.net199.com/public/index.php/api/5b5c29a287948', {
          version: 'v3.0',
          app_id: '86793718',
          mobile: _this.loginmobile,
          password: _this.loginpassword
        })
        .then(function (response) {
          console.log(response.data.msg)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.login {
  padding: 0.5rem;
}
.login .logo {
  text-align: center;
  padding: 0.3rem;
}
.login .logo img {
  width: 1.8rem;
  height: 1.8rem;
}
.login-wrapper .fieldBox {
  display: block;
  margin: 0.3rem 0.3rem;
  border-bottom: 1px solid #ebebeb;
}
.login-wrapper .btnBox {
  display: block;
  padding: 0.3rem;
}
.login-wrapper .btnBox button {
  background: #32b287;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #fff;
}
.login .login-foot {
  text-align: center;
  position: relative;
  margin: 0.8rem 0.3rem 0.3rem;
}
.login .login-foot p {
  font-size: 0.34rem;
  color: #333;
  background: #fff;
  position: absolute;
  margin: 0 auto;
  top: -0.25rem;
  width: 2rem;
  left: 0;
  right: 0;
}
.login .login-foot img {
  width: 0.9rem;
  height: 0.9rem;
  margin-top: 0.5rem;
}
.login .login-foot hr {
  height: 1px;
  border: none;
  border-top: 1px solid #bebcb9;
}
input {
  padding: 0.1rem 0.4rem;
  font-size: 0.32rem;
}
.fiedname {
  float: left;
  font-size: 0.32rem;
  height: 0.7rem;
  line-height: 0.7rem;
}
</style>
