<script setup lang="ts">
import AppNav from "@/components/AppNav.vue";
</script>
<template>
  <div class="app">
    <h1 class="app__header">Timetable</h1>
    <AppNav />
    <router-view />
  </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');

.app {
  padding: 40px 32px;
  background-color: #F3F4F9;
  min-height: 100vh;

  &__header {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
  }
}
</style>
