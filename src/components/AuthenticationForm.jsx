import React, { useEffect } from "react"
import { useState } from "react"
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import Header from "./Header"
import { Link, useNavigate } from "react-router-dom"
import axios, { getCookie } from "../utils/axios"
import useAuth from "../utils/useAuth"
import { useRef } from "react"

const RegisterForm = () => {
    const errRef = useRef(false)
    const navigate = useNavigate()
    const [inputField, setInputField] = useState(
        {username: "", email: "", password: "", retype_password: ""}
    )
    
    function handleOnChangeInput(event){
        inputField[event.target.name] = event.target.value
        setInputField(inputField)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(inputField.password !== inputField.retype_password){
            console.log("Password doesn't match")
        }
        else{
            axios.post('/api/user/create',{
                username: inputField.username,
                password: inputField.password,
                email: inputField.email
            },
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': getCookie('csrf-access-token')
                },
                withCredentials: true
            }).then(function(response){
                console.log(response)
                navigate('/login')
            }).catch(function(error){
                if(error.response){
                    console.log(error.response)
                }
                else if(error.request){
                    console.log(error.request)
                }
                else{
                    console.log(error.message)
                }
                console.log(error.config);
            })
        }
    }

    return(
        <React.Fragment>
            <Header title={'Register'} />
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField 
                        name="username"
                        label="Username"
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <TextField 
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <TextField 
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        defaultValue={inputField.password}
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <TextField 
                        name="retype_password"
                        label="Retype Password"
                        variant="outlined"
                        error={inputField.password === inputField.retype_password ? false : true}
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <Button 
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
            <Typography>
                Sudah punya akun? <Link to={'/login'}>Login di sini</Link>
            </Typography>
        </React.Fragment>
    )
}

const LoginForm = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const [inputField, setInputField] = useState(
        {username: "", password: ""}
    )

    function handleOnChangeInput(event){
        inputField[event.target.name] = event.target.value
        setInputField(inputField)
    }

    function handleSubmit(e){
        e.preventDefault()
        axios.post('/api/login',{
            username: inputField.username,
            password: inputField.password
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).then(function(response){
            setAuth({user:inputField.username})
            console.log(response)
            navigate('/')
        }).catch(function(error){
            if(error.response){
                console.log(error.response)
            }
            else if(error.request){
                console.log(error.request)
            }
            else{
                console.log(error.message)
            }
            console.log(error.config);
        })
    }

    return(
        <React.Fragment>
            <Header title={'Login'} />
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField 
                        name="username"
                        label="Username"
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <TextField 
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <Button 
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
            <Typography>
                Belum punya akun? <Link to={'/register'}>Register di sini</Link>
            </Typography>
        </React.Fragment>
    )
}

const AuthenticationForm = ({type}) => {

    return(
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{minHeight:'100vh'}}
        >
            <Paper
                sx={{
                    p:10
                }}
            >
                {
                    type === 'login' ?
                    <LoginForm />
                    :
                    <RegisterForm />
                }
            </Paper>
        </Box>
    )
}

export default AuthenticationForm