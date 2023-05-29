<script setup>
import {
  abrirModalNovaPessoa,
  abrirModalEditarPessoa,
  abrirModal,
} from "@/utils/modalConfig";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import ModalConfirmar from "./ModalConfirmar.vue";
import PessoaAPI from "@/services/PessoaAPI";
import store from "@/store";

const modal = ref("");
const modalConfirm = ref("");

const pessoas = computed(() => store.getters["pessoaModule/getData"]);

function editarPessoa(pessoa) {
  abrirModalEditarPessoa(modal.value, pessoa);
}

function excluirPessoa() {
  abrirModal(modalConfirm.value);
}

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  const mesNascimento = nascimento.getMonth();
  const diaNascimento = nascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    return diferencaAnos - 1;
  }

  return diferencaAnos;
}

onBeforeMount(async () => {
  await PessoaAPI.getPessoas();
});

onMounted(() => {
  modal.value = document.querySelector("#modal-pessoa");
  modalConfirm.value = document.querySelector("#modal-confirm");
});
</script>

<template>
  <div class="table-container">
    <div class="button-container">
      <button class="button main-button" @click="abrirModalNovaPessoa(modal)">
        Novo
      </button>
    </div>
    <div class="table-scroll">
      <table class="styled-table" id="data-table">
        <thead class="table-header">
          <tr>
            <th class="values-headers">
              <abbr> Nome </abbr>
            </th>
            <th class="values-headers">
              <abbr> Idade </abbr>
            </th>
            <th class="values-headers">
              <abbr> CPF </abbr>
            </th>
            <th class="values-headers">
              <abbr> Sexo </abbr>
            </th>
            <th class="values-headers">
              <abbr> </abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(pessoa, index) in pessoas"
            :key="pessoa.id"
            :class="index % 2 === 0 ? 'row-even' : 'row-odd'"
          >
            <td class="row-values">
              {{ pessoa.nome }}
            </td>
            <td class="row-values">
              {{ calcularIdade(pessoa.dataNascimento) }} anos
            </td>
            <td class="row-values">
              {{ pessoa.cpf }}
            </td>
            <td class="row-values">
              {{ pessoa.sexo }}
            </td>
            <td class="row-values">
              <button class="button" @click="editarPessoa(pessoa)">
                Editar
              </button>
            </td>
            <td class="row-values">
              <button class="button" @click="excluirPessoa()">Excluir</button>
            </td>
            <ModalConfirmar :id="pessoa.id" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  width: 95%;
  height: 90%;
  margin: 20px auto;
  box-shadow: 0 0 20px rgba(104, 104, 104, 0.15);
  border: 1px solid rgb(243, 243, 243);
  position: relative;
}

.table-scroll {
  overflow-y: auto;
  max-height: calc(100% - 100px);
}

.button {
  background-color: #f2f2f2;
}

.button-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.styled-table {
  border-collapse: collapse;
  font-size: 1rem;
  width: 100%;
}

thead tr {
  text-align: left;
}

th,
td {
  padding: 12px 15px;
}

.row-even {
  background-color: #f2f2f2;
}

.row-odd {
  background-color: #ffffff;
}
</style>
