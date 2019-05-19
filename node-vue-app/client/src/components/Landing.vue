<template>
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <p class="display-4 mb-4">在线展板</p>
            <p class="lead">模拟简历的填写展示，罗列所有参与者及留言</p>
            <hr />
            <router-link to="/register" class="btn btn-xs btn-info mr-2" v-show="!isLogin">注册</router-link>
            <router-link to="/login" class="btn btn-xs btn-light" v-show="!isLogin">登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Landing",
      computed: {
        isLogin() {
          if (this.$store.getters.isAuthenticated){
            return true
          }else {
            return false
          }
        }
      }
    }
</script>

<style scoped>
  img {
    width: 100%;
  }

  .landing {
    position: relative;
    background: url("../assets/showcase.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin-top: -24px;
    margin-bottom: -50px;
  }

  .landing-inner {
    padding-top: 80px;
  }

  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .card-form {
    opacity: 0.9;
  }

  .latest-profiles-img {
    width: 40px;
    height: 40px;
  }

  .form-control::placeholder {
    color: #bbb !important;
  }
</style>
