<script setup lang="ts">
import { useRoute } from "vue-router";
import { routes } from "@/router/routes";
const route = useRoute()
</script>
<template>
  <nav class="nav">
    <ul class="nav__list">
      <router-link
          v-for="(navElement, index) in routes"
          :key="index"
          :to="navElement.path"
          v-slot="{ navigate }"
          custom
      >
        <li
            class="nav__list-li"
            :class="{ 'nav__list--active': route.path === navElement.path }"
            @click="navigate"
        >
          {{ navElement.name }}
        </li>
      </router-link>
    </ul>
  </nav>
</template>
<style lang="scss">
.nav {
  background-color: white;
  width: 100%;
  height: 64px;
  border-radius: 4px;
  padding: 0 24px;

  &__list {
    display: flex;
    margin: 0;
    list-style: none;

    &-li {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 24px;
      color: #9A9DA4;

      &:hover {
        cursor: pointer;
      }
    }

    &--active {
      border-bottom: 2px solid #1952E1;
      color: black;
    }
  }
}
</style>