<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px"><span v-show="item.type>0" :class="classMap[item.type]"
                                              class="icon"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice"
                                                                class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
                :select-foods="selectFoods"></v-shopcart>

    <v-food :food="selectedFood" ref="food"></v-food>
  </div>
</template>

<script type="es6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(function (good) {
          good.foods.forEach(function (food) {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        this.goods = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        })
      })
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 500);
        console.log(index);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
       // console.log(food);
         this.selectedFood = food;
         //console.log(this.selectedFood);
        this.$refs.food.show();
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        var height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i].clientHeight;
          height += item;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol,
      'v-food': food
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/mixin.less";

  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #FFFFFF;
          font-weight: 700;
          .text {
            .border-none()
          }
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          margin-right: 2px;
          &.decrease {
            background-image: url("decrease_3@2x.png");
          }
          &.discount {
            background-image: url("discount_3@2x.png");
          }
          &.guarantee {
            background-image: url("guarantee_3@2x.png");
          }
          &.invoice {
            background-image: url("invoice_3@2x.png");
          }
          &.special {
            background-image: url("special_3@2x.png");
          }
        }
        .text {
          display: table-cell;
          height: 56px;
          vertical-align: middle;
          font-size: 12px;
          .border-1px(rgba(7, 17, 27, 0.1))
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .foods-list {
        .title {
          height: 26px;
          padding-left: 14px;
          border-left: 2px solid #d9dde1;
          background: #f3f5f7;
          font-size: 12px;
          color: rgb(147, 153, 159);
          line-height: 26px;
        }
        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          .border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            .border-none();
            margin-bottom: 0;
          }
          .icon {
            flex: 0 0 57px;
            margin-right: 10px;
          }
          .content {
            flex: 1;
            .name {
              font-size: 14px;
              height: 14px;
              line-height: 14px;
              color: rgb(7, 17, 27);
              margin: 2px 0 8px 0;
            }
            .desc {
              display: inline-block;
              line-height: 12px;
              font-size: 10px;
              margin-bottom: 8px;
              color: rgb(147, 153, 159);
            }
            .extra {
              line-height: 10px;
              height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              .count {
                margin-right: 12px;
              }
            }
            .price {
              font-weight: 700;
              line-height: 24px;
              .now {
                margin-right: 8px;
                font-size: 14px;
                color: rgb(240, 20, 20);
              }
              .old {
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .cartcontrol-wrapper {
              position: absolute;
              right: 0;
              bottom: 12px;
            }
          }
        }
      }
    }
  }


</style>
