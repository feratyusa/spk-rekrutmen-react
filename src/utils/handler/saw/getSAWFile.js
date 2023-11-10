import axios from "../../axios"
import { getCookie } from "../../axios"

const getSAWFile = (id, result_id) => {
    return axios.get('/api/saw/'+id+'/file/'+result_id,{
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment',
            'filename': 'file.csv',
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default getSAWFile