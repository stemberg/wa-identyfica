export default {
  namespaced: true,
  state: {
    pessoas: []
  },
  getters: {
    getData(state) {
      return state.pessoas;
    }
  },
  mutations: {
    setData(state, payload) {
      state.pessoas = payload;
    },
    postPessoa(state, payload) {
      state.pessoas.push(payload);
    },
    editPessoa(state, payload) {
      state.pessoas[payload.index] = payload.data;
    },
    deletePessoa(state, id) {
      state.pessoas = state.pessoas.filter((pessoa) => pessoa.id != id);
    },
  },
};
