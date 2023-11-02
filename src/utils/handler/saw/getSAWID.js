import axios from "../../axios"

const getSAWID = (id) => {
    return axios.get('/api/saw/'+id, {
        withCredentials: true
    })
}

export default getSAWID