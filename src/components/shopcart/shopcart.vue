<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <div class="title">购物车</div>
            <div class="empty" @click="empty">清空</div>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="food in selectFoods" class="food">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="es6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';

  export default {
    data() {
      return {
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        var total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        var count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        var show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {

        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`需要支付${this.totalPrice}元`);
      }
    },
    components: {
      'v-cartcontrol': cartcontrol
    }
  };
</script>

<style lang="less" scoped>
  @import "../../common/css/icon.css";
  @import "../../common/css/mixin.less";

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 48px;
    width: 100%;
    z-index: 50;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          border-radius: 50%;
          box-sizing: border-box;
          background: #141d27;
          width: 56px;
          height: 56px;
          vertical-align: top;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
              &.highlight {
                color: #FFFFFF;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 9px;
            color: #FFFFFF;
            font-weight: 700;
            border-radius: 16px;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          line-height: 24px;
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #FFFFFF;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 10px;
          margin: 12px 0 0 12px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          line-height: 48px;
          height: 48px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          text-align: center;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #FFFFFF;
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: -1;
      width: 100%;
      transform: translate3D(0, -100%, 0);
      &.fold-enter-active, .fold-leave-active {
        transition: all .5s;
      }
      &.fold-enter, .fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        overflow: hidden;
        padding: 0 18px;
        max-height: 217px;
        background: #FFFFFF;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }

  }

  .list-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s
    }
    &.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
  }
</style>
