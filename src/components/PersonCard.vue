<template>
  <div class="c-person-card" v-if="person">
    <img v-if="person.profile_path" :src="`https://image.tmdb.org/t/p/w300${ person.profile_path }`" :alt="`${person.name}`" />
    <div v-else class="c-person-card__no-picture"></div>
    <div>
      <h3 class="c-h-l u-text-white u-align-center">{{ person.name }}</h3>
      <p class="c-text-m u-align-center u-text-white">{{ person.character }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['person'])
</script>
