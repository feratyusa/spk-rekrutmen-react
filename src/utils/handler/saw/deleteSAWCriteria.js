import axios, {getCookie} from "../../axios"

const deleteSAWCriteria = (id) => {
    return axios.delete('/api/saw/'+id+'/criterias/delete',{
        headers:{
            'X-CSRF-TOKEN': getCookie('csrf_access_token')
        },
        withCredentials: true
    })
}

export default deleteSAWCriteria