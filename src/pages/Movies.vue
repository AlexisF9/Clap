<template>
  <div v-if="movies && movies.results.length > 0" class="o-container">
    <h2 class="c-h-2xl u-text-white u-mb-24">Prochainement</h2>

    <!--
    <select v-if="genres" v-model="genre">
      <option value="all">Tout les genres</option>
      <option v-for="genre in genres.genres" :value="genre.id">{{ genre.name }}</option>
    </select>
    -->

    <div class="c-movies__list">
      <MovieCard
          v-for="movie in movies.results"
          :key="movie.id"
          :poster="movie.poster_path"
          :id="movie.id"
          :title="movie.title"
          :note="movie.vote_average"
          :note_count="movie.vote_count"
          type="movie"
      />
    </div>

    <Pagination v-model:page="page" :total_pages="movies.total_pages"/>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import {ref, watchEffect} from "vue";
import {useFetch} from "../composables/fetch.ts";
import Pagination from "../components/Pagination.vue";

const { data: genres } = useFetch(`${import.meta.env.VITE_TMBD_URL}/genre/movie/list?language=fr-FR`)
console.log(genres)
//const genre = ref('all')
//const date = ref(null)
const page = ref(1)
const movies = ref<{ total_pages: number, results: { id: number, poster_path: string, title: string, vote_average: number, vote_count: number }[] }>()

//const firstDayOfWeek = ref('')
//const lastDayOfWeek = ref('')

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

//const getWeekDates = () => {
//  const d = date.value ? new Date(date.value) : new Date();
//  const day = d.getDay();
//  const first = d.getDate() - day + (day == 0 ? -6 : 1);
//  const last = d.getDate() - (day - 1) + 6;
//  firstDayOfWeek.value = new Date(d.setDate(first)).toISOString().slice(0, 10)
//  lastDayOfWeek.value = new Date(d.setDate(last)).toISOString().slice(0, 10)
//}

watchEffect(() => {
  //fetchData(`/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${page.value}&region=FR&release_date.gte=${firstDayOfWeek.value}&release_date.lte=${lastDayOfWeek.value}&sort_by=primary_release_date.desc&without_genres=10770`, movies)
  fetchData(`/movie/upcoming?language=fr-FR&page=${page.value}&region=FR`, movies)
})
</script>
