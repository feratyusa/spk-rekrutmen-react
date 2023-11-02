import axios from "../../axios"

const getData = () => {
    return axios.get('/api/data',{
        withCredentials:true
    })
}

export default getData