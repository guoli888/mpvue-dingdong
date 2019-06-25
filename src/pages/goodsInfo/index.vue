<template>
  <div class="goods-xq">
    <div>
      <!-- 轮播图片 -->
      <div class="image-header">
        <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
          <div v-for="(item,index) in coverImages" :key="index">
            <swiper-item>
              <image :src="item.image" class="slide-image" />
            </swiper-item>
          </div>
        </swiper>
      </div>
      <!-- 标题信息 -->
      <div class="detail-body">
        <!--商品标题价格-->
        <div class="goods-info row">
          <p>{{goods.title}}</p>
          <p class="label">
            <span>不留痕</span>
            <span class="two">长久耐用</span>
          </p>
          <p class="info">{{goods.subname}}</p>
          <p class="price">
            ￥{{goods.price}}<span>起</span>
          </p>
        </div>
        <!--end 商品标题价格-->
        <div class="gray-border"></div>
        <!--服务商品参数-->
        <div class="attribute" v-if="is_service===1">
          <div class="cell" @click="switchAttrPop">
            <div class="col span20" >
              <span>请选择服务规格</span>
            </div>

            <div class="col span4" >
              <i-icon type="enter" slot="icon" size="22" color="#666" />
            </div>
          </div>
          <div class="cell"  @click="toRecuit">
            <div class="col span20" >
              <span>服务评价</span>
            </div>

            <div class="col span4" >
              <i-icon type="enter" slot="icon" size="22" color="#666" />
            </div>
          </div>
        </div>
        <!-- 实体商品显示 -->
        <div class="attribute" v-else>
          <div class="cell" @click="switchAttrPop">
            <div class="col span20" >
              <span>请选择商品规格</span>
            </div>

            <div class="col span4" >
              <i-icon type="enter" slot="icon" size="22" color="#666" />
            </div>
          </div>
          <div class="cell"  @click="toRecuit">
            <div class="col span20" >
              <span>商品评价</span>
            </div>

            <div class="col span4" >
              <i-icon type="enter" slot="icon" size="22" color="#666" />
            </div>
          </div>
        </div>
        <!--end 商品参数-->

        <div class="goods-detail" v-if="is_service===1">
          <div class="gray-border"></div>
          <h2>服务详情</h2>
          <div class="info" >
             <!-- 对content里面的内容进行富文本转换 -->
             <wxParse :content="content"  />
          </div>
        </div>

        <div class="goods-detail" v-else>
          <div class="gray-border"></div>
          <h2>商品详情</h2>
          <div class="info" >
             <!-- 对content里面的内容进行富文本转换 -->
             <wxParse :content="content"  />
          </div>
        </div>

        <!-- 商品sku -->
          <div class="attr-pop-box" :hidden="!openAttr">
            <div class="attr-pop">
                <div class="close" @click="closeAttr">
                <i-icon type="delete" size='32' color='#32b287'/>
                </div>
                <div class="img-info">
                <img class="img" :src="goods.picture"/>
                <div class="info">
                    <div class="c">
                      <div class="a">{{goods.title}}</div>
                    <div class="p">价格：￥{{goods.price}}</div>
                    </div>
                </div>
                </div>
                <div class="spec-con">

                <div class="spec-item" v-for="(item, index) of sku.tree" :key="index" v-if="index===0">
                    <div class="name">{{item.k}}:</div>
                    <div class="values">
                      <div class="value" :class="{'selected':currentIndex0 == iitem.id}"  @click="clickSkuValue(iitem.id,index)" v-for="(iitem, index2) of item.v" :key="iitem.id" >
                      {{iitem.name}}</div>
                    </div>
                </div>
                <div class="spec-item" v-for="(item, index) of sku.tree" :key="index" v-if="index===1">
                    <div class="name">{{item.k}}:</div>
                    <div class="values">
                      <div class="value" :class="{'selected':currentIndex1 == iitem.id}"  @click="clickSkuValue(iitem.id,index)" v-for="(iitem, index2) of item.v" :key="iitem.id" >
                      {{iitem.name}}</div>
                    </div>
                </div>
                <div class="spec-item" v-for="(item, index) of sku.tree" :key="index" v-if="index===2">
                    <div class="name">{{item.k}}:</div>
                    <div class="values">
                      <div class="value" :class="{'selected':currentIndex2 == iitem.id}"  @click="clickSkuValue(iitem.id,index)" v-for="(iitem, index2) of item.v" :key="iitem.id" >
                      {{iitem.name}}</div>
                    </div>
                </div>

                <div class="number-item">
                    <div class="name">数量</div>
                    <div class="Inventory">
                      库存：{{sku.stock_num}}件
                    </div>
                    <div class="selnum">
                      <div class="cut" @click="cutNumber">-</div>
                      <input v-model="number" class="number" disabled="true" type="number" />
                      <div class="add" @click="addNumber">+</div>
                    </div>
                </div>
                </div>
            </div>
            </div>

      </div>
    </div>

     <!-- 返回按钮 -->
      <!-- <div class="back">
        <i-icon type="return" color="#fff" size="30"/>
      </div> -->
    <!-- 服务商品显示 -->
    <div class="footer-cart2" v-if="is_service===1">
      <div class="chat col">
        <button open-type="contact" >客服</button>
      </div>
      <div class="buyBtn col">
        <button type="" @click="goConfirm"> 立即下单</button>
      </div>
    </div>
    <!-- 实体商品显示 -->
    <div class="footer-cart" v-if="is_service!==1">
      <div class="cart col">
        <button type="" @click="goCart">购物车</button>
      </div>
      <div class="chat col">
        <button open-type="contact" >客服</button>
      </div>
      <div class="buyBtn col">
        <button type="" @click="goConfirm"> 立即下单</button>
      </div>
    </div>
    <!-- 商品sku弹出时显示 -->
    <div class="footer-cart" v-if="is_service !==1 && openAttr">
      <div class="cart2 col">
        <button type="" @click="addCart">加入购物车</button>
      </div>
      <div class="buyBtn col">
        <button type="" @click="goConfirm"> 立即下单</button>
      </div>
    </div>
  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
// 引入富文本转换插件
import wxParse from 'mpvue-wxparse'

export default {
  components: { wxParse },
  computed: {},
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      coverImages: [],
      goods: {
        id: '',
        // 商品标题
        title: '',
        // 默认商品 sku 缩略图
        picture: '',
        price: ''
      },
      sku: {},
      content: '',
      openAttr: false,
      specificationList: [],
      productList: [],
      number: 1,
      checkedSpecText: '请选择规格',
      checked: false,
      is_service: '',
      currentIndex0: '0',
      currentIndex1: '0',
      currentIndex2: '0',
      skuId: 0,
      skuList: [],
      selectedSkucombS1: '',
      selectedSkucombS2: '',
      selectedSkucombS3: '',
      is_sku: 0
    }
  },
  onShow() {
    this.initData()
  },
  created() {},
  mounted() {},
  methods: {
    goConfirm() {
      if (this.openAttr === false) {
        this.openAttr = !this.openAttr
      } else {
        var goodsData = [
          {
            name: this.goods.title,
            price: this.goods.price,
            image: this.goods.picture,
            goods_id: this.goods.id,
            number: this.number,
            sku_id: this.skuId,
            selectedSkucombS1: this.selectedSkucombS1,
            selectedSkucombS2: this.selectedSkucombS2,
            selectedSkucombS3: this.selectedSkucombS3
          }
        ]
        console.log(goodsData)
        var _this = this
        fly
          .post(
            'https://xiaochengxu.net199.com/public/index.php/api/5b7a5d14515c6',
            {
              access_token: wx.getStorageSync('token'),
              goods_data: JSON.stringify([
                {
                  goods_id: _this.goods.id,
                  sku_id: _this.skuId,
                  number: _this.number,
                  selectedSkucombS1: _this.selectedSkucombS1,
                  selectedSkucombS2: _this.selectedSkucombS2,
                  selectedSkucombS3: _this.selectedSkucombS3
                }
              ])
            }
          )
          .then(function(response) {
            // console.log(response.data.msg)
            wx.showToast({
              title: response.data.msg,
              icon: 'none',
              duration: 1500,
              mask: true
            })
            if (response.data.code === 1) {
              console.log(response.data)
              // 设置缓存
              wx.setStorageSync(
                'ensureOrderData',
                JSON.stringify(response.data.data)
              )
              setTimeout(() => {
                wx.redirectTo({
                  url:
                    '/pages/orderConfirm/index?is_service=' + _this.is_service
                })
              }, 600)
            } else if (response.data.msg === '请登录') {
              wx.showToast({
                title: response.data.msg,
                icon: 'none',
                duration: 1500,
                mask: false
              })
              wx.setStorageSync('ensureOrderData', JSON.stringify(goodsData))
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/userIndex/index'
                })
              }, 600)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    initData() {
      var id = parseInt(this.$root.$mp.query.goods_id)
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6031b3c72dd',
          {
            goods_id: id
          }
        )
        .then(function(response) {
          _this.coverImages = response.data.data.goods.cover_images
          var goods = response.data.data.goods
          _this.sku = response.data.data.sku
          _this.skuList = response.data.data.sku.list
          _this.productList = response.data.data.sku.tree.v
          _this.goods.id = goods.detail.id
          _this.goods.title = goods.detail.name
          _this.goods.picture = goods.detail.cover
          _this.goods.subname = goods.detail.subname
          _this.content = goods.detail.detail
          _this.goods.price = goods.detail.price
          _this.is_service = goods.detail.is_service
          _this.is_sku = response.data.data.goods.detail.is_sku
          // console.log(response.data.data.goods.detail)
          // console.log(response.data.data.sku)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 打开商品规格选择弹窗
    switchAttrPop() {
      if (this.openAttr === false) {
        this.openAttr = !this.openAttr
      }
    },
    clickSkuValue: function(id, index) {
      // this.currentIndex = id
      if (index === 0) {
        this.currentIndex0 = id
      } else if (index === 1) {
        this.currentIndex1 = id
      } else {
        this.currentIndex2 = id
      }
      // console.log('s1' + this.currentIndex0)
      // console.log('s2' + this.currentIndex1)
      // console.log('s3' + this.currentIndex2)
      for (var i = 0; i < this.skuList.length; i++) {
        var s1 = this.skuList[i].s1
        var s2 = this.skuList[i].s2
        var s3 = this.skuList[i].s3
        if (
          s1 == this.currentIndex0 &&
          s2 == this.currentIndex1 &&
          s3 == this.currentIndex2
        ) {
          // console.log(this.skuList[i])
          this.goods.price = this.skuList[i].price
          this.sku.stock_num = this.skuList[i].stock_num
          this.skuId = this.skuList[i].id
          this.selectedSkucombS1 = this.currentIndex0
          this.selectedSkucombS2 = this.currentIndex1
          this.selectedSkucombS3 = this.currentIndex2
        }
      }
    },
    addCart() {
      var goodsData = [
        {
          name: this.goods.title,
          price: this.goods.price,
          image: this.goods.picture,
          goods_id: this.goods.id,
          number: this.number,
          sku_id: this.skuId,
          selectedSkucombS1: this.selectedSkucombS1,
          selectedSkucombS2: this.selectedSkucombS2,
          selectedSkucombS3: this.selectedSkucombS3
        }
      ]
      // console.log(goodsData)
      var _this = this
      fly
        .post(
          'https://xiaochengxu.net199.com/public/index.php/api/5b7e5ab5ca32e',
          {
            access_token: wx.getStorageSync('token'),
            goods_data: JSON.stringify([
              {
                goods_id: _this.goods.id,
                sku_id: _this.skuId,
                number: _this.number,
                selectedSkucombS1: _this.selectedSkucombS1,
                selectedSkucombS2: _this.selectedSkucombS2,
                selectedSkucombS3: _this.selectedSkucombS3
              }
            ])
          }
        )
        .then(function(response) {
          if (response.data.code === 1) {
            wx.showToast({
              title: response.data.msg, //提示的内容,
              icon: 'success', //图标,
              duration: 2000, //延迟时间,
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => {}
            })
            wx.setStorageSync(
              'ensureOrderData',
              JSON.stringify(response.data.data)
            )
            setTimeout(() => {
              _this.openAttr = false
            }, 1000)
          } else if (response.data.msg === '缺少access_token参数') {
            wx.showToast({
              title: '请检查登录状态',
              icon: 'none',
              duration: 1500,
              mask: false
            })
            wx.setStorageSync('ensureOrderData', JSON.stringify(data))
          } else if (response.data.msg === '商品无库存') {
            wx.showToast({
              title: response.data.msg,
              icon: 'none',
              duration: 1500,
              mask: false
            })
            setTimeout(() => {
              _this.openAttr = false
            }, 1000)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    toRecuit() {
      var id = parseInt(this.$root.$mp.query.goods_id)
      wx.navigateTo({
        url: '/pages/goodsRecuit/index?goods_id=' + id
      })
    },
    goCart() {
      // var id = parseInt(this.$root.$mp.query.goods_id)
      wx.switchTab({
        url: '/pages/cart/index'
      })
    },
    // 关闭规格弹窗
    closeAttr() {
      this.openAttr = false
    },
    // 减少数量
    cutNumber() {
      this.number = this.number - 1 > 1 ? this.number - 1 : 1
    },
    // 增加数量
    addNumber() {
      this.number = this.number + 1
    }
  }
}
</script>

<style scoped>
/* .goods-xq {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 30;
  transform: translate3d(0, 0, 0);
  background-color: #fff;
  overflow: hidden;
} */
.image-header {
  position: relative;
  margin-bottom: 0.3rem;
  height: 6.75rem;
}
.image-header swiper {
  height: 6.75rem;
}
.image-header swiper swiper-item image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.gray-border {
  height: 0.28rem;
  background: #f8f8f8;
  clear: both;
}
/* 标题 */
.detail-body .goods-info {
  margin: 0.14rem 0.35rem;
  padding: 0;
  margin-top: 0.4rem;
}
.detail-body .goods-info p {
  color: #000;
  font-size: 0.33rem;
  margin: 0.21rem 0 0.07rem;
  height: 0.35rem;
  line-height: 0.35rem;
  overflow: hidden;
}
.detail-body .goods-info p.label {
  height: auto;
  overflow: inherit;
}
.detail-body .goods-info p.label span {
  background: #f08841;
  color: #fff;
  font-size: 0.24rem;
  padding: 0.05rem 0.14rem;
  border-radius: 0.07rem;
  margin-right: 0.28rem;
}
.detail-body .goods-info p.label span.two {
  background: #86c2f8;
}
.detail-body .goods-info p.info {
  color: #f58738;
  font-size: 0.26rem;
}
.detail-body .goods-info p.price {
  font-size: 0.33rem;
  margin: 0.22rem 0;
  color: #fa3c00;
  height: auto;
}
.detail-body .goods-info p.price span {
  font-size: 0.28rem;
  color: #a4a4a6;
}
/* 详情 */
.detail-body .goods-detail {
  margin-bottom: 1.12rem;
}
.detail-body .goods-detail h2 {
  text-align: center;
  color: #a4a4a6;
  font-size: 0.28rem;
  font-weight: normal;
  line-height: 0.5rem;
  background: #f9f9f9;
  width: 100%;
  margin: 0;
}
.detail-body .goods-detail .info {
  margin-top: 0;
  line-height: 0.5rem;
  font-size: 0.26rem;
  color: #333;
}
.detail-body .goods-detail .info img {
  display: block !important;
}
/* 返回按钮 */
/* .back {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 35px;
  height: 35px;
  background-color: rgba(7, 17, 27, 0.5);
  border-radius: 50%;
} */
/* 服务商品 */
.footer-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  border-top: 1px solid #ebebeb;
  height: 1rem;
  background: #fff;
}
.footer-cart .col {
  float: left;
  display: inline-block;
}
.footer-cart .col a {
  font-size: 16px;
  color: #666;
}
.footer-cart .cart {
  width: 25%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  border-right: 1px solid #eaeaea;
}
.footer-cart .cart2 {
  width: 50%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  border-right: 1px solid #eaeaea;
}
.footer-cart .chat {
  width: 25%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}
.footer-cart .buyBtn {
  width: 49.6%;
}
.footer-cart .buyBtn button {
  border-radius: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #32b287;
  color: #fff;
  font-size: 16px;
  border: none;
}
.footer-cart .cart button {
  border-radius: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  border: none;
}
.footer-cart .cart2 button {
  border-radius: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  border: none;
}
/* 实体商品 */
.footer-cart2 {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  border-top: 1px solid #ebebeb;
  height: 1rem;
  background: #fff;
}
.footer-cart2 .col {
  float: left;
  display: inline-block;
}
.footer-cart2 .col a {
  font-size: 16px;
  color: #666;
}
.footer-cart2 .chat {
  width: 50%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}
.footer-cart2 .buyBtn {
  width: 49.6%;
}
.footer-cart2 .buyBtn button {
  border-radius: 0;
  height: 1rem;
  line-height: 1rem;
  background-color: #32b287;
  color: #fff;
  font-size: 16px;
  border: none;
}
/* sku样式 */
.attr-pop-box {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 8;
  bottom: 0;
  /* display: none; */
}
.attr-pop {
  width: 100%;
  height: auto;
  max-height: 780rpx;
  padding: 31.25rpx;
  background: #fff;
  position: fixed;
  z-index: 9;
  bottom: 100rpx;
  overflow-y: auto;
}
.attr-pop .close {
  position: absolute;
  width: 62rpx;
  height: 62rpx;
  right: 100rpx;
  overflow: hidden;
  top: 28rpx;
}
.attr-pop .img-info {
  width: 687.5rpx;
  height: 177rpx;
  overflow: hidden;
  margin-bottom: 41.5rpx;
}
.attr-pop .img {
  float: left;
  height: 177rpx;
  width: 177rpx;
  background: #f4f4f4;
  margin-right: 31.25rpx;
}
.attr-pop .info {
  float: left;
  height: 177rpx;
  width: 440rpx;
  display: flex;
  align-items: center;
}
.attr-pop .p {
  font-size: 33rpx;
  color: #333;
  height: 33rpx;
  line-height: 33rpx;
  margin-bottom: 10rpx;
  color: #32b287;
}
.attr-pop .a {
  font-size: 36rpx;
  color: #333;
  height: 80rpx;
  line-height: 80rpx;
}
.spec-con {
  width: 92%;
  height: auto;
  overflow: hidden;
}
.spec-con .name {
  height: 32rpx;
  margin-bottom: 22rpx;
  font-size: 29rpx;
  color: #333;
}
.spec-con .values {
  height: auto;
  margin-bottom: 31.25rpx;
  font-size: 0;
}
.spec-con .value {
  display: inline-block;
  height: 62rpx;
  padding: 0 35rpx;
  line-height: 56rpx;
  text-align: center;
  margin-right: 25rpx;
  margin-bottom: 16.5rpx;
  font-size: 25rpx;
  color: #333;
  background: #f5f4f5;
}
.spec-con .value.disable {
  border: 1px solid #ccc;
  color: #ccc;
}
.spec-con .value.selected {
  background: #32b287;
  color: #fff;
}
.number-item .Inventory {
  width: 260rpx;
  height: 55rpx;
  float: left;
  line-height: 55rpx;
  font-size: 30rpx;
  color: #999;
}
.number-item .selnum {
  width: 230rpx;
  height: 55rpx;
  border: 1px solid #ccc;
  display: flex;
  float: right;
}
.number-item .cut {
  width: 75rpx;
  height: 100%;
  text-align: center;
  line-height: 55rpx;
}
.number-item .number {
  flex: 1;
  height: 100%;
  text-align: center;
  line-height: 68.75rpx;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  float: left;
  font-size: 32rpx;
}
.number-item .add {
  width: 75rpx;
  height: 100%;
  text-align: center;
  line-height: 55rpx;
}
.cell {
  padding: 0.15rem;
  overflow: hidden;
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 0.32rem;
}
.cell .col {
  float: left;
}
.span4 {
  width: 10%;
  text-align: right;
}
.span20 {
  width: 90%;
}
.span9 {
  width: 42%;
}
.span11 {
  width: 48%;
  text-align: right;
}
.chat button {
  height: 50px;
  color: #333;
  background: #fff;
  font-size: 32rpx;
  line-height: 50px;
}
</style>
