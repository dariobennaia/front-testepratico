<template>
  <div>
      <div class="form-row">
        <input-form-group col="md-3" title="Sabor" id="sabor" :value="sabor"></input-form-group>
        <input-form-group col="md-3" title="Marca" id="marca" :value="marca"></input-form-group>
        <input-form-group col="md-3" title="Valor unitário" id="valor" :value="valor"></input-form-group>
        <input-form-group type="number" col="md-3" title="Quantidade em estoque" id="estoque" :value="estoque"></input-form-group>
      </div>
      <div class="form-row">
        <tipos-refrigerantes :selected="idTipoRefrigerante"></tipos-refrigerantes>
        <litragem-refrigerantes :selected="idLitragemRefrigerante"></litragem-refrigerantes>
      </div>
  </div>
</template>

<script>
import InputFormGroup from '../../Layout/InputFormGroup'
import TiposRefrigerantes from './TiposRefrigerantes'
import LitragemRefrigerantes from './LitragemRefrigerantes'
import ServiceRequest from '../../../config/ServiceRequest'

export default {
  name: 'Formulario',
  components: {
    'input-form-group': InputFormGroup,
    'tipos-refrigerantes': TiposRefrigerantes,
    'litragem-refrigerantes': LitragemRefrigerantes
  },
  props: {
    'id_refrigerante': {
      required: false,
      default: null
    }
  },
  data () {
    return {
      serviceRequest: new ServiceRequest(),
      apiUrl: process.env.API_URL,
      url: '/refrigerantes',
      marca: null,
      sabor: null,
      estoque: null,
      valor: null,
      idTipoRefrigerante: null,
      idLitragemRefrigerante: null
    }
  },
  mounted () {
    if (this.id_refrigerante !== null) {
      this.obterDadosDoRefrigerantes()
    }
  },
  methods: {
    obterDadosDoRefrigerantes () {
      let self = this
      self.serviceRequest.get(this.apiUrl + self.url + '/' + self.id_refrigerante).then(response => {
        self.marca = response.data.marca
        self.sabor = response.data.sabor
        self.estoque = response.data.estoque
        self.valor = response.data.valor
        self.idTipoRefrigerante = response.data.id_tipo_refrigerante
        self.idLitragemRefrigerante = response.data.id_litragem_refrigerante
      })
    }
  }
}
</script>

<style scoped>

</style>
