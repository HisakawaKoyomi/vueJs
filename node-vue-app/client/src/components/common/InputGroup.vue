<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
        <i :class="icon"></i>
      </span>
    </div>

    <input :type="type" class="form-control form-control-lg" :placeholder="placeholder" :name="name"
           :class="{'is-invalid': error}" :value="value" @input="emitInput($event)">
    <div v-if="error" class="invalid-feedback">
      {{error}}
    </div>
  </div>
</template>

<script>
    export default {
      name: "InputGroup",
      props: {
        type: {
          type: String,
          default: "text"
        },
        placeholder: String,
        name: String,
        error: String,
        value: String,
        icon: String
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
