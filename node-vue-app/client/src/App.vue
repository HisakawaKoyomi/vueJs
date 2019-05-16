<template>
  <div id="app">
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar"
import Landing from "./components/Landing"
import Footer from "./components/Footer"
import jwt_decode from "jwt-decode"

export default {
  name: 'App',
  components: {
    NavBar,
    Landing,
    Footer
  },
  created() {
    if (localStorage.jwtToken){
      const decoded = jwt_decode(localStorage.jwtToken);

      // 判断token是否过期
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime){
        this.$store.dispatch("setIsAuthenticated",false);
        this.$store.dispatch("setUser",{});
      }else {
        this.$store.dispatch("setIsAuthenticated",!this.isEmpty(decoded));
        this.$store.dispatch("setUser",decoded);
      }
    }
  },
  methods: {
    isEmpty(value) {
      return value === undefined || value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0);
    }
  }
}
</script>

<style>

</style>
