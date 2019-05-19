<template>
  <div>
    <h4 class="mb-2">工作经验</h4>
    <table class="table">
      <thead>
      <tr>
        <th>公司</th>
        <th>职位</th>
        <th>年份</th>
        <th></th> <!--删除按钮的表头-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="exp in experience" :key="exp._id">
        <td>{{exp.company}}</td>
        <td>{{exp.title}}</td>
        <td>
          {{exp.from}} ~ {{exp.to}}
        </td>
        <td>
          <button @click="deleteClick(exp._id)" class="btn btn-danger">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      name: "Experience",
      props: {
        experience: Array
      },
      methods: {
        deleteClick(id) {
          console.log(1);
          this.$emit("deleteExperience",id);
        }
      }
    }
</script>

<style scoped>

</style>
