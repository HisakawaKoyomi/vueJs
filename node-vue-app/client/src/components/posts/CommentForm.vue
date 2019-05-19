<template>
  <div class="comment-form mb-3">
    <div class="card card-info">
      <div class="card-header bg-info text-white">
        说点什么...
      </div>
      <form @submit.prevent="submit">
        <TextArea name="text" placeholder="评论内容"
                  v-model="text" :error="errors.text"></TextArea>
        <input type="submit" class="btn btn-dark">
      </form>
    </div>

  </div>
</template>

<script>
  import TextArea from "../common/TextAreaGroup"

  export default {
    name: "CommentForm",
    data() {
      return {
        text: "",
        errors: {}
      }
    },
    props: {
      postId: String
    },
    components: {
      TextArea
    },
    methods: {
      submit() {
        const user = this.$store.getters.user;
        const newComment = {
          text: this.text,
          name: user.name,
          avatar: user.avatar
        };

        this.$axios.post(`/api/posts/comment/${this.postId}`,newComment)
          .then(res => {
            this.errors = {};
            this.text = "";
            this.$emit("update");
          }).catch(err => {
          this.errors = err.response.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
