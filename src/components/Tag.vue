<template>
  <RouterLink class="c-tag c-text-m u-text-white" :to="link">
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
interface Props {
  label: string,
  link: string
}
defineProps<Props>()

</script>

<style lang="scss">
.c-tag {
  background-color: var(--tag-bg);
  padding: .5rem 1rem;
  border-radius: var(--radius-full);
}
</style>
