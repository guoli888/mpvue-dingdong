<template>
  <div class="review">
    <div class="detail">
      <div class="pannel">
        <div class="title">
          <div class="col userAva">
           <open-data class="thumb" type="userAvatarUrl"></open-data>
          </div>
          <div class="col message">
            <p>服务评分</p>
          </div>
          <div class="col star">
            <i-rate @change="onChange1" :value="starIndex" size='30'></i-rate>
          </div>
        </div>
        <div class="textarea">
          <textarea placeholder="满足您的期待吗？说说你的使用心得" :value='conte' v-model="conte" class="van-field__control"></textarea>
        </div>
        <div class="upload">
          <div class="weui-uploader__bd">
            <div class="weui-uploader__files" id="uploaderFiles">
              <block v-for="(item,index) in files" :key="index">
                <div class="weui-uploader__file" @click="predivImage" :id="item">
                  <image class="weui-uploader__img" :src="item" mode="aspectFill" />
                </div>
                 <span class="list-img-close" @click='delImage(index)'></span>
              </block>
            </div>
            <div class="weui-uploader__input-box">
              <div class="weui-uploader__input" @click="chooseImage"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="gray-border"></div>
      <div class="title two" v-if="is_service===1">
          <div class="col userAva">
            <i-icon type="editor" slot="icon" size="25" color="#a4a4a6" />
          </div>
          <div class="col message">
            <p>服务人员评分</p>
          </div>
          <div class="col star">
            <i-rate @change="onChange2" :value="starIndex2" size='30'></i-rate>
          </div>
        </div>


    </div>
    <div class="footer-cart">
      <div span="24">
        <button type="primary" @click="toReview">评价</button>
      </div>
    </div>
  </div>
</template>

<script>
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
import { getBase64Image } from '@/utils/index'
export default {
  components: {},

  data () {
    return {
      starIndex: 0,
      starIndex2: 0,
      files: [],
      conte: '',
      is_service: 0,
      url: '',
      base64files: []
    }
  },
  mounted () {
    this.is_service = parseInt(this.$root.$mp.query.is_service)
    // console.log(this.is_service)
  },
  created () {},
  methods: {
    toReview () {
      var order_id = parseInt(this.$root.$mp.query.order_id)
      var _this = this
      wx.request({
        url: 'http://60.174.234.53:2006/Mobile/Order/doPostCommentByImgStr',
        method: 'post',
        data: {
          access_token: wx.getStorageSync('token'),
          order_id: parseInt(this.$root.$mp.query.order_id),
          imgAddr: _this.base64files,
          content: _this.conte,
          star: _this.starIndex,
          service_people_star: _this.starIndex2,
          is_service: _this.is_service
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (response) {
          console.log(response)
          wx.showToast({
            title: response.data.msg,
            icon: 'none',
            duration: 1500,
            mask: false
          })
          if (response.data.code === 1) {
            console.log(response.data.data)
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/reviewDetail/index?order_id=' + order_id
              })
            }, 700)
          } else {
          }
        }
      })
    },
    onChange1 (e) {
      const index = e.mp.detail.index
      var _this = this
      this.setData({
        starIndex: index
      })
      console.log(_this.starIndex)
    },
    onChange2 (e) {
      const index = e.mp.detail.index
      var _this = this
      this.setData({
        starIndex2: index
      })
      console.log(_this.starIndex2)
    },
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    chooseImage (e) {
      var _this = this
      const fileManager = wx.getFileSystemManager()
      wx.chooseImage({
        count: 5,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
          var tempFilePaths = res.tempFilePaths
          for (var i = 0; i < tempFilePaths.length; i++) {
            let base64 = fileManager.readFileSync(
              res.tempFilePaths[i],
              'base64'
            )
            wx.request({
              url: 'http://60.174.234.53:2006/Mobile/Order/uploadPublicImg',
              method: 'post',
              data: {
                access_token: wx.getStorageSync('token'),
                imgData: base64
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (response) {
                console.log(response)
                if (response.data.code === 1) {
                  _this.base64files.push(response.data.raw_img_addr)
                  console.log(_this.base64files)
                }
              }
            })
          }
        },
        fail: function () {
          console.log('fail')
        },
        complete: function () {
          console.log('commplete')
        }
      })
    },

    predivImage (e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
      console.log(this.urls)
    },
    delImage (index) {
      var _this = this
      wx.showModal({
        // title: '标题',
        content: '您要删除当前照片吗？',
        cancelText: '取消',
        confirmText: '确认',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            _this.base64files.splice(index, 1)
            _this.files.splice(index, 1)
          } else {
            console.log('点击了取消')
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
}
.detail .title {
  padding: 0rem 0.35rem 0;
  overflow: hidden;
  border-bottom: 1px solid #ebebeb;
}
.detail .title.two {
  padding-top: 0.2rem;
  border: none;
}
.userAva {
  width: 20%;
}
.userAva img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.userAva thumb {
  width: 1.34rem;
  height: 1.34rem;
  border-radius: 50%;
  overflow: hidden;
}
.detail .title.two .userAva {
  width: 10%;
  line-height: 1rem !important;
}
.message {
  width: 20%;
}
.detail .title.two .message {
  width: 30%;
}
.message p {
  color: #a4a4a6;
  font-size: 0.28rem;
  line-height: 1rem;
}
.star {
  width: 60%;
  text-align: right;
  height: 100rpx;
  line-height: 80rpx;
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
.upload {
  padding: 0rem 0.3rem 0;
  /* overflow: hidden; */
}
/* 底部按钮 */
.footer-cart {
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
}
.gray-border {
  height: 0.2rem;
  background: #f8f8f8;
  clear: both;
  margin-top: 0.3rem;
}
.list-img-close {
  background: url(http://offer.net199.com/wowo/images/cha.png) no-repeat right
    top;
  border-color: #ff4a00;
  background-position: center;
  background-size: 0.4rem 0.4rem;
  display: block;
  float: left;
  width: 0.4rem;
  height: 0.4rem;
  position: relative;
  left: -20px;
  top: -10px;
  z-index: 10;
  text-align: center;
}
.weui-uploader__bd {
  overflow: visible;
}
</style>
