<template>
  <div class="setting">
    <div class="row" @click="goAbout">
      <div class="col span20">
        <span>关于我们</span>
      </div>
      <div class="col span4">
        <i-icon type="enter" color="#a6a6a8" size="22" />
      </div>
    </div>
    <div class="row">
      <div class="col span16">
        客服电话
      </div>
      <div class="col span8">
        400-100-1111
      </div>
    </div>
    <!-- <div class="btn">
      <button>退出登录</button>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {}
  },
  created () {},
  methods: {
    goAbout () {
      wx.navigateTo({
        url: '/pages/about/index'
      })
    }
  }
}
</script>

<style scoped>
.setting {
  border-top: 1px solid #ebebeb;
}
.setting .row {
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  font-size: 0.28rem;
  height: 0.9rem;
  line-height: 0.9rem;
}
.setting .row .col {
  float: left;
}
.span20 {
  width: 77%;
  padding-left: 0.25rem;
}
.span4 {
  width: 17%;
  text-align: right;
  padding-right: 0.1rem;
}
.span16 {
  width: 60%;
  padding-left: 0.25rem;
}
.span8 {
  width: 33%;
  padding-right: 0.1rem;
  color: #32b287;
  text-align: right;
}
.setting .btn {
  margin-top: 0.5rem;
  text-align: center;
}
.setting .btn button {
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
