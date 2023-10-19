import { Paper, Box, Stack, TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SAWDataExample from "../../../../global/SAWDataExample";

const saw = SAWDataExample

const SAWCrispsForm = () => {
    const {id, c_id} = useParams()

    const d = saw.find(s => s.id === parseInt(id))
    const criteria = d.criterias.find(c => c.id === parseInt(c_id))

    const [inputFields, setInputFields] = useState([
        {name: "", comparator:"", num1: "", num2: "", details:"", weight: ""},
        {name: "", comparator:"", num1: "", num2: "", details:"", weight: ""}
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
            if(criteria.crisps_type===0){
                if(inputFields[index]['comparator'] === 5 || inputFields[index]['comparator'] === 6){
                    inputs.push({
                        name: inputFields[index]['name'],
                        details: inputFields[index]['comparator']+','+inputFields[index]['num1']+','+inputFields[index]['num2'],
                        weight: inputFields[index]['weight'],
                    })
                }
                else{
                    inputs.push({
                        name: inputFields[index]['name'],
                        details: inputFields[index]['comparator']+','+inputFields[index]['num1'],
                        weight: inputFields[index]['weight'],
                    })
                }
            }
            else{
                inputs.push({
                    name: inputFields[index]['name'],
                    details: inputFields[index]['details'],
                    weight: inputFields[index]['weight'],
                })
            }
        }
        console.log(inputs);
    }

    function handleAddFields(){
        setInputFields([...inputFields, {name: "", comparator:"", num1: "", num2: "", details:"", weight: ""}])
    }

    function handleRemoveFields(index){
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values)
    }
    
    return(
        <Box>
            <Header title={'SAW Crisps Form'}/>
            <Paper sx={{p:3}}>
                <Box sx={{mb:2}}>
                    <Typography variant="h6">
                        Kriteria: {criteria.name}
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
                                criteria.crisps_type === 0 ?
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
                            <TextField
                                name="weight"
                                label="Bobot"
                                variant="filled"
                                value={inputField.weight}
                                onChange={(event) => handleChangeInput(index, event)}
                            />
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
                            href={'/saw/'+id}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
        
    );
}

export default SAWCrispsForm;