import axios, {getCookie} from "../../axios";

const deleteAHPCrispsImportance = (id, c_id) => {
    return axios.delete('/api/ahp/'+id+'/criterias/'+c_id+'/crisps/importance/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteAHPCrispsImportance