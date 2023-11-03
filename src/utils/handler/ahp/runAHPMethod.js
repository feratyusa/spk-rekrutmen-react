import axios from "../../axios";

const runAHPMethod = (id) => {
    return axios.get('/api/ahp/'+id+'/method/create',{
        withCredentials: true
    })
}

export default runAHPMethod;