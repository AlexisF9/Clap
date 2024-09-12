<template>
  <div v-if="list">
    <div class="slider-movies__intro">
      <h2 class="c-h-xl u-text-white">{{ title }}</h2>
      <div>
        <button class="u-text-white swiper-prev"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="u-text-white swiper-next"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
    <Swiper
        :slides-per-view="5"
        :space-between="20"
        :modules="[Navigation]"
        :navigation="{enabled: true, prevEl: '.swiper-prev', nextEl: '.swiper-next'}"
    >
      <SwiperSlide v-for="movie in list">
        <MovieCard
          :id="movie.id"
          :title="movie.title"
          :note="movie.vote_average"
          :poster="movie.poster_path"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/navigation';
import MovieCard from "./MovieCard.vue";

defineProps(['title', 'list'])
</script>
