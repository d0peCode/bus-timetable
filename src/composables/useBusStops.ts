import axios from "axios";

interface BusStop {
  line: number
  stop: string
  order: number
  time: string
}

export const useBusStops = () => {
  const fetchBusStops = async (line: number) => {
    const { data: busStops } = await axios.get<BusStop[]>(`http://localhost:3000/stops?line=${line}`)
    return busStops
  }
  const fetchBusStopsTime = async (stopName: string) => {
    const { data: busStops } = await axios.get<BusStop[]>(`http://localhost:3000/stops?stop=${stopName}`)
    return busStops
  }

  return {
    fetchBusStops,
    fetchBusStopsTime
  }
}