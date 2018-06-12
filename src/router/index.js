import Vue from 'vue'
import Router from 'vue-router'
import store from "../vuex";
import {getStorage} from "../utils/utils";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home/home.vue'),
      meta: {requireAuth: true, title: '首页'}
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('@/pages/compare/compare.vue'),
      meta: {requireAuth: true, title: '比对分析'}
    },
    {
      path: '/import',
      name: 'import',
      component: () => import('@/pages/import/import.vue'),
      meta: {requireAuth: true, title: '数据导入'}
    },
    {
      path: '/login',
      component: () => import('@/pages/login/login.vue'),
      meta: {title: '登录页'}
    }
  ]
});
//登录拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (getStorage('isLogin')) {
      store.commit('FETCH_USER_LOGIN', {isLogin: true, username:getStorage('username') })
    }
    if (store.state.login.isLogin) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login' // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
export default router
