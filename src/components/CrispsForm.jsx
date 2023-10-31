import React, { useEffect, useRef, useState } from "react";
import { Paper, Box, Stack, TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AHPDataExample from "../global/AHPDataExample";
import SAWDataExample from "../global/SAWDataExample";
import getSAWID from "../utils/handler/getSAWID";
import axios, { getCookie } from "../utils/axios";

const saw = SAWDataExample
const ahp = AHPDataExample

const CrispsForm = ({type}) => {
    const {id, c_id} = useParams()
    const criteria = useRef(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
      if(type === 'saw'){
        Promise.all([getSAWID(id)])
            .then(function([saw]){
                criteria.current = saw.data.saw_criteria.find(c => c.id === parseInt(c_id))
                console.log(criteria)
                setLoading(false)
            }).catch(function([error]){
                console.log(error.config)
            })
      }
    }, [loading])
    
    const crisps = (
        type === 'saw' ? {name: "", comparator:"", num1: "", num2: "", details:"", weight: ""}
        : {name: "", comparator:"", num1: "", num2: "", details:""}
    )

    const [inputFields, setInputFields] = useState([
        crisps
    ])

    function handleChangeInput(index, event) {
        const values = [...inputFields]
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }

    function handleSubmit(e){
        e.preventDefault();
        let inputs = []        
        for (let index = 0; index < inputFields.length; index++) {
            if(criteria.current.crisp_type===0){
                if(inputFields[index]['comparator'] === 5 || inputFields[index]['comparator'] === 6){
                    const details = inputFields[index]['comparator']+','+inputFields[index]['num1']+','+inputFields[index]['num2']
                    if(type === 'saw')
                        inputs.push({
                            name: inputFields[index]['name'],
                            details: details,
                            weight: inputFields[index]['weight'],
                        })
                    else
                        inputs.push({
                            name: inputFields[index]['name'],
                            details: details,
                        })
                }
                else{
                    const details = inputFields[index]['comparator']+','+inputFields[index]['num1']
                    if(type==='saw')
                        inputs.push({
                            name: inputFields[index]['name'],
                            details: details,
                            weight: inputFields[index]['weight'],
                        })
                    else
                        inputs.push({
                            name: inputFields[index]['name'],
                            details: details,
                        })
                }
            }
            else{
                if(type==='saw')
                    inputs.push({
                        name: inputFields[index]['name'],
                        details: inputFields[index]['details'],
                        weight: inputFields[index]['weight'],
                    })
                else
                    inputs.push({
                        name: inputFields[index]['name'],
                        details: inputFields[index]['details'],
                    })
            }
        }
        console.log(inputs);
        if(type === 'saw'){
            const data = {name:[], detail:[], weight: []}
            for (let index = 0; index < inputs.length; index++) {
                data.name.push(inputs[index].name)
                data.detail.push(inputs[index].details)
                data.weight.push(inputs[index].weight)
            }
            axios.post('/api/saw/'+id+'/criterias/'+c_id+'/crisps/create', data,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials: true
            }).then(function(response){
                console.log(response)
                navigate('/saw/'+id)
            }).catch(function(error){
                if(error.response) console.log(error.response)
                console.log(error.config)
            })
        }
    }

    function handleAddFields(){
        setInputFields([...inputFields, crisps])
    }

    function handleRemoveFields(index){
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values)
    }
    
    return(
        loading ? '' :
        <Box>
            <Header title={'SAW Crisps Form'}/>
            <Paper sx={{p:3}}>
                <Box sx={{mb:2}}>
                    <Typography variant="h6">
                        Kriteria: {criteria.current.name}
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{mb:2}}>
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
                            />
                            {
                                criteria.current.crisp_type === 0 ?
                                <React.Fragment>
                                    <FormControl variant="filled" sx={{ minWidth: 200 }}>
                                        <InputLabel id="type">Komparator</InputLabel>
                                        <Select 
                                            labelId="comparator"
                                            name="comparator"
                                            label="Komparator"
                                            value={inputField.comparator}
                                            onChange={(event) => handleChangeInput(index, event)}
                                        >
                                            <MenuItem value={0}>Sama dengan</MenuItem>
                                            <MenuItem value={1}>Lebih dari sama dengan</MenuItem>
                                            <MenuItem value={2}>Lebih dari</MenuItem>
                                            <MenuItem value={3}>Kurang dari sama dengan</MenuItem>
                                            <MenuItem value={4}>Kurang dari</MenuItem>
                                            <MenuItem value={5}>Di antara (inklusif)</MenuItem>
                                            <MenuItem value={6}>Di antara</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        name="num1"
                                        label="Angka 1"
                                        variant="filled"
                                        value={inputField.num1}
                                        onChange={(event) => handleChangeInput(index, event)}
                                        sx={{maxWidth:80}}
                                    />
                                    <TextField
                                        name="num2"
                                        label="Angka2"
                                        variant="filled"
                                        value={inputField.num2}
                                        disabled={inputField.comparator === 5 || inputField.comparator === 6 ? false : true}
                                        onChange={(event) => handleChangeInput(index, event)}
                                        sx={{maxWidth:80}}
                                    />
                                </React.Fragment> :
                                <TextField
                                    name="details"
                                    label="Detail"
                                    variant="filled"
                                    value={inputField.details}
                                    onChange={(event) => handleChangeInput(index, event)}
                                />
                            }
                            {
                                type === 'saw' ?
                                <TextField
                                    name="weight"
                                    label="Bobot"
                                    variant="filled"
                                    value={inputField.weight}
                                    onChange={(event) => handleChangeInput(index, event)}
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
                            color="info" 
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
                            href={type === 'saw' ? '/saw/'+id : '/ahp/'+id}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
        
    );
}

export default CrispsForm