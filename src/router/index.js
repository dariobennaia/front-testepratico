import Vue from 'vue'
import Router from 'vue-router'
import ListagemRefrigerantes from '@/components/Refrigerantes/Listagem'
import CadastroRefrigerantes from '@/components/Refrigerantes/Cadastro'
import EditarRefrigerantes from '@/components/Refrigerantes/Edicao'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListagemRefrigerantes',
      component: ListagemRefrigerantes
    },
    {
      path: '/cadastro',
      name: 'CadastroRefrigerantes',
      component: CadastroRefrigerantes
    },
    {
      path: '/edicao/:idRefrigerante',
      name: 'EdicaoRefrigerantes',
      component: EditarRefrigerantes
    }
  ]
})
