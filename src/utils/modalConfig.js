import store from "@/store";

export const abrirModal = (modal) => {
  modal.classList.add("is-active");
};

export const fecharModal = (modal) => {
  modal.classList.remove("is-active");
};

export const abrirModalNovaPessoa = (modal) => {
  store.commit("setAcaoModal", "Cadastrar");
  store.commit("setPessoaSelecionada", {
    id: "",
    nome: "",
    dataNascimento: "",
    cpf: "",
    sexo: "",
    endereco: "",
  });

  modal.classList.add("is-active");
};

export const abrirModalEditarPessoa = (modal, pessoa) => {
  store.commit("setAcaoModal", "Editar");
  store.commit("setPessoaSelecionada", {
    id: String(pessoa.id),
    nome: String(pessoa.nome),
    dataNascimento: String(pessoa.dataNascimento),
    cpf: String(pessoa.cpf),
    sexo: String(pessoa.sexo),
    endereco: String(pessoa.endereco),
  });

  abrirModal(modal);
};
