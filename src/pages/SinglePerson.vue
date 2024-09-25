<template>
  <div class="o-container" v-if="person">
    <div class="c-single-person__infos">
      <div class="c-single-person__intro">
        <img v-if="person.profile_path" class="c-single-person__picture" :src="`https://image.tmdb.org/t/p/w300${person.profile_path}`" :alt="`Poster ${person.name}`" />
        <div>
          <h2 class="c-h-2xl u-text-white">{{ person.name }}</h2>
          <p class="c-text-l u-text-white u-mt-16" v-if="person.birthday">Né le {{ getDate(person.birthday )}}<span v-if="!person.deathday">, {{ getAge(person.birthday) }} ans</span></p>
          <p class="c-text-l u-text-white u-mt-16" v-if="person.birthday && person.deathday">Mort le {{ getDate(person.deathday)}} à {{ getAge(person.birthday) }} ans</p>
        </div>
      </div>
      <p class="c-text-m u-text-white u-mt-32" v-if="person.biography">{{ person.biography }}</p>
    </div>

    <div class="c-single-person__sliders">
      <SliderTabsMovies
          title="Au casting de"
          :tabs="[
                { value: 'movie', label: 'Film', list: movies?.cast ? movies.cast : [] },
                { value: 'tv', label: 'Série', list: tv?.cast ? tv.cast : [] }
            ]"
          :type="movies?.cast && movies.cast.length === 0 ? trendingType = 'tv' : trendingType2"
          v-model:select="trendingType2"
      />

      <SliderTabsMovies
          title="Dans l'équipe de"
          :tabs="[
                { value: 'movie', label: 'Film', list: movies?.crew ? movies.crew : [] },
                { value: 'tv', label: 'Série', list: tv?.crew ? tv.crew : [] }
            ]"
          :type="movies?.crew && movies.crew.length === 0 ? trendingType = 'tv' : trendingType"
          v-model:select="trendingType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import SliderTabsMovies from "../components/SliderTabsMovies.vue";

const route = useRoute()
const trendingType = ref('movie')
const trendingType2 = ref('movie')

const person = ref<{profile_path: string, name: string, birthday: string, deathday: string, biography: string}>()
const movies = ref<{cast?: any[], crew?: any[]}>()
const tv = ref<{cast?: any[], crew?: any[]}>()

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
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}

//const filteredMoviesDates = (array: any) => {
//  return array.sort((a:any, b:any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
//}
//const filteredTvDates = (array: any) => {
//  return array.sort((a:any, b:any) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime())
//}
</script>
