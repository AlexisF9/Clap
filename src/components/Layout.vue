<template>
  <div>
    <div class="o-container">
      <header v-if="$slots.header">
        <slot name="header"></slot>
      </header>
    </div>

    <main v-if="$slots.main">
      <slot name="main"></slot>
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>

</script>
