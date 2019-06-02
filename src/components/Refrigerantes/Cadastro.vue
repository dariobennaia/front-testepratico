<template>
  <layout>

    <div slot="menu">
      <router-link :to="{ name: 'ListagemRefrigerantes' }" class="btn btn-primary float-right">
        <i class="fas fa-list"></i> Voltar para listagem
      </router-link>
    </div>

    <div class="row text-left mt-5">
      <div class="col-md-12">
          <div class="row text-left">
            <div class="col-md-12">
              <alert type="success" v-if="alert.habilitar && alert.tipo === 'sucesso'">
                <li>{{alert.msgs}}</li>
              </alert>
              <alert type="danger" v-if="alert.habilitar && alert.tipo === 'erro'">
                <li v-for="msg in alert.msgs" :key="msg.id">{{msg[0]}}</li>
              </alert>
            </div>
          </div>
          <form @submit="salvaDados" id="form">
            <atributos-formulario></atributos-formulario>
            <button type="reset" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-success">Salvar</button>
          </form>
      </div>
    </div>

  </layout>
</template>

<script>
import layout from '../Layout/Layout'
import formulario from './Forms/Formulario'
import alert from '../Layout/Alert'
import ServiceRequest from '../../config/ServiceRequest'

export default {
  name: 'Cadastro',
  components: {
    'layout': layout,
    'atributos-formulario': formulario,
    'alert': alert
  },
  data () {
    return {
      serviceRequest: new ServiceRequest(),
      url: '/refrigerantes',
      alert: {
        tipo: null,
        habilitar: false,
        msgs: []
      }
    }
  },
  methods: {
    salvaDados (e) {
      let dados = $('#form').serialize()
      let self = this
      self.serviceRequest.post(self.url, dados).then(response => {
        self.exibirMensagensDeSucesso('Refrigerante cadastrado com sucesso!')
        setTimeout(function () {
          self.redirecionarParaListagem()
        }, 1000)
      }).catch(error => {
        if (error.response.status === 422) {
          self.exibirMensagensDeErro(error.response.data.errors)
          return false
        }
        self.exibirMensagensDeErro(['Erro desconhecido!'])
        return false
      })
      e.preventDefault()
    },
    exibirMensagensDeErro (msg) {
      this.alert.habilitar = true
      this.alert.tipo = 'erro'
      this.alert.msgs = msg
    },
    exibirMensagensDeSucesso (msg) {
      this.alert.habilitar = true
      this.alert.tipo = 'sucesso'
      this.alert.msgs = msg
    },
    redirecionarParaListagem () {
      this.$router.push({name: 'ListagemRefrigerantes'})
    }
  }
}
</script>

<style scoped>

</style>
