<template>
  <div class="storeInfo">
    <div class="seller-header">
      <!-- 主要内容：左侧头像、右侧描述 -->
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            <span>{{ seller.description }}</span>
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="bulletin-wrapper" @click="showPop">
        <span class="brand"></span>
        <span class="text">{{ seller.introduction }}</span> <!--公告内容，目前是公司简介 -->
          <i-icon type="enter" color="#fff" size="12"/>
      </div>
      <!-- 背景 -->
      <div class="background">
        <img :src="seller.avatar">
      </div>
      <!-- 返回按钮 -->
      <div class="back" @click="backCategory">
        <i-icon type="return" color="#fff" size="30"/>
      </div>
      <!-- 弹出层 -->
      <div class="popup"  v-if="show">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
              <i-rate :value="seller.score" size='16' class="star"></i-rate>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家简介</div>
            <div class="line"></div>
          </div>
          <div class="detail-text">
              <p class="text">{{ seller.introduction }}</p>
          </div>
        </div>
        <div class="popup-close" @click="showPop">
          <i-icon type="close" color="#fff" size="36"/>
        </div>
      </div>
      <!-- 弹出层结束 -->
    </div>
    <div class="tab">
      <div class="navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title">{{item.name}}</div>
          </div>
        </block>
      </div>
      <div>
        <!-- 服务选项卡内容 -->
        <div :hidden="activeIndex != 0">
          <div class="goods-wrapper">
            <!-- 左侧分类列表 -->
            <div class="menu-wrapper">
             <ul>
              <li class="menu-item"
                  v-for="(item, index) in categoryList" :key="item.id"
                  :class="{'current':currentIndex == index}"
                  @click="addClass(index)"
                  >
                <span class="text" @click="onClick(index,item.id)">
                  {{ item.name }}
                </span>
              </li>
            </ul>
            </div>
            <!-- 右侧商品列表 -->
            <div class="foods-wrapper">
              <scroll-view scroll-y style="height: 100%;white-space:nowrap;">
              <ul>
                <li class="foods-item" v-for="(items, index) in goodsList" :key='index' @click="toInfo(items.id)">
                  <div class="icon">
                    <img :src="items.cover" alt="">
                  </div>
                  <div class="content">
                 <h2 class="name">{{ items.name }}</h2>
                  <!-- <p class="desc">{{ food.detail }}</p> -->
                  <div class="extra">
                    <span class="count">月售{{ items.sales_volume }}</span>
                    <span class="rating">好评率{{ items.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ items.price }}</span>
                    <span class="old" v-show="items.market_price">￥{{ items.market_price }}</span>
                  </div>
                  <div class="control">
                    <span>详情</span>
                  </div>
                </div>
                </li>
                <li v-if="goodsList.length === 0" class="noFoods">
                  <span>暂无商品数据...</span>
                </li>
              </ul>
              </scroll-view>
            </div>
          </div>
        </div>
        <!-- 服务选项卡内容结束 -->
        <!-- 评价选项卡内容 -->
        <div :hidden="activeIndex != 1">
          <div class="ratings">
             <scroll-view scroll-y style="height: 100%">
            <div class="ratings-content">
              <!-- 概览 -->
              <div class="overview">
                <div class="left">
                  <h1 class="score">{{sellerStar.star}}</h1>
                  <div class="title">综合评分</div>
                </div>

                <div class="right">
                  <div class="service">
                    <span class="title">店铺最高评分</span>
                    <!-- <star :size="36" :score="seller.serviceScore"></star> -->
                    <i-rate :value="sellerStar.star1" size='16' class="star"></i-rate>
                    <span class="score">{{sellerStar.star1}}</span>
                  </div>
                  <div class="goods">
                    <span class="title">服务质量评分</span>
                    <!-- <star :size="36" :score="seller.foodScore"></star> -->
                     <i-rate :value="sellerStar.service_star" size='16' class="star"></i-rate>
                    <span class="score">{{sellerStar.service_star}}</span>
                  </div>
                   <div class="goods">
                    <span class="title">服务人员评分</span>
                    <!-- <star :size="36" :score="seller.foodScore"></star> -->
                     <i-rate :value="sellerStar.service_people_star" size='16' class="star"></i-rate>
                    <span class="score">{{sellerStar.service_people_star}}</span>
                  </div>
                </div>
              </div>
              <!-- 横线分隔条 -->
              <div class="gray-border"></div>
              <!-- 客户评价 -->
              <div class="service_review">
                <div class="review-box" v-for="(rating,index) in evaluateList" :key="index">
                  <div class="title">
                    <div class="col infoBox" i-class="col-class">
                      <div class="col span6">
                        <img :src="rating.avatar">
                      </div>
                      <div class="col span18">
                        <p>{{rating.username}}</p>
                        <p class="time">{{rating.create_time}}</p>
                      </div>
                    </div>
                    <div class="col starBox">
                     <i-rate :value="rating.star" size='16' class="star"></i-rate>
                    </div>
                  </div>
                  <a href="">
                   <p class="info">{{rating.content}}</p>
                  </a>
                  <div class="print">
                    <ul class="print-list">
                      <li class="print-item" v-for="(img,index2) in rating.images" :key="index2" @click.stop="previewImage(rating.images, index2)" >
                        <img :src="img" alt="">
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="evaluateList.length === 0" class="noRating">
                  <span>暂无评价信息...</span>
                </div>
              </div>
            </div>
            </scroll-view>
          </div>
        </div>
        <!-- 评价选项卡内容结束 -->
      </div>
    </div>

  </div>

</template>

<script>
import { formatTime } from '@/utils/index'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

export default {
  components: {},
  data () {
    return {
      show: false,
      tabs: [
        {
          name: '服务',
          type: '1',
          checked: true
        },
        {
          name: '评价',
          type: '2',
          checked: true
        }
      ],
      currentIndex: 0,
      categoryList: [],
      goodsList: [],
      activeIndex: 0,
      seller: {},
      evaluateList: [],
      sellerStar: {}
    }
  },
  onShow () {
    this._initData()
  },
  created: function () {},
  mounted () {
    // 执行请求方法
  },
  computed: {
    navbarSliderClass () {
      if (this.activeIndex === 0) {
        return 'navbar_slider_0'
      }
      if (this.activeIndex === 1) {
        return 'navbar_slider_1'
      }
    }
  },
  methods: {
    // 预览评价列表图片
    previewImage (imgs = [], curIdx = 0) {
      wx.previewImage({ current: imgs[curIdx], urls: imgs })
    },
    toInfo (option) {
      wx.navigateTo({
        url: '/pages/goodsInfo/index?goods_id=' + option
      })
    },
    // 初始化数据
    _initData () {
      var id = parseInt(this.$root.$mp.query.store_id)
      var _this = this
      // 商品列表中获取左侧分类列表
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5badaadc78d7a',
        {
          store_id: id
        }
        )
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === 1) {
            _this.categoryList = response.data.data
            // console.log(_this.categoryList)
            _this.onClick(0, _this.categoryList[0].id)
          }
        })
        .catch(err => {
          console.log(err)
        })
      // 请求店铺信息
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b63ed7b1755f',
        {
          store_id: id
        }
        )
        .then(function (response) {
          if (response.data.code === 1) {
            // console.log(response.data.data)
            _this.seller = response.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      // 请求获取评价列表
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6e7fe34567f',
        {
          version: 'v3.0',
          app_id: 86793718,
          store_id: id
        }
        )
        .then(function (response) {
          console.log(response.data.msg)
          if (response.data.code === 1) {
            _this.sellerStar = response.data.data
            // console.log(response.data.data)
            _this.evaluateList = response.data.data.evaluateList
            console.log(response.data.data.evaluateList)
            // 格式化时间戳
            for (var i = 0; i < response.data.data.evaluateList.length; i++) {
              var ctime = response.data.data.evaluateList[i].create_time
              // console.log(create_time)
              var newDate = new Date()
              newDate.setTime(ctime * 1000)
              var format = formatTime(newDate)
              // console.log(format)
              response.data.data.evaluateList[i].create_time = format
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 返回按钮
    backCategory () {
      wx.redirectTo({
        url: '/pages/category/index?category_id=' + 2
      })
    },
    onClick (index, key) {
      var id = parseInt(this.$root.$mp.query.store_id)
      var _this = this
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5badaadc78d7a',
        {
          store_id: id,
          goods_type_id: _this.key
        }
        )
        .then(function (response) {
          // console.log(response.data)
          _this.goodsList = response.data.data[index].goodsList
          // console.log(response.data.data[index].goodsList)
        })
      _this.key = key
      // console.log(_this.key)
    },
    // 是否显示遮罩层
    showPop: function () {
      this.show = !this.show
    },
    // tab选项卡切换
    tabClick (e) {
      this.activeIndex = e.currentTarget.id
    },
    // 切换分类列表样式
    addClass: function (index) {
      this.currentIndex = index
    },
    // 下拉刷新
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
    }
  }
}
</script>

<style scoped>
.seller-header {
  position: relative;
  color: #fff;
  line-height: 1;
  font-size: 13px;
  font-weight: 200;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
}
.seller-header .content-wrapper {
  position: relative;
  padding: 24px 12px 18px 24px;
}
.seller-header .content-wrapper .avatar {
  display: inline-block;
  font-size: 14px;
  vertical-align: top;
}
.seller-header .content-wrapper .avatar img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
}
.seller-header .content-wrapper .content {
  display: inline-block;
  margin-left: 16px;
  width: 66%;
  height: 65px;
  overflow: hidden;
}
.content-wrapper .content .title {
  margin: 2px 0 8px 0;
}
.content-wrapper .content .title .brand {
  width: 30px;
  height: 18px;
  display: inline-block;
  vertical-align: top;
  background-size: 30px 18px;
  background-repeat: no-repeat;
  background-image: url(http://offer.net199.com/dingdong/xcx/sj.png);
}
.content-wrapper .content .title .name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.content-wrapper .content .description {
  margin-bottom: 10px;
  font-size: 13px;
  line-height: 18px;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.background img {
  width: 100%;
  height: 100%;
  filter: blur(10px);
}
.bulletin-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  background-color: rgba(7, 17, 27, 0.2);
  overflow: hidden;
}
.bulletin-wrapper .brand {
  display: inline-block;
  width: 22px;
  height: 12px;
  background-image: url(http://offer.net199.com/dingdong/xcx/bulletin@3x.ef83c55.png);
  background-size: 22px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
  margin-top: 8px;
}
.bulletin-wrapper .text {
  font-size: 12px;
  margin: 0 4px;
  vertical-align: top;
}
.bulletin-wrapper i-icon {
  float: right;
  position: absolute;
  top: 0;
  right: 12px;
}
.back {
  position: fixed;
  top: 25px;
  right: 19px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.back i-icon {
  display: block;
  padding: 4rpx;
}
.popup {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 100;
  overflow: auto;
  background-color: rgba(7, 17, 27, 0.8);
}
.detail-main {
  padding-top: 64px;
  padding-bottom: 64px;
}
.detail-main .name {
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
}
.detail-main .star-wrapper {
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
}
.detail-main .title {
  display: flex;
  width: 80%;
  margin: 28px auto;
}
.detail-main .title .line {
  flex: 1;
  position: relative;
  top: -6px;
  left: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.detail-main .title .text {
  text-align: center;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 600;
}
.detail-main .detail-text {
  width: 80%;
  margin: 0 auto;
}
.detail-main .detail-text .text {
  font-weight: normal;
  text-align: left;
  text-indent: 2em;
  font-size: 12px;
  line-height: 24px;
  padding: 0 12px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}
.popup-close {
  position: absolute;
  clear: both;
  width: 32px;
  height: 32px;
  font-size: 32px;
  margin: 0 auto;
  top: 87%;
  left: 0;
  right: 0;
}
/* 选项卡切换 */
.navbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
  top: 0;
  height: 30px;
  width: 100%;
  background-color: #fff;
}
.navbar_item {
  position: relative;
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 13px 0;
  text-align: center;
  font-size: 0;
}
.navbar_item_on {
  color: #f01414;
}
.navbar_title {
  font-weight: 500;
  display: inline-block;
  font-size: 15px;
  max-width: 8em;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  line-height: 1;
}
.navbar_slider {
  position: absolute;
  content: ' ';
  left: 0;
  bottom: 0;
  width: 6em;
  height: 3px;
  background-color: white;
  -webkit-transition: -webkit-transform 0.1s;
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
}
.navbar_slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.navbar_slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.navbar_slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
}
.goods-wrapper {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  border-top: 1px solid #eaeaea;
}
.goods-wrapper .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background-color: #f3f5f7;
}
.goods-wrapper .menu-wrapper .menu-item {
  display: table;
  width: 100%;
  height: 54px;
  line-height: 14px;
  text-align: center;
}
.current {
  position: relative;
  margin-top: -1px;
  background-color: #fff;
  font-weight: 700;
  z-index: 10;
}
.goods-wrapper .menu-wrapper .menu-item .text {
  font-size: 12px;
  display: table-cell;
  vertical-align: middle;
}
.foods-wrapper {
  flex: 1;
}
.foods-wrapper .foods-item {
  position: relative;
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eaeaea;
}
.foods-wrapper .foods-item .icon {
  flex: 0 0 72px;
  width: 72px;
  height: 72px;
  margin-right: 10px;
}
.foods-wrapper .foods-item .icon img {
  width: 72px;
  height: 72px;
}
.foods-wrapper .foods-item .content {
  flex: 1;
}

.foods-wrapper .foods-item .content .name {
  font-size: 14px;
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  width: 168px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.foods-wrapper .foods-item .content .desc {
  margin-bottom: 8px;
  line-height: 14px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.foods-wrapper .foods-item .content .extra {
  margin-bottom: 6px;
  line-height: 12px;
  font-size: 0;
  color: rgb(147, 153, 159);
}
.foods-wrapper .foods-item .content .count {
  font-size: 11px;
  margin-right: 12px;
}
.foods-wrapper .foods-item .content .rating {
  font-size: 11px;
}
.foods-wrapper .foods-item .content .price {
  font-weight: 700;
  line-height: 24px;
}
.foods-wrapper .foods-item .content .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.foods-wrapper .foods-item .content .price .old {
  font-size: 10px;
  color: rgb(147, 153, 159);
  text-decoration: line-through;
}
.foods-wrapper .foods-item .content .control {
  position: absolute;
  right: 0;
  bottom: 0.35rem;
}
.foods-wrapper .foods-item .content .control span {
  background: #5ed14f;
  color: #fff;
  padding: 0.06rem 0.14rem;
  border-radius: 0.07rem;
  font-size: 0.23rem;
}
/* 评价头部 */
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  border-top: 1px solid #eaeaea;
}
.ratings-content .overview {
  display: flex;
  padding: 18px 0;
}
.ratings-content .overview .left {
  flex: 0 0 137px;
  width: 137px;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
  text-align: center;
  padding: 6px 0;
}
.ratings-content .overview .left .score {
  line-height: 24px;
  font-size: 24px;
  color: rgb(255, 153, 0);
  margin-bottom: 6px;
}
.ratings-content .overview .left .title {
  line-height: 12px;
  font-size: 12px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
}
.ratings-content .overview .left .rank {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.ratings-content .overview .right {
  flex: 1;
  padding: 6px 0 6px 24px;
}
.ratings-content .overview .right .service,
.ratings-content .overview .right .goods {
  margin-bottom: 8px;
  line-height: 18px;
  font-size: 0.28rem;
  color: rgb(255, 153, 0);
}
.ratings-content .overview .right .service .title,
.ratings-content .overview .right .goods .title {
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.ratings-content .overview .right .service i-rate,
.ratings-content .overview .right .goods i-rate {
  display: inline-block;
  vertical-align: top;
  margin: -3px 12px;
}
.ratings-content .overview .right .delivery {
  line-height: 18px;
  font-size: 0;
}
.ratings-content .overview .right .delivery .title {
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.ratings-content .overview .right .delivery .time {
  font-size: 12px;
  margin: 0 12px;
  color: rgb(147, 153, 159);
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
}
/* 评价底部*/
.service_review .review-box {
  border-bottom: 0.014rem solid #ebebeb;
  display: inline-block;
  width: 100%;
}
.service_review .review-box .title {
  padding: 0.25rem 0.25rem 0;
}
.service_review .review-box .title .col {
  float: left;
}
.service_review .review-box .title .span18 {
  margin-left: 0.15rem;
}
.service_review .review-box .title .infoBox {
  width: 70%;
}
.service_review .review-box .title .infoBox img {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 100%;
}
.service_review .review-box .title .infoBox p {
  color: #000;
  margin: 0;
  font-size: 0.28rem;
  line-height: 0.3rem;
}
.service_review .review-box .title .infoBox p.time {
  color: #a4a4a6;
  font-size: 0.25rem;
  margin-top: 0.18rem;
}
.service_review .review-box .title .starBox {
  width: 30%;
  text-align: right;
  line-height: 1;
}
.service_review .review-box .info {
  clear: both;
  padding: 0.15rem 0.25rem;
  margin: 0;
  color: #333;
  font-size: 0.28rem;
  line-height: 0.4rem;
}
.service_review .review-box .print {
  padding: 0 0.25rem 0.15rem;
}
.service_review .review-box .print .print-item {
  width: 17%;
  display: inline-block;
  padding: 0 0.11rem;
}
.service_review .review-box .print .print-item img {
  width: 100%;
  height: 1.05rem;
}
/* 没有数据显示 */
.noRating {
  text-align: center;
  padding: 0.5rem;
}
.noFoods {
  text-align: center;
  padding: 0.5rem;
}
.noFoods span {
  font-size: 0.32rem;
}
.noRating span {
  font-size: 0.32rem;
}
</style>
