<template>
  <ul class="c-text-l u-fw-400 c-movies__pagination">
    <li v-if="page > 1" class="c-movies__arrow-left">
      <button type="button" @click="page--"><i class="fa-solid fa-chevron-left"></i></button>
    </li>
    <li v-if="page > 2">
      <button type="button" @click="page = 1">1</button>
    </li>
    <li v-if="page > 1">
      <button type="button" @click="page--">{{ page - 1 }}</button>
    </li>
    <li class="u-fw-600 c-movies__current-page">{{ page }}</li>
    <li v-if="page < total_pages">
      <button type="button" @click="page++">{{ page + 1 }}</button>
    </li>
    <li v-if="page < total_pages - 1">
      <button type="button" @click="page = total_pages">{{ total_pages }}</button>
    </li>
    <li v-if="page < total_pages" class="c-movies__arrow-right">
      <button type="button" @click="page++"><i class="fa-solid fa-chevron-right"></i></button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const page = defineModel('page')
interface Props {
  total_pages: number
}
defineProps<Props>()
</script>
