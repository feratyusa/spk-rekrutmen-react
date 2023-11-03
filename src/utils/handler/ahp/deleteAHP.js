import axios, {getCookie} from "../../axios";

const deleteAHP = (id) => {
    return axios.delete('/api/ahp/'+id+'/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default deleteAHP