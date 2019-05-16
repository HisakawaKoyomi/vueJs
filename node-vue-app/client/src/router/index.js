import Vue from "vue"
import Router from "vue-router"
import Landing from "../components/Landing"
import Login from "../components/Login"
import Register from "../components/Register"
import Dashboard from "../components/Dashboard"

Vue.use(Router);

const route = new Router({
  linkActiveClass: "active",
  mode: "history",
  routes: [
    {path: "*", redirect: "/" },
    {path: "/", component: Landing},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/dashboard", component: Dashboard}
  ]
});

// 全局路由守卫
route.beforeEach((to,from,next) => {
  const isLogin = !!localStorage.jwtToken;
  if (to.path == "/login" || to.path == "/register" || to.path == "/"){
    next();
  }else {
    isLogin ? next() : next("/login")
  }
});

export default route
