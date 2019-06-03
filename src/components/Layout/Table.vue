<template>
  <table class="table table-striped">
    <thead>
      <slot name="thead"></slot>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table'
}
</script>

<style scoped>

</style>
