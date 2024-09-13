<template>
  <div class="c-layout">
    <header class="c-layout__header" v-if="$slots.header">
      <div class="o-container">
        <slot name="header"></slot>
      </div>
    </header>
    <main v-if="$slots.main">
      <slot name="main"></slot>
    </main>
    <footer class="c-layout__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>

</script>
