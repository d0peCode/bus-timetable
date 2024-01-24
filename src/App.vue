<script setup lang="ts">
import AppNav from "@/components/AppNav.vue";
import { isLoading } from "@/lib/interceptor";
</script>
<template>
  <div class="app">
    <Transition>
      <div class="app__loading" v-if="isLoading">
        <span>Loading...</span>
      </div>
    </Transition>
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

  &__loading {
    position: fixed;
    bottom: 20px;
    right: 10px;
    width: 150px;
    padding: 10px;
    color: white;
    border-radius: 4px;
    background-color: #1952E1;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
