<template>
  <div v-if="list">
    {{ console.log(list) }}
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
      :navigation="{
        enabled: true,
        prevEl: '.person-prev',
        nextEl: '.person-next',
      }"
    >
      <SwiperSlide v-for="person in mergeJobsById(list)">
        <PersonCard :person="person" />
      </SwiperSlide>
      <div class="c-slider-persons__nav">
        <button class="u-text-white person-prev">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="u-text-white person-next">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import PersonCard from "./PersonCard.vue";

defineProps(["title", "subtitle", "list"]);

const mergeJobsById = (data: any) => {
  const seenIds = new Set();
  return data.reduce((acc: any, item: any) => {
    if (!seenIds.has(item.id)) {
      // Si l'ID n'a pas encore été vu, on l'ajoute à l'accumulateur
      seenIds.add(item.id);
      acc.push(item);
    } else {
      // Si l'ID a déjà été rencontré, on fusionne le job avec l'objet existant
      const existingItem = acc.find(
        (obj: { id: Number }) => obj.id === item.id
      );
      // Vérifier si le job est déjà présent avant de l'ajouter
      if (!existingItem.job.includes(item.job)) {
        existingItem.job += ` / ${item.job}`;
      }
    }
    return acc;
  }, []);
};
</script>
