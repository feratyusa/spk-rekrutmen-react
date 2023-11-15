import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Divider, Autocomplete, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Header from '../../../../components/Header'
import axios, { getCookie } from "../../../../utils/axios";
import getData from "../../../../utils/handler/data/getData";

const AHPForm = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
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
    }, [])
    
    function handleChangeInput(event) {
        const values = inputField
        values[event.target.name] = event.target.value
        setInputField(values)
    }

    function handleChangeLabel(event, newValue) {
        const values = inputField
        values.data_id = newValue.id
        setInputField(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const ahp = {
            name: inputField.name,        
            description: inputField.description,
            data_id: inputField.data_id
        }
        axios.post('/api/ahp/create', ahp,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': getCookie('csrf_access_token')
            },
            withCredentials:true
        }).then(function(response){
            console.log(response.data)
            navigate('/ahp/'+response.data.id)
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
        loading ? '' :
        <Box>
            <Header title={'AHP Form'} />
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
                        label="Nama AHP"
                        variant="filled"
                        defaultValue={inputField.name}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <TextField
                        name="description"
                        label="Deskripsi AHP"
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
                            x={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>
                                Submit
                        </Button> 
                        <Button 
                            variant="contained" 
                            color="warning"
                            href="/ahp"
                            x={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>
                                Cancel
                        </Button> 
                    </Stack>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}

export default AHPForm;