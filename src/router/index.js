import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Seller from '@/components/seller/seller'
import Rating from '@/components/rating/rating'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: Goods,
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/rating',
      name: 'Rating',
      component: Rating
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
