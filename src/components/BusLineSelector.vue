<script setup lang="ts">
import {useBusLines} from "@/composables/useBusLines";
import {onMounted, ref, defineEmits} from "vue";

const { fetchBusLines } = useBusLines()
const busLines = ref<number[]>([])

const emit = defineEmits<{
  (e: 'line-selected', newLine: number): void
}>()

onMounted(async () => {
  busLines.value = await fetchBusLines()
})
</script>
<template>
  <div class="bus-lines">
    <h2 class="bus-lines__header">Select Bus Line</h2>
    <div class="bus-lines__lines-box">
      <div
          class="bus-lines__line-chip"
          v-for="(line, index) in busLines"
          :key="index"
          @click="emit('line-selected', line)"
      >
        {{ line }}
      </div>
    </div>
    <p>(Figma indicates 50 lines but actually API returns only 12)</p>
  </div>
</template>
<style lang="scss">
.bus-lines {
  margin-top: 16px;
  padding: 24px;
  background-color: white;
  border-radius: 4px;

  &__header {
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
  }

  &__lines-box {
    margin-top: 24px;
    display: flex;
  }

  &__line-chip {
    background-color: #1952E1;
    width: 54px;
    height: 32px;
    border-radius: 4px;
    padding: 8px 16px;
    margin-right: 8px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    &:hover {
      background-color: #1649CA;
      cursor: pointer;
    }
  }
}
</style>
