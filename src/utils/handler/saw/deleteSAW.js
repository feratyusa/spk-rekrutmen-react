import axios from "../../axios"
import { getCookie } from "../../axios"

const deleteSAW = (id) => {
    return axios.delete('/api/saw/'+id+'/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteSAW