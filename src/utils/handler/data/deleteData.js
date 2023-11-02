import axios from "../../axios"
import { getCookie } from "../../axios"

const deleteData = (id) => {
    return axios.delete('/api/data/'+id+'/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteData