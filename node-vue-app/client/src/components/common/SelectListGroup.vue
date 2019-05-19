<template>
  <div class="form-group">
    <select class="form-control form-control-lg" :name="name"
            :class="{'is-invalid': error}" :value="value" @input="emitInput($event)">
      <option v-for="(option,index) in options" :key="index" :value="option.value">{{option.value}}</option>
    </select>
    <div v-if="error" class="invalid-feedback">
      {{error}}
    </div>
    <small v-if="info" class="form-text text-muted">{{info}}</small>
  </div>
</template>

<script>
    export default {
      name: "SelectListGroup",
      props: {
        name: String,
        error: String,
        value: String,
        options: Array,
        info: String
      },
      methods: {
        emitInput($event) {
          this.$emit("input",$event.target.value);
        }
      }
    }
</script>

<style scoped>

</style>
