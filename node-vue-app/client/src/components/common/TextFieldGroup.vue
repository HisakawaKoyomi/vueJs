<template>
  <div class="form-group">
    <input :type="type" class="form-control form-control-lg" :placeholder="placeholder" :name="name"
           :class="{'is-invalid': error}" @input="emitInput">
    <div v-if="error" class="invalid-feedback">
      {{error}}
    </div>
  </div>
</template>

<script>
    export default {
      name: "TextFieldGroup",
      props: {
        type: {
          type: String,
          default: text
        },
        class: String,
        placeholder: String,
        name: String,
        error: String
      },
      methods: {
        emitInput() {
          this.$emit("input",this.$event.target.value);
        }
      }
    }
</script>

<style scoped>

</style>
