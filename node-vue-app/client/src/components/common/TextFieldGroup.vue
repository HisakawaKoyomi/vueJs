<template>
  <div class="form-group">
    <input :type="type" class="form-control form-control-lg" :placeholder="placeholder" :name="name"
           :class="{'is-invalid': error}" :disabled="disabled" :value="value" @input="emitInput($event)">
    <div v-if="error" class="invalid-feedback">
      {{error}}
    </div>
    <small v-if="info" class="form-text text-muted">{{info}}</small>
  </div>
</template>

<script>
    export default {
      name: "TextFieldGroup",
      props: {
        type: {
          type: String,
          default: "text"
        },
        placeholder: String,
        name: String,
        error: String,
        disabled: Boolean,
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
