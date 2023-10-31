import axios, { getCookie } from "./axios"

const handleLogout = () => {
    return axios.delete('/api/logout',{
        headers:{
            'X-CSRF-TOKEN': getCookie('csrf_access_token')
        },
        withCredentials: true
    })
}

export default handleLogout