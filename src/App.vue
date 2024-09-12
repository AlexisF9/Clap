<template>
  <Layout>
    <template #header>
      <h1 class="c-h-2xl u-text-secondary"><RouterLink :to="{ name: 'home' }">CLAP</RouterLink></h1>
      <div>
        <RouterLink class="c-text-m u-text-white" to="">Films</RouterLink>
        <RouterLink class="c-text-m u-text-white" to="">Séries</RouterLink>
      </div>
    </template>

    <template #main>
      <RouterView/>
    </template>
  </Layout>
</template>

<script setup>
import Layout from "./components/Layout.vue";
</script>