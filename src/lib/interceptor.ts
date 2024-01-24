import axios from "axios";
import {ref} from "vue";

const isLoading = ref(false)

axios.interceptors.request.use(function (config) {
  isLoading.value = true
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  isLoading.value = false
  return response;
}, function (error) {
  isLoading.value = false
  alert('Handled error from API...')
  return Promise.reject(error);
});

export default axios
export { isLoading }
