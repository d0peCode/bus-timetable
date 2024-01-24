import axios from "@/lib/interceptor";

interface BusStop {
  line: number
  stop: string
  order: number
  time: string
}

export const useBusStops = () => {
  const fetchAllBusStops = async () => {
    const { data: busStops } = await axios.get<BusStop[]>(`http://localhost:3000/stops`)
    return busStops
  }

  const fetchBusStops = async (line: number) => {
    const { data: busStops } = await axios.get<BusStop[]>(`http://localhost:3000/stops?line=${line}`)
    return busStops
  }
  const fetchBusStopsTime = async (stopName: string) => {
    const { data: busStops } = await axios.get<BusStop[]>(`http://localhost:3000/stops?stop=${stopName}`)

    const dates = busStops.map((busStop) => ( busStop.time ))

    const sortedDates = dates
      .map(time => new Date(`2000-01-01 ${time}`))
      .sort((a, b) => a.getTime() - b.getTime());

    return sortedDates.map(date => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });
  }

  return {
    fetchBusStops,
    fetchBusStopsTime,
    fetchAllBusStops
  }
}
