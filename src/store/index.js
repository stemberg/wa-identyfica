import { createStore } from "vuex";
import pessoaModule from "./modules/pessoaModule";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({ storage: window.localStorage });

const store = createStore({
  state: {
    acaoModal: "",
    erros: "",
    pessoaSelecionada: {
      id: "",
      nome: "",
      dataNascimento: "",
      cpf: "",
      sexo: "",
      endereco: ""
    }
  },
  getters: {
    getPessoaSelecionada(state) {
      return state.pessoaSelecionada;
    }
  },
  mutations: {
    setErros(state, payload) {
      state.erros = payload;
    },
    setAcaoModal(state, payload) {
      state.acaoModal = payload;
    },
    setPessoaSelecionada(state, payload) {
      return state.pessoaSelecionada = payload
    },
  },
  actions: {},
  modules: {
    pessoaModule,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
