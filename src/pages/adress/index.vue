<template>
  <div class="addressList">
    <div class="gray-border"></div>

    <div class="adsList" v-for="(item,index) in addressList" :key="index">
      <div @click="goOrder(item.id)">
      <div class="top">
          <div class="span14 col"  >收货人：{{item.name}}</div>
          <div class="span10 col"  >{{item.mobile}}</div>
      </div>
      <div class="center">
        <div class="dizhi col span24">收货地址：{{item.address}}</div>
      </div>
      </div>
      <div class="bootom">
        <div class="col span8">
           <!-- <div @click="chang(item.id)" v-model="is_default">设为默认地址</div> -->
            <i-radio-group :current="is_default" @change="changeDefault(item.id)">
                <i-radio  :value="item.id">
                </i-radio>
                <text class="small_text">设为默认地址</text>
            </i-radio-group>
        </div>
        <div class="col span4"><div @click="onClickLeft(item.id)"> <i-icon type="editor" color="#32b287" size='26'  />编辑</div></div>
        <div class="col span4"><div @click="onClickRight(item.id,index)"> <i-icon type="trash" color="#FD7881" size='26' />删除</div></div>
      </div>
      <div class="gray-border"></div>
    </div>

    <div class="footer">
      <button @click="addAddress">添加收货地址</button>
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
      checked: true,
      rangeValue: 40,
      is_default: '',
      addressList: [],
      order_confirm: false,
      page: 1
    }
  },
  onShow() {
    // 初始化页数
    this.page = 1
    this._initData()
  },
  // 下拉刷新
  onPullDownRefresh() {
    var that = this
    setTimeout(() => {
      // 模拟请求数据，并渲染
      that._initData()
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    changeStatus(is_default) {
      this.setData({
        is_default: is_default
      })
      console.log(this.is_default)
    },
    // 切换默认状态
    changeDefault(id) {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b74d6cec895d',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            address_id: id
          }
        )
        .then(function(response) {
          // console.log(response.data)
          if (response.data.code === 1) {
            wx.showToast({
              title: response.data.msg,
              icon: 'none',
              duration: 1500,
              mask: false
            })
            _this.changeStatus(id)
          } else {
            wx.showToast({
              title: response.data.msg,
              icon: 'none',
              duration: 1500,
              mask: false
            })
            _this.is_default = ''
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    goOrder(addressId) {
      if (this.$root.$mp.query.from === 'order_confirm') {
        wx.redirectTo({
          url: '/pages/orderConfirm/index?adress_id=' + addressId
        })
      }
    },
    addAddress() {
      if (this.$root.$mp.query.from === 'order_confirm') {
        wx.redirectTo({
          url: '/pages/adressEdit/index?from=order_confirm'
        })
      } else {
        wx.redirectTo({
          url: '/pages/adressEdit/index'
        })
      }
    },
    // 获取用户地址列表
    _initData() {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b7140c2b15c9',
          {
            version: 'v3.0',
            app_id: '86793718',
            access_token: wx.getStorageSync('token'),
            page: _this.page
          }
        )
        .then(function(response) {
          console.log(response.data.data)
          if (response.data.code === 1) {
            var address = response.data.data
            _this.addressList = address
            for (var i = 0; i < address.length; i++) {
              if (address[i].is_default === 1) {
                _this.is_default = address[i].id
              }
            }
            // console.log(_this.is_default)
          } else {
            wx.showToast({
              title: response.data.msg,
              icon: 'none',
              duration: 1500,
              mask: false
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    // 编辑操作
    onClickLeft(id) {
      if (this.$root.$mp.query.from === 'order_confirm') {
        wx.navigateTo({
          url: '/pages/adressEdit/index?from=order_confirm&id=' + id
        })
      } else {
        wx.navigateTo({
          url: '/pages/adressEdit/index?id=' + id
        })
      }
    },
    // 删除操作
    onClickRight(id, index) {
      var _this = this
      wx.showModal({
        title: '是否删除',
        content: '确认删除当前地址？',
        cancelText: '取消',
        confirmText: '确认',
        success: function(res) {
          console.log(res)
          if (res.confirm) {
            fly
              .post(
                'https://xiaochengxu.net199.com/public/index.php/api/5b74d417c2f32',
                {
                  version: 'v3.0',
                  app_id: '86793718',
                  access_token: wx.getStorageSync('token'),
                  address_id: id,
                  page: _this.page
                }
              )
              .then(function(response) {
                wx.showToast({
                  title: response.data.msg, // 提示的内容,
                  icon: 'none', // 图标,
                  duration: 2000, // 延迟时间,
                  mask: false // 显示透明蒙层，防止触摸穿透,
                })
                if (response.data.code === 1) {
                  _this.addressList.splice(index, 1)
                } else {
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          } else {
            console.log('用户点击了取消')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.col {
  float: left;
  display: inline-block;
}
.gray-border {
  height: 0.28rem;
  background: #f8f8f8;
  clear: both;
}
.addressList .adsList {
  font-size: 0.32rem;
  background: #fff;
  padding: 0.15rem 0;
}
.addressList .adsList .top {
  padding: 0 0.35rem;
  color: #333;
}
.addressList .adsList .top .span14 {
  width: 58.33333%;
}
.addressList .adsList .top .span10 {
  width: 41.66667%;
  text-align: right;
}
.span24 {
  width: 93%;
}
.addressList .adsList .center .dizhi {
  color: #666;
  font-size: 0.26rem;
  line-height: 0.5rem;
  padding: 0.08rem 0.35rem;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 0.28rem;
}
.addressList .adsList .bootom {
  height: 118px;
}
.addressList .adsList .bootom .span8 {
  width: 37.33333%;
  margin-left: 4.16667%;
}
.addressList .adsList .bootom .span4 {
  width: 16.66667%;
  text-align: right;
  margin-left: 10%;
}
.footer {
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
}
.footer button {
  background: #32b287;
  color: #fff;
  font-size: 0.32rem;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  border: none;
  border-radius: 0;
}
.i-cell {
  padding: 0 !important;
}
.small_text {
  font-size: 28rpx;
  margin-right: 40rpx;
  margin-left: 10rpx;
}
</style>
