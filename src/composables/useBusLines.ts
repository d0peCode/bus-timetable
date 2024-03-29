import axios from "@/lib/interceptor";

import { BusStop } from "@/types/busStop";

export const useBusLines = () => {
  const fetchBusLines = async () => {
    // There should be separated call to get lines; I'll hack it from stops endpoint
    // Figma indicates 50 lines but actually API returns only 12
    const { data: busStops } = await axios.get<BusStop[]>('/stops')
    const lines = new Set(busStops.map((busStop: BusStop) => ( busStop.line )))
    return [...lines].sort()
  }

  return {
    fetchBusLines
  }
}
