<template>
  <div class="o-container" v-if="person">
    <div class="c-single-person__infos">
      <div class="c-single-person__intro">
        <img v-if="person.profile_path" class="c-single-person__picture" :src="`https://image.tmdb.org/t/p/w300${person.profile_path}`" :alt="`Poster ${person.name}`" />
        <div>
          <h2 class="c-h-2xl u-text-white u-mb-16">{{ person.name }}</h2>
          <p class="c-text-l u-text-white" v-if="person.place_of_birth">Natif de {{ person.place_of_birth }}</p>
          <p class="c-text-l u-text-white" v-if="person.birthday">Né le {{ getDate(person.birthday )}}</p>
          <p class="c-text-l u-text-white" v-if="person.birthday && person.deathday">Mort le {{ getDate(person.deathday)}}</p>
          <p class="c-text-l u-text-white" v-if="person.known_for_department">Connu pour {{ person.known_for_department }}</p>
          <div v-if="socials" class="c-single-person__socials">
            <a class="c-text-l" target="_blank" v-if="socials.instagram_id" :href="`https://www.instagram.com/${socials.instagram_id}/`"><i class="fab fa-instagram"></i></a>
            <a class="c-text-l" target="_blank" v-if="socials.tiktok_id" :href="`https://www.tiktok.com/@${socials.tiktok_id}`"><i class="fab fa-tiktok"></i></a>
            <a class="c-text-l" target="_blank" v-if="socials.twitter_id" :href="`https://x.com/${socials.twitter_id}`"><i class="fab fa-twitter"></i></a>
            <a class="c-text-l" target="_blank" v-if="socials.youtube_id" :href="`https://www.youtube.com/@${socials.youtube_id}`"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>

    <h2 class="c-h-xl u-text-white u-mt-32 u-mb-16" v-if="person.biography">Biographie</h2>
    <p class="c-text-m u-text-white" v-if="person.biography">{{ person.biography }}</p>

    <div class="c-single-person__sliders">
      <SliderTabsMovies
          v-if="movies?.cast && movies.cast.length > 0 || tv?.cast && tv.cast.length > 0"
          title="Au casting de"
          :tabs="[
                { value: 'movie', label: 'Film', list: movies?.cast ? movies.cast : [] },
                { value: 'tv', label: 'Série', list: tv?.cast ? tv.cast : [] }
            ]"
          :type="movies?.cast && movies.cast.length === 0 ? trendingType = 'tv' : trendingType2"
          v-model:select="trendingType2"
      />

      <SliderTabsMovies
          v-if="movies?.crew && movies.crew.length > 0 || tv?.crew && tv.crew.length > 0"
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

const person = ref<{profile_path: string, name: string, birthday: string, deathday: string, place_of_birth: string, biography: string, known_for_department: string}>()
const movies = ref<{cast?: any[], crew?: any[]}>()
const tv = ref<{cast?: any[], crew?: any[]}>()
const socials = ref<{instagram_id?: string, tiktok_id?: string, twitter_id?: string, youtube_id?: string}>()

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
  fetchData(`/external_ids`, socials)
})

const getDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}
console.log(socials)
//const filteredMoviesDates = (array: any) => {
//  return array.sort((a:any, b:any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
//}
//const filteredTvDates = (array: any) => {
//  return array.sort((a:any, b:any) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime())
//}
</script>
