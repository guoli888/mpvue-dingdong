<template>
  <div class="cart">
      <div v-if="oneIsNull" class="headBox row">
        <div class="col span20">
          <!-- <van-checkbox v-model="checkedAll" @change="setCheckAll">全选</van-checkbox> -->
          <i-checkbox value="" :checked="checked" @change="check"></i-checkbox>
          <text class="small_text">全选</text>
        </div>
        <div class="col span4 " v-show="cartList.length">
          <span @click="isEditor = !isEditor">{{isEditor ? '完成' : '编辑'}}</span>
        </div>
      </div>
      <div class="listBox">
        <i-checkbox-group :current="current" @change="checkGroup">
          <div v-for="(item,index) in cartList" :key="item.id" class="list">
            <div class="cart_container">
              <i-checkbox :key="item.goods_id" :value="item.goods_id"  :disabled="!item.is_selected" class="top"></i-checkbox>
              <image class="item-image" :src="item.goods_cover"></image>
              <div class="column">
                <text class="title">{{item.goods_name}}</text>
                <div class="info">
                  <text class="sku-price">￥</text>
                  <text class="sku-price">{{item.goods_price}}</text>
                </div>
                <p class="specification">{{item.sku}}</p>
                <div class="stepper">
                  <text :class="minusStatus" type="number" @click="bindMinus(index,item.id)">-</text>
                  <input bindinput="bindManual" :value="item.count" v-model="item.count"></input>
                  <text @click="bindPlus(index,item.id)">+</text>
                </div>

              </div>
            </div>
          </div>
        </i-checkbox-group>
      </div>
    <div class="bottom_total" v-if="isContent">
      <div class="bottom_line"></div>
      <div class="row" >
        <i-checkbox value=" " :checked="checked" @change="check"></i-checkbox>
        <text class="small_text">全选</text>
        <text class="price">合计:￥{{totalMoney}}</text>
        <button class="button-blue" @click="cartSubmit" > {{isEditor ? '删除' : '结算'}}</button>
        <!-- <button class="button-red" @click="toDele" v-else>删除</button> -->
      </div>
    </div>



    <!-- 无数据显示 -->
    <div class="no-data" v-if="isEmpty">
      <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
      <p> 购物车暂无商品! </p>
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
      oneIsNull: false,
      isContent: false,
      num: '10',
      minusStatus: 'disable',
      isAllSelect: false,
      totalMoney: 0,
      checked: false,
      isEmpty: true,
      page: 1,
      cartList: [],
      isEditor: false,
      current: []
    }
  },
  onShow() {
    this.totalMoney = 0
    this.checked = false
    this.isEditor = false
    this.current = []
    this._initData()
  },
  created() {},
  methods: {
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    _initData() {
      var _this = this
      setTimeout(() => {
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b7f655d29536',
            {
              version: 'v3.0',
              app_id: '86793718',
              page: _this.page,
              access_token: wx.getStorageSync('token')
            }
          )
          .then(response => {
            if (response.data.code === 1) {
              console.log(response.data.data)
              // _this.cartList = response.data.data
              let List = response.data.data
              _this.cartList = List
              if (_this.cartList.length === 0) {
                _this.oneIsNull = false
                _this.isEmpty = true
                _this.isContent = false
              } else {
                _this.oneIsNull = true
                _this.isEmpty = false
                _this.isContent = true
              }
            } else {
              wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 1500,
                mask: false
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/userIndex/index'
                })
              }, 1000)
            }
          })
      }, 300)
    },
    // 按钮点击是结算还是删除  提交删除
    cartSubmit() {
      var _this = this
      var goodsList = []
      if (_this.isEditor) {
        wx.showModal({
          title: '提示', // 提示的标题,
          content: '确定删除所选商品吗?', // 提示的内容,
          showCancel: true, // 是否显示取消按钮,
          cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: '#000000', // 取消按钮的文字颜色,
          confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F', // 确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              // 删除订单操作
              _this.current.forEach(element => {
                _this.cartList.forEach(good => {
                  console.log(element)
                  console.log(good.goods_id)
                  // 获取商品id,根据购物车id 删除
                  if (good.goods_id == element) {
                    fly
                      .post(
                        'https://xiaochengxu.net199.com/public/index.php/api/5b7e795f81cf1',
                        {
                          version: 'v3.0',
                          app_id: '86793718',
                          page: _this.page,
                          access_token: wx.getStorageSync('token'),
                          cart_ids: good.id
                        }
                      )
                      .then(function(response) {
                        // console.log(response.data.msg)
                        wx.showToast({
                          title: response.data.msg,
                          icon: 'success',
                          duration: 1500,
                          mask: false
                        })
                        _this._initData()
                      })
                      .catch(function(error) {
                        console.log(error)
                      })
                  }
                })
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        // 点击结算，创建订单
        _this.current.forEach(element => {
          _this.cartList.forEach(good => {
            console.log(element)
            console.log(good)
            if (good.goods_id == element) {
              goodsList.push({
                name: good.goods_name,
                price: good.goods_price,
                image: good.goods_cover,
                goods_id: good.goods_id,
                number: good.count,
                sku_id: good.sku_id
              })
            }
          })
        })
        console.log(goodsList)
        if (goodsList.length > 0) {
          // 结算接口
          fly
            .post(
              'https://xiaochengxu.net199.com/public/index.php/api/5b7a5d14515c6',
              {
                access_token: wx.getStorageSync('token'),
                goods_data: JSON.stringify(goodsList)
              }
            )
            .then(function(response) {
              console.log(response.data)
              if (response.data.code === 1) {
                wx.setStorageSync(
                  'ensureOrderData',
                  JSON.stringify(response.data.data)
                )
                wx.navigateTo({
                  url: '/pages/orderConfirm/index'
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          wx.showToast({
            title: '请选择商品',
            icon: 'none',
            duration: 1500,
            mask: false
          })
        }
      }
    },
    /*点击减号 */
    bindMinus (index, id) {
      const goods = this.cartList[index]
      if (goods.count <= 1) {
        return
      } else {
        goods.count--
      }
      var num = goods.count
      var _this = this
      _this.changeNum(id, num)
    },
    /*点击加号 */
    bindPlus(index, id) {
      const goods = this.cartList[index]
      goods.count++
      var num = goods.count
      var _this = this
      _this.changeNum(id, num)
    },
    /*输入框事件 */
    bindManual() {
      var num = e.detail.value
      var minusStatus = num > 1 ? 'normal' : 'disable'
      this.setData({
        num: num
      })
    },

    changeNum(id, count) {
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b7e73b80e2ef',
          {
            version: 'v3.0',
            app_id: '86793718',
            page: _this.page,
            access_token: wx.getStorageSync('token'),
            cart_id: id,
            number: count
          }
        )
        .then(function(response) {
          console.log(response)
          if (response.data.Code === 1) {
            // mui.toast(response.data.msg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    checkGroup({ mp: { detail = {} } }) {
      const index = this.current.indexOf(detail.value)
      index === -1
        ? this.current.push(detail.value)
        : this.current.splice(index, 1)
      this.setData({
        current: this.current
      })
      // 点击单选按钮，先将总价设为0
      this.totalMoney = 0
      // 在循环遍历，判断选中的id在cartList中是否存在
      this.current.forEach(element => {
        this.cartList.forEach(good => {
          console.log(element)
          console.log(good.goods_id)
          // 获取商品id,根据购物车id 判断是否选中
          if (good.goods_id == element) {
            this.totalMoney =
              this.totalMoney + parseFloat(good.goods_price) * good.count
          }
        })
      })
      for (var i = 0; i < this.cartList.length; i++) {
        if (this.current[i] == this.cartList[i].goods_id) {
          this.checked = true
        } else {
          this.checked = false
        }
      }
      console.log(this.totalMoney)
      console.log(this.current)
    },
    check({ mp: { detail = {} } }) {
      this.setData({
        checked: detail.current
      })
      // 当checked为teue时，即状态为全选，讲cartList中的所有goods_id插入到current中
      if (this.checked === true) {
        for (var i = 0; i < this.cartList.length; i++) {
          this.current[i] = this.cartList[i].goods_id + ''
        }
      } else {
        // 当状态为false时，current为空数组
        this.current = []
      }
      // 初始化总价
      this.totalMoney = 0
      this.current.forEach(element => {
        this.cartList.forEach(good => {
          console.log(element)
          console.log(good.goods_id)
          // 获取商品id,根据购物车id 判断是否选中
          if (good.goods_id == element) {
            this.totalMoney =
              this.totalMoney + parseFloat(good.goods_price) * good.count
          }
        })
      })
      console.log(this.totalMoney)
      console.log(this.checked)
      console.log(this.current)
    }
  }
}
</script>

<style>
.cart .list {
  padding: 0 0.3rem;
  border-bottom: 1px solid #ebebeb;
  position: relative;
}
.cart .list:last-child {
  border: none;
}
.cart_container {
  display: flex;
  flex-direction: row;
}
.listBox {
  margin-top: 35px;
  margin-bottom: 80px;
}
.cart .top {
  padding-top: 85rpx;
  width: 10%;
}

.scroll {
  margin-bottom: 120rpx;
}

.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.3rem;
}

.sku-price {
  color: #32b287;
  position: relative;
  margin-top: 20rpx;
  font-size: 0.3rem;
}

.price {
  color: #333;
  font-size: 30rpx;
  position: fixed;
  right: 35%;
  line-height: 120rpx;
}

.title {
  font-size: 32rpx;
  margin-top: 20rpx;
}

.small_text {
  font-size: 28rpx;
  margin-right: 40rpx;
  margin-left: 10rpx;
}

.item-select {
  width: 40rpx;
  height: 40rpx;
  margin-top: 90rpx;
  margin-left: 20rpx;
}

.item-allselect {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

.item-image {
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
}

.bottom_line {
  width: 100%;
  height: 2rpx;
  background: #ebebeb;
}

.bottom_total {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  z-index: 9;
}
.button-blue {
  background-color: #32b287;
  /* 红色 */
}
.button-red {
  background-color: rgb(237, 74, 75);
  /* 红色 */
}

button {
  position: fixed;
  right: 0;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 30rpx;
  border-radius: 0rpx;
  width: 30%;
  height: 50px;
  line-height: 50px;
}
button::after {
  border: none;
}
/*主容器*/

.stepper {
  width: 80px;
  height: 26px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  float: right;
  position: absolute;
  right: 0.3rem;
  margin-top: 120rpx;
}
.specification {
  font-size: 0.25rem;
  color: #999;
  position: absolute;
  margin-top: 140rpx;
}
/*加号和减号*/

.stepper text {
  float: left;
  width: 19px;
  line-height: 26px;
  text-align: center;
}

/*数值*/

.stepper input {
  width: 40px;
  height: 26px;
  float: left;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  z-index: 1;
}

/*普通样式*/

.stepper .normal {
  color: black;
}

/*禁用样式*/

.stepper .disable {
  color: #ccc;
}

.cart .no-data {
  text-align: center;
  padding: 0.5rem;
}

.cart .no-data img {
  width: 360rpx;
  height: 360rpx;
}

.cart .no-data p {
  margin: 0.4rem 0;
  font-size: 0.32rem;
  color: #a4a4a6;
}
.headBox {
  border-top: 1px solid #ebebeb;
  position: absolute;
  top: 0;
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #ebebeb;
  line-height: 35px;
  padding: 0 15px;
  overflow: hidden;
  padding-left: 0;
}
.span20 {
  width: 83%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.3rem;
}
.span4 {
  width: 15%;
  font-size: 15px;
  color: #32b287;
}
.col {
  float: left;
}
.no-data {
  text-align: center;
  padding: 1rem 0.5rem 0.5rem;
}
.no-data img {
  width: 360rpx;
  height: 360rpx;
}
.no-data p {
  margin: 0.4rem 0;
  font-size: 0.32rem;
  color: #a4a4a6;
}
</style>
