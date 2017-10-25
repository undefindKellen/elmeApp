<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType===2}" @click="select(2)">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':selectType===0}" @click="select(0)">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':selectType===1}" @click="select(1)">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="es6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives() {
        let list = [];
        for (let i = 0; i < this.ratings.length; i++) {
          if (this.ratings[i].rateType === POSITIVE) {
            list.push(this.ratings[i])
          }
        }
//        console.log(list);
        return list;
      },
      negatives() {
        let list = [];
        for (let i = 0; i < this.ratings.length; i++) {
          if (this.ratings[i].rateType === NEGATIVE) {
            list.push(this.ratings[i])
          }
        }
//        console.log(list);
        return list;
      }
    },
    methods: {
      select(type) {
        this.selectType = type;
        this.$emit('ratingType.select', type);
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$emit('onlyContent.toggle', this.onlyContent);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/mixin.less";

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0px;
      .border-1px(rgba(7, 17, 27, 0.1));
      .block {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 2px;
        margin-right: 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        &.active {
          color: #FFFFFF;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
      }
    }
    .switch {
      padding: 12px 16px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0px;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        margin-right: 4px;
      }
      .text {
        font-size: 12px;
        display: inline-block;
        vertical-align: top;
      }
    }
  }
</style>
