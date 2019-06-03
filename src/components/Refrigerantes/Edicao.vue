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
          <formulario :id_refrigerante="$route.params.idRefrigerante"></formulario>
          <button type="reset" class="btn btn-secondary" :disabled="botoesDeAcao">Cancelar</button>
          <button type="submit" class="btn btn-success" :disabled="botoesDeAcao">Salvar</button>
        </form>

      </div>
    </div>

  </layout>
</template>

<script>
import layout from '../Layout/Layout'
import alert from '../Layout/Alert'
import formulario from './Forms/Formulario'
import ServiceRequest from '../../config/ServiceRequest'

export default {
  name: 'Cadastro',
  components: {
    layout: layout,
    alert: alert,
    formulario: formulario
  },
  data () {
    return {
      serviceRequest: new ServiceRequest(),
      url: '/refrigerantes',
      botoesDeAcao: false,
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
      self.botoesDeAcao = true
      self.serviceRequest.patch(self.url + '/' + self.$route.params.idRefrigerante, dados).then(response => {
        self.exibirMensagensDeSucesso('Refrigerante atualizado com sucesso!')
        self.botoesDeAcao = false
        setTimeout(function () {
          self.redirecionarParaListagem()
        }, 1000)
      }).catch(error => {
        self.botoesDeAcao = false
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
