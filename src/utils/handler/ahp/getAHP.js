import axios from "../../axios"

const getAHP = () => {
    return axios.get('/api/ahp',{
        withCredentials:true
    })
}

export default getAHP