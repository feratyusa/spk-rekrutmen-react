import { useNavigate, useParams } from "react-router-dom"
import { Paper, Box, Stack, TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton, Alert } from "@mui/material";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import axios from '../utils/axios'
import { getCookie } from "../utils/axios";
import getSAWID from "../utils/handler/saw/getSAWID";
import getAHPID from "../utils/handler/ahp/getAHPID";
import { validName, integerOnly } from "../utils/regex";

const EditCriteriasForm = ({type}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [nameError, setNameError] = useState([false])
    const [weightError, setWeightError] = useState([false])
    const [formError, setFormError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [criteria, setCriteria] = useState()

    const [inputFields, setInputFields] = useState()

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
        setFormError(false)
        setInputFields(values)
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
        const data = { name:[], atribute:[], crisp_type: [], weight: []}
        if(!check_valid()){
            setFormError(true)
            return
        }
        if(type==='saw'){
            for (let index = 0; index < inputFields.length; index++) {
                data.name.push(inputFields[index].name)
                data.atribute.push(inputFields[index].atribute)
                data.crisp_type.push(inputFields[index].crisps_type)
                data.weight.push(inputFields[index].weight)
            }
            console.log(data)
            axios.put('/api/saw/'+id+'/criterias/update',data,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials:true
            }).then(function(response){
                console.log(response.data)
                navigate('/saw/'+id)
            }).catch(function(error){
                if(error.response){
                   console.log(error.response)
                }
                console.log(error.config)
            })
        }
        else if(type==='ahp'){
            for (let index = 0; index < inputFields.length; index++) {
                data.name.push(inputFields[index].name)
                data.crisp_type.push(inputFields[index].crisps_type)
            }
            console.log(data)
            axios.put('/api/ahp/'+id+'/criterias/update',data,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials:true
            }).then(function(response){
                console.log(response.data)
                navigate('/ahp/'+id)
            }).catch(function(error){
                if(error.response){
                   console.log(error.response)
                }
                console.log(error.config)
            })
        }
    }
    
    useEffect(() => {
        if(type==='saw'){
            Promise.all([getSAWID(id)])
                .then(function([response]){
                    console.log(response.data)
                    setCriteria(response.data.saw_criteria)
                    const saw_criteria = response.data.saw_criteria
                    console.log(saw_criteria)
                    const inputs = []
                    const error = []
                    for (let index = 0; index < saw_criteria.length; index++) {
                        const c = {name: saw_criteria[index].name, atribute: saw_criteria[index].atribute, 
                            crisps_type: saw_criteria[index].crisp_type, weight: saw_criteria[index].weight}
                        inputs.push(c)
                        error.push(false)
                    }
                    setInputFields(inputs)
                    setNameError(error)
                    setWeightError(error)
                    console.log(inputFields)
                }).catch(function([error]){
                    console.log(error.config)
                }).finally(function(){
                    setLoading(false)
                })
        }
        else if(type==='ahp'){
            Promise.all([getAHPID(id)])
                .then(function([response]){
                    console.log(response.data)
                    setCriteria(response.data.ahp_criteria)
                    const ahp_criteria = response.data.ahp_criteria
                    console.log(ahp_criteria)
                    const inputs = []
                    const error = []
                    for (let index = 0; index < ahp_criteria.length; index++) {
                        const c = {name: ahp_criteria[index].name, 
                            crisps_type: ahp_criteria[index].crisp_type}
                        inputs.push(c)
                        error.push(false)
                    }
                    setInputFields(inputs)
                    setNameError(error)
                    console.log(inputFields)
                }).catch(function([error]){
                    console.log(error.config)
                }).finally(function(){
                    setLoading(false)
                })
        }
    }, [])
    
    return(
        loading ? '' :
        <Box>
            <Header title={type==='saw' ? 'Kriteria SAW Form' : 'Kriteria AHP Form'}/>
            <Paper sx={{p:3}}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{mb:2}}>
                        {
                            formError ? <Alert severity="error">Harap mengisi semua bagian form</Alert> : ""
                        }
                    {inputFields.map((inputField, index) => (
                        <Stack direction={'row'} spacing={2} sx={{mb:2}} key={index}>
                            <TextField
                                name="id"
                                label="Urutan"
                                variant="filled"
                                disabled
                                value={index+1}
                                sx={{maxWidth:80}}
                            />
                            <TextField
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
                                    labelId="type"
                                    name="crisps_type"
                                    label="Crisps Type"
                                    value={inputField.crisps_type}
                                    onChange={(event) => handleChangeInput(index, event)}
                                    disabled={
                                        type === 'saw' ? criteria[index].saw_crisp.length !== 0
                                        : criteria[index].ahp_crisp.length !== 0
                                    }
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
                                    name="weight"
                                    label="Bobot"
                                    variant="filled"
                                    value={inputField.weight}
                                    onChange={(event) => handleChangeInput(index, event)}
                                    error={weightError[index]}
                                    helperText={weightError[index] ? "Bulat positif" : ""}
                                />
                                : ''
                            }
                        </Stack>
                    ))}
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

export default EditCriteriasForm