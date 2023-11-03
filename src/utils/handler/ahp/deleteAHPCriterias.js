import axios, {getCookie} from "../../axios"

const deleteAHPCriterias = (id) => {
    return axios.delete('/api/ahp/'+id+'/criterias/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie('csrf_access_token')
        },
        withCredentials: true
    })
}

export default deleteAHPCriterias