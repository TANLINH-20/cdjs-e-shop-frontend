import axios from "axios";
const httpAxios = axios.create({
  baseURL: "http://localhost:8080/api/",
  // timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
httpAxios.interceptors.response.use(function (response) {
  return response.data;
});
export default httpAxios;
