<template>
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <p class="display-4 mb-4">米果在线</p>
            <p class="lead">专注于在线教育，以提供更加优质的服务</p>
            <hr />
            <a href="register.html" class="btn btn-xs btn-info mr-2">注册</a>
            <a href="login.html" class="btn btn-xs btn-light">登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Landing"
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
