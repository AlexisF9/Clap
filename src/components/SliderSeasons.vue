<template>
  <div v-if="list">
    <div class="c-slider-seasons__intro">
      <h2 class="c-h-xl u-text-white">{{ title }}</h2>
    </div>
    <Swiper
        class="c-slider-seasons__swiper"
        slides-per-view="auto"
        :space-between="20"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
          },
          '768': {
            slidesPerView: 3,
          },
          '1024': {
            slidesPerView: 5,
          },
        }"
        :modules="[Navigation]"
        :navigation="{enabled: true, prevEl: '.person-prev', nextEl: '.person-next'}"
    >
      <SwiperSlide v-for="season in list.filter((el: any) => el.season_number > 0)">
        <SeasonCard :title="season.name" :poster="season.poster_path" :episodes_count="season.episode_count" :number="season.season_number" />
      </SwiperSlide>
      <div class="c-slider-seasons__nav">
        <button class="u-text-white person-prev"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="u-text-white person-next"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/navigation';
import SeasonCard from "./SeasonCard.vue";

defineProps(['title', 'subtitle', 'list'])
</script>
