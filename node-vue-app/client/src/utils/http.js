import axios from "axios";
import store from "../store"

// 请求拦截，设置header，开启加载动画
axios.interceptors.request.use(config => {
  store.dispatch("setLoading",true);
  if (localStorage.jwtToken){
    config.headers.Authorization = localStorage.jwtToken;
  }
  return config
},error => {
  return Promise.reject(error);
});

// 响应拦截，关闭加载动画
axios.interceptors.response.use(response => {
  store.dispatch("setLoading",false);
  return response
}, error => {
  store.dispatch("setLoading",false);
  return Promise.reject(error);
});

export default axios
