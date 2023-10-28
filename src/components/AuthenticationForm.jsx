import React from "react"
import { useState } from "react"
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import Header from "./Header"
import { Link } from "react-router-dom"

const RegisterForm = () => {
    const [inputField, setInputField] = useState(
        {username: "", email: "", password: "", retype_password: ""}
    )

    function handleOnChangeInput(event){
        inputField[event.target.name] = event.target.value
        setInputField(inputField)
    }

    function handleSubmit(e){
        e.preventDefault()
        alert("Passwords hallo")
        console.log(inputField)
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
                        name="username"
                        label="Username"
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
    const [inputField, setInputField] = useState(
        {username: "", password: ""}
    )

    function handleOnChangeInput(event){
        inputField[event.target.name] = event.target.value
        setInputField(inputField)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(inputField)
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