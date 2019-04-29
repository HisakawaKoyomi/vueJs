// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

// 全局使用ajax插件
Vue.use(VueResource);

/*
// 自定义全局指令 -> 后改为了局部
Vue.directive('rainbow',{
  bind (el,binding,vnode) {
    el.style.color = '#' + Math.random().toString(16).slice(2,8);
    //el.style.color = 'blue';
  }
});

// 自定义全局过滤器 -> 后改为了局部
Vue.filter('to-uppercase',function (value) {
  return value.toLowerCase()
});
*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
