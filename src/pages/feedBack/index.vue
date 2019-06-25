<template>
  <div class="recruitApply">
    <div class="inputBox">
      <span>您的姓名：</span> <input type="text" placeholder="请输入您的姓名" v-model.lazy='username'>
    </div>
    <div class="selectBox">
      <span>您的性别：</span>
      <div class="select">
        <!-- <select class="van-select" v-model="gender">
            <option value="">请选择</option>
            <option value="男">男</option>
            <option value="女">女</option>
        </select> -->
        <picker class="weui-btn" @change="PickerChange" :value="indexPicker" :range="array">
          <text type="default">{{array[indexPicker]}}</text>
          <i-icon type="unfold" class="i-icon" />
        </picker>
      </div>
    </div>
    <div class="inputBox">
      <span>手机号码：</span> <input type="text" placeholder="请输入您的手机号码" v-model.lazy='mobile'>
    </div>
    <div class="textareaBox">
      <span>反馈内容：</span> <textarea type="text" placeholder="请输入您的意见和建议" v-model='content'></textarea>
    </div>

    <div class="footer-cart">
      <button class="doreservat" @click="doSubmit()" type="default">立即提交</button>
    </div>
  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
export default {
  components: {},

  data() {
    return {
      username: '',
      mobile: '',
      gender: '',
      content: '',
      indexPicker: 0,
      array: ['请选择', '男', '女']
    }
  },
  mounted() {
    // 获取上一个页面传参并转换成整型
    // console.log(parseInt(this.$root.$mp.query.recruitment_id))
  },
  created() {},
  methods: {
    // setData方法
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    PickerChange(e) {
      this.setData({
        indexPicker: e.mp.detail.value, //改变select选择索引值
        gender: this.array[e.mp.detail.value] //给gender添加数据
      })
      console.log(this.gender)
    },
    doSubmit() {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b78da6fe3161',
          {
            version: 'v3.0',
            mobile: _this.mobile,
            username: _this.username,
            gender: _this.gender,
            content: _this.content
          }
        )
        .then(function(response) {
          wx.showToast({
            title: response.data.msg, //提示的内容,
            icon: 'none',
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
          if (response.data.code === 1) {
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/userIndex/index'
              })
            }, 700)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.recruitApply {
  font-size: 0.32rem;
}
.recruitApply .inputBox {
  overflow: hidden;
  height: 60px;
  line-height: 60px;
  padding: 0 0.3rem;
  border-bottom: 1px solid #ebebeb;
}

.recruitApply .inputBox span {
  float: left;
  margin-right: 0.5rem;
}

.recruitApply .inputBox input {
  float: left;
  margin-top: 35rpx;
  width: 66%;
}

.recruitApply .textareaBox {
  overflow: hidden;
  height: 120px;
  line-height: 60px;
  padding: 0 0.3rem;
  border-bottom: 1px solid #ebebeb;
}

.recruitApply .textareaBox span {
  float: left;
  margin-right: 0.5rem;
}

.recruitApply .textareaBox textarea {
  width: 100%;
  float: left;
  height: 120rpx;
}
.recruitApply .selectBox {
  overflow: hidden;
  height: 60px;
  line-height: 60px;
  padding: 0 0.3rem;
  border-bottom: 1px solid #ebebeb;
}
.recruitApply .selectBox span {
  float: left;
  margin-right: 0.5rem;
}
.recruitApply .selectBox .select {
  text-align: center;
}
.recruitApply .selectBox .select .i-icon {
  float: right;
  margin-right: 0.3rem;
}
.weui-btn {
  text-align: left;
  color: #666;
}
.footer-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.footer-cart .doreservat {
  background: #32b287;
  color: #fff;
  border: none;
  border-radius: 0;
}
</style>
