<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useBusStops} from "@/composables/useBusStops";
import {BusStop} from "@/types/busStop";

const busStops = useBusStops()
const searchValue = ref('');
const allBusStops = ref<BusStop[]>([])
const visibleBusStops = ref<BusStop[]>([])

function searchStops() {
  visibleBusStops.value = allBusStops.value.filter((busStop) => (
    busStop.stop.toLowerCase().startsWith(searchValue.value.toLowerCase()))
  )
}

onMounted(async () => {
  allBusStops.value = await busStops.fetchAllBusStops()
  visibleBusStops.value = allBusStops.value
})
</script>
<template>
  <div class="stops-search">
    <input
      class="stops-search__input"
      type="search"
      placeholder="Search..."
      v-model="searchValue"
      @keyup="searchStops"
    >

    <table aria-describedby="Bus Stops Table" class="stops-search__table">
      <tr>
        <th scope="row">Bus Stops</th>
      </tr>
      <tr
        v-for="(busStop, index) in visibleBusStops"
        :key="index"
      >
        <td>{{ busStop.stop }}</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss">
.stops-search {
  margin-top: 16px;
  background-color: white;
  border-radius: 4px;
  height: 676px;

  &__input {
    border: 1px solid #E2E4EA;
    padding: 12px 18px;
    width: 288px;
    height: 40px;
    border-radius: 4px;
    margin: 8px;
  }

  &__table {
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 600px;
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
