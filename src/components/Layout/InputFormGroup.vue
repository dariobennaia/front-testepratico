<template>
  <div :class="'form-group col-'+col">
    <label :for="id">{{title}}</label>
    <input :type="type" class="form-control" :id="id" :name="id" :placeholder="title" :value="value" autocomplete="off">
  </div>
</template>

<script>
export default {
  name: 'InputFormGroup',
  props: {
    'title': {
      required: true
    },
    'id': {
      required: true
    },
    'col': {
      required: true
    },
    'value': {
      required: false,
      default: null
    },
    'type': {
      required: false,
      default: 'text'
    }
  }
}
</script>

<style scoped>

</style>
