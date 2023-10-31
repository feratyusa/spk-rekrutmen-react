import axios from "../axios";

const runSAWMethod = (id) => {
    return axios.get('/api/saw/'+id+'/method/create',{
        withCredentials: true
    })
}

export default runSAWMethod;