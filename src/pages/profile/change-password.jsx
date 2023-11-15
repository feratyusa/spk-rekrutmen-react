import React from "react"
import { useState } from "react";
import { Paper, Box, TextField, InputAdornment, IconButton, Button, Stack } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Header from "../../components/Header";
import axios, { getCookie } from "../../utils/axios";
import { validPassword } from "../../utils/regex";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [passError, setPassError] = useState(false)
    const [retypeError, setRetypeError] = useState(false)
    const navigate = useNavigate()
    const [inputField, setInputField] = useState({password:"", new_password:"", retype_password:""})

    function handleOnChangeInput(event){
        if(event.target.name === 'new_password'){
            setPassError(!validPassword.test(event.target.value))
        }
        if(event.target.name === 'retype_password'){
            const valid = event.target.value === inputField.new_password
            setRetypeError(!valid)
        }
        const values = inputField
        values[event.target.name] = event.target.value
        setInputField(values)
    }

    function handleShowPassword(){
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputField)
        if(!passError && !retypeError){
            const data = {
                password: inputField.password, 
                new_password: inputField.new_password
            }
            axios.put('/api/user/change-password',data,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials: true
            }).then(function(response){
                navigate('/user')
            }).catch(function(error){
                if(error.response){
                    console.log(error.response)
                }
                console.log(error.config)
            })
        }
    }

    return(
        <Box>
            <Header title={'Change Passoword'} />
            <Paper sx={{
                width:'100%',
                p:4,
            }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} justifyContent={'flex-start'} alignItems={'flex-start'}>
                        <TextField 
                            required
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
                        <TextField 
                            required
                            name="new_password"
                            label="Password Baru"
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
                            name="retype_password"
                            label="Retype Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
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
                        <Stack direction={'row'} spacing={2}>
                            <Button 
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                            </Button>
                            <Button 
                                    variant="contained"
                                    href="/user"
                                    color="warning"
                                >
                                    Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}

export default ChangePassword