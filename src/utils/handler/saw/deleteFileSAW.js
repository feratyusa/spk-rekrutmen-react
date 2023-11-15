import axios from "../../axios"
import { getCookie } from "../../axios"

const deleteFileSAW = (id, file_id) => {
    return axios.delete('/api/saw/'+id+'/file/'+file_id+'/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteFileSAW