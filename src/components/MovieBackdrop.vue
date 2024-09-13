<template>
  <div class="c-movie-backdrop" v-if="backdrop_path">
    <span></span>
    <img :src="`https://image.tmdb.org/t/p/original${backdrop_path}`" :alt="`Poster ${alt}`" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  alt: String,
  backdrop_path: String
})
</script>
