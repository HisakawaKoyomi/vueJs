<template>
  <div class="loading">
    <img src="../../assets/loading.gif" alt="">
  </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .loading img {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

</style>
