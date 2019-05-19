<template>
  <div class="post-form mb-3">
    <div class="card card-info">
      <div class="card-header bg-info text-white">
        说点什么...
      </div>
      <form @submit.prevent="submit">
        <TextArea name="text" placeholder="留言内容"
                  v-model="text" :error="errors.text"></TextArea>
        <input type="submit" class="btn btn-dark">
      </form>
    </div>

  </div>
</template>

<script>
  import TextArea from "../common/TextAreaGroup"

    export default {
      name: "PostForm",
      data() {
        return {
          text: "",
          errors: {}
        }
      },
      components: {
        TextArea
      },
      methods: {
        submit() {
          const user = this.$store.getters.user;
          const newPost = {
            text: this.text,
            name: user.name,
            avatar: user.avatar
          };

          this.$axios.post("/api/posts",newPost)
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
