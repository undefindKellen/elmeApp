<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore" class="star"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect :select-type="selectType" :only-content="onlyContent"
                      :ratings="ratings"></v-ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score" class="star"></v-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import BScroll from 'better-scroll';
  import star from '../star/star';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';

  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        this.ratings = response.data.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        });
      })
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-ratingselect': ratingselect
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/icon.css";
  @import "../../common/css/mixin.less";

  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    left: 0;
    overflow: hidden;
    .ratings-content {
      .overview {
        display: flex;
        padding: 18px 0px;
        .overview-left {
          flex: 0 0 137px;
          width: 137px;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          padding: 6px 0;
          @media only screen and (max-width: 320px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .score {
            line-height: 28px;
            font-size: 24px;
            color: rgb(255, 153, 0);
            margin-bottom: 6px;
          }
          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 12px;
            margin-bottom: 8px;
          }
          .rank {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .overview-right {
          flex: 1;
          padding: 6px 0px 6px 24px;
          @media only screen and (max-width: 320px) {
            padding-left: 6px;
          }
          .score-wrapper {
            line-height: 18px;
            margin-bottom: 8px;
            font-size: 0px;
            .title {
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .star {
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score {
              display: inline-block;
              vertical-align: top;
              color: rgb(255, 153, 0);
              font-size: 12px;
            }
          }
          .delivery-wrapper {
            font-size: 0;
            .title {
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .delivery {
              font-size: 12px;
              color: rgb(147, 153, 159);
              margin-left: 12px;
            }
          }
        }
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          display: flex;
          padding: 18px 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .avatar {
            flex: 0 0 28px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            overflow: hidden;
          }
          .content {
            flex: 1;
            position: relative;
            .name {
              line-height: 12px;
              font-size: 10px;
              color: rgb(7, 17, 27);
              margin-bottom: 4px;
            }
            .star-wrapper {
              margin-bottom: 6px;
              font-size: 0px;
              .star {
                display: inline-block;
                vertical-align: top;
                margin-right: 6px;
              }
              .delivery {
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .text {
              line-height: 18px;
              color: rgb(7, 17, 27);
              font-size: 12px;
              margin-bottom: 8px;
            }
            .recommend {
              line-height: 16px;
              .icon-thumb_up {
                display: inline-block;
                margin: 0 8px 4px 0;
                font-size: 12px;
                line-height: 16px;
                color: rgb(0, 160, 220);
              }
              .item {
                display: inline-block;
                margin: 0 8px 4px 0;
                padding: 0 6px;
                border-radius: 2px;
                border: 1px solid rgba(7, 17, 27, 0.1);
                background: #FFFFFF;
                font-size: 9px;
                line-height: 16px;
                color: rgb(147, 153, 159);
              }
            }
            .time{
              position: absolute;
              top: 0;
              right: 18px;
              font-size: 10px;
              font-weight: 200;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
</style>
