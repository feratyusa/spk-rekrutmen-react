import axios from "../../axios";

const getAHPID = (id) => {
    return axios.get('/api/ahp/'+id,{
        withCredentials: true
    })
}

export default getAHPID