import axios from "axios";
import { ENV } from "@/config/env";

export const axiosClient = axios.create({
  baseURL: ENV.COINGECKO_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});
