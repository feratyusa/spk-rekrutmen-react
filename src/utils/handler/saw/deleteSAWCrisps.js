import axios, {getCookie} from "../../axios"

const deleteSAWCrisps = (id, c_id) => {
    return axios.delete('/api/saw/'+id+'/criterias/'+c_id+'/crisps/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteSAWCrisps