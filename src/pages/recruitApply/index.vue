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
     <div class="inputBox">
      <span>年　　龄：</span> <input type="text" placeholder="请输入您的年龄" v-model.lazy='age'>
    </div>
    <div class="selectBox">
      <span>报名意向：</span>
      <div class="select">
        <!-- <select class="van-select" v-model="type_str">
            <option value="">请选择</option>
            <option value="钟点工">钟点工</option>
            <option value="保姆">保姆</option>
            <option value="月嫂">月嫂</option>
            <option value="清洁养护">清洁养护</option>
            <option value="其他">其他</option>
        </select> -->
        <picker class="weui-btn" @change="PickerChange2" :value="indexPicker2" :range="array2">
          <text type="default">{{array2[indexPicker2]}}</text>
          <i-icon type="unfold" class="i-icon" />
        </picker>
      </div>
    </div>
    <wux-select id="wux-select1" />
    <wux-select id="wux-select2" />
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
      age: '',
      type_str: '',
      indexPicker: 0,
      array: ['请选择', '男', '女'],
      indexPicker2: 0,
      array2: ['请选择', '钟点工', '保姆', '月嫂', '清洁养护', '其他']
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
    PickerChange2(e) {
      this.setData({
        indexPicker2: e.mp.detail.value, //改变select选择索引值
        type_str: this.array2[e.mp.detail.value] //给类型type_str添加数据
      })
      console.log(this.type_str)
    },
    doSubmit() {
      let id = parseInt(this.$root.$mp.query.recruitment_id)
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b78da6fe3161',
          {
            version: 'v3.0',
            mobile: _this.mobile,
            username: _this.username,
            gender: _this.gender,
            age: _this.age,
            type_str: _this.type_str
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
                url: '/pages/recruitment/index?recruitment_id=' + id
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
  width: 450rpx;
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
