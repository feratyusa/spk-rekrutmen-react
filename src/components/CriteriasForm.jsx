import { useParams } from "react-router-dom"
import { Paper, Box, Stack, TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const CriteriasForm = ({type}) => {
    const {id} = useParams()

    const criterias = (type === 'saw' ? {name: "", atribute: "", crisps_type:"", weight: ""}
                        : {name: "", crisps_type:""})

    const [inputFields, setInputFields] = useState([
        criterias
    ])

    function handleChangeInput(index, event) {
        const values = [...inputFields]
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputFields);
    }

    function handleAddFields(){
        setInputFields([...inputFields, criterias])
    }

    function handleRemoveFields(index){
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values)
    }
    
    return(
        <Box>
            <Header title={type==='saw' ? 'SAW Criterias Form' : 'AHP Criterias Form'}/>
            <Paper sx={{p:3}}>
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