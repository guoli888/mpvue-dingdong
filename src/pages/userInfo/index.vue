<template>
  <div class="userInfo">
    <div class="photo">
      <div class="col span11">
        <span>头像</span>
      </div>
      <div class="col span12">
        <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="">
      </div>
    </div>
    <div class="row" @click="changeMobile">
      <div class="col span10">
        <span>手机号</span>
      </div>
      <div class="col span12">
        <span>18895364554</span>
      </div>
      <div class="col span2">
        <i-icon type="enter" color="#a6a6a8" size="22" />
      </div>
    </div>
    <div class="row" @click="changeName">
      <div class="col span10">
        <span>用户名称</span>
      </div>
      <div class="col span12">
        <span>刘备</span>
      </div>
      <div class="col span2">
        <i-icon type="enter" color="#a6a6a8" size="22" />
      </div>
    </div>
    <div class="row" @click="changePassword">
      <div class="col span10">
        <span>登录密码</span>
      </div>
      <div class="col span12">
        <span>点击修改</span>
      </div>
      <div class="col span2">
        <i-icon type="enter" color="#a6a6a8" size="22" />
      </div>
    </div>
    <div class="btn">
      <button>保存</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    changeName() {
      wx.navigateTo({
        url: '/pages/changeName/index'
      })
    },
    changePassword() {
      wx.navigateTo({
        url: '/pages/changePassword/index'
      })
    },
    changeMobile() {
      wx.navigateTo({
        url: '/pages/changeMobile/index'
      })
    }
  }
}
</script>

<style scoped>
.userInfo {
  border-top: 1px solid #ebebeb;
}
.userInfo .row {
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  font-size: 0.28rem;
  height: 1rem;
  line-height: 1rem;
}
.userInfo .photo {
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  font-size: 0.28rem;
  height: 1.5rem;
  line-height: 1.5rem;
}
.userInfo .col {
  float: left;
}
.span10 {
  width: 41%;
  padding-left: 0.25rem;
}
.span11 {
  width: 43%;
  padding-left: 0.25rem;
}
.span12 {
  width: 46%;
  text-align: right;
  padding-right: 0.1rem;
  color: #32b287;
}
.photo .span12 {
  padding: 0.15rem;
}
.photo .span12 img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.span2 {
  width: 5%;
  text-align: right;
  padding-right: 0.1rem;
}
.userInfo .btn {
  margin-top: 0.5rem;
  text-align: center;
}
.userInfo .btn button {
  width: 80%;
  background-color: #32b287;
  border-color: #32b287;
  margin: 0 auto;
  height: 1rem;
  color: #fff;
  font-size: 0.36rem;
  text-align: center;
  line-height: 1rem;
}
</style>
