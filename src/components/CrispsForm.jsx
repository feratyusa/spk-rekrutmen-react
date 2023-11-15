import React, { useEffect, useRef, useState } from "react";
import { Paper, Box, Stack, TextField, Select, 
    MenuItem, Button, FormControl, InputLabel, 
    IconButton, Typography, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import getSAWID from "../utils/handler/saw/getSAWID";
import axios, { getCookie } from "../utils/axios";
import { validName, integerOnly, validDetails } from "../utils/regex";
import getAHPID from "../utils/handler/ahp/getAHPID";

const CrispsForm = ({type}) => {
    const {id, c_id} = useParams()
    const criteria = useRef(null)
    const [nameError, setNameError] = useState([false])
    const [weightError, setWeightError] = useState([false])
    const [num1Error, setNum1Error] = useState([false])
    const [num2Error, setNum2Error] = useState([false])
    const [compareError, setCompareError] = useState([false])    
    const [detailsError, setDetailsError] = useState([false])
    const [formError, setFormError] = useState(false)
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
      else if(type==='ahp'){
        Promise.all([getAHPID(id)])
            .then(function([response]){
                console.log(response)
                criteria.current = response.data.ahp_criteria.find(c => c.id === parseInt(c_id))
                console.log(criteria)
                setLoading(false)
            }).catch(function(error){
                console.log(error.config)
            })
      }
    }, [])
    
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
        if(event.target.name === 'name'){
            const error = [...nameError]
            error[index] = !validName.test(values[index].name)
            setNameError(error)
        }
        if(event.target.name === 'details'){
            const error = [...detailsError]
            error[index] = !validDetails.test(values[index].details)
            setDetailsError(error)
        }   
        if(event.target.name === 'weight'){
            const error = [...weightError]
            error[index] = !integerOnly.test(values[index].weight)
            setWeightError(error)
        }
        if(event.target.name === 'num1'){
            const error = [...num1Error]
            error[index] = !integerOnly.test(values[index].num1)
            setNum1Error(error)
        }
        if(event.target.name === 'num2'){
            const error = [...num2Error]
            error[index] = !integerOnly.test(values[index].num2)
            setNum2Error(error)
        }
        if(values[index].comparator === 5 ||  values[index].comparator === 6){
            const cerror = [...compareError]
            cerror[index] = !(compare_num1_num2(values[index].num1, values[index].num2))
            setCompareError(cerror)
        }
        if(values[index].comparator < 5 && criteria.current.crisp_type === 0){
            const cerror = [...compareError]
            cerror[index] = false
            setCompareError(cerror)
        }
        setFormError(false)
        setInputFields(values)
    }

    function handleAddFields(){
        setInputFields([...inputFields, crisps])
        setNameError([...nameError, false])
        setWeightError([...weightError, false])
        setNum1Error([...num1Error, false])
        setNum2Error([...num2Error, false])
        setCompareError([...compareError, false])
        setDetailsError([...detailsError, false])        
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
        const n1error = [...num1Error]
        n1error.splice(index, 1)
        setNum1Error(n1error)
        const n2error = [...num2Error]
        n2error.splice(index, 1)
        setNum2Error(n2error)
        const c1error = [...compareError]
        c1error.splice(index, 1)
        setCompareError(c1error)
        const derror = [...detailsError]
        derror.splice(index, 1)
        setCompareError(derror)
    }

    function compare_num1_num2(num1, num2){
        if(parseInt(num1) < parseInt(num2)) return true
        return false
    }

    function check_valid(){
        for (let index = 0; index < inputFields.length; index++) {
            if(nameError[index] || inputFields[index].name === '') return false
            if(criteria.current.crisp_type === 0){
                if(num1Error[index] || inputFields[index].num1 === '') return false
                if(compareError[index]) return false
                if(inputFields[index].comparator === 5 || inputFields[index].comparator === 6){
                    if(num2Error[index] || inputFields[index].num2 === '') return false
                }
            }
            else{
                if(detailsError[index] || inputFields[index].details === '') return false
            }
            if(type==='saw'){
                if(weightError[index] || inputFields[index].weight === '') return false
            }
        }
        return true
    }

    function handleSubmit(e){
        e.preventDefault();
        let inputs = []
        if(!check_valid()){
            setFormError(true)
            return
        }        
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
        const data = {name:[], detail:[], weight: []}
        if(type === 'saw'){
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
        else if(type==='ahp'){
            for (let index = 0; index < inputs.length; index++) {
                data.name.push(inputs[index].name)
                data.detail.push(inputs[index].details)
            }
            axios.post('/api/ahp/'+id+'/criterias/'+c_id+'/crisps/create', data,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie('csrf_access_token')
                },
                withCredentials: true
            }).then(function(response){
                console.log(response)
                navigate('/ahp/'+id)
            }).catch(function(error){
                if(error.response) console.log(error.response)
                console.log(error.config)
            })
        }
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
                        {
                            formError ? <Alert severity="error">Harap mengisi semua bagian dengan benar</Alert> : ""
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
                                        label="Angka1"
                                        variant="filled"
                                        type="number"
                                        value={inputField.num1}
                                        onChange={(event) => handleChangeInput(index, event)}
                                        sx={{maxWidth:150}}
                                        error={num1Error[index] || compareError[index]}
                                        helperText={num1Error[index] ? "Bulat Positif" : compareError[index] ? "Angka1 < Angka2" : ""}
                                    />
                                    <TextField
                                        name="num2"
                                        label="Angka2"
                                        variant="filled"
                                        type="number"
                                        value={inputField.num2}
                                        disabled={inputField.comparator === 5 || inputField.comparator === 6 ? false : true}
                                        onChange={(event) => handleChangeInput(index, event)}
                                        sx={{maxWidth:150}}
                                        error={num2Error[index] || compareError[index]}
                                        helperText={num2Error[index] ? "Bulat Positif" : compareError[index] ? "Angka1 < Angka2" : ""}
                                    />
                                </React.Fragment> :
                                <TextField
                                    required
                                    name="details"
                                    label="Details"
                                    variant="filled"
                                    value={inputField.details}
                                    onChange={(event) => handleChangeInput(index, event)}
                                    error={detailsError[index]}
                                    helperText={detailsError[index] ? "Panjang 3 - 24 karakter" : ""}
                                />
                            }
                            {
                                type === 'saw' ?
                                <TextField
                                    required
                                    name="weight"
                                    label="Bobot"
                                    variant="filled"
                                    type="number"
                                    value={inputField.weight}
                                    onChange={(event) => handleChangeInput(index, event)}
                                    sx={{maxWidth:"100px"}}
                                    error={weightError[index]}
                                    helperText={weightError[index] ? "Bulat Positif" : ""}
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