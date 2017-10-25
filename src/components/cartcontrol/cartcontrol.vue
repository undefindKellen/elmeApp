<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">

          <span class="inner icon-remove_circle_outline"></span>

      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="es6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, "count", 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/icon.css";

  .cart-control {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      &.move-enter {
        opacity: 0;
        transform: translateX(24px);
      }
      &.move-enter-active {
        opacity: 1;
        transition: all 0.2s linear;
      }
      &.move-leave {
        opacity: 1;
        transform: translateX(24px);
      }
      &.move-leave-active {
        opacity: 0;
        transition: all 0.1s linear;
      }
      .inner {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        &.rorate-enter, .rorate-leave{
          transform: rorate(0);
        }
        &.rorate-leave-active, .rorate-enter-active{
          transform: rorate(0);
          transition: all 0.4s linear;
        }
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
