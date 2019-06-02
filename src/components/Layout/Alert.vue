<template>
  <div :class="'alert alert-'+type" role="alert">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    'type': {
      required: true
    }
  }
}
</script>

<style scoped>

</style>
