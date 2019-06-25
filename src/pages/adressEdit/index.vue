<template>
  <div class="adressEdit">
    <div class="editBox">
      <div class="inputBox">
        <span>姓　名:</span> <input type="text" placeholder="请输入您的姓名" v-model="name">
      </div>
      <div class="inputBox">
        <span>手机号:</span> <input type="text" placeholder="请输入您的手机号" v-model="mobile">
      </div>
      <div class="pickerBox">
        <span>选择地址:</span>
        <picker class="weui-btn" mode="region" :value="region" @change="CityChange">
          <text>{{region}}</text>
        </picker>
      </div>
      <div class="inputBox">
        <span>详细地址:</span> <input type="text" placeholder="请输入详细地址" v-model="detail">
      </div>
      <div class="checkedBox">
        <i-checkbox value="" :checked="checked" @change="check"></i-checkbox>
        <text class="small_text">设为默认地址</text>
      </div>
    </div>
    <!-- <div class="getUserad">
      <button @click="getUserAdress">获取用户收货信息</button>
    </div> -->
    <div class="footerBtn">
      <button @click="editaddress">保存地址</button>
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
      region: ['北京市', '北京市', '东城区'],
      name: '',
      mobile: '',
      detail: '',
      checked: true
    }
  },
  onShow() {
    if (this.$root.$mp.query.id) {
      this._initData()
    } else {
      this.setData({
        region: ['北京市', '北京市', '东城区'],
        name: '',
        mobile: '',
        detail: ''
      })
    }
  },
  methods: {
    check({ mp: { detail = {} } }) {
      this.setData({
        checked: detail.current
      })
      console.log(this.checked)
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    // 获取用户地址方法
    // getUserAdress() {
    //   wx.chooseAddress({
    //     success: function(res) {
    //       console.log(res.userName)
    //       console.log(res.postalCode)
    //       console.log(res.provinceName)
    //       console.log(res.cityName)
    //       console.log(res.countyName)
    //       console.log(res.detailInfo)
    //       console.log(res.nationalCode)
    //       console.log(res.telNumber)
    //       this.name == res.userName,
    //         this.mobile == res.telNumber,
    //         this.service_address ==
    //           res.provinceName + res.cityName + res.countyName,
    //         this.detail == res.detailInfo
    //     }
    //   })
    // },
    CityChange(e) {
      console.log('选中的城市为：' + e.mp.detail.value)
      this.region = e.mp.detail.value
      console.log(this.region)
    },
    editaddress() {
      var _this = this
      if (this.checked) {
        this.is_default = 1
      } else {
        this.is_default = 0
      }
      if (this.$root.$mp.query.id) {
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b6ef28dd94d9',
            {
              version: 'v3.0',
              app_id: '86793718',
              username: this.name,
              mobile: this.mobile,
              access_token: wx.getStorageSync('token'),
              service_address: this.region.join(''),
              address_detail: this.detail,
              is_default: this.is_default,
              address_id: parseInt(this.$root.$mp.query.id)
            }
          )
          .then(function(response) {
            if (response.data.code === 1) {
              if (_this.$root.$mp.query.from === 'order_confirm') {
                wx.showToast({
                  title: response.data.msg,
                  icon: 'success',
                  duration: 1500,
                  mask: false
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/adress/index?from=order_confirm'
                  })
                }, 700)
              } else {
                wx.showToast({
                  title: response.data.msg,
                  icon: 'success',
                  duration: 1500,
                  mask: false
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/adress/index'
                  })
                }, 700)
              }
            } else {
              console.log('未登录')
            }
          })
          .catch(function(error) {
            console.log(error)
          })
        // 点击保存后清空input框
        _this.setData({
          name: '',
          mobile: '',
          detail: ''
        })
      } else {
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b6edd75eb291',
            {
              version: 'v3.0',
              app_id: '86793718',
              access_token: wx.getStorageSync('token'),
              username: this.name,
              mobile: this.mobile,
              service_address: this.region.join(''),
              address_detail: this.detail,
              is_default: this.is_default
            }
          )
          .then(function(response) {
            if (response.data.code === 1) {
              if (_this.$root.$mp.query.from === 'order_confirm') {
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'success',
                  duration: 2000, // 延迟时间,
                  mask: false // 显示透明蒙层，防止触摸穿透,
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/adress/index?from=order_confirm'
                  })
                }, 700)
              } else {
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'success',
                  duration: 2000, // 延迟时间,
                  mask: false // 显示透明蒙层，防止触摸穿透,
                })
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/adress/index'
                  })
                }, 700)
              }
              wx.redirectTo({
                url: '/pages/adress/index'
              })
            } else {
              console.log('未登录')
            }
          })
          .catch(function(error) {
            console.log(error)
          })
        // 点击保存后清空input框
        _this.setData({
          name: '',
          mobile: '',
          detail: ''
        })
      }
    },
    // 页面初始化执行的方法
    _initData() {
      var address_id = parseInt(this.$root.$mp.query.id)
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b71409dbe570',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            address_id: address_id,
            page: _this.page
          }
        )
        .then(function(response) {
          var address = response.data.data[0]
          _this.name = address.name
          _this.mobile = address.mobile
          _this.region = address.service_address.split('+')
          _this.detail = address.address
          _this.checked = address.is_default
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.adressEdit {
  border-top: 10px solid #f8f8f8;
  font-size: 0.3rem;
}
.adressEdit .inputBox {
  overflow: hidden;
  border-bottom: 1px solid #ebebeb;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
}
.adressEdit .inputBox span {
  float: left;
}
.adressEdit .inputBox input {
  float: left;
  text-align: left;
  margin-top: 12px;
  margin-left: 15px;
  width: 510rpx;
}
.adressEdit .pickerBox {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  border-bottom: 1px solid #ebebeb;
}
.adressEdit .pickerBox span {
  float: left;
}
.adressEdit .pickerBox picker {
  float: left;
  width: 75% !important;
  margin-top: 0;
}
.adressEdit .pickerBox picker text {
  margin-left: 15px;
}
.adressEdit .checkedBox {
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  border-bottom: 1px solid #ebebeb;
}
.adressEdit .checkedBox span {
}
.adressEdit .getUserad {
  width: 80%;
  margin: 50px auto;
  text-align: center;
}
.adressEdit .getUserad button {
  background: #32b287;
  color: #fff;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
.adressEdit .footerBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.adressEdit .footerBtn button {
  background: #32b287;
  color: #fff;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
  border-radius: 0;
}
i-checkbox {
  float: left;
  margin-top: 15px;
}
.small_text {
  font-size: 28rpx;
  margin-right: 40rpx;
  margin-left: 10rpx;
}
</style>
