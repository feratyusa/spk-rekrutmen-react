import React, { useState } from "react";
import Header from '../../../components/Header'
import { Box, FormControl, Stack, Divider, TextField} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import axios, { getCookie } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const DataForm = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate()
    const [inputField, setInputField] = useState(
        {name:"", description:""}
    )

    function handleChangeInput(event) {
        const values = inputField
        values[event.target.name] = event.target.value
        setInputField(values)
    }

    const handleselectedFile = event => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: inputField.name,        
            file: file
        }
        axios.post('/api/data/create', data,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': getCookie('csrf_access_token')
            },
            withCredentials:true
        }).then(function(response){
            console.log(response.data)
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
                    <TextField
                        name="name"
                        label="Nama File"
                        variant="filled"
                        defaultValue={inputField.name}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <TextField
                        name="description"
                        label="Deskripsi File"
                        variant="filled"
                        defaultValue={inputField.description}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <FormControl sx={{mb:2}}>
                        {
                            fileName == '' ? 
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
                    <Button type="submit" variant="contained" color="success" sx={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>Submit</Button> 
                    </Stack>
                </form>
            </Box>
        </Box>
            
    );
}

export default DataForm;