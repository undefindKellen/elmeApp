<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="goto"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><span class="goto"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="item in seller.supports" class="class-item">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail"></div>
      </div>
    </transition>
  </div>
</template>

<script type="es6">
  import star from '../../components/star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      closeDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {'v-star': star}
  }
</script>

<style scoped>
  @import "../../common/css/base.css";

  .header {
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    overflow: hidden;
  }

  .content-wrapper {
    color: #FFFFFF;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }

  .content-wrapper .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .content-wrapper .avatar img {
    border-radius: 2px;
  }

  .content-wrapper .content {
    display: inline-block;
    margin-left: 16px;
  }

  .content-wrapper .content .title {
    font-size: 0px;
    margin: 2px 0 8px 0;
  }

  .content-wrapper .content .title .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background-image: url("brand@2x.png");
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }

  .content-wrapper .content .title .name {
    font-weight: bold;
    line-height: 18px;
    font-size: 16px;
    margin-left: 6px;
  }

  .content-wrapper .content .description {
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 10px;
    font-weight: 200;
  }

  .content-wrapper .content .support .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    margin-right: 4px;
  }

  .content-wrapper .content .support .decrease {
    background-image: url("decrease_1@2x.png");
  }

  .content-wrapper .content .support .discount {
    background-image: url("discount_1@2x.png");
  }

  .content-wrapper .content .support .guarantee {
    background-image: url("guarantee_1@2x.png");
  }

  .content-wrapper .content .support .invoice {
    background-image: url("invoice_1@2x.png");
  }

  .content-wrapper .content .support .special {
    background-image: url("special_1@2x.png");
  }

  .content-wrapper .content .support .text {
    font-size: 12px;
    line-height: 12px;
    font-weight: 200;
  }

  .content-wrapper .supports-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 3px 8px 0px 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    text-align: center;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.2);
  }
  .content-wrapper .supports-count .goto{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-bottom: -2px;
    margin-left: 2px;
    background-image: url("goto.png");
    background-size: 14px 14px;
    background-repeat: no-repeat;
  }

  .content-wrapper .supports-count .count {
    font-size: 10px;
  }

  .content-wrapper .supports-count .icon-keyboard_arrow_right {
    font-size: 10px;
  }

  .bulletin-wrapper {
    height: 28px;
    background: rgba(7, 17, 27, 0.2);
    padding: 0 12px;
  }

  .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    width: 22px;
    height: 12px;
    margin-top: 7px;
    margin-right: 4px;
    background-size: 22px 12px;
    background-repeat: no-repeat;
    background-image: url("bulletin@2x.png");
  }

  .bulletin-wrapper .bulletin-text {
    display: inline-block;
    font-size: 10px;
    font-weight: 200;
    line-height: 28px;
    width: 87%;
    color: #FFFFFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .bulletin-wrapper .goto{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: top;
    margin-top: 7px;
    margin-left: 4px;
    background-image: url("goto.png");
    background-size: 14px 14px;
    background-repeat: no-repeat;
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .background img {
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 100;
    backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, 0.8);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }

  .detail .detail-wrapper {
    min-height: 100%;
    width: 100%;
  }

  .detail .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  .detail .detail-wrapper .detail-main .name {
    color: #FFFFFF;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    text-align: center;
  }

  .detail .detail-wrapper .detail-main .star-wrapper {
    height: 24px;
    margin: 16px auto 28px auto;
    text-align: center;
  }

  .detail .detail-wrapper .detail-main .title {
    display: flex;
    width: 80%;
    text-align: center;
    margin: 0 auto 24px auto;
  }

  .detail .detail-wrapper .detail-main .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .detail .detail-wrapper .detail-main .title .text {
    padding: 0 12px;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 15px;
  }

  .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.5);
    margin: -64px auto 0px auto;
    clear: both;
    background-image: url("close.png");
    background-size: 32px 32px;
    background-repeat: no-repeat;
  }

  .detail .detail-wrapper .detail-main .supports {
    width: 80%;
    margin: 0 auto 28px auto;
  }

  .detail .detail-wrapper .detail-main .supports .class-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0px;
  }

  .detail .detail-wrapper .detail-main .supports .class-item:last-child {
    margin-bottom: 0px;
  }

  .detail .detail-wrapper .detail-main .supports .class-item .text {
    font-size: 12px;
    color: #FFFFFF;
    line-height: 16px;
    text-align: center;
    font-weight: 200;
  }

  .detail .detail-wrapper .detail-main .supports .class-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }

  .detail .detail-wrapper .detail-main .supports .class-item .decrease {
    background-image: url("decrease_2@2x.png");
  }

  .detail .detail-wrapper .detail-main .supports .class-item .discount {
    background-image: url("discount_1@2x.png");
  }

  .detail .detail-wrapper .detail-main .supports .class-item .guarantee {
    background-image: url("guarantee_2@2x.png");
  }

  .detail .detail-wrapper .detail-main .supports .class-item .invoice {
    background-image: url("invoice_2@2x.png");
  }

  .detail .detail-wrapper .detail-main .supports .class-item .special {
    background-image: url("special_2@2x.png");
  }

  .detail .detail-wrapper .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
  }

  .detail .detail-wrapper .detail-main .bulletin .content {
    padding: 0 12px;
    font-size: 12px;
    font-weight: 200;
    color: #FFFFFF;
    line-height: 24px;
  }

  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .content-wrapper .content .title .brand {
      background-image: url("brand@3x.png");
    }

    .content-wrapper .content .support .decrease {
      background-image: url("decrease_1@3x.png");
    }

    .content-wrapper .content .support .discount {
      background-image: url("discount_1@3x.png");
    }

    .content-wrapper .content .support .guarantee {
      background-image: url("guarantee_1@3x.png");
    }

    .content-wrapper .content .support .invoice {
      background-image: url("invoice_1@3x.png");
    }

    .content-wrapper .content .support .special {
      background-image: url("special_1@3x.png");
    }
  }

</style>
