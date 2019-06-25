<template>
  <div class="review">
    <div class="detail">

      <div class="pannel">
        <a href="/pages/reviewDetail/index">
        <div class="title">
          <div class="col userAva">
            <img src="http://offer.net199.com/dingdong/xcx/demo/sf2.11740c0.jpg" alt="">
          </div>
          <div class="col message">
            <p>张曦月</p>
            <p class="time">2018-08-22 15:23:30</p>
          </div>
          <div class="col star">
            <i-rate @change="onChange1" :value="starIndex" size='20'></i-rate>
          </div>
        </div>
        <div class="textarea">
          <p class="info">专心服务，品质可以</p>
        </div>
        <div class="upload">
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
        </div>
        </a>
      </div>

      <div class="pannel">
        <a href="/pages/reviewDetail/index">
        <div class="title">
          <div class="col userAva">
            <img src="http://offer.net199.com/dingdong/xcx/demo/sf2.11740c0.jpg" alt="">
          </div>
          <div class="col message">
            <p>张曦月</p>
            <p class="time">2018-08-22 15:23:30</p>
          </div>
          <div class="col star">
            <i-rate @change="onChange1" :value="starIndex" size='20'></i-rate>
          </div>
        </div>
        <div class="textarea">
          <p class="info">专心服务，品质可以</p>
        </div>
        <div class="upload">
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
          <div class="van-col van-col--5">
            <img src="http://offer.net199.com/dingdong/xcx/shaitu.jpg">
          </div>
        </div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      starIndex: 4,
      files: []
    };
  },
  created() {},
  methods: {
    // toReview() {
    //   wx.navigateTo({
    //     url: '/pages/reviewList/index'
    //   })
    // },
    // 评分打星
    onChange1(e) {
      console.log("你点击了changes");
      const index = e.mp.detail.index;
      var _this = this;
      this.setData({
        starIndex: index
      });
      console.log(_this.starIndex);
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    },
    // 选择图片上传
    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths);
        },
        fail: function() {
          console.log("fail");
        },
        complete: function() {
          console.log("commplete");
        }
      });
    },
    // 预览图片
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    }
  }
};
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

.detail .textarea {
  padding: 0 0.3rem;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
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

.upload .van-col--5 {
  float: left;
}

.upload .van-col--5 img {
  width: 1.59rem;
  height: 1.59rem;
  margin: 0 0.08rem;
}

/* 底部按钮 */

/* .footer-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 99;
  border-top: 1px solid #ebebeb;
}
.footer-cart button {
  width: 100%;
  box-shadow: none;
  border-radius: 0;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.36rem;
  border: 0;
  background: #32b287;
  color: #fff;
} */
</style>
