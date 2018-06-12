<template>
  <div class="headerView clearfix">
    <div class="logo pull-left"></div>
    <ul class="nav pull-left">
      <li v-for="(item,index) in menus">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
    <div class="userInfo pull-right">
      <Icon type="person"></Icon>
      {{login.username}}
    </div>
  </div>
</template>
<script>
  import {Icon} from 'iview';
  import {mapState, mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        menus: [
          {name: '检索', path: '/home'},
          {name: '比对分析', path: '/compare'},
          {name: '数据导入', path: '/import'}
        ]
      }
    },
    methods: {},
    computed: {
      ...mapState(['login'])
    },
    components: {
      Icon
    },
  }
</script>
<style scoped lang="scss">
  .headerView {
    background: $header;
    width: 100%;
    .logo {
      @include wh(145px, 36px);
      background: url("../../images/css-spd.png") -94px -47px no-repeat;
      background-size: 800px;
      margin: 10px 20px;

    }
    .nav {
      li {
        float: left;
        padding: 20px;
        line-height: 24px;
        font-size: 16px;
        a.router-link-active {
          color: #93b3eb;
        }
      }
    }
    .userInfo{
      color:#fff;
      line-height: 64px;
      font-size: 20px;
      margin-right: 50px;
    }
  }

</style>
