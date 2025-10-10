<script setup lang='ts'>
import { usePokedex } from '@/composables/usePokedex'
import { usePokedexStore } from '@/stores/pokedex';

const store = usePokedexStore()
const { paginationRange, totalPage: totalPages, theme, currentPage, pageSize } = usePokedex()

</script>

<template>
  <footer class="mt-5">
    <!-- Botones de Paginación -->
    <div class="flex items-center flex-wrap gap-1 space-x-2">
      <button @click="store.setPage(currentPage - 1)" :disabled="currentPage === 1"
        class="bg-white border p-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'">
        Previous
      </button>

      <template v-for="page in paginationRange" :key="page">
        <span v-if="page === '...'" class="px-2">...</span>
        <button v-else @click="store.setPage(page)" class="border border-b p-2 px-4 rounded-lg font-semibold transition-colors" :class="[
          page === currentPage
            ? 'bg-bg text-white shadow-md'
            : theme === 'light' ? 'bg-white hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'
        ]">
          {{ page }}
        </button>
      </template>

      <button @click="store.setPage(currentPage + 1)"
        :disabled="currentPage === 66 || totalPages === 0"
        class="bg-white border border-b p-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'">
        Next
      </button>
    </div>
  </footer>
</template>

<style scoped></style>
