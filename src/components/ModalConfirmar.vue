<script setup>
import PessoaAPI from "@/services/PessoaAPI";
import { onMounted, computed, defineProps, ref } from "vue";
import store from "@/store";
import { fecharModal } from "@/utils/modalConfig";
import toast from "@/utils/toastConfig";

const props = defineProps({ id: String });
const modal = ref("");
const modalConfirm = ref("");

const erro = computed(() => store.state.erros);
const loading = ref(false);

function deletarPessoa(id) {
    loading.value = true;

    PessoaAPI.deletePessoa(id).then(() => {
        if (erro.value) {
            return toast.abrirToast("error", "Não foi possível deletar essa pessoa.");
        }
        loading.value = false;
        fecharModal(modalConfirm.value);
        toast.abrirToast("success", "Pessoa excluída com sucesso!");
    })
}

onMounted(() => {
  modalConfirm.value = document.querySelector("#modal-confirm");
  modal.value = document.querySelector("#modal-pessoa");
});
</script>

<template>
    <div class="modal" id="modal-confirm">
        <div class="modal-background"></div>
        <div class="modal-card">
            <section class="modal-card-body">
                <p class="modal-card-title">Deseja realmente excluir essa pessoa?</p>
            </section>
            <footer class="modal-card-foot">
                <button v-if="!loading" class="button delete-button" @click="deletarPessoa(props.id)">
                    Excluir
                </button>
                <button class="button is-danger is-loading" v-if="loading"></button>
                <button class="button" @click=fecharModal(modalConfirm) :disabled="loading">Cancelar</button>
            </footer>
        </div>
    </div>
</template>
