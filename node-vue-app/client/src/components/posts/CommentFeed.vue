<template>
  <div class="comment-feed">
    <!-- Post Item -->
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-2">
          <a href="javascript:;">
            <img style="width:150px" class="rounded-circle d-nonse d-md-block" :src="comment.avatar" alt="avatar">
          </a>
          <br />
          <p class="text-center">{{comment.name}}</p>
        </div>
        <div class="col-md-10">
          <p class="lead">{{comment.text}}</p>
          <button v-if="user != null && user.id == comment.user" type="button" class="btn btn-danger mr-1"
                  @click="deleteClick(comment._id)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentFeed",
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    props: {
      comment: Object,
      postId: String
    },
    methods: {
      deleteClick(id) {
        this.$axios.post(`/api/posts/discomment/${this.postId}/${id}`)
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
