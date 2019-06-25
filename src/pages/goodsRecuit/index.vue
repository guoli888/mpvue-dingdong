<template>
  <div class="goodsRecuit">
     <!-- 客户评价 -->
      <div class="service_review" v-if="isRatting">
        <div class="review-box" v-for="(rating,index) in serviceList" :key="index">
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
        <div v-if="serviceList.length === 0" class="noRating">
          <div class="no-data" v-if="isEmpty">
            <img src="http://offer.net199.com/dingdong/xcx/search.png" alt="无商品">
            <p>暂无评价数据...</p>
          </div>
        </div>
        <div class="weui-loadmore" v-if="loadMore">
          <div class="weui-loading"></div>
          <div class="weui-loadmore__tips">正在加载</div>
        </div>
      </div>
  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
import { formatTime } from '@/utils/index'
export default {
  components: {},

  data() {
    return {
      rangeValue: 40,
      serviceList: [],
      // ratings-select 界面组件文字
      loading: false,
      finished: false,
      page: 1,
      // 只显示有内容的评价
      onlyContent: false,
      isRatting: true,
      isEmpty: false,
      loadMore: false
    }
  },
  onReachBottom() {
    var id = parseInt(this.$root.$mp.query.goods_id)
    var that = this
    // 上拉加载需要处理的事情
    that.loadMore = true
    that.page += 1
    setTimeout(function() {
      console.log('倒计时结束，上拉加载更多')
      // 请求方法
      fly
        .get(
          'https://xiaochengxu.net199.com/public/index.php/api/5b6e5acd6aed3',
          {
            version: 'v3.0',
            app_id: 86793718,
            goods_id: id,
            page: that.page
          }
        )
        .then(function(response) {
          console.log(response)
          if (response.data.data.length > 1) {
            // _this.serviceList = response.data.data
            console.log(response.data.data)
            let List1 = response.data.data
            for (var i = 0; i < List1.length; i++) {
              var cTime = that.List1[i].create_time
              // console.log(create_time)
              var newDate = new Date()
              newDate.setTime(cTime * 1000)
              var format = formatTime(newDate)
              // console.log(format)
              List1[i].create_time = format
            }
            that.serviceList = that.indexList.concat(List1)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      that.loadMore = false
      return that.loadMore
    }, 500)
    console.log(that.page)
  },
  onShow() {
    this.page = 1
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
        var goodId = this.$root.$mp.query.goods_id
        fly
          .get(
            'https://xiaochengxu.net199.com/public/index.php/api/5b6e5acd6aed3',
            {
              version: 'v3.0',
              app_id: 86793718,
              goods_id: goodId,
              page: _this.page
              // size: 4
            }
          )
          .then(function(response) {
            if (response.data.code === 1) {
              _this.serviceList = response.data.data
              console.log(response.data.data)
              let List = response.data.data
              // if (List.length === 0) {
              //   if (_this.page === 1) {
              //     _this.isRatting = false
              //     _this.isEmpty = true
              //     return false
              //   }
              //   _this.finished = true
              //   _this.loading = false
              //   return false
              // }
              // if (_this.serviceList) {
              //   console.log(_this.serviceList)
              //   _this.serviceList = _this.serviceList.concat(List)
              // } else {
              //   _this.serviceList = List
              // }
              _this.serviceList = List
              for (var i = 0; i < _this.serviceList.length; i++) {
                var cTime = _this.serviceList[i].create_time
                // console.log(create_time)
                var newDate = new Date()
                newDate.setTime(cTime * 1000)
                var format = formatTime(newDate)
                // console.log(format)
                _this.serviceList[i].create_time = format
              }
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }, 300)
    },
    // 预览评价列表图片
    previewImage(imgs = [], curIdx = 0) {
      wx.previewImage({ current: imgs[curIdx], urls: imgs })
    }
  }
}
</script>

<style scoped>
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
