<script setup lang="ts">
import {defineProps, watch, ref, defineEmits} from 'vue'
import {useBusStops} from "@/composables/useBusStops";
import {BusStop} from "@/types/busStop";

const props = defineProps<{
  selectedLine: number
}>()

const emit = defineEmits<{
  (e: 'stop-selected', newBusStop: string): void
}>()

const busStops = useBusStops()
const busStopsList = ref<BusStop[]>([])
const selectedBusStop = ref('')

function newStopSelected (newStopName: string) {
  selectedBusStop.value = newStopName
  emit('stop-selected', selectedBusStop.value)
}

watch(() => props.selectedLine, async (newLine: number) => {
  busStopsList.value = await busStops.fetchBusStops(newLine)
})
</script>
<template>
  <div class="single-line" :class="busStopsList.length ? 'single-line--filled' : 'single-line--empty'">
    <p class="dev-info">(Sorry but no time to make border pixel perfect with Figma design)</p>
    <p v-if="!busStopsList.length">Please select the bus line first</p>
    <table aria-describedby="Bus Stops Table" v-else class="single-line__table">
      <tr>
        <th scope="row">Bus Line: {{ selectedLine }}</th>
      </tr>
      <tr>
        <th scope="row">Bus Stops</th>
      </tr>
      <tr
        class="single-line__table--clickable"
        :class="{ 'single-line__table--active': selectedBusStop === busStop.stop }"
        v-for="(busStop, index) in busStopsList"
        :key="index"
        @click="newStopSelected(busStop.stop)"
      >
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
  border-radius: 4px;
  position: relative;
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

    &--clickable {
      &:hover {
        cursor: pointer;
        background-color: #F8F8FB;
      }
    }

    &--active {
      color: #1952E1;
    }
  }
}

.dev-info {
  position: absolute;
  right: 15px;
  top: 2px;
}
</style>
