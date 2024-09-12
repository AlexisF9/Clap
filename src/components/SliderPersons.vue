<template>
  <div v-if="list">
    <div class="c-slider-persons__intro">
      <h2 class="c-h-xl u-text-white">{{ title }}</h2>
    </div>
    <Swiper
        class="c-slider-persons__swiper"
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
      <SwiperSlide v-for="cast in list">
        <PersonCard :person="cast" />
      </SwiperSlide>
    </Swiper>
    <div class="c-slider-persons__nav">
      <button class="u-text-white person-prev"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="u-text-white person-next"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import 'swiper/css/navigation';
import Button from "./Button.vue";
import PersonCard from "./PersonCard.vue";

defineProps(['title', 'subtitle', 'list', 'action'])
</script>
