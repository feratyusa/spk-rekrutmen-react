import React, { useEffect, useState } from "react";
import Header from '../../../../components/Header'
import { Box, Stack, Divider, Autocomplete, TextField} from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "../../../../utils/axios";
import { getCookie } from "../../../../utils/axios";
import getData from "../../../../utils/handler/getData";
import Button from '@mui/material/Button';

const SAWForm = () => {
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
    }, [loading])
    
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

    return(
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
                    <TextField
                        name="name"
                        label="Nama SAW"
                        variant="filled"
                        defaultValue={inputField.name}
                        onChange={(event) => handleChangeInput(event)}
                    />
                    <TextField
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
                    <Button type="submit" variant="contained" color="success" sx={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>Submit</Button> 
                    </Stack>
                </form>
            </Box>
        </Box>
            
    );
}

export default SAWForm;