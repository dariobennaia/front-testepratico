<template>
  <div :class="'form-inline col-'+col">
    <label :for="id">{{title}}</label>
    <select :id="id" :name="id" class="form-control" @change="totalRegistrosPorPaginasSelecionado">
      <option v-for="v in options" :key="v.id" :value="v.id" :selected="selected">
        {{v.value}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectFormInline',
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
  },
  methods: {
    totalRegistrosPorPaginasSelecionado () {
      this.$emit('change', document.getElementById(this.id).value)
    }
  }
}
</script>

<style scoped>

</style>
