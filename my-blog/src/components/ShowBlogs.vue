<template>
  <div id="show-blogs" v-theme:column="'wide'">
    <h1>博客总览</h1>
    <input type="text" placeholder="搜索" v-model="search">
    <div class="single-blog" v-for="blog in filteredBlogs">
      <router-link :to="'/blog/' + blog.id">
      <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article>
        {{blog.content | snippet}}
      </article>
    </div>
  </div>
</template>

<script>
    export default {
      name: "show-blogs",
      data() {
        return {
          blogs: [],
          search: ""
        }
      },
      created() {
        this.axios.get('/posts.json')
          .then((data) => {
            console.log(data.data);
            return data.data;
            //this.blogs = data.body.slice(0,10);
          })
          .then((data) => {
            let blogsArray = [];
            for (let key in data){
              data[key].id = key;
              blogsArray.push(data[key]);
            }
            this.blogs = blogsArray;
          })
      },
      computed: {
        filteredBlogs() {
          return this.blogs.filter((blog) => {
            return blog.title.match(this.search);
          })
        }
      },
      filters: {
        toUppercase(value) {
          return value.toUpperCase()
        },
        snippet(value) {
          if (value.length > 100){
            value = value.slice(0,100) + "..."
          }
          return value
        }
      },
      directives: {
        rainbow: {
          bind(el,binding,vnode) {
            el.style.color = "#" + Math.random().toString(16).slice(2,8);
          }
        },
        theme: {
          bind(el,binding,vnode) {
            if (binding.value === "wide") {
              el.style.maxWidth = '1026 px';
            }
            if (binding.arg === "column") {
              el.style.background = "#6677cc";
              el.style.padding = "20 px";
            }
          }
        }
      }
    }
</script>

<style scoped>
  #show-blogs {
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
  }
  #show-blogs h1 {
    padding: 0 20px;
  }
  #show-blogs input {
    width: 95%;
    box-sizing: border-box;
    margin: 0 20px;
    padding: 8px;
  }
  #show-blogs a{
    text-decoration: none;
    color: #444;
  }
  .single-blog {
    padding: 20px;
    margin: 20px;
    box-sizing: border-box;
    background: #eee;
    border: 1px dotted #aaa;
  }

</style>
