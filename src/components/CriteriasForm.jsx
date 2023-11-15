import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Paper, Box, Stack, TextField, Select, 
    MenuItem, Button, FormControl, InputLabel, IconButton, Alert, TableContainer, Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import Header from "./Header";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import axios, {getCookie} from '../utils/axios'
import { integerOnly, validName } from "../utils/regex";

const CriteriasForm = ({type}) => {
    const {id} = useParams()
    const [nameError, setNameError] = useState([false])
    const [weightError, setWeightError] = useState([false])
    const [formError, setFormError] = useState(false)
    const navigate = useNavigate()

    const criterias = (type === 'saw' ? {name: "", atribute: "", crisps_type:"", weight: ""}
                        : {name: "", crisps_type:""})

    const [inputFields, setInputFields] = useState([
        criterias
    ])

    function handleChangeInput(index, event) {
        if(event.target.name === 'name'){
            const error = [...nameError]
            error[index] = !validName.test(event.target.value)
            setNameError(error)
        }
        if(event.target.name === 'weight'){
            const error = [...weightError]
            error[index] = !integerOnly.test(event.target.value)
            setWeightError(error)
        }
        const values = [...inputFields]
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }

    function handleAddFields(){
        setInputFields([...inputFields, criterias])
        setNameError([...nameError, false])
        setWeightError([...weightError, false])
    }

    function handleRemoveFields(index){
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values)
        const nerror = [...nameError]
        nerror.splice(index, 1)
        setNameError(nerror)
        const werror = [...weightError]
        werror.splice(index, 1)
        setWeightError(werror)
    }

    function check_valid(){
        for (let index = 0; index < inputFields.length; index++) {
            if(nameError[index] || inputFields[index].name === '') return false
            if(inputFields[index].crisps_type === '') return false
            if(type==='saw'){
                if(weightError[index] || inputFields[index].weight === '') return false
                if(inputFields[index].atribute === '') return false
            }
        }
        return true
    }

    function handleSubmit(e){
        e.preventDefault();        
        const data = {name:[], atribute:[], crisp_type:[], weight:[]}
        if(type==='saw'){
            for (let index = 0; index < inputFields.length; index++) {
                data.name.push(inputFields[index].name)
                data.atribute.push(inputFields[index].atribute)
                data.crisp_type.push(inputFields[index].crisps_type)
                data.weight.push(inputFields[index].weight)
            }
        }
        else{
            for (let index = 0; index < inputFields.length; index++) {
                data.name.push(inputFields[index].name)
                data.crisp_type.push(inputFields[index].crisps_type)
            }
        }
        console.log(data)
        if(check_valid()){
            axios.post(type==='saw' ? '/api/saw/'+id+'/criterias/create' : '/api/ahp/'+id+'/criterias/create',
                data,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCookie('csrf_access_token')
                    },
                    withCredentials:true
                }).then(function(response){
                    console.log(response.data)
                    if(type==='saw') navigate('/saw/'+id)
                    else navigate('/ahp/'+id)
                }).catch(function(error){
                    if(error.response){
                        console.log(error.response)
                    }
                    console.log(error.config)
                })
        }
        else{
            setFormError(true)
        }
    }
    
    return(
        <Box>
            <Header title={type==='saw' ? 'SAW Criterias Form' : 'AHP Criterias Form'}/>
            <Paper sx={{p:3}}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{mb:2}}>
                        {
                            formError ? <Alert severity="error">Harap mengisi semua bagian form</Alert> : ""
                        }
                    {inputFields.map((inputField, index) => (
                        <Stack 
                            direction={'row'} 
                            spacing={2} 
                            sx={{mb:2}} 
                            key={index}
                        >
                            <TextField 
                                name="no"
                                label="No."
                                variant="filled"
                                value={index+1}
                                sx={{
                                    maxWidth:"50px"
                                }}
                            />
                            <TextField
                                required
                                name="name"
                                label="Nama"
                                variant="filled"
                                value={inputField.name}
                                onChange={(event) => handleChangeInput(index, event)}
                                error={nameError[index]}
                            />
                            {
                            
                            type === 'saw' ?
                            <FormControl variant="filled" sx={{ minWidth: 200 }}>
                                <InputLabel id="atribute">Atribut</InputLabel>
                                <Select 
                                    required
                                    labelId="atribute"
                                    name="atribute"
                                    label="Atribute"
                                    value={inputField.atribute}
                                    onChange={(event) => handleChangeInput(index, event)}
                                >
                                    <MenuItem value={0}>Benefit</MenuItem>
                                    <MenuItem value={1}>Cost</MenuItem>
                                </Select>
                            </FormControl>
                            : ''
                            
                            }
                            <FormControl variant="filled" sx={{ minWidth: 200 }}>
                                <InputLabel id="type">Tipe Crisps</InputLabel>
                                <Select 
                                    required
                                    labelId="type"
                                    name="crisps_type"
                                    label="Crisps Type"
                                    value={inputField.crisps_type}
                                    onChange={(event) => handleChangeInput(index, event)}
                                >
                                    <MenuItem value={0}>Number</MenuItem>
                                    <MenuItem value={1}>String</MenuItem>
                                    {
                                        type === 'saw' ? <MenuItem value={2}>Sub String</MenuItem>
                                        : ''
                                    }
                                </Select>
                            </FormControl>
                            {
                                type === 'saw' ?
                                <TextField
                                    required
                                    name="weight"
                                    type="number"
                                    label="Bobot"
                                    variant="filled"
                                    value={inputField.weight}
                                    onChange={(event) => handleChangeInput(index, event)}
                                    sx={{maxWidth:'100px'}}
                                    error={weightError[index]}
                                    helperText={weightError[index] ? "Bulat positif" : ""}
                                />
                                : ''
                            }
                            <IconButton size="medium" variant="contained" color="error" onClick={() => handleRemoveFields(index)}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    ))}
                        <Button 
                            size="medium" 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleAddFields}
                            sx={{maxWidth:300, textAlign:"center"}}
                            endIcon={<AddIcon />}
                        >
                                Tambah Kriteria
                        </Button>
                    </Stack>
                    <Stack direction={'row'} spacing={4} justifyContent={'center'}>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="warning"
                            href={type==='saw'? '/saw/'+id : '/ahp/'+id}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
        
    );
}

export default CriteriasForm