<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">登录</h1>
          <p class="lead text-center">用已有的账号登录</p>
          <form @submit.prevent="submit" autocomplete="off" method="post">
            <div class="form-group">
              <input type="email" class="form-control form-control-lg" placeholder="邮箱地址" name="email"
                     v-model="user.email" :class="{'is-invalid': errors.email}">
              <div v-if="errors.email" class="invalid-feedback">
                {{errors.email}}
              </div>
            </div>
            <div class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="密码" name="password"
                     v-model="user.password" :class="{'is-invalid': errors.password}">
              <div v-if="errors.password" class="invalid-feedback">
                {{errors.password}}
              </div>
            </div>
            <input type="submit" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode";

    export default {
      name: "Login",
      data() {
        return {
          user: {
            email: "",
            password: ""
          },
          errors: {}
        }
      },
      methods: {
        submit() {
          this.$axios.post("/api/users/login",this.user)
            .then(res => {
              console.log(res.data);
              const {token} = res.data;
              window.localStorage.setItem("jwtToken",token);

              //解析token
              const decoded = jwt_decode(token);
              // 将解析结果进行分发
              this.$store.dispatch("setIsAuthenticated",!this.isEmpty(decoded));
              this.$store.dispatch("setUser",decoded);

              //　清空错误，提升体验
              this.errors = {};
              this.user = {
                email: "",
                password: ""
              };

              this.$router.push("/dashboard");

            }).catch(err => {
              this.errors = err.response.data;
              console.log(this.errors);
          })
        },
        isEmpty(value) {
          return value === undefined || value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0);
        }
      }
    }
</script>

<style scoped>

</style>
