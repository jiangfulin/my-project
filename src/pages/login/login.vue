<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo"></div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
          <Input type="text"
                 v-model="formInline.username"
                 placeholder="用户名"
                 clearable
          >
          <Icon type="person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password"
                 v-model="formInline.password"
                 placeholder="密码"
                 clearable
                 @on-enter="handleSubmit(formInline)"
          >
          <Icon type="locked" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <RadioGroup v-model="formInline.role"
                      style="width: 100%;
                      text-align: left;"
          >
            <Radio label="0">
              <span>普通用户</span>
            </Radio>
            <Radio label="1">
              <span>管理员</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  style="line-height: 32px;"
                  long
                  @click="handleSubmit(formInline)"
          >{{loginBtn}}

          </Button>
        </FormItem>
      </Form>
      {{data}}
    </div>
  </div>
</template>


<script>
  import {Input, Icon, Radio, RadioGroup, Button, FormItem, Form} from 'iview';
  import {mapState, mapMutations, mapActions} from 'vuex';
  import {$http, setStorage} from "../../utils/utils";
  import api from '../../api'

  export default {
    name: "login",
    data() {
      return {
        data: '',
        loginBtn: '登录',
        formInline: {
          username: '',
          password: '',
          role: '0',
        },
        ruleInline: {
          username: [
            {required: true, message: '用户名不能为空!', trigger: 'change'}
          ],
          password: [
            {required: true, message: '密码不能为空!', trigger: 'change'},
            {type: 'string', min: 6, message: '密码最少6位', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      Input,
      Icon,
      Radio,
      RadioGroup,
      Button,
      FormItem,
      Form
    },
    watch: {
      login: (val) => {
        console.log(login)
      }
    },
    computed: {
      ...mapState([
        'login',
      ])
    },
    methods: {
      handleSubmit(param) {
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            this.loginBtn = '登录中···';
            this.$store.dispatch('fetchLoginAction', {
              username: param.username,
              password: param.password,
              role: Number(param.role)
            }).then(data => {
              this.loginBtn = '登录';
              if (data.code === 200) {
                this.$store.commit('FETCH_USER_LOGIN', {isLogin: true, username: param.username});
                this.$Message.success('登录成功');
                this.$router.push({path: '/'});
                setStorage('isLogin', true);
                setStorage('username',param.username);
              } else {
                this.$Message.error('账号密码不正确!');
                this.$store.commit('FETCH_USER_LOGIN', {isLogin: false});
              }
            }).catch(err => {
              this.loginBtn = '登录';
              this.$Message.error('加载超时，请稍后再试!');
              this.$store.commit('FETCH_USER_LOGIN', {isLogin: false});
            })
          } else {

          }
        })
        /*  $http(api.login, {
           username: param.username,
           password: param.password,
           role: Number(param.role)
         }, data => {
           if (data.code === 200) {
             this.$store.commit('FETCH_USER_LOGIN', {isLogin: true});
             this.$router.push({path: '/'});
             setStorage('isLogin',true)
           } else {
             this.$store.commit('FETCH_USER_LOGIN', {isLogin: false});
           }
         }, error => {
           this.$store.commit('FETCH_USER_LOGIN', {isLogin: false});
         }, 'post');*/


      }
    }
  }
</script>

<style scoped lang="scss">


  .login-container {
    height: 100vh;
    width: 100vw;
    @include bg-image("../../images/login-bg.png");
    @include child-center();
    .login-box {
      @include wh(500px, 320px);
      border: 1px solid $login-bor;
      background: rgba(227, 233, 244, .8);
      padding: 0 100px;
      .logo {
        @include wh(145px, 36px);
        background: url("../../images/css-spd.png") -94px -47px no-repeat;
        background-size: 800px;
        margin: 35px auto;
      }
      .ivu-form-item {
        margin-bottom: 20px;
      }
    }
  }


</style>
