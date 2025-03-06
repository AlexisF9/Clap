<template>
  <div v-if="series && series.results.length > 0" class="o-container">
    <h2 class="c-h-2xl c-h-xl-mob u-text-white u-mb-24">
      Populaire en ce moment
    </h2>

    <div class="c-movies__list">
      <MovieCard
        v-for="serie in series.results"
        :key="serie.id"
        :poster="serie.poster_path"
        :id="serie.id"
        :title="serie.name"
        :note="serie.vote_average"
        :note_count="serie.vote_count"
        type="tv"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import { ref, watchEffect } from "vue";

const series = ref<{
  total_pages: number;
  results: {
    id: number;
    poster_path: string;
    name: string;
    vote_average: number;
    vote_count: number;
  }[];
}>();

const fetchData = async (url: string, elem: any) => {
  elem.value = null;

  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}` + url, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}` },
    });
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString());
  }
};

watchEffect(() => {
  fetchData(`/trending/tv/week?language=fr-FR`, series);
});
</script>
