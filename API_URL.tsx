import axios from "axios";
const API_URL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL as string,
});
export default API_URL;
