import axios from "axios"

const baseURL = import.meta.env.VITE_API
const instance = () => {   
    return axios.create({baseURL})
}
export default instance