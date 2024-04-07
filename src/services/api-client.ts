import { fetchAuthSession } from "aws-amplify/auth";
import axios, { CanceledError, InternalAxiosRequestConfig } from "axios";

const client = axios.create({
    params: {
        // key:"value"
    },
    // headers: { "x-auth-token": localStorage.getItem("token") },
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // withCredentials: true,
});

client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const { tokens } = await fetchAuthSession();
    config.headers["x-auth-token"] = tokens?.accessToken.toString() || "";
    // config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";

    return config;
});

export default client;

export { CanceledError };
