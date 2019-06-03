<template>
  <div :class="'form-group col-'+col">
    <label :for="id">{{title}}</label>
    <select :id="id" :name="id" class="form-control">
      <option value="">Selecione</option>
      <option v-for="v in options" :key="v.id" :value="v.id" :selected="selected">
        {{v.value}}
      </option>
    </select>
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
    'options': {
      required: true
    },
    'selected': {
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
