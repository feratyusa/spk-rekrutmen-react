import axios from "../../axios"

const getSAWFileDetails = (id, file_id) => {
    return axios.get('/api/saw/'+id+'/file/'+file_id+'/details',{
        withCredentials:true
    })
}

export default getSAWFileDetails