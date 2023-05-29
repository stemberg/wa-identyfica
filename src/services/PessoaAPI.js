import store from "@/store";
import http from "./config";
import { computed } from "vue";

const pessoas = computed(() => store.getters["pessoaModule/getData"]);

const PessoaAPI = {
  async getPessoas() {
    return http
      .get("/Pessoa")
      .then((response) => {
        store.commit("pessoaModule/setData", response.data);
        store.commit("setErros", "");
      })
      .catch((error) => store.commit("setErros", error));
  },
  async postPessoa(pessoa) {
    return http
      .post("/Pessoa", {
        "nome": pessoa.nome,
        "cpf": pessoa.cpf,
        "dataNascimento": pessoa.dataNascimento,
        "endereco": pessoa.endereco,
        "sexo": pessoa.sexo,
      })
      .then((response) => {
        store.commit("pessoaModule/postPessoa", response.data);
        store.commit("setErros", "");
        return response;
      })
      .catch((error) => store.commit("setErros", error));
  },
  async editPessoa(dados) {
    return http
      .put(`/Pessoa/${dados.id}`, {
        "nome": dados.nome,
        "cpf": dados.cpf,
        "dataNascimento": dados.dataNascimento,
        "endereco": dados.endereco,
        "sexo": dados.sexo,
      })
      .then((response) => {
        const index = pessoas.value.indexOf(
          pessoas.value.filter((pessoa) => pessoa.id == dados.id)[0]
        );
        store.commit("pessoaModule/editPessoa", { index, data: response.data });
        store.commit("setErros", "");
      })
      .catch((error) => store.commit("setErros", error));
  },
  async deletePessoa(id) {
    return http
      .delete(`/Pessoa/${id}`)
      .then(() => {
        store.commit("pessoaModule/deletePessoa", id);
        store.commit("setErros", "");
      })
      .catch((error) => store.commit("setErros", error));
  },
};

export default PessoaAPI;
