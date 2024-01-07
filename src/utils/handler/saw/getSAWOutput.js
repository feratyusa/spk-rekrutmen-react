import axios from "../../axios"
import { getCookie } from "../../axios"

const getSAWOutput = (id, result_id, threshold) => {
    return axios.post('/api/saw/'+id+'/file/'+result_id+'/view',
        { 
            'threshold': threshold 
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',                
                'X-CSRF-TOKEN': getCookie("csrf_access_token")
            },
            withCredentials: true
        })
    }

export default getSAWOutput