<template>
  <div class="review">
    <div class="detail">

      <div class="pannel">
        <div class="title">
          <div class="col userAva">
            <img :src="avatar" alt="">
          </div>
          <div class="col message">
            <p>{{username}}</p>
            <p class="time">{{create_time}}</p>
          </div>
          <div class="col star">
            <p>已评价</p>
          </div>
        </div>
        <div class="star-box">
          <div class="row">
            <div class="col span8">
              <span>服务评分:</span>
            </div>
            <div class="col span16">
              <i-rate :value="star" size='26'></i-rate>
            </div>
          </div>
          <div class="row">
            <div class="col span8">
              <span>服务人员评分:</span>
            </div>
            <div class="col span16">
              <i-rate :value="service_people_star" size='26'></i-rate>
            </div>
          </div>
        </div>
        <div class="textarea">
          <span>评价详情</span>
          <p class="info">{{content}}</p>
        </div>
        <div class="upload">
          <div class="van-col van-col--5" v-for="(item,index) in imageslist" :key="inded">
            <img :src="item" mode='widthFix'>
          </div>
        </div>
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

  data() {
    return {
      starIndex: 4,
      files: [],
      username: '',
      avatar: '',
      star: '',
      service_people_star: 0,
      create_time: '',
      imageslist: [],
      content: '',
      store_id: ''
    }
  },
  mounted() {
    this._initData()
  },
  created() {},
  methods: {
    // 页面初始化执行的方法
    _initData() {
      var _this = this
      wx.request({
        url:
          'https://xiaochengxu.net199.com/public/index.php/api/5b7e45d9046eb',
        method: 'get',
        data: {
          version: 'v3.0',
          app_id: '86793718',
          order_id: parseInt(this.$root.$mp.query.order_id)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function(response) {
          console.log(response.data.data)
          _this.username = response.data.data.username
          _this.avatar = response.data.data.avatar
          _this.star = response.data.data.star
          _this.service_people_star = response.data.data.service_people_star
          _this.imageslist = response.data.data.images
          _this.content = response.data.data.content
          var creatime = response.data.data.create_time
          var newDate = new Date()
          newDate.setTime(creatime * 1000)
          var createTime = formatTime(newDate)
          _this.create_time = createTime
        }
      })
    },
    // 评分打星
    onChange1(e) {
      console.log('你点击了changes')
      const index = e.mp.detail.index
      var _this = this
      this.setData({
        starIndex: index
      })
      console.log(_this.starIndex)
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    // 选择图片上传
    chooseImage(e) {
      var _this = this
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
        },
        fail: function() {
          console.log('fail')
        },
        complete: function() {
          console.log('commplete')
        }
      })
    },
    // 预览图片
    predivImage(e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style scoped>
.col {
  float: left;
}
.pannel {
  border-bottom: 1px solid #ebebeb;
  padding: 0.4rem 0 0.2rem;
}
.pannel:last-child {
  border: none;
}
.detail .title {
  padding: 0rem 0.35rem 0;
  overflow: hidden;
}
.userAva {
  width: 20%;
}
.userAva img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.message {
  width: 45%;
}
.message p {
  color: #000;
  margin: 0;
  font-size: 0.3rem;
  line-height: 0.4rem;
}
.message p.time {
  color: #a4a4a6;
  font-size: 0.28rem;
  margin-top: 0.1rem;
}
.star {
  width: 35%;
  text-align: right;
  height: 0.5rem;
  line-height: 0.4rem;
}
.star p {
  color: #a4a4a6;
  font-size: 0.28rem;
  margin-top: 0.46rem;
}
.detail .textarea {
  padding: 0 0.3rem;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
}
.detail .textarea span {
  width: 100%;
  background: #fafafa;
  color: #333;
  font-size: 0.36rem;
  float: left;
  text-align: center;
  margin-bottom: 0.3rem;
}
.detail .textarea textarea {
  background: #f9f9f9;
  font-size: 0.32rem;
  width: auto;
  height: 2rem;
  padding: 0.25rem;
}
.detail .textarea .info {
  clear: both;
  padding: 0 0 0.1rem;
  margin: 0;
  color: #333;
  font-size: 0.3rem;
  line-height: 0.5rem;
}
.upload {
  padding: 0rem 0.3rem 0;
  overflow: hidden;
}
.upload .van-col--5 img {
  width: 100%;
  height: auto;
}
.star-box {
  position: relative;
}
.star-box .row {
  overflow: hidden;
  display: block;
  font-size: 0.32rem;
  padding: 0.15rem 0.35rem;
}
.span8 {
  width: 32%;
}
.span16 {
  width: 67%;
  line-height: 1;
}
</style>
