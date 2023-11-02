import axios from "../../axios"
import { getCookie } from "../../axios"

const getDataFile = (id) => {
    return axios.get('/api/data/'+id+'/file',{
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment',
            'filename': 'file.csv',
            'X-CSRF-TOKEN': getCookie("csrf_access_token")
        },
        withCredentials: true
    })
}

export default getDataFile