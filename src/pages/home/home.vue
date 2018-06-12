<template>
  <div class="home">
    <header-view></header-view>
    <div class="content">
      <div class="search-box">
        <Select
          v-model="search"
          filterable
          remote
          clearable
          :loading="loading"
          not-found-text=""
          :remote-method="remoteMethod"
          placeholder=""
          @on-query-change="searchEmpty"
        >
          <Option v-for="(option, index) in options"
                  :value="option.label"
                  :key="index"
                  style="text-align: left;
                  line-height: 30px;
                  padding: 0 10px;"
                  :class="tt"
          >{{option.label}} <span class="pull-right"

          >搜索 <font style="color:#498cff">{{option.value}}</font> 次</span></Option>
        </Select>
        <Icon type="ios-search-strong" size="20"></Icon>
        <p>
          <br>
          I. 输入'and','or'支持'与','或'多条件检索，如：马建刚 and 崔菲菲；<br/>
          II.支持检索'姓名/身份证/手机/QQ/车牌‘；<br/>
          III.'?' 支持缺失检索，补充字符，如‘马?刚’；
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import headerView from '../../components/headerView/headerView'
  import {Input, Button, Icon, Select, Option} from 'iview';
  import {$http} from '../../utils/utils';
  import api from '../../api';

  export default {
    data() {
      return {
        search: '',
        options: [],
        loading:false
      }
    },
    methods: {
      remoteMethod(keyword) {
        //search/suggest?keyword=1

      },
      searchEmpty(keyword){
        if (keyword !== '') {
          $http(api.suggest,{keyword},data=>{
            this.options= data.data.map(item => {
              return {
                value: item.count,
                label: item.query
              };
            });
          },error=>{
          },'get');
        } else {
          this.options = [];
        }

      }
    },
    computed: {},
    components: {
      headerView,
      Input,
      Button,
      Icon,
      Select,
      Option
    },
  }
</script>
<style scoped lang="scss">
  .content {
    background: url("../../images/index-bg.jpg") no-repeat;
    background-position: 0 -120px;
    background-size: 100% 110vh;
    height: calc(100vh - 64px);
    @include child-center('x');
    .search-box {
      width: 600px;
      margin-top: 100px;
      position: relative;
      p {
        text-align: left;
        color: #fff;
        padding-left: 20px;
        font-weight: 900;
        font-size: 14px;
        line-height: 30px;
      }
      .ivu-icon-ios-search-strong {
        @include wh(50px, 33px);
        background: $blue;
        color: #fff;
        line-height: 34px;
        vertical-align: -5px;
        border-radius: 0 5px 5px 0;
        position: absolute;
        right: 0;
        top:0;
        &:active {
          background: darken($blue, 10%);
        }
      }
      .ivu-select {
        @include wh(595px, 30px);
      }

    }
  }

</style>
