<template>
  <div class="o-container">
    <Search/>
    <div v-if="movies">
      <SliderMovies title="Les films à l'affiche" :list="movies.results"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "../composables/fetch.ts";

import Search from "../components/Search.vue";
import SliderMovies from "../components/SliderMovies.vue";

const { data: movies } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/now_playing?language=fr-FR&page=1`)
</script>
