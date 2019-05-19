<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!--展示评论表单-->
        <PostForm @update="getPosts"></PostForm>
        <!--展示评论内容-->
        <PostFeed v-for="post in posts" :key="post._id"
                  :showAction="true" :post="post" @update="getPosts"></PostFeed>

      </div>
    </div>
  </div>
</template>

<script>
  import PostForm from "./PostForm"
  import PostFeed from "./PostFeed"

  export default {
    name: "Feeds",
    data() {
      return {
        posts: [],
        errors: {}
      }
    },
    components: {
      PostForm,
      PostFeed
    },
    beforeRouteEnter(to,from,next) {
      next(vm => {
        vm.getPosts();
      })
    },
    methods: {
      getPosts() {
        this.$axios.get("/api/posts/all")
          .then(res => {
            this.posts = res.data;
           // console.log(this.posts);
          }).catch(err => {
            this.errors = err.response.data;
        })

      }
    }
  }
</script>

<style scoped>

</style>
