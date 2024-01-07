import axios from "../../axios"

const getAHPFileDetails = (id, file_id) => {
    return axios.get('/api/ahp/'+id+'/file/'+file_id+'/details',{
        withCredentials:true
    })
}

export default getAHPFileDetails