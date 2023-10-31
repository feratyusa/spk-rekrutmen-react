import axios from "../axios"

const getSAW = () => {
    return axios.get('/api/saw',{
        withCredentials:true
    })
}

export default getSAW