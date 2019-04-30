<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p>作者: {{blog.author}}</p>
    <p>分类:</p>
    <ul>
      <li v-for="catagory in blog.categories">{{catagory}}</li>
    </ul>
    <button @click="deleteSingleBlog">删除</button>
    <router-link :to="'/edit/' + id">编辑</router-link>
  </div>
</template>

<script>
    export default {
      name: "single-blog",
      data() {
          return {
            id: this.$route.params.id,
            blog: {}
          }
      },
      created() {
        // this.axios.get("https://vuedemo-a83f5.firebaseio.com/posts/" + this.id + ".json")
        this.axios.get("/posts/" + this.id + ".json")
          .then((data) => {
            return data.data
          })
          .then((data) => {
            this.blog = data;
          })
      },
      methods: {
        deleteSingleBlog() {
          this.axios.delete("/posts/" + this.id + ".json")
            .then(response => {
              this.$router.push({path: "/"});
              //console.log(this.$route);
            })
        }
      }
    }
</script>

<style scoped>
  #single-blog {
    max-width: 780px;
    margin: 0 auto;
    padding: 20px;
    background-color: #eee;
    border: 1px dotted #aaa;
  }

</style>
