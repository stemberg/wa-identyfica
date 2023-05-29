<script setup>
import ModalPessoa from "@/components/ModalPessoa.vue";
import TabelaPessoa from "@/components/TabelaPessoa.vue";
</script>

<template>
  <div class="pessoas-container">
    <TabelaPessoa />
    <ModalPessoa />
  </div>
</template>

<style scoped>
.pessoas-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>



