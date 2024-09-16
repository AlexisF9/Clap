<template>
  <div class="c-home">
    <Swiper
        class="c-home__backdrop-swiper"
        v-if="movies && movies.results.length > 0"
        :slides-per-view="1"
        :space-between="0"
        :effect="'fade'"
        :autoplay="{
        delay: 5000
      }"
        :modules="[Autoplay, EffectFade]"
    >
      <SwiperSlide v-for="movie in movies.results">
        <div class="o-container c-home__swiper-content">
          <h2 class="c-h-2xl u-text-white u-mb-24">En ce moment... <span class="u-text-secondary">{{ movie.title }}</span></h2>
          <Cta
              label="En voir plus"
              size="lg"
              type="plain"
              :link="{ name: 'single-movie', params: { id: movie.id } }"
              icon="fas fa-arrow-right"
              iconPosition="right"
          />
        </div>
        <MovieBackdrop
            :backdrop_path="movie.backdrop_path"
            :alt="movie.title"
        />
      </SwiperSlide>
    </Swiper>

    <div class="o-container c-home__main">
      <Search/>

      <div class="u-mt-64">
        <SliderTabsMovies
            title="Populaire cette semaine"
            :tabs="[
                { value: 'movie', label: 'Film', list: trendingMovies ? trendingMovies.results : [] },
                { value: 'tv', label: 'Série', list: trendingTv ? trendingTv.results : [] }
            ]"
            :type="trendingType"
            v-model:select="trendingType"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "../composables/fetch.ts";
import MovieBackdrop from "../components/MovieBackdrop.vue";
import { Autoplay, EffectFade } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/effect-fade';
import Search from "../components/Search.vue";
import Cta from "../components/Cta.vue";
import {Ref, ref, watchEffect} from "vue";
import SliderTabsMovies from "../components/SliderTabsMovies.vue";

const { data: movies } = useFetch(`${import.meta.env.VITE_TMBD_URL}/movie/now_playing?language=fr-FR&page=1`)

const trendingMovies: Ref<{ results: any } | null> = ref(null)
const trendingTv: Ref<{ results: any } | null> = ref(null)
const trendingType = ref('movie')

const trendingFetch = async(url: string, elem: any) => {
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

watchEffect(() => {
  trendingFetch(`/trending/movie/week?language=fr-FR'`, trendingMovies)
  trendingFetch(`/trending/tv/week?language=fr-FR'`, trendingTv)
})
</script>