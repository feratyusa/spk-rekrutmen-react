import React, { useState, useRef } from "react";
import Header from "./Header";
import { Box, FormControl, Stack, Divider, TextField,
        Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import axios, {getCookie} from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import getData from "../utils/handler/data/getData";
import getDataID from "../utils/handler/data/getDataID";
import getDataFile from "../utils/handler/data/getDataFile";
import getSAWID from "../utils/handler/saw/getSAWID";
import getAHPID from "../utils/handler/ahp/getAHPID";

const EditForm = ({type}) => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const dataDefaultValue = useRef(null)

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate()
    const inputs = (type==='data' ? {name:"", description:""} : {name:"", description:"", data_id:""})
    const [inputField, setInputField] = useState(inputs)

    function handleChangeInput(event) {
        const values = inputField
        values[event.target.name] = event.target.value
        setInputField(values)
    }

    const handleselectedFile = event => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    };

    function handleChangeLabel(event, newValue) {
        const values = inputField
        values.data_id = newValue ? newValue.id : null
        setInputField(values)
    }

    useEffect(() => {
        if(type==='data'){
            Promise.all([getDataID(id), getDataFile(id)])
                .then(function([response, file]){
                    console.log(response)
                    console.log(file)
                    const values = inputField
                    values.name = response.data.name
                    values.description = response.data.description ? response.data.description : null
                    setInputField(values)
                    const csvFile = new File([file.data], response.data.file_path, {
                        type:'text/csv'
                    })
                    setFile(csvFile)
                    setFileName(response.data.file_path)
                    setLoading(false)
                }).catch(function([response, file]){
                    console.log(response.config)
                    console.log(file.config)
                })
        }
        else{
            Promise.all([type==='saw' ? getSAWID(id) : getAHPID(id), getData()])
                .then(function([method, listData]){
                    console.log(method.data)
                    console.log(listData.data)
                    const values = inputField
                    values.name = method.data.name
                    values.description = method.data.description ? method.data.description : null
                    values.data_id = method.data.data_id
                    setInputField(values)
                    dataDefaultValue.current = listData.data.find(o => o.id === method.data.data_id)
                    setData(listData.data)
                    console.log(data)
                    console.log(dataDefaultValue.current)
                    setLoading(false)
                }).catch(function([method, data]){
                    console.log(method.config)
                    console.log(data.config)
                })
        }
    }, [])
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(type==='data'){
            const data = {
                name: inputField.name,
                description: inputField.description,        
                file: file
            }
            axios.put('/api/data/'+id+'/update', data,{
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
        else{
            const data = {
                name: inputField.name,        
                description: inputField.description,
                data_id: inputField.data_id
            }
            axios.put(type==='saw' ? '/api/saw/'+id+'/update' : '/api/ahp/'+id+'/update', 
                data,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': getCookie('csrf_access_token')
                    },
                    withCredentials:true
            }).then(function(response){
                console.log(response.data)
                if(type==='saw') navigate('/saw/'+response.data.id)
                else navigate('/ahp/'+response.data.id)
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

    return(
        loading ? '' :
        <Box>
            <Header title={type==='data' ? 'Edit Data' : type==='saw' ? 'Edit SAW' : 'Edit AHP'} />
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
                        required
                        name="name"
                        label="Nama File"
                        variant="filled"
                        defaultValue={inputField.name}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <TextField
                        required
                        name="description"
                        label="Deskripsi File"
                        variant="filled"
                        defaultValue={inputField.description}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <FormControl sx={{mb:2}}>
                        {
                            type !=='data' ? 
                            <Autocomplete
                                name="data_id"
                                options={data}
                                getOptionLabel={(option) => `${option.name} (${option.created_at})`}
                                renderInput={(params) => <TextField {...params} label="Data" />}
                                onChange={(event, newValue) => handleChangeLabel(event, newValue)}
                                defaultValue={dataDefaultValue.current}
                            />
                            : fileName == '' ? 
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
                            x={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>
                                Submit
                        </Button> 
                        <Button 
                            variant="contained" 
                            color="warning"
                            href={type==='data' ? '/data/'+id : type==='saw' ? '/saw/'+id : '/ahp/'+id}
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

export default EditForm