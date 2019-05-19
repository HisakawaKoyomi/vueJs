<template>
  <div class="posts">
    <!-- Post Item -->
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-2">
          <a href="javascript:;">
            <img style="width:150px" class="rounded-circle d-nonse d-md-block" :src="post.avatar" alt="avatar">
          </a>
          <br />
          <p class="text-center">{{post.name}}</p>
        </div>
        <div class="col-md-10">
          <p class="lead">{{post.text}}</p>
          <span v-if="showAction">
              <button type="button" @click="likeClick(post._id)" class="btn btn-light mr-1">
                <i class="text-info fas fa-thumbs-up"></i>
                <span class="badge badge-light">{{post.likes.length}}</span>
              </button>
              <button type="button" @click="unlikeClick(post._id)" class="btn btn-light mr-1">
                <i class="text-secondary fas fa-thumbs-down"></i>
              </button>
              <router-link :to="`/post/${post._id}`" class="btn btn-info mr-1">鼓励留言</router-link>
              <button v-if="user != null && user.id == post.user" type="button" class="btn btn-danger mr-1"
                      @click="deleteClick(post._id)">
                <i class="fas fa-times"></i>
              </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "PostFeed",
      computed: {
        user() {
          return this.$store.getters.user
        }
      },
      props: {
        post: Object,
        showAction: Boolean
      },
      methods: {
        deleteClick(id) {
          this.$axios.delete(`/api/posts/${id}`)
            .then(res => {
              this.$emit("update");
            }).catch(err => {
              console.log(err.response.data);
          })
        },
        likeClick(id) {
          this.$axios.post(`/api/posts/like/${id}`)
            .then(res => {
              this.$emit("update");
            }).catch(err => {
              console.log(err.response.data);
          })

        },
        unlikeClick(id) {
          this.$axios.post(`/api/posts/unlike/${id}`)
            .then(res => {
              this.$emit("update");
            }).catch(err => {
              console.log(err.response.data);
          })
        }
      }
    }
</script>

<style scoped>

</style>
