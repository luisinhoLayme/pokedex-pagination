<script setup lang='ts'>
import { usePokedex } from '@/composables/usePokedex'
import { usePokedexStore } from '@/stores/pokedex';
import { computed } from 'vue';

// const store = usePokedexStore()
const { totalPages, results, currentPage, pageSize, setPage, pokemons } = usePokedex()

const paginationRange = computed(() => {
  const current = currentPage.value
  const last = totalPages.value
  const delta = 2;
  const range: (number | '...')[] = [];

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  const finalRange: (number | '...')[] = [];
  let lastPushed: number | '...' = 0;
  for (const page of range) {
    if (page === '...') {
      finalRange.push('...');
    } else if (page > (lastPushed as number) + 1) {
      finalRange.push('...');
      finalRange.push(page);
    } else {
      finalRange.push(page);
    }
    lastPushed = page;
  }
  return finalRange;
});
</script>

<template>
  <!-- Botones de Paginación -->
  <div class="flex items-center flex-wrap gap-1 space-x-2">
    <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
      class=" bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 shadow-xss dark:shadow-xsd cursor-pointer dark:border-b/50 p-2 px-4 rounded-lg font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-light-30 hover:bg-light-40 dark:hover:bg-lgiht-30/10">
      Previous
    </button>

    <template v-for="page in paginationRange" :key="page">
      <span v-if="page === '...'" class="px-2 dark:text-text">...</span>
      <button v-else @click="setPage(page)"
        class="cursor-pointer p-2 px-4 rounded-lg font-normal transition-colors" :class="[
          page === currentPage
            ? 'shadow-xss dark:shadow-xsd bg-light-40 text-dark-10 dark:bg-light-30 dark:text-light-50 dark:hover:bg-light-40'
            : 'bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 shadow-xss dark:shadow-xsd hover:bg-light-40 dark:hover:bg-light-30'
        ]">
        {{ page }}
      </button>
    </template>

    <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages || totalPages === 0"
      class="bg-light-30 text-light-50 dark:bg-light-40 dark:text-dark-10 shadow-xss dark:shadow-xsd cursor-pointer p-2 px-4 rounded-lg font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-light-40 dark:hover:bg-light-30">
      Next
    </button>
  </div>
</template>

<style scoped></style>
