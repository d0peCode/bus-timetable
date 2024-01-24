<script setup lang="ts">
import {defineProps, watch, ref} from 'vue'
import {useBusStops} from "@/composables/useBusStops";

const props = defineProps<{
  selectedLine: number
  selectedStopName: string
}>()

const busStops = useBusStops()
const busTimeList = ref<string[]>([])

watch(() => props.selectedStopName, async (newStopName: string) => {
  busTimeList.value = await busStops.fetchBusStopsTime(newStopName)
})
</script>
<template>
  <div class="single-stop" :class="busTimeList.length ? 'single-stop--filled' : 'single-stop--empty'">
    <p v-if="!busTimeList.length">
      Please select the bus {{ selectedLine ? 'stop' : 'line' }} first
    </p>
    <table aria-describedby="Bus Stops Table" v-else class="single-stop__table">
      <tr>
        <th scope="row">Bus Stop: {{ selectedStopName }}</th>
      </tr>
      <tr>
        <th scope="row">Time</th>
      </tr>
      <tr
        v-for="(busStop, index) in busTimeList"
        :key="index"
      >
        <td>{{ busStop }}</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss">
.single-stop {
  flex: 1;
  height: 444px;
  margin-left: 8px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--empty {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%239A9DA4FF' stroke-width='2' stroke-dasharray='16%2c 20' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e");
  }

  &--filled {
    background-image: none;
  }

  & p {
    color: #63666E
  }

  &__table {
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 444px;
    overflow: auto;


    & > tr {
      width: 100%;
      border-bottom: 1px solid #F8F8FB;
      padding: 0 24px;

      &:first-of-type {
        border-bottom: 0;
      }

      &:nth-of-type(2) {
        border-bottom: 2px solid #F8F8FB;
      }

      & > th {
        height: 56px;
      }

      & > td {
        display: flex;
        align-items: center;
        width: 100%;
        height: 56px;
      }
    }
  }
}
</style>
