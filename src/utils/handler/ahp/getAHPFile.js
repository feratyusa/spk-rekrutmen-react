import axios from "../../axios"
import { getCookie } from "../../axios"

const getAHPFile = (id, result_id) => {
    return axios.get('/api/ahp/'+id+'/file/'+result_id,{
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment',
            'filename': 'file.csv',
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default getAHPFile