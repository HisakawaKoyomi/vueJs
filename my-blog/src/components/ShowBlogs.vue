<template>
  <div id="show-blogs" v-theme:column="'wide'">
    <h1>博客总览</h1>
    <input type="text" placeholder="搜索" v-model="search">
    <div class="single-blog" v-for="blog in filteredBlogs">
      <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      <article>
        {{blog.body | snippet}}
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
        this.$http.get('./../static/posts.json')
          .then(function (data) {
            this.blogs = data.body.slice(0,10);
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
          return value.slice(0,100) + "..."
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
    margin: 0 20px;
  }
  .single-blog {
    padding: 20px;
    margin: 20px;
    box-sizing: border-box;
    background: #eee;
  }
</style>
