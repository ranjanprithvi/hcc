import axios, { CanceledError } from "axios";

export default axios.create({
    params: {
        // key:"value"
    },
    headers: { "x-auth-token": localStorage.getItem("token") },
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export { CanceledError };
