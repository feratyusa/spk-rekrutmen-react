import axios from "../axios"

const getUser = () => {
    return axios.get('/api/user/details',{
        withCredentials: true
    })
}

export default getUser
