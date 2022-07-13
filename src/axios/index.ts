import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const customAxios = axios.create({
  baseURL: publicRuntimeConfig.API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});
