import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Divider, Autocomplete, TextField, Alert} from '@mui/material';
import Button from '@mui/material/Button';
import Header from '../../../../components/Header'
import axios, {getCookie} from "../../../../utils/axios";
import getData from "../../../../utils/handler/data/getData";
import { validName, validDescription } from "../../../../utils/regex";


const SAWForm = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [nameError, setNameError] = useState(false)
    const [deskripsiError, setDeskripsiError] = useState(false)
    const [dataError, setDataError] = useState(false)

    const [inputField, setInputField] = useState(
        {name:"", description:"", data_id: ""}
    )

    useEffect(() => {
      Promise.all([getData()])
        .then(function([data]){
            console.log(data.data)
            setData(data.data)
            setLoading(false)
        })
    }, [nameError, deskripsiError, dataError])
    
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

    function handleChangeLabel(event, newValue) {
        const values = inputField
        values.data_id = newValue?.id ? newValue?.id : ""
        setDataError(false)
        setInputField(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputField)
        if(inputField.data_id === ""){
            setDataError(true)
            return
        }
        if(!nameError && !deskripsiError && !dataError){
            const saw = {
                name: inputField.name,        
                description: inputField.description,
                data_id: inputField.data_id
            }
            axios.post('/api/saw/create', saw,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials:true
            }).then(function(response){
                console.log(response.data)
                navigate('/saw/'+response.data.id)
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
            <Header title={'SAW Form'} />
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
                        dataError ? <Alert severity="error">Harap isi bagian data</Alert> : ""
                    }
                    <TextField
                        required
                        name="name"
                        label="Nama SAW"
                        variant="filled"
                        defaultValue={inputField.name}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <TextField
                        required
                        name="description"
                        label="Deskripsi SAW"
                        variant="filled"
                        defaultValue={inputField.description}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <Autocomplete
                        name="data_id"
                        options={data}
                        getOptionLabel={(option) => `${option.name} (${option.created_at})`}
                        renderInput={(params) => <TextField {...params} label="Data" />}
                        onChange={(event, newValue) => handleChangeLabel(event, newValue)}
                    />
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
                            href="/saw"
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

export default SAWForm;