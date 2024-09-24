<template>
  <RouterLink
      :class="`c-cta ${types[type as keyof typeof types]} ${sizes[size as keyof typeof sizes]}`"
      v-if="link"
      :to="link"
  >
    <i v-if="icon && iconPosition === 'left'" :class="icon"></i>
    {{ label }}
    <i v-if="icon && iconPosition === 'right'" :class="icon"></i>
  </RouterLink>
  <button :class="`c-cta ${types[type as keyof typeof types]} ${sizes[size as keyof typeof sizes]}`" v-else><i v-if="icon" :class="icon"></i>{{ label }}</button>
</template>

<script setup lang="ts">
import {ref} from "vue";

interface Props {
  label: string
  type: string,
  link?: { name: string, params: { id: number } },
  size?: string,
  icon?: string
  iconPosition?: 'right' | 'left'
}
defineProps<Props>()

const types = ref({
  plain: 'c-cta--plain',
  ghost: 'c-cta--ghost'
})

const sizes = ref({
  md: 'c-cta--m',
  lg: 'c-cta--l'
})
</script>
