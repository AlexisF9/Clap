<template>
  <div v-if="series && series.results.length > 0" class="o-container">
    <h2 class="c-h-2xl u-text-white u-mb-24">Les sorties de la semaine</h2>

    <!--
    <select v-if="genres" v-model="genre">
      <option value="all">Tout les genres</option>
      <option v-for="genre in genres.genres" :value="genre.id">{{ genre.name }}</option>
    </select>
    -->

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

    <ul class="c-text-l u-fw-400 c-movies__pagination">
      <li v-if="page > 1" class="c-movies__arrow-left">
        <button type="button" @click="page--"><i class="fa-solid fa-chevron-left"></i></button>
      </li>
      <li v-if="page > 2">
        <button type="button" @click="page = 1">1</button>
      </li>
      <li v-if="page > 1">
        <button type="button" @click="page--">{{ page - 1 }}</button>
      </li>
      <li class="u-fw-600 c-movies__current-page">{{ page }}</li>
      <li v-if="page < series.total_pages">
        <button type="button" @click="page++">{{ page + 1 }}</button>
      </li>
      <li v-if="page < series.total_pages - 1">
        <button type="button" @click="page = series.total_pages">{{ series.total_pages }}</button>
      </li>
      <li v-if="page < series.total_pages" class="c-movies__arrow-right">
        <button type="button" @click="page++"><i class="fa-solid fa-chevron-right"></i></button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import {ref, watchEffect} from "vue";
import {useFetch} from "../composables/fetch.ts";

const { data: genres } = useFetch(`${import.meta.env.VITE_TMBD_URL}/genre/tv/list?language=fr-FR`)
console.log(genres)
//const genre = ref('all')
const date = ref(null)
const page = ref(1)
const series = ref<{ total_pages: number, results: { id: number, poster_path: string, name: string, vote_average: number, vote_count: number }[] }>()

const firstDayOfWeek = ref('')
const lastDayOfWeek = ref('')

const fetchData = async(url: string, elem: any) => {
  elem.value = null

  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}` + url, {
      headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
    });
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString())
  }
}

const getWeekDates = () => {
  const d = date.value ? new Date(date.value) : new Date();
  const day = d.getDay();
  const first = d.getDate() - day + (day == 0 ? -6 : 1);
  const last = d.getDate() - (day - 1) + 6;
  firstDayOfWeek.value = new Date(d.setDate(first)).toISOString().slice(0, 10)
  lastDayOfWeek.value = new Date(d.setDate(last)).toISOString().slice(0, 10)
}

watchEffect(() => {
  getWeekDates()
  fetchData(`/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=${page.value}&region=FR&release_date.gte=${firstDayOfWeek.value}&release_date.lte=${lastDayOfWeek.value}&sort_by=primary_release_date.desc&without_genres=10763,10767,10764`, series)
})
// /movie/now_playing?language=fr-FR&page=${page.value}&region=fr&with_genres=37
// /discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&region=FR&release_date.gte=2024-09-17&release_date.lte=2024-09-19&sort_by=primary_release_date.desc
</script>
