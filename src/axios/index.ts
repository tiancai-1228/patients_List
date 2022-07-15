import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const API_URL = "https://robbt-list.herokuapp.com";

const customAxios = axios.create({
  baseURL: publicRuntimeConfig.API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});
export { customAxios, API_URL };
