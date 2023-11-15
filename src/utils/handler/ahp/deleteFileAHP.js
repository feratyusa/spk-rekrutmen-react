import axios from "../../axios"
import { getCookie } from "../../axios"

const deleteFileAHP = (id, file_id) => {
    return axios.delete('/api/ahp/'+id+'/file/'+file_id+'/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteFileAHP