<template>
  <div class="c-movie-infos">
    <div>
      <h2 class="c-h-l u-text-white u-mb-16">Informations</h2>
      <div class="c-movie-infos__infos-list">
        <ul class="c-movie-infos__genres">
          <li class="c-text-l u-text-white" v-for="item in genres">{{ item.name }}</li>
        </ul>
        <p class="c-text-l u-text-white" v-if="release_date">Date de sortie : {{ getDate(release_date) }}</p>
        <p class="c-text-l u-text-white" v-else-if="first_air_date">Première diffusion : {{ getDate(first_air_date) }}</p>
        <p class="c-text-l u-text-white" v-if="vote_count > 0">{{ Math.round(vote_average * 10) / 10 }}/10 ({{ vote_count }})</p>
      </div>
    </div>
    <div v-if="overview" class="c-movie-infos__overview">
      <h2 class="c-h-l u-text-white u-mb-16">Synopsis</h2>
      <p class="c-text-m u-text-white">{{ overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['title', 'poster_path', 'genres', 'vote_count', 'release_date', 'vote_average', 'first_air_date', 'overview'])

const getDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}
</script>
