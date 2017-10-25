<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/rating" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="es6">
  import header from './components/header/header.vue'

  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        this.seller = response.data.data;
      });
    },
    components: {'v-header': header}
  }
</script>

<style>
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  #app .tab .router-link-exact-active {
    color: rgb(240, 20, 20);
  }

  .border-1px {
    position: relative;
  }

  .border-1px:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: ' ';
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }

  @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
    .border-1px:after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .border-1px:after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
</style>
