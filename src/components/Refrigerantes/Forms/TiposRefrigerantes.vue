<template>
  <select-form-group col="md-6" title="Tipo" id="id_tipo_refrigerante"
                     :options="tiposRefrigerantes" :selected="selected"></select-form-group>
</template>

<script>
import SelectFormGroup from '../../Layout/SelectFormGroup'
import ServiceRequest from '../../../config/ServiceRequest'

export default {
  name: 'TiposRefrigerantes',
  props: {
    'selected': {
      required: false,
      default: null
    }
  },
  components: {
    'select-form-group': SelectFormGroup
  },
  mounted () {
    this.obterTiposRefrigerantes()
  },
  data () {
    return {
      serviceRequest: new ServiceRequest(),
      url: '/refrigerantes/tipos-refrigerantes',
      tiposRefrigerantes: []
    }
  },
  methods: {
    obterTiposRefrigerantes () {
      let self = this
      self.serviceRequest.get(self.url).then(response => {
        self.tiposRefrigerantes = []
        response.data.map(function (value) {
          self.tiposRefrigerantes.push({id: value.id_tipo_refrigerante, value: value.tipo_refrigerante})
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
