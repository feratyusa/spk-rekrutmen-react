import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";
import axios from "../utils/axios";
import { useEffect } from "react";

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();    
    const location = useLocation();

    useEffect(() => {
        axios.get('/api/user/details', {
            withCredentials: true
        }).then(function(response){
            setAuth({user:response.data.username, login:true})
        }).catch(function(error){
            console.log(error.config)
            setAuth({user:'', login:false})
        })
    }, [])

    if(auth.user === undefined){
        return ''
    }
    else{
        return (
            auth?.user
                ? <Outlet /> 
                : <Navigate to="/login" state={{ from: location }} replace />
        )
    }
}

export default RequireAuth;