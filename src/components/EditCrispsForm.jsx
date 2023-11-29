import React, { useEffect, useRef, useState } from "react";
import { Paper, Box, Stack, TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton, Typography, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import getSAWID from "../utils/handler/saw/getSAWID";
import axios, { getCookie } from "../utils/axios";
import getAHPID from "../utils/handler/ahp/getAHPID";
import { validName, integerOnly, validDetails } from "../utils/regex";

const EditCrispsForm = ({type}) => {
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

    const [inputFields, setInputFields] = useState()

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
            const error = [...num2Error]
            error[index] = false
            setNum2Error(error)
        }
        setFormError(false)
        setInputFields(values)
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
        if(!check_valid()){
            setFormError(true)
            return
        }
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
        const data = {name:[], detail:[], weight: []}
        if(type === 'saw'){
            for (let index = 0; index < inputs.length; index++) {
                data.name.push(inputs[index].name)
                data.detail.push(inputs[index].details)
                data.weight.push(inputs[index].weight)
            }
            axios.put('/api/saw/'+id+'/criterias/'+c_id+'/crisps/update', data,{
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
            axios.put('/api/ahp/'+id+'/criterias/'+c_id+'/crisps/update', data,{
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

    useEffect(() => {
        if(type==='saw'){
            Promise.all([getSAWID(id)])
                .then(function([response]){
                    console.log(response.data)
                    criteria.current = response.data.saw_criteria.find(c => c.id === parseInt(c_id))
                    const saw_crisp = criteria.current.saw_crisp
                    console.log(saw_crisp)
                    const inputs = []
                    const error = []
                    for (let index = 0; index < saw_crisp.length; index++) {
                        if(criteria.current.crisp_type === 0){
                            const detail = saw_crisp[index].detail.split(",")
                            const c = {name:saw_crisp[index].name, comparator:parseInt(detail[0]), 
                                num1:detail[1], num2:detail[2]? detail[2] : "", details:"", weight:saw_crisp[index].weight}
                            inputs.push(c)
                        }
                        else{
                            const detail = saw_crisp[index].detail
                            const c = {name:saw_crisp[index].name, comparator:"", 
                                    num1:"", num2:"", details:detail, weight:saw_crisp[index].weight}
                            inputs.push(c)
                        }
                        
                        error.push(false)
                    }
                    setInputFields(inputs)
                    setNameError(error)
                    setDetailsError(error)
                    setNum1Error(error)
                    setNum2Error(error)
                    setCompareError(error)
                    setWeightError(error)
                    console.log(inputFields)
                }).finally(function(){
                    setLoading(false)
                })
        }
        else if(type==='ahp'){
            Promise.all([getAHPID(id)])
                .then(function([response]){
                    criteria.current = response.data.ahp_criteria.find(c => c.id === parseInt(c_id))
                    const ahp_crisp = criteria.current.ahp_crisp
                    console.log(ahp_crisp)
                    const inputs = []
                    const error = []
                    for (let index = 0; index < ahp_crisp.length; index++) {
                        const detail = ahp_crisp[index].detail.split(",")
                        const c = {name:ahp_crisp[index].name, comparator:parseInt(detail[0]) ? parseInt(detail[0]) : "0", 
                            num1:detail[1]? detail[1] : "", num2:detail[2]? detail[2] : "", details:detail[0]}
                        inputs.push(c)
                        error.push(false)
                    }
                    setInputFields(inputs)
                    setNameError(error)
                    setDetailsError(error)
                    setNum1Error(error)
                    setNum2Error(error)
                    setCompareError(error)
                    setWeightError(error)
                }).finally(function(){
                    setLoading(false)
                })
        }
    }, [])
    
    return(
        loading ? '' :
        <Box>
            <Header title={type === 'saw' ? 'Subkriteria SAW Edit' : 'Subkriteria AHP Edit'}/>
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
                                        sx={{maxWidth:150}}
                                        error={num1Error[index] || compareError[index]}
                                        helperText={num1Error[index] ? "Bulat Positif" : compareError[index] ? "Angka1 < Angka2" : ""}
                                    />
                                    <TextField
                                        name="num2"
                                        label="Angka2"
                                        variant="filled"
                                        value={inputField.num2}
                                        disabled={inputField.comparator === 5 || inputField.comparator === 6 ? false : true}
                                        onChange={(event) => handleChangeInput(index, event)}
                                        sx={{maxWidth:150}}
                                        error={num2Error[index] || compareError[index]}
                                        helperText={num2Error[index] ? "Bulat Positif" : compareError[index] ? "Angka1 < Angka2" : ""}
                                    />
                                </React.Fragment> :
                                <TextField
                                    name="details"
                                    label="Detail"
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
                                    name="weight"
                                    label="Bobot"
                                    variant="filled"
                                    value={inputField.weight}
                                    onChange={(event) => handleChangeInput(index, event)}
                                    error={weightError[index]}
                                    helperText={weightError[index] ? "Bulat Positif" : ""}
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

export default EditCrispsForm