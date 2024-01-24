<script setup lang="ts">
import { ref } from "vue";
import BusLineSelector from "@/components/BusLineSelector.vue";
import SingleBusLine from "@/components/SingleBusLine.vue";
import SingleBusStop from "@/components/SingleBusStop.vue";

const selectedLine = ref<number>(0)
const selectedStopName = ref<string>('')

function newLineSelected (newLine: number) {
  selectedLine.value = newLine
  selectedStopName.value = ''
}

function newStopSelected (newStopName: string) {
  selectedStopName.value = newStopName
}
</script>
<template>
  <BusLineSelector @line-selected="newLineSelected" />
  <main class="bus-container">
    <SingleBusLine :selected-line="selectedLine" @stop-selected="newStopSelected" />
    <SingleBusStop :selected-stop-name="selectedStopName" />
  </main>
</template>
<style lang="scss">
.bus-container {
  margin-top: 16px;
  display: flex;
}
</style>
