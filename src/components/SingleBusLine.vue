<script setup lang="ts">
import {defineProps, watch, ref} from 'vue'
import {useBusStops} from "@/composables/useBusStops";
import {BusStop} from "@/types/busStop";

const props = defineProps<{
  selectedLine: number
}>()

const busStops = useBusStops()
const busStopsList = ref<BusStop[]>([])

watch(() => props.selectedLine, async (newLine: number) => {
  busStopsList.value = await busStops.fetchBusStops(newLine)
})
</script>
<template>
  <div class="single-line">
    <p class="dev-info">(Sorry but no time to make border pixel perfect with Figma design)</p>
    <p v-if="!busStopsList.length">Please select the bus line first</p>
    <table v-else class="single-line__table">
      <tr>
        <th>Bus Stops</th>
      </tr>
      <tr v-for="(busStop, index) in busStopsList" :key="index">
        <td>{{ busStop.stop }}</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss">
.single-line {
  flex: 1;
  height: 444px;
  margin-right: 8px;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%239A9DA4FF' stroke-width='2' stroke-dasharray='16%2c 20' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    color: #63666E
  }
}

.dev-info {
  position: absolute;
  left: 5px;
  top: 2px;
}
</style>