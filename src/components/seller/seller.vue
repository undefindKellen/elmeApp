<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <v-star :size="36" :score="seller.score" class="star"></v-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li v-for="item in seller.supports" class="supports-item">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="pic-wrapper">
          <ul class="pic-list" ref="pic-list">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import BScroll from 'better-scroll';
  import star from '../star/star';
  import split from '../split/split';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    mounted() {
      this._initScroll();
      this._initPics();
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite() {
        this.favorite = !this.favotite;
      }
    },
    components: {
      'v-star': star,
      'v-split': split
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/mixin.less";
  @import "../../common/css/icon.css";

  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    .overview {
      padding: 18px;
      position: relative;
      .title {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .desc {
        padding-bottom: 18px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .star {
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
        }
        .text {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77, 89, 93);
        }
      }
      .remark {
        display: flex;
        margin-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          h2 {
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            font-size: 10px;
            color: rgb(7, 17, 27);
            font-weight: 200;
            line-height: 24px;
            .stress {
              font-size: 24px;
            }
          }
        }
        :last-child {
          border: none;
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 5px;
        top: 18px;
        text-align: center;
        .icon-favorite {
          display: block;
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;
          margin-bottom: 4px;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          color: rgb(77, 85, 93);
          font-size: 10px;
          line-height: 10px;
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0px 18px;
      .title {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .content {
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .supports-item {
          padding: 16px 12px;
          font-size: 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            margin-right: 6px;
            &.decrease {
              background-image: url("decrease_4@2x.png");
            }
            &.discount {
              background-image: url("discount_4@2x.png");
            }
            &.guarantee {
              background-image: url("guarantee_4@2x.png");
            }
            &.invoice {
              background-image: url("invoice_4@2x.png");
            }
            &.special {
              background-image: url("special_4@2x.png");
            }
          }
          .text {
            font-size: 12px;
            font-weight: 200;
            line-height: 16px;
            color: rgb(7, 17, 27);
          }
        }
        :last-child {
          .border-none();
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
          }
          :last-child {
            margin: 0;
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0px 18px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        font-size: 14px;
        line-height: 14px;
        .border-1px(rgba(7, 17, 27, 0.1));
      }
      .info-item {
        padding: 16px 12px;
        font-size: 12px;
        font-weight: 200;
        line-height: 16px;
        .border-1px(rgba(7, 17, 27, 0.1));
      }
      :last-child {
        .border-none();
      }
    }
  }
</style>
