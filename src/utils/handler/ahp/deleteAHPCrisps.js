import axios, {getCookie} from "../../axios"

const deleteAHPCrisps = (id, c_id) => {
    return axios.delete('/api/ahp/'+id+'/criterias/'+c_id+'/crisps/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteAHPCrisps