<template>
  <div class="o-container" v-if="person">
    <div class="c-single-person__infos">
      <div class="c-single-person__intro">
        <img v-if="person.profile_path" class="c-single-person__picture" :src="`https://image.tmdb.org/t/p/w300${person.profile_path}`" :alt="`Poster ${person.name}`" />
        <div>
          <h2 class="c-h-2xl u-text-white">{{ person.name }}</h2>
          <p class="c-text-l u-text-white u-mt-16">Né le {{ getDate(person.birthday )}}<span v-if="!person.deathday">, {{ getAge(person.birthday) }} ans</span></p>
          <p class="c-text-l u-text-white u-mt-16" v-if="person.deathday">Mort le {{ getDate(person.deathday)}} à {{ getAge(person.birthday) }} ans</p>
        </div>
      </div>
      <p class="c-text-m u-text-white u-mt-32" v-if="person.biography">{{ person.biography }}</p>
    </div>

    <div class="c-single-person__sliders">
      <SliderMovies v-if="movies && movies.cast.length > 0" title="Films" :list="filteredMoviesDates(movies.cast)"/>
      <SliderMovies v-if="tv && tv.cast.length > 0" title="Séries" :list="filteredTvDates(tv.cast)" card_type="tv"/>
      <SliderPersons v-if="trend && trend.results.length > 0" title="Populaire en ce moment" :list="trend.results" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {useFetch} from "../composables/fetch.ts";
import SliderMovies from "../components/SliderMovies.vue";
import SliderPersons from "../components/SliderPersons.vue";
import {ref, watchEffect} from "vue";

const route = useRoute()

const { data: trend } = useFetch(`${import.meta.env.VITE_TMBD_URL}/trending/person/day?language=fr-FR`)

const person = ref<{profile_path: string, name: string, birthday: string, deathday: string, biography: string}>()
const movies = ref<{cast: any[]}>()
const tv = ref<{cast: any[]}>()

const fetchData = async(url: string, elem: any) => {
  elem.value = null

  try {
    const response = await fetch(`${import.meta.env.VITE_TMBD_URL}/person/${route.params.id}` + url, {
      headers: {Authorization: `Bearer ${import.meta.env.VITE_TMBD_TOKEN}`}
    });
    elem.value = await response.json();
  } catch (err: any) {
    console.log(err.toString())
  }
}

watchEffect(() => {
  fetchData(`?language=fr-FR`, person)
  fetchData(`/movie_credits?language=fr-FR`, movies)
  fetchData(`/tv_credits?language=fr-FR`, tv)
})


const getAge = (date: string) => {
  const birthDay = new Date(date)
  return Math.floor((Date.now() - birthDay.getTime()) / 31557600000)
}

const getDate = (date: string) => {
  const now = Date.now();
  const newDate = new Date(date)
  const daysBefore = Math.floor(((Date.parse(date) - now) / 1000) / (3600 * 24))
  return newDate.toLocaleDateString() + (daysBefore > 1 ? ` (${daysBefore} jours)` : '')
}

const filteredMoviesDates = (array: any) => {
  return array.sort((a:any, b:any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
}
const filteredTvDates = (array: any) => {
  return array.sort((a:any, b:any) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime())
}
</script>
