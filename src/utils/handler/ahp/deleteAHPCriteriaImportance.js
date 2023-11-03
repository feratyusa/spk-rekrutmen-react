import axios, {getCookie} from "../../axios";

const deleteAHPCriteriaImportance = (id) => {
    return axios.delete('/api/ahp/'+id+'/criterias/importance/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteAHPCriteriaImportance