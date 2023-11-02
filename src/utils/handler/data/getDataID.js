import axios from "../../axios"

const getDataID = (id) => {
    return axios.get('/api/data/'+id,{
        withCredentials:true
    })
}

export default getDataID