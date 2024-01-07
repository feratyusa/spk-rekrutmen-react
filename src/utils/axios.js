import axios from 'axios'

export const getCookie = (name) =>{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default axios.create({
    baseURL: "http://localhost:5000"
});