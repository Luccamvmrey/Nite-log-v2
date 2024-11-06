import axios from "axios";

const isDev = false;
const BASE_URL = isDev ? "http://192.168.88.117:3000": "https://bifrost-xi.vercel.app";

const niteApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default niteApi;