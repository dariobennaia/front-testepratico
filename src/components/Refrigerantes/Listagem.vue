<template>
  <layout>
    <!-- Menu de opções -->
    <div slot="menu">
      <a class="btn btn-primary float-left mr-1" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
        <i class="fas fa-search"></i> Perquisar
      </a>

      <button class="btn btn-danger float-left" @click="excluirMarcados">
        <i class="fas fa-trash-alt"></i> Excluir marcados
      </button>

      <router-link :to="{ name: 'CadastroRefrigerantes' }" class="btn btn-primary float-right">
        <i class="fas fa-wine-bottle"></i> Novo refrigerante
      </router-link>
    </div>
    <!-- Fim do menu de opções -->

    <!-- Pesquisa -->
    <div class="row mb-5 mt-3">
      <div class="col-md-12 text-left">
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <form @submit="pesquisar" id="form_pesquisa">
              <atributos-formulario></atributos-formulario>
              <button type="reset" class="btn btn-secondary">Limpar filtros</button>
              <button type="submit" class="btn btn-success">Pesquisar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Fim da pequisa -->

    <!--alertas-->
    <div class="row text-left">
      <div class="col-md-12">
        <alert type="success" v-if="alert.habilitar">
          <li>{{alert.msg}}</li>
        </alert>
      </div>
    </div>
    <!--fim alertas-->

    <!-- Tabela paginação -->
    <div class="row">
      <div class="col-md-12">
        <table-refrigerantes>
          <tr slot="thead">
            <th scope="col">
              <input type="checkbox" @click="selecionarTodosOsCheckbox">
            </th>
            <th scope="col">#</th>
            <th scope="col">Sabor</th>
            <th scope="col">Marca</th>
            <th scope="col">Valor</th>
            <th scope="col" class="text-center">-</th>
          </tr>

          <tr v-for="dados in table.dados.data" :key="dados.id">
            <th scope="row">
              <input type="checkbox" name="id_refrigerante[]" :checked="selecionarCheckbox" :value="dados.id_refrigerante">
            </th>
            <th scope="row">{{dados.id_refrigerante}}</th>
            <td>{{dados.sabor}}</td>
            <td>{{dados.marca}}</td>
            <td>{{dados.valor}}</td>
            <td class="text-right">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                      @click="obterInformacoesDoRefrigerantes(dados.id_refrigerante)" title="Informações do refrigerante">
                <i class="fas fa-info"></i>
              </button>
              <router-link :to="{ name: 'EdicaoRefrigerantes', params: { idRefrigerante: dados.id_refrigerante }  }"
                           class="btn btn-warning text-white" title="Atualizar informações do refrigerante">
                <i class="fas fa-edit"></i>
              </router-link>
              <button type="button" class="btn btn-danger" title="Excluir refrigerante"
                      @click="excluirRefrigerante(dados.id_refrigerante)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
          <tr v-show="table.dados.data && !table.dados.data.length">
            <td colspan="6" class="text-center">Nenhum refrigerante encontrado!</td>
          </tr>
        </table-refrigerantes>
      </div>
    </div>

    <div class="row">
        <select-form-group col="2" title="Total" id="total_paginas" :options="table.totalRegistrosPorPaginas"
                           @change="pesquisarPorTotaDePaginas"/>
      <div class="col-md-10 text-right">
          <!--primeira pagina-->
          <button type="button" id="first_page" class="btn btn-primary" @click="primeiraPagina"
                  :disabled="table.firstPage">
            <i class="fas fa-fast-backward"></i>
          </button>

          <!--proxima pagina-->
          <button type="button" id="previous_page" class="btn btn-primary" @click="paginaAnterior"
                  :disabled="table.previousPage">
            <i class="fas fa-step-backward"></i>
          </button>

          <!--ir para pagina selecionada-->
          <button type="button" v-for="pagina in table.dados.pages"
                  :class="pagina === table.dados.current_page ? 'btn btn-secondary border' : 'btn btn-primary'"
                  @click="(pagina === table.dados.current_page ? null : paginaSelecionada(pagina))"
                  :key="pagina.id"
          >
            {{pagina}}
          </button>

          <!--proxima pagina-->
          <button type="button" id="next_page" class="btn btn-primary" @click="proximaPagina"
                  :disabled="table.nextPage">
            <i class="fas fa-step-forward"></i>
          </button>
          <!--ultima pagina-->
          <button type="button" id="last_page" class="btn btn-primary" @click="ultimaPagina"
                  :disabled="table.lastPage">
            <i class="fas fa-fast-forward"></i>
          </button>
      </div>
    </div>
    <!-- Fim tabela paginação -->

    <!-- Modal de informações -->
    <modal titulo="Informações do refrigerante">
      <div class="row">
        <div class="col-md-12 text-left" v-if="dadosModal !== null">
          <strong>Sabor:</strong> {{dadosModal.sabor}}<br>
          <strong>Marca:</strong> {{dadosModal.marca}}<br>
          <strong>Litragem:</strong> {{dadosModal.litragem_refrigerante.litragem_refrigerante}}<br>
          <strong>Tipo:</strong> {{dadosModal.tipo_refrigerante.tipo_refrigerante}}<br>
          <strong>Estoque:</strong> {{dadosModal.estoque}}<br>
          <strong>Valor: R$</strong> {{dadosModal.valor}}
        </div>
      </div>
    </modal>
    <!-- Modal de informações -->
  </layout>
</template>

<script>
import layout from '../Layout/Layout'
import modal from '../Layout/Modal'
import table from '../Layout/Table'
import alert from '../Layout/Alert'
import formulario from './Forms/Formulario'
import SelectFormInline from '../Layout/SelectFormInline'
import ServiceRequest from '../../config/ServiceRequest.js'

export default {
  name: 'Listagem',
  components: {
    'layout': layout,
    'modal': modal,
    'table-refrigerantes': table,
    'atributos-formulario': formulario,
    'select-form-group': SelectFormInline,
    'alert': alert
  },
  data () {
    return {
      serviceRequest: new ServiceRequest(),
      apiUrl: process.env.API_URL,
      urlExclusao: '/refrigerantes',
      urlInformacoes: '/refrigerantes',
      urlListagem: '/refrigerantes/paginacao',
      dadosListagem: [],
      dadosModal: null,
      selecionarCheckbox: false,
      table: {
        dados: [],
        paginacao: {
          previousPage: false,
          firstPage: false,
          nextPage: false,
          lastPage: false
        },
        totalRegistrosPorPaginas: [
          {'id': 10, 'value': 10},
          {'id': 20, 'value': 20},
          {'id': 30, 'value': 30}
        ],
        totalRegistrosPorPaginasSelecionado: 5
      },
      alert: {
        habilitar: false,
        msg: null
      }
    }
  },
  mounted () {
    this.listarRefrigerantes()
  },
  methods: {
    obterInformacoesDoRefrigerantes (idRefrigerante) {
      let self = this
      self.serviceRequest.get(this.apiUrl + self.urlInformacoes + '/' + idRefrigerante)
        .then(response => {
          self.dadosModal = response.data
        })
    },

    excluirRefrigerante (idRefrigerante) {
      let self = this

      if (!confirm('Deseja realmente excluir?')) {
        return false
      }

      self.serviceRequest.delete(this.apiUrl + self.urlExclusao + '/' + idRefrigerante)
        .then(response => {
          self.exibirMensagensDeSucesso('Refrigerante escluido com sucesso!')
          self.listarRefrigerantes()
        })
    },

    excluirMarcados () {
      let self = this
      let idsRefrigerantes = []

      if (!confirm('Deseja realmente excluir?')) {
        return false
      }

      $.each($("input[name='id_refrigerante[]']:checked"), function () {
        idsRefrigerantes.push($(this).val())
      })

      self.serviceRequest.delete(this.apiUrl + self.urlExclusao, {data: {id_refrigerante: idsRefrigerantes}})
        .then(response => {
          self.exibirMensagensDeSucesso('Refrigerante(s) escluido(s) com sucesso!')
          self.listarRefrigerantes()
        })
    },

    selecionarTodosOsCheckbox () {
      this.selecionarCheckbox = !this.selecionarCheckbox
    },

    call (response) {
      this.table.dados = response.data

      this.table.dados.pages = []
      for (let i = 1; i <= (this.table.dados.last_page); i++) {
        this.table.dados.pages.push(i)
      }

      this.table.previousPage = (this.table.dados.current_page === 1)
      this.table.firstPage = (this.table.dados.current_page === 1)
      this.table.nextPage = (this.table.dados.current_page === this.table.dados.last_page)
      this.table.lastPage = (this.table.dados.current_page === this.table.dados.last_page)
    },

    listarRefrigerantes () {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.apiUrl + this.urlListagem + '/' + this.table.totalRegistrosPorPaginasSelecionado + '?=' + dados)
        .then(this.call)
    },

    proximaPagina () {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.table.dados.next_page_url + '&' + dados)
        .then(this.call)
    },

    paginaAnterior () {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.table.dados.prev_page_url + '&' + dados)
        .then(this.call)
    },

    primeiraPagina () {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.table.dados.first_page_url + '&' + dados)
        .then(this.call)
    },

    ultimaPagina () {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.table.dados.last_page_url + '&' + dados)
        .then(this.call)
    },

    paginaSelecionada (pagina) {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.apiUrl + this.urlListagem + '/' + this.table.totalRegistrosPorPaginasSelecionado + '?' + dados + '&page=' + pagina)
        .then(this.call)
    },

    pesquisar (e) {
      let dados = $('#form_pesquisa').serialize()
      this.serviceRequest.get(this.apiUrl + this.urlListagem + '/' + this.table.totalRegistrosPorPaginasSelecionado + '?' + dados)
        .then(this.call)
      e.preventDefault()
    },

    pesquisarPorTotaDePaginas (totalRegistrosPorPaginas) {
      this.table.totalRegistrosPorPaginasSelecionado = totalRegistrosPorPaginas
      this.listarRefrigerantes()
    },

    exibirMensagensDeSucesso (msg) {
      let self = this

      self.alert.habilitar = true
      self.alert.msg = msg

      setTimeout(function () {
        self.alert.habilitar = false
        self.alert.msg = null
      }, 1500)
    }
  }
}
</script>

<style scoped>

</style>
