import axios from "axios"

const baseURL = import.meta.env.VITE_API
const instance = () => {
    if (!baseURL) {
        throw new Error("VITE_API is not defined. Create a .env file and set VITE_API.")
    }
    return axios.create({baseURL})
}
export default instance