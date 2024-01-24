import {RouteRecordRaw} from "vue-router";
import RootView from "@/views/RootView.vue";
import StopsView from "@/views/StopsView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Bus Lines',
    component: RootView
  },
  {
    path: '/stops',
    name: 'Stops',
    component: StopsView
  }
]
