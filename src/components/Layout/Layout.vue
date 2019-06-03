<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light bg-navbar mb-5">
      <h1 class="dropdown-header text-white">
        <i class="fas fa-wine-bottle"></i> Teste prático
      </h1>
    </nav>

    <div class="container">

      <div class="row posicao-menu">
        <div class="col-12">
          <slot name="menu"></slot>
        </div>
      </div>

      <slot></slot>
    </div>

    <div class="footer-copyright text-center text-white py-3 bg-dark mt-5 pb-5">© 2019 Copyright:
      <a href="https://github.com/dariobennaia" target="_blank"> Dário Bennaia</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped>
  .posicao-menu {
    padding-bottom: 10px
  }
  .bg-navbar {
    background-color: #0b689e !important;
  }
</style>
