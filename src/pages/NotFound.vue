<template>
  <div class="c-not-found">
    <h1 class="c-h-3xl-desk c-h-2xl-mob u-text-secondary">Page introuvable</h1>
    <h2 class="c-h-2xl u-text-white">404</h2>
    <Cta
      label="Retour à l'accueil"
      size="lg"
      type="plain"
      :link="{ name: 'home' }"
      icon="fas fa-arrow-right"
      iconPosition="right"
    />
  </div>
</template>

<script setup lang="ts">
import Cta from "../components/Cta.vue";
</script>

<style lang="scss"></style>
