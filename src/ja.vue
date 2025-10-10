<script setup lang="ts">
// --- 1. MOCK DE DEPENDENCIAS Y SETUP ---
// En un proyecto real, se importarían:
// import { createRouter, createWebHistory } from 'vue-router'
// import { createPinia } from 'pinia'
// import { VueQueryPlugin, useQuery, QueryClient } from '@tanstack/vue-query'
// import { ref, computed, reactive, watch } from 'vue'

import { ref, computed, reactive, watch, nextTick } from 'vue';
import type { Ref } from 'vue';

// Emulación de Pinia (Estado Global Simple)
// Este objeto simularía un store de Pinia.
const globalState = reactive({
    theme: 'light', // 'claro' -> 'light'
    searchQuery: '',
    typeFilter: 'All', // 'Todos' -> 'All'
    currentPage: 1,
    pageSize: 20,
});

// Emulación de Pinia Store
const usePokedexStore = () => ({
    state: globalState,
    setSearchQuery: (query: string) => {
        globalState.searchQuery = query;
        globalState.currentPage = 1; // Resetear paginación al buscar
    },
    setPage: (page: number) => {
        globalState.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setFilter: (type: string) => {
        globalState.typeFilter = type;
        globalState.currentPage = 1;
    },
    toggleTheme: () => {
        globalState.theme = globalState.theme === 'light' ? 'dark' : 'light'; // 'claro'/'oscuro' -> 'light'/'dark'
    }
});

const store = usePokedexStore();

// --- 2. TIPOS DE DATOS ---
interface Pokemon {
    id: number;
    name: string;
    hp: number;
    types: string[];
    imgUrl: string;
    isFavorite: boolean;
}

// --- 3. MOCK DE DATOS Y FUNCIÓN DE FETCH (simulando una API) ---
// Tipos en inglés
const ALL_POKEMON_TYPES = ['All', 'Grass', 'Poison', 'Fire', 'Water', 'Bug', 'Normal', 'Flying', 'Electric'];

const mockPokemonData: Pokemon[] = [
    // Los datos simulados usan tipos en inglés para coincidir con ALL_POKEMON_TYPES
    { id: 1, name: 'Bulbasaur', hp: 55, types: ['Grass', 'Poison'], imgUrl: 'https://placehold.co/100x100/3e973e/ffffff?text=B', isFavorite: false },
    { id: 2, name: 'Ivysaur', hp: 70, types: ['Grass', 'Poison'], imgUrl: 'https://placehold.co/100x100/3e973e/ffffff?text=I', isFavorite: true },
    { id: 3, name: 'Venusaur', hp: 80, types: ['Grass', 'Poison'], imgUrl: 'https://placehold.co/100x100/3e973e/ffffff?text=V', isFavorite: false },
    { id: 4, name: 'Charmander', hp: 52, types: ['Fire'], imgUrl: 'https://placehold.co/100x100/ee8833/ffffff?text=C', isFavorite: false },
    { id: 5, name: 'Charmeleon', hp: 64, types: ['Fire'], imgUrl: 'https://placehold.co/100x100/ee8833/ffffff?text=Ch', isFavorite: false },
    { id: 6, name: 'Charizard', hp: 78, types: ['Fire', 'Flying'], imgUrl: 'https://placehold.co/100x100/ee8833/ffffff?text=Cz', isFavorite: true },
    { id: 7, name: 'Squirtle', hp: 44, types: ['Water'], imgUrl: 'https://placehold.co/100x100/6699ff/ffffff?text=S', isFavorite: false },
    { id: 10, name: 'Caterpie', hp: 45, types: ['Bug'], imgUrl: 'https://placehold.co/100x100/99bb44/ffffff?text=Ca', isFavorite: false },
    { id: 11, name: 'Metapod', hp: 50, types: ['Bug'], imgUrl: 'https://placehold.co/100x100/99bb44/ffffff?text=M', isFavorite: false },
    { id: 12, name: 'Butterfree', hp: 60, types: ['Bug', 'Flying'], imgUrl: 'https://placehold.co/100x100/99bb44/ffffff?text=Bf', isFavorite: true },
    { id: 16, name: 'Pidgey', hp: 40, types: ['Normal', 'Flying'], imgUrl: 'https://placehold.co/100x100/aa9977/ffffff?text=P', isFavorite: false },
    { id: 19, name: 'Rattata', hp: 30, types: ['Normal'], imgUrl: 'https://placehold.co/100x100/aa9977/ffffff?text=R', isFavorite: false },
    { id: 25, name: 'Pikachu', hp: 35, types: ['Electric'], imgUrl: 'https://placehold.co/100x100/f7d02c/ffffff?text=Pi', isFavorite: false },
    { id: 143, name: 'Snorlax', hp: 160, types: ['Normal'], imgUrl: 'https://placehold.co/100x100/aa9977/ffffff?text=Sn', isFavorite: true },
    // Duplicar para simular más datos
    ...Array.from({ length: 1300 }, (_, i) => ({
        id: i + 1000,
        name: `Duplicated ${i + 1}`,
        hp: (i % 80) + 20,
        types: ALL_POKEMON_TYPES[(i % ALL_POKEMON_TYPES.length)],
        imgUrl: `https://placehold.co/100x100/cccccc/000000?text=${i+1}`,
        isFavorite: i % 10 === 0,
    })),
].map((p, index) => ({...p, id: index + 1, name: `${p.name} #${index + 1}`})); // Asignar IDs y nombres únicos

const mockFetchPokemon = async (queryKey: any): Promise<{ data: Pokemon[], totalCount: number, pageCount: number }> => {
    // Simula una demora de red (200ms)
    await new Promise(resolve => setTimeout(resolve, 200));

    const [key, { search, type, page, size }] = queryKey;
    let filteredData = mockPokemonData;

    // 1. Filtrar por Tipo
    if (type && type !== 'All') { // 'Todos' -> 'All'
        filteredData = filteredData.filter(p => p.types.includes(type));
    } else if (type === 'Favorites') {
        // En el mock, "Favoritos" solo filtra los que tienen isFavorite: true
        filteredData = filteredData.filter(p => p.isFavorite);
    }

    // 2. Filtrar por Búsqueda (nombre o ID)
    if (search) {
        const lowerCaseSearch = search.toLowerCase();
        filteredData = filteredData.filter(p =>
            p.name.toLowerCase().includes(lowerCaseSearch) ||
            p.id.toString() === lowerCaseSearch
        );
    }

    const totalCount = filteredData.length;
    const pageCount = Math.ceil(totalCount / size);

    // 3. Paginación
    const start = (page - 1) * size;
    const end = start + size;
    const data = filteredData.slice(start, end);

    return { data, totalCount, pageCount };
};

// --- 4. CONFIGURACIÓN DE TANSTACK QUERY (Emulación) ---
// En un proyecto real, se usaría: const queryClient = new QueryClient()
// Usaremos ref para simular el resultado de useQuery
const queryLoading: Ref<boolean> = ref(true);
const queryData: Ref<Pokemon[] | null> = ref(null);
const queryError: Ref<any | null> = ref(null);
const totalResults: Ref<number> = ref(0);
const totalPages: Ref<number> = ref(0);
let lastFetchKey: any = null;

// Función que simula el uso de useQuery y el refresco de datos
const refetchData = async () => {
    queryError.value = null;
    queryLoading.value = true;

    const queryKey = [
        'pokemonList',
        {
            search: store.state.searchQuery,
            type: store.state.typeFilter,
            page: store.state.currentPage,
            size: store.state.pageSize,
        }
    ];

    try {
        const result = await mockFetchPokemon(queryKey);
      console.log(result)
        queryData.value = result.data;
        totalResults.value = result.totalCount;
        totalPages.value = result.pageCount;
    } catch (e) {
        queryError.value = e;
        queryData.value = null;
    } finally {
        queryLoading.value = false;
        lastFetchKey = queryKey;
    }
};

// Gatillo para recargar datos cuando el estado del store cambia (useQuery en la vida real)
watch(() => [store.state.searchQuery, store.state.typeFilter, store.state.currentPage], () => {
    refetchData();
}, { immediate: true });


// --- 5. LÓGICA DE COMPONENTES ---

// Lógica de Paginación
const paginationRange = computed(() => {
    const current = store.state.currentPage;
    const last = totalPages.value;
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

// Función para obtener el color de fondo basado en el tipo de Pokémon
const getBgColor = (type: string) => {
    // Mapeo de tipos en inglés
    const colors: { [key: string]: string } = {
        'Grass': 'bg-green-600', 'Poison': 'bg-purple-600', 'Fire': 'bg-red-600',
        'Water': 'bg-blue-600', 'Bug': 'bg-lime-600', 'Normal': 'bg-gray-600',
        'Flying': 'bg-indigo-600', 'Electric': 'bg-yellow-600', 'default': 'bg-gray-400',
        'Favorites': 'bg-yellow-500' // Color especial para el modo favoritos
    };
    return colors[type] || colors['default'];
};

// Lógica de la barra de búsqueda
const currentSearch = ref(store.state.searchQuery);
let searchTimeout: number | null = null;

const handleSearchInput = () => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    // Implementación de debounce para evitar demasiadas llamadas a la API/refetch
    searchTimeout = window.setTimeout(() => {
        store.setSearchQuery(currentSearch.value);
    }, 300);
};

// Manejo de la opción "Favoritos" (se filtra por TanStack Query/refetch)
const showFavorites = ref(false);

const favoritesText = computed(() => {
    return showFavorites.value ? 'Showing Favorites' : 'Favorites'; // 'Mostrando Favoritos' -> 'Showing Favorites'
});

const handleFavoriteToggle = () => {
    showFavorites.value = !showFavorites.value;
    // En la vida real, se cambiaría el queryKey y se haría refetch.
    // Aquí, solo cambiamos el filtro de tipo a 'Favorites' para simular.
    if (showFavorites.value) {
        store.setFilter('Favorites');
    } else {
        // Vuelve al filtro de tipo anterior si no estaba en "Todos"
        store.setFilter('All');
    }
};

</script>

<template>
    <div :class="[
        'min-h-screen p-4 transition-colors duration-300',
        store.state.theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-200'
    ]">
        <!-- Contenedor principal centrado -->
        <div class="max-w-7xl mx-auto">
            <!-- HEADER -->
            <header class="py-6 border-b" :class="store.state.theme === 'light' ? 'border-gray-300' : 'border-gray-700'">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-3xl font-extrabold tracking-tight">Pokedex GO!</h1>
                        <!-- Selector de Tema/Modo Oscuro -->
                        <div @click="store.toggleTheme"
                            class="flex items-center space-x-2 cursor-pointer p-2 rounded-full transition-all duration-200"
                            :class="store.state.theme === 'light' ? 'bg-white hover:bg-gray-200 shadow' : 'bg-gray-800 hover:bg-gray-700 shadow-lg'">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path v-if="store.state.theme === 'light'" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
                                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span class="text-sm font-medium">{{ store.state.theme === 'light' ? 'Dark' : 'Light' }}</span>
                        </div>
                    </div>

                    <!-- Descripción de la App -->
                    <p class="text-sm italic" :class="store.state.theme === 'light' ? 'text-gray-600' : 'text-gray-400'">
                        The essential encyclopedia for the modern coach.
                    </p>
                </div>
            </header>

            <!-- BARRA DE ACCIONES (Búsqueda, Favoritos, Filtro) -->
            <div class="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <!-- Búsqueda -->
                <input type="text" v-model="currentSearch" @input="handleSearchInput" placeholder="Search by name or ID..."
                    class="p-3 border rounded-lg flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    :class="store.state.theme === 'light' ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-700 bg-gray-800 text-gray-200'" />

                <!-- Botón Pokedex (Acción principal) -->
                <button
                    class="p-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2"
                    :class="[
                        store.state.theme === 'light' ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-700 text-white hover:bg-blue-600 focus:ring-blue-500',
                        queryLoading ? 'opacity-70 cursor-not-allowed' : ''
                    ]"
                    :disabled="queryLoading">
                    {{ queryLoading ? 'Loading...' : 'Pokedex' }}
                </button>

                <!-- Botón Favoritos -->
                <button @click="handleFavoriteToggle"
                    class="p-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2"
                    :class="[
                        showFavorites
                            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600 focus:ring-yellow-500'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-400',
                        store.state.theme === 'dark' && !showFavorites ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : ''
                    ]">
                    {{ favoritesText }}
                </button>

                <!-- Filtro de Tipo -->
                <select v-model="store.state.typeFilter" @change="store.setFilter($event.target.value)"
                    class="p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none transition-colors"
                    :class="store.state.theme === 'light' ? 'border-gray-300 bg-white text-gray-800' : 'border-gray-700 bg-gray-800 text-gray-200'">
                    <option v-for="type in ALL_POKEMON_TYPES" :key="type" :value="type">
                        Type: {{ type }}
                    </option>
                </select>
            </div>

            <!-- RESULTADOS Y CONTENIDO -->
            <div class="mt-8">
                <!-- Estado de Carga / Error -->
                <div v-if="queryLoading" class="text-center p-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p class="mt-4">Searching Pokémon...</p>
                </div>

                <div v-else-if="queryError" class="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p class="font-bold">Load Error</p>
                    <p>Could not load data. Please try again later.</p>
                </div>

                <div v-else-if="!queryData || queryData.length === 0" class="text-center p-8">
                    <p class="text-xl font-medium">No Pokémon found!</p>
                    <p class="mt-2 text-sm" :class="store.state.theme === 'light' ? 'text-gray-600' : 'text-gray-400'">
                        Adjust your filters or your search.
                    </p>
                </div>

                <!-- Grid de Tarjetas de Pokémon -->
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="pokemon in queryData" :key="pokemon.id"
                        class="rounded-xl shadow-xl overflow-hidden p-4 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                        :class="store.state.theme === 'light' ? 'bg-white hover:shadow-2xl' : 'bg-gray-800 hover:shadow-2xl border border-gray-700'">

                        <div class="flex items-center space-x-4">
                            <!-- Imagen/Placeholder -->
                            <div class="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4"
                                :class="getBgColor(pokemon.types[0] || 'default')">
                                <img :src="pokemon.imgUrl" :alt="pokemon.name" class="w-full h-full object-cover p-1"
                                    onerror="this.onerror=null; this.src='https://placehold.co/80x80/cccccc/000000?text=?'" />
                            </div>

                            <!-- Información Principal -->
                            <div class="flex-grow">
                                <h3 class="text-xl font-bold truncate">{{ pokemon.name }}</h3>
                                <p class="text-sm font-medium" :class="store.state.theme === 'light' ? 'text-gray-500' : 'text-gray-400'">
                                    #{{ pokemon.id.toString().padStart(3, '0') }}
                                </p>
                            </div>
                            <!-- Botón Favorito (Estrella) -->
                            <button class="flex-shrink-0 text-xl transition-colors duration-200"
                                :class="pokemon.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'"
                                title="Mark as favorite">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.05 8.729c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        </div>

                        <!-- Tipos y HP -->
                        <div class="mt-4 border-t pt-4"
                            :class="store.state.theme === 'light' ? 'border-gray-200' : 'border-gray-700'">
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span v-for="type in pokemon.types" :key="type"
                                    class="text-xs font-semibold px-3 py-1 rounded-full text-white shadow-md"
                                    :class="getBgColor(type)">
                                    {{ type }}
                                </span>
                            </div>
                            <p class="text-sm font-medium">
                                <span class="font-bold">HP:</span> {{ pokemon.hp }}
                            </p>
                            <!-- Botón de Ver Detalles (Emulación de Vue Router Link) -->
                            <button
                                class="mt-3 w-full p-2 text-center text-sm font-semibold rounded-lg text-white transition-colors duration-200 shadow"
                                :class="store.state.theme === 'light' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-700 hover:bg-indigo-600'">
                                View Details (ID: {{ pokemon.id }})
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PAGINACIÓN -->
            <div class="mt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 p-4 rounded-xl"
                :class="store.state.theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-xl'">
                <!-- Botones de Paginación -->
                <div class="flex items-center flex-wrap gap-1 space-x-2">
                    <button @click="store.setPage(store.state.currentPage - 1)" :disabled="store.state.currentPage === 1"
                        class="p-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="store.state.theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'">
                        Previous
                    </button>

                    <template v-for="page in paginationRange" :key="page">
                        <span v-if="page === '...'" class="px-2">...</span>
                        <button v-else @click="store.setPage(page)"
                            class="p-2 px-4 rounded-lg font-semibold transition-colors"
                            :class="[
                                page === store.state.currentPage
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : store.state.theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'
                            ]">
                            {{ page }}
                        </button>
                    </template>

                    <button @click="store.setPage(store.state.currentPage + 1)"
                        :disabled="store.state.currentPage === totalPages || totalPages === 0"
                        class="p-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="store.state.theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'">
                        Next
                    </button>
                </div>

                <!-- Indicador de Resultados -->
                <div class="text-sm font-medium">
                    Showing {{ queryData?.length || 0 }} / {{ totalResults }} results
                    | Page {{ store.state.currentPage }} of {{ totalPages }}
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* CSS para garantizar que Tailwind esté activo y usar la fuente Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

:root {
    /* Define la fuente Inter por defecto */
    font-family: 'Inter', sans-serif;
}
</style>
