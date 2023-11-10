import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, Stack, Divider, TextField, FormHelperText, Alert} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Header from '../../../components/Header'
import axios, { getCookie } from "../../../utils/axios";
import { validDescription, validName } from "../../../utils/regex";


const DataForm = () => {
    const [nameError, setNameError] = useState(false)
    const [deskripsiError, setDeskripsiError] = useState(false)
    const [fileError, setFileError] = useState(false)
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const navigate = useNavigate()
    const [inputField, setInputField] = useState(
        {name:"", description:""}
    )

    function handleChangeInput(event) {
        if(event.target.name === 'name'){
            setNameError(!validName.test(event.target.value))
        }
        if(event.target.name === 'description'){
            setDeskripsiError(!validDescription.test(event.target.value))
        }
        const values = inputField
        values[event.target.name] = event.target.value
        setInputField(values)
    }

    const handleselectedFile = event => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
        setFileError(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(file === null){
            setFileError(true)
            return
        }
        if(!nameError && !deskripsiError && !fileError){
            const data = {
                name: inputField.name,
                description: inputField.description,        
                file: file
            }
            axios.post('/api/data/create', data,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials:true
            }).then(function(response){
                navigate('/data/'+response.data.id)
            }).catch(function(error){
                if(error.response){
                    console.log(error.response)
                }
                else if(error.request){
                    console.log(error.request)
                }
                console.log(error.config)
            })
        }
    }

    useEffect(() => {
    }, [nameError, deskripsiError, fileError])
    
    return(
        <Box>
            <Header title={'Data Form'} />
            <Box
                sx={{
                    p:3,
                    flex:1,
                    borderRadius:3,
                    boxShadow:5
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} alignContent={'center'}>
                        {
                            fileError ? <Alert severity="error">Harap lampirkan file data</Alert>
                            : ''
                        }
                    <TextField
                        required
                        name="name"
                        label="Nama File"
                        variant="filled"
                        defaultValue={inputField.name}
                        onChange={(event) => handleChangeInput(event)}
                        error={nameError}
                        helperText="Panjang maksimal 24 karakter"
                    />
                    <TextField
                        required
                        name="description"
                        label="Deskripsi File"
                        variant="filled"
                        defaultValue={inputField.description}
                        onChange={(event) => handleChangeInput(event)}
                        error={deskripsiError}
                        helperText="Panjang maksimal 120 karakter"
                    />
                    <FormControl sx={{mb:2}}>
                        {
                            file === null? 
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                <input id='file' type="file" accept=".csv" hidden onChange={handleselectedFile}/>
                                Upload File
                            </Button>
                            : 
                            <Button component="label" variant="outlined" color="success" startIcon={<CloudUploadIcon />}>
                                <input id='file' type="file" accept=".csv" hidden onChange={handleselectedFile}/>
                                {fileName}
                            </Button>
                        }
                    </FormControl>
                    <Divider dark='true'/>
                    <Stack direction={"row"} spacing={2} justifyContent={'center'}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="success"
                            x={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>
                                Submit
                        </Button> 
                        <Button 
                            variant="contained" 
                            color="warning"
                            href="/data"
                            x={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>
                                Cancel
                        </Button> 
                    </Stack>
                    </Stack>
                </form>
            </Box>
        </Box>
            
    );
}

export default DataForm;