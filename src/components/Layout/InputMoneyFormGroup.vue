<template>
  <div :class="'form-group col-'+col">
    <label :for="id">{{title}}</label>
    <input type="text" class="form-control" :id="id" :name="id" :placeholder="title" autocomplete="off" ref="precoImovel" v-model="valorPrecoImovel">
  </div>
</template>

<script>
export default {
  name: 'InputMoneyFormGroup',
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
    }
  },
  data () {
    return {
      meu_valor: '0.00'
    }
  },
  computed: {
    valorPrecoImovel: {
      // getter
      get: function() {
        return this.meu_valor;
      },
      // setter
      set: function(newValue) {
        this.meu_valor = this.formatPrice(newValue);
      }
    }
  },
  methods: {
    formatPrice (value) {
      const val = Number(value.replace(".", ""));
      // if (!val) return value;
      const valueString = val.toFixed(2);
      return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
}
</script>

<style scoped>

</style>
