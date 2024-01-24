<script setup lang="ts">
import {defineProps, watch, ref} from 'vue'
import {useBusStops} from "@/composables/useBusStops";
import {BusStop} from "@/types/busStop";

const props = defineProps<{
  selectedStopName: string
}>()

const busStops = useBusStops()
const busStopsList = ref<BusStop[]>([])

watch(() => props.selectedStopName, async (newStopName: string) => {
  busStopsList.value = await busStops.fetchBusStopsTime(newStopName)
})
</script>
<template>
  <div class="single-stop">

  </div>
</template>
<style lang="scss">
.single-stop {
  flex: 1;
  height: 444px;
  margin-left: 8px;
  background-color: white;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%239A9DA4FF' stroke-width='2' stroke-dasharray='16%2c 20' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 4px;
}
</style>