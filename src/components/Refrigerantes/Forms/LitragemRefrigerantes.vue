<template>
  <select-form-group col="md-6" title="Litragem" id="id_litragem_refrigerante"
                     :options="litragensRefrigerantes" :selected="selected"></select-form-group>
</template>

<script>
import SelectFormGroup from '../../Layout/SelectFormGroup'
import ServiceRequest from '../../../config/ServiceRequest'

export default {
  name: 'LitragemRefrigerantes',
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
    this.obterLitragemRefrigerantes()
  },
  data () {
    return {
      serviceRequest: new ServiceRequest(),
      apiUrl: process.env.API_URL,
      url: '/refrigerantes/litragem-refrigerantes',
      litragensRefrigerantes: []
    }
  },
  methods: {
    obterLitragemRefrigerantes () {
      let self = this
      self.serviceRequest.get(this.apiUrl + self.url).then(function (response) {
        self.litragensRefrigerantes = []
        response.data.map(function (value) {
          self.litragensRefrigerantes.push({id: value.id_litragem_refrigerante, value: value.litragem_refrigerante})
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
