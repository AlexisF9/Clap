<template>
  <RouterLink
      :class="`c-button ${types[type as keyof typeof types]} ${sizes[size as keyof typeof sizes]}`"
      v-if="link"
      to=""
  >
    <i v-if="icon" :class="icon"></i>
    {{ label }}
  </RouterLink>
  <button :class="`c-button`" v-else><i v-if="icon" :class="icon"></i>{{ label }}</button>
</template>

<script setup lang="ts">
import {ref} from "vue";

  defineProps({
    label: {
      default: null,
      type: String
    },
    type: {
      default: 'plain',
      type: String
    },
    link: {
      default: null,
      type: String
    },
    size: {
      default: 'md',
      type: String
    },
    icon: {
      default: null,
      type: String
    }
  })

  const types = ref({
    plain: 'c-button--plain',
    ghost: 'c-button--ghost'
  })

  const sizes = ref({
    md: 'c-button--m',
    lg: 'c-button--l'
  })

</script>
