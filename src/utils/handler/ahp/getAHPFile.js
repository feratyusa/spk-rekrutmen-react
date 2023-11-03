import axios from "../../axios"
import { getCookie } from "../../axios"

const getAHPFile = (id) => {
    return axios.get('/api/ahp/'+id+'/file',{
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