<template>
  <RouterLink :class="`c-tag ${size && size === 'sm' ? 'c-text-s' : 'c-text-m'} u-text-white`" :to="link">
    {{ label }}
    <i v-if="closable" class="u-text-secondary fas fa-times"></i>
  </RouterLink>
</template>

<script setup lang="ts">
interface Props {
  label: string,
  link: string,
  closable: boolean,
  size?: 'md' | 'sm'
}
defineProps<Props>()

</script>
