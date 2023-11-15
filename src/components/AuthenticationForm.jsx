import React, {useEffect, useRef, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert, Box, Button, Paper, Stack, TextField, Typography, InputAdornment, IconButton, Fade } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Header from "./Header"
import axios, { getCookie } from "../utils/axios"
import useAuth from "../utils/useAuth"
import { validUsername, validPassword, validEmail } from "../utils/regex"

const RegisterForm = () => {
    const [nameError, setNameError] = useState(false)
    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [retypeError, setRetypeError] = useState(false)    
    const [existError, setExistError] = useState(false)    
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [inputField, setInputField] = useState(
        {username: "", email: "", password: "", retype_password: ""}
    )
    
    function handleOnChangeInput(event){
        if(event.target.name === 'username'){
            setUserError(!validUsername.test(event.target.value))
        }
        if(event.target.name === 'password'){
            setPassError(!validPassword.test(event.target.value))
        }
        if(event.target.name === 'email'){
            setEmailError(!validEmail.test(event.target.value))
        }
        if(event.target.name === 'retype'){
            const valid = event.target.value === inputField.password
            setRetypeError(!valid)
        }
        inputField[event.target.name] = event.target.value
        setInputField(inputField)
    }

    function handleShowPassword(){
        setShowPassword(!showPassword)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!userError && !passError && !emailError && !retypeError){
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
                    if(error.response.status === 400){
                        setExistError(true)
                    }
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

    useEffect(() => {
    }, [userError, passError, emailError, retypeError, showPassword, existError])
    

    return(
        <React.Fragment>
            <Header title={'Register'} />
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {
                        existError ? <Alert severity="error">Username sudah ada </Alert>
                        : ''
                    }
                    <TextField 
                        required
                        name="username"
                        label="Username"
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                        error={userError}
                        helperText="Panjang 4-12 karakter a-z, A-Z, atau _"
                    />
                    <TextField 
                        required
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={(event) => handleOnChangeInput(event)}
                        error={emailError}
                    />
                    <TextField 
                        required
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                        error={passError}
                        helperText="Panjang 8 - 24 karakter"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon/> }
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        required 
                        name="retype"
                        label="Retype Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => handleOnChangeInput(event)}
                        error={retypeError}
                        helperText={retypeError ? "Harus sama dengan password" : ""}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon/> }
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <Button 
                        variant="contained"
                        type="submit"
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
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const [inputField, setInputField] = useState(
        {username: "", password: ""}
    )

    function handleOnChangeInput(event){
        inputField[event.target.name] = event.target.value
        setInputField(inputField)
    }

    function handleShowPassword(){
        setShowPassword(!showPassword)
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
            navigate('/dashboard')
        }).catch(function(error){
            if(error.response){
                if(error.response.status === 403){
                    setLoginError(true)
                }
                console.log(error.response)                
            }
            else if(error.request){
                console.log(error.request)
            }
            else{
                console.log(error.message)
            }
        })
    }

    useEffect(() => {
    }, [loginError, showPassword])

    return(
        <React.Fragment>
            <Header title={'Login'} />
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {
                        loginError ? <Alert severity="error">Username atau Password salah</Alert>
                        : ''
                    }
                    <TextField
                        name="username"
                        label="Username"
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                    />
                    <TextField 
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        onChange={(event) => handleOnChangeInput(event)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon/> }
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <Button 
                        variant="contained"
                        type="submit"                        
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
            sx={{minHeight:'100vh', backgroundColor: 'primary.main'}}
        >
            <Fade in>
            <Paper
                elevation={10}
                sx={{
                    p:10,
                    borderRadius:8
                }}
            >

                {
                    type === 'login' ?
                    <LoginForm />
                    :
                    <RegisterForm />
                }
            </Paper>
            </Fade>
        </Box>
    )
}

export default AuthenticationForm