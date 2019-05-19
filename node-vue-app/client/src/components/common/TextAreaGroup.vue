<template>
  <div class="form-group">
    <textarea class="form-control form-control-lg" :placeholder="placeholder" :name="name"
              :class="{'is-invalid': error}" :value="value" @input="emitInput($event)">
    </textarea>
    <div v-if="error" class="invalid-feedback">
      {{error}}
    </div>
    <small v-if="info" class="form-text text-muted">{{info}}</small>
  </div>
</template>

<script>
  export default {
    name: "TextAreaGroup",
    props: {
      placeholder: String,
      name: String,
      error: String,
      info: String,
      value: String
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
