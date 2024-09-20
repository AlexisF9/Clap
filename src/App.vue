<template>
  <Layout>
    <template #header>
      <h1 class="c-h-2xl u-text-secondary"><RouterLink :to="{ name: 'home' }">CLAP</RouterLink></h1>
      <div class="c-layout__header-links">
        <RouterLink class="c-text-m u-text-white" :to="{ name: 'movies' }">Films</RouterLink>
        <RouterLink class="c-text-m u-text-white" :to="{ name: 'series' }">Séries</RouterLink>
      </div>
    </template>

    <template #main>
      <RouterView/>
    </template>

    <template #footer>
      <h2 class="c-h-2xl u-text-white">CLAP</h2>
      <p class="c-text-l u-text-light">TMDb API data</p>
    </template>
  </Layout>
</template>

<script setup>
import Layout from "./components/Layout.vue";
</script>