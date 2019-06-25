<template>
  <div class="changeMobile">
    <div class="currentMobile">
      <div class="col span11">当前手机号: </div>
      <div class="col span13">18895364554</div>
    </div>
    <div class="inputMobile">
      <div class="span24">
        <span>手机号</span> <input type="text" placeholder="请输入手机号" v-model="phonenumber">
      </div>
    </div>
    <div class="inputCode">
      <div class="span24">
        <span>验证码</span> <input type="text" placeholder="请输入验证码" v-model="code"><button class="Code">发送验证码</button>
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
    return {
      phonenumber: '',
      code: ''
    }
  },
  created() {},
  methods: {}
}
</script>

<style>
.changeMobile {
  padding: 0.5rem 0;
  text-align: center;
  font-size: 0.32rem;
  border-top: 1px solid #ebebeb;
}
.changeMobile .currentMobile {
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
}
.changeMobile .inputMobile {
  overflow: hidden;
  width: 80%;
  margin: 0.35rem auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 0.2rem;
}
.changeMobile .inputMobile span {
  float: left;
  margin-right: 0.25rem;
}
.changeMobile .inputMobile input {
  float: left;
  margin-right: 0.25rem;
  color: #a2a2a2;
  text-align: left;
  padding-left: 0.2rem;
}
.changeMobile .inputCode {
  overflow: hidden;
  width: 80%;
  margin: 0.35rem auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 0.2rem;
}
.changeMobile .inputCode span {
  float: left;
  margin-right: 0.25rem;
}
.changeMobile .inputCode input {
  float: left;
  margin-right: 0.25rem;
  color: #a2a2a2;
  width: 2.25rem;
  text-align: left;
  padding-left: 0.2rem;
}
.changeMobile .inputCode button {
  width: 1.5rem;
  font-size: 0.25rem;
  height: 0.55rem;
  line-height: 0.55rem;
  padding: 0;
  background: #32b287;
  border: none;
  color: #fff;
}
.changeMobile .currentMobile .col {
  float: left;
}
.changeMobile .currentMobile .span11 {
  text-align: left;
  width: 45%;
}
.changeMobile .currentMobile .span13 {
  width: 50%;
  text-align: left;
  color: #32b287;
  font-weight: bold;
}
.changeMobile .btn {
  margin-top: 0.5rem;
  text-align: center;
}
.changeMobile .btn button {
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
