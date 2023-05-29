<script setup>
import { onMounted, ref, computed } from "vue";
import { fecharModal } from "@/utils/modalConfig";
import store from "@/store";
import PessoaAPI from "@/services/PessoaAPI";
import toast from "@/utils/toastConfig";

const acao = computed(() => store.state.acaoModal);
const pessoa = computed(() => store.state.pessoaSelecionada);
const modal = ref("");
const title = computed(() => `${store.state.acaoModal} pessoa`);
const erro = computed(() => store.state.erros);

function confirmar(data) {
  if (!validarDataNascimento(data)) {
    return toast.abrirToast("error", "Você precisa ser maior de idade!");
  } else {
    if (acao.value == "Cadastrar") {
      cadastrarPessoa();
    }
    if (acao.value == "Editar") {
      editarPessoa();
    }
  }
}

function cadastrarPessoa() {
  const novaPessoa = {
    nome: pessoa.value.nome,
    dataNascimento: pessoa.value.dataNascimento,
    cpf: pessoa.value.cpf,
    sexo: pessoa.value.sexo,
    endereco: pessoa.value.endereco,
  };

  PessoaAPI.postPessoa(novaPessoa).then(() => {
    if (erro.value) {
      return toast.abrirToast("error", erro.value);
    }
    fecharModal(modal.value);
    toast.abrirToast("success", "Pessoa cadastrada com sucesso!");
  });
}

function editarPessoa() {
  PessoaAPI.editPessoa(pessoa.value).then(() => {
    if (erro.value) {
      return toast.abrirToast("error", erro.value);
    }
    fecharModal(modal.value);
    toast.abrirToast("success", "Pessoa editada com sucesso!");
  });
}

function validarDataNascimento(data) {
  const dataMinima = new Date();
  dataMinima.setFullYear(dataMinima.getFullYear() - 18);
  if (data >= dataMinima) {
    return true;
  } else {
    return false;
  }
}

onMounted(() => {
  modal.value = document.querySelector("#modal-pessoa");
});
</script>

<template>
  <div class="modal" id="modal-pessoa">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="fecharModal(modal)"
        ></button>
      </header>
      <section class="modal-card-body">
        <form class="form">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Nome:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="pessoa.nome"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">CPF:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    v-mask="['###.###.###-##']"
                    mask-placeholder=""
                    v-model="pessoa.cpf"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Nascimento:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-small"
                    type="date"
                    v-model="pessoa.dataNascimento"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Endereço:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-small"
                    type="text"
                    v-model="pessoa.endereco"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Sexo:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <div class="radio-group">
                    <label class="radio">
                      <input
                        type="radio"
                        name="sexo"
                        value="Masculino"
                        required
                        v-model="pessoa.sexo"
                      />
                      Masculino
                    </label>
                    <label class="radio">
                      <input
                        type="radio"
                        name="sexo"
                        value="Feminino"
                        required
                        v-model="pessoa.sexo"
                      />
                      Feminino
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot is-flex">
        <button
          class="button ml-auto"
          @click="confirmar(pessoa.dataNascimento)"
        >
          Gravar
        </button>
        <button class="button" @click="fecharModal(modal)">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<style>
.radio-group {
  display: flex;
  gap: 2rem;
}

.radio {
  margin-top: 10px;
}
</style>
